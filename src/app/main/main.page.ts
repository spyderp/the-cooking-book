import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private alertController: AlertController, private recipeService: RecipeService, private router: Router) { }
    imgagen: boolean = false;
    recipes;
    clearFilter;
    data = [
      {
        uid: 1,
        title: 'Lasaña de pollo en salsa blanca',
        time: '50min',
        picture: [],
      },
      {
        uid: 2,
        title: 'Ensalada a mi manera',
        time: '10min',
        picture: [],
      },
      {
        uid: 3,
        title: 'Beef a la Mongola',
        time: '1 hora 1/2 ',
        picture: [],
      }
    ];
  ngOnInit() {
    //this.recipes = this.recipeService.get();
    this.recipes = this.data;
    this.clearFilter = this.recipes;
  }
  delete(item) {
    this.alertMessage('¿Estas seguro que deseas Borrar esto?', '');
  }
  filterRecipes(event) {
    const query = event.target.value.toLowerCase();
    this.recipes = this.recipes.filter(recipe => {
      return recipe.title.toLowerCase().indexOf(query) > -1;
    });
  }
  filterClear(event) {
    console.log(event)
    this.recipes = this.clearFilter;
  }
  viewRecipe(uid) {
    this.router.navigate(['/view', uid]);
  }
  async alertMessage(title: string, msg: string) {
    const  alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [{
       text: 'Cerrar',
       cssClass: 'danger'
      }]
    });

    await alert.present();
  }
}
