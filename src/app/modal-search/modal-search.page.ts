import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.page.html',
  styleUrls: ['./modal-search.page.scss'],
})
export class ModalSearchPage implements OnInit {
  ingredients: Observable<any[]>;
  typeFilter: string;
  constructor(private ingredientService: IngredientService, private modalController: ModalController) { }

  ngOnInit() {
    this.typeFilter = 'Carnes';
    this.ingredients = this.ingredientService.get().valueChanges();
  }
  changeType() {
    this.ingredients = this.ingredientService.get(this.typeFilter).valueChanges();
  }
  selectIngredient(value){
    this.modalController.dismiss(value);
  }

}
