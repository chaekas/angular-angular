import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/items.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
    editState: boolean = false;
    itemToEdit: Item;
  

  constructor(private itemservice: ItemsService) { }

  ngOnInit(): void {
    this.itemservice.getItems().subscribe(items => {
      console.log(items);
      this.items = items;
    });
  }
  deleteItem(event, item: Item){
    this.clearState();
    this.itemservice.deleteItem(item);
    

  }
  editItem(event, item: Item){
    this.editState = true;
    this.itemToEdit = item;
  }

  clearState(){
   this.editState = false;
   this.itemToEdit = null;
     

}
updateItem(){
 this.itemservice.updateItem(this.items);
 this.clearState();
}

}
