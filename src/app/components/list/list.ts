import { Component } from '@angular/core';
import { ItemService } from '../../services/item-service';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  constructor(public itemService: ItemService){}

  private router = inject(Router);

  item_name: string = '';

  public trackItemById(index: number, item: any){
    return item.id;
  }

  deleteItem(id: number){
    this.itemService.deleteItem(id);
  }

  
}
