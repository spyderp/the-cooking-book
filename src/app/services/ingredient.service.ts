import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Rest } from './rest';
@Injectable({
  providedIn: 'root'
})
export class IngredientService extends Rest {
  constructor(angularFireDatabase: AngularFireDatabase) {
    super('ingredients', angularFireDatabase);
  }
  get(type = 'Carnes') {
    return this.db.list('/' + this.modelName, ref => ref.orderByChild('type').equalTo(type));
  }
}
