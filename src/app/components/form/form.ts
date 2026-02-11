import { Component, inject } from '@angular/core';
import { ItemService } from '../../services/item-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  public itemForm: FormGroup;

  constructor(
    public itemService: ItemService, 
    private fb: FormBuilder)
  {
    this.itemForm = this.fb.group({
      item_name: ['']
    });
  }

  private router = inject(Router);

  saveNewItem(){
    const itemName = this.itemForm.get('item_name')?.value || '';
    this.itemService.addItem({
      id: Date.now(),
      item_name: itemName
    });

    this.itemForm.reset();
    this.router.navigate(['']);
  }
}
 