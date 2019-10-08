import { Injectable } from '@angular/core';
import { Rest } from './rest';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends Rest {

  constructor(angularFireDataBase: AngularFireDatabase) {
    super('units', angularFireDataBase);
  }
}
