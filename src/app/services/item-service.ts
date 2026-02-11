import { Injectable, signal } from '@angular/core';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  
  private _items = signal<Item[]>([]);
  items = this._items.asReadonly();

  addItem(item: Item){
    this._items.update(list_items => [...list_items, item]);
  }

  updateItem(item: Item){
    this._items.update(listOfItems =>
      listOfItems.map(i => i.id === item.id ? item:i)
    );
  }

  deleteItem(id: number){
    this._items.update(listOfItems =>
      listOfItems.filter(i => i.id !== id)
    )
  }

  getAllItems(){
    return this.items;
  }

} 
