import { Injectable } from '@angular/core';
import { Rest } from './rest';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends Rest {

  constructor(angularFireDatabase: AngularFireDatabase) {
    super('recipes', angularFireDatabase);
  }
  delete(uid) {
    alert('borrar');
  }
}
