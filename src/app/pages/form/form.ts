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

  public itemForm: FormGroup;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public isEditMode = false;
  private currentItem?: Item;

  constructor(
    public itemService: ItemService,
    public fb: FormBuilder
  ){
    this.itemForm = this.fb.group({
      item_name: ['']
    })
  }

  ngOnInit(){

    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.isEditMode = true;

      this.currentItem = this.itemService
        .items()
        .find(i => i.id === Number(id));

        if(this.currentItem){
          this.itemForm.patchValue({
            item_name: this.currentItem.item_name
          });
        }
    }
  }

  save() {

    const itemName = this.itemForm.get('item_name')?.value || '';

    if (this.isEditMode && this.currentItem) {

      this.itemService.updateItem({
        ...this.currentItem,
        item_name: itemName
      });

    } else {

      this.itemService.addItem({
        id: Date.now(),
        item_name: itemName
      });
    }

    this.itemForm.reset();
    this.router.navigate(['']);
  }

}
