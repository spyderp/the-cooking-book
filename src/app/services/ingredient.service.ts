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
  delete(uid) {

  }
}
