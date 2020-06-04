import { Injectable } from '@angular/core';
import {Item} from '../models/items.model';
//import { Observable } from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { database } from 'firebase';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  ItemsCollection: AngularFirestoreCollection<Item>
  Item: Observable<Item[]>;
  ItemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) {
    //this.Item = this.afs.collection('items').valueChanges();
    this.ItemsCollection = this.afs.collection('items', ref => ref.orderBy('title', 'asc')
    );
    this.Item = this.ItemsCollection.snapshotChanges().map(changes => {
      return changes.map(a =>{
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;

      });
    });
   }
   getItems(){
     return this.Item;
   }
   addItem(item: Item){
     this.ItemsCollection.add(item);
   }
   deleteItem(item: Item){
     this.ItemDoc = this.afs.doc('items/${item.id}');
     this.ItemDoc.delete();
   }

 updateItem(item: Item){
  this.ItemDoc = this.afs.doc('items/${item.id}');
  this.ItemDoc.update(item);
 }
}



