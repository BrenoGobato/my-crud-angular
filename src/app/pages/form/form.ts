import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../model/item';
import { ItemService } from '../../services/item-service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  // representa o formulário inteiro na memória.
  public itemForm: FormGroup;

  // injeção moderna de dependência.
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // flag para saber se o form está criando ou editando
  public isEditMode = false;

  // guarda o item atual quando estiver editando.
  private currentItem?: Item;

  constructor(
    public itemService: ItemService,
    public fb: FormBuilder
  ){
    // cria o form com um campo.
    this.itemForm = this.fb.group({
      item_name: ['']
    })
  }

  ngOnInit(){

    // pega o id da URL. Ex: /form/123
    const id = this.route.snapshot.paramMap.get('id');

    // se existir id → estamos editando.
    if(id){

      // ativa modo edição.
      this.isEditMode = true;

      // procura o item no estado do service. detalhe importante: signal precisa de ().
      this.currentItem = this.itemService
        .items()
        .find(i => i.id === Number(id));

        // preenche o form com dados existentes. patchValue atualiza só campos informados.
        if(this.currentItem){
          this.itemForm.patchValue({
            item_name: this.currentItem.item_name
          });
        }
    }
  }

  save() {

    //pega valor do input.
    const itemName = this.itemForm.get('item_name')?.value || '';

    // se estiver editando…
    if (this.isEditMode && this.currentItem) {

      // faz update mantendo outras propriedades. spread operator = copia o objeto.
      this.itemService.updateItem({
        ...this.currentItem,
        item_name: itemName
      });

      // se não estiver editando
    } else {
      // cria novo item 
      this.itemService.addItem({
        id: Date.now(),
        item_name: itemName
      });
    }

    // limpar formulário
    this.itemForm.reset();
    // volta para lista
    this.router.navigate(['']);
  }

}
