import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UnitService } from '../services/unit.service';
import { Recipe, RecipeIngredients } from '../interfaces/recipe';
import { Observable } from 'rxjs';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalIngredientPage } from '../modal-ingredient/modal-ingredient.page';
import { ModalSearchPage } from '../modal-search/modal-search.page';
import { RecipeIngredientsService } from '../services/recipe-ingredients.service';



@Component({
  selector: 'app-recipe1',
  templateUrl: './recipe1.page.html',
  styleUrls: ['./recipe1.page.scss'],
})
export class Recipe1Page implements OnInit {
  namePage: string = 'Creando una nueva receta';
  recipe: Recipe;
  recipeIngredients = [];
  units: Observable<any[]>;
  ingredients: Observable<any[]>;
  constructor(
    public modalController:ModalController,
    public toastController: ToastController,
    private recipeService: RecipeService,
    private recipeIngredientService: RecipeIngredientsService,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('uid');
    const userId = localStorage.getItem('userId');
    this.recipe = new Recipe(userId);
    if (recipeId) {
      this.namePage = 'Edición';
      this.recipeService.getById(recipeId).valueChanges().subscribe( (data: any) => {
        this.recipe = new Recipe(userId, data);
        this.recipeIngredientService.get(data.uid).valueChanges().subscribe( ingredients => {
         ingredients.forEach( (row: any) => {
          this.recipeIngredients.push(new RecipeIngredients(null, row));
         });
        });
      });
    } else {
      this.recipeIngredients = [new RecipeIngredients(this.recipe.uid)];
    }
    
    this.units  = this.unitService.get().valueChanges();
  }
  addIngredient() {
    this.presentModal();
  }

  newLine() {
    this.recipeIngredients.push(new RecipeIngredients(this.recipe.uid));
  }
  removeLine(i) {
    this.recipeIngredients.splice(i, 1);
  }
  submit(next = 'save') {
    let save = true;
    this.recipeService.create(this.recipe).then(data => {
      this.recipeIngredients.forEach( row => {
        this.recipeIngredientService.create(row).then().catch(e => {
          console.log(e);
        });
      });
    }).catch(e => {
      save = false;
      this.msgToast('ERROR: No se pudieron guardar los datos intente nuevamente', 'danger');  
    });
    this.msgToast('Datos guardardos');
    if (save) {
      if(next === 'save') {
        this.router.navigate(['/main']);
      } else {
        this.router.navigate(['/recipe2', this.recipe.uid]);
      }
    }
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalIngredientPage
    });
    return await modal.present();
  }
  async searchModal(i){
    const modal = await this.modalController.create({
      component: ModalSearchPage
    });
    modal.onDidDismiss().then(response => {
      this.recipeIngredients[i].ingredient = response.data;
    });
    return await modal.present();
  }
  async msgToast(msg, c = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      color: c,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }
}


