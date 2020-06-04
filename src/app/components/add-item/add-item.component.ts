import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/items.model';
import { from } from 'rxjs';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item: Item= {
    title:'',
    description:''

  }

  constructor(private ItemsService: ItemsService) {

   }

  ngOnInit(): void {
  }
  onSubmit(){
    if (this.item.title !='' && this.item.description !=''){
      this.ItemsService.addItem(this.item);
      this.item.title ='';
      this.item.description ='';
    }
  }

}
