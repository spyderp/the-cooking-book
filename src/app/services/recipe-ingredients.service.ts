import { Injectable } from '@angular/core';
import { Rest } from './rest';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RecipeIngredientsService extends Rest {

  constructor(angularFireDatabase: AngularFireDatabase) {
    super('recipe-ingredients', angularFireDatabase);
   }
   
  get(filter = null) {
    if (filter) {
      return this.db.list('/' + this.modelName, ref => ref.orderByChild('recipeId').equalTo(filter));
    }
    return this.db.list('/' + this.modelName);
  }
  delete(recipeId) {
    this.db.list('/' + this.modelName, ref => ref.orderByChild('recipeId').equalTo(recipeId)).remove();
  }
}
