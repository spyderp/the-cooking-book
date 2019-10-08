import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeIngredientsService } from '../services/recipe-ingredients.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private alertController: AlertController, 
    private recipeService: RecipeService, 
    private recipeIngredientsService: RecipeIngredientsService,
    private router: Router) { }
    imgagen: boolean = false;
    recipes: Observable<any[]>;
    clearFilter;
  
  ngOnInit() {
    this.recipes = this.recipeService.get().valueChanges();
    this.clearFilter = this.recipes;
  }
  delete(uid) {
    this.alertMessage('¿Estas seguro que deseas Borrar esto?', uid);
  }
  edit(uid){
    this.router.navigate(['/recipe1', uid]);
  }
  filterRecipes(event) {
    const query = event.target.value.toLowerCase();
    this.recipes = this.recipeService.get(query).valueChanges();
  }
  filterClear(event) {
    this.recipes = this.recipeService.get().valueChanges();
  }
  viewRecipe(uid) {
    this.router.navigate(['/view', uid]);
  }
  async alertMessage(msg: string, uid) {
    const  alert = await this.alertController.create({
      header: '¿Confirmar?',
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.recipeIngredientsService.delete(uid);
            this.recipeService.delete(uid);
          }
        }
      ]
    });

    await alert.present();
  }
}
