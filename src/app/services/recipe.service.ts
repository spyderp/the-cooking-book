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
  get(filter = null) {
    if (filter) {
      return this.db.list('/' + this.modelName, ref => ref.orderByChild('title').equalTo(filter));
    }
    return this.db.list('/' + this.modelName);
  }
  delete(uid) {
    this.db.list('/' + this.modelName +'/' + uid).remove();
  }
}
