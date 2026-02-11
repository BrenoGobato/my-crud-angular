import { Component, inject } from '@angular/core';
import { ItemService } from '../../services/item-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../model/item';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {

  public itemForm: FormGroup;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private itemId!: number;
  private currentItem!: Item;

  constructor(
    public itemService: ItemService, 
    private fb: FormBuilder)
  {
    this.itemForm = this.fb.group({
      item_name: ['']
    });
  }

  ngOnInit() {

    this.itemId = Number(this.route.snapshot.paramMap.get('id'));

    this.currentItem = this.itemService
      .items()
      .find(i => i.id === this.itemId)!;

    if (this.currentItem) {
      this.itemForm.patchValue({
        item_name: this.currentItem.item_name
      });
    }
  }

  saveEditedItem() {

    const itemName = this.itemForm.get('item_name')?.value || '';

    this.itemService.updateItem({
      ...this.currentItem,
      item_name: itemName
    });

    this.router.navigate(['']);
  }
}
