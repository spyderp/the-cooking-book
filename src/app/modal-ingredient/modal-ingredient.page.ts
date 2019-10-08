import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IngredientService } from '../services/ingredient.service';
import { Ingredient } from '../interfaces/ingredient';

@Component({
  selector: 'app-modal-ingredient',
  templateUrl: './modal-ingredient.page.html',
  styleUrls: ['./modal-ingredient.page.scss'],
})
export class ModalIngredientPage implements OnInit {
  ingredient: Ingredient;
  constructor(
    private ingredientService: IngredientService,
    private modalController: ModalController,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    this.ingredient = new Ingredient(userId);
  }
  onSubmit() {
    this.ingredient.date = Date.now();
    console.log(this.ingredient);
    this.ingredientService.create(this.ingredient).then((data) => {
      const userId = localStorage.getItem('userId');
      this.ingredient = new Ingredient(userId);
      this.presentToast('Registro exitoso');
    }).catch(e => {
      this.presentToast('ERROR: Ocurrio un error intente nuevamenrte', 'danger');
      console.log(e);
    })
  }
  closeModal() {
    this.modalController.dismiss('cancel');
  }
  async presentToast(msg, c = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      color: c,
      duration: 2000
    });
    toast.present();
  }
}
