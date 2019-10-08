import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { RecipeIngredientsService } from '../services/recipe-ingredients.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeInterface, RecipeIngredientsInterface } from '../interfaces/recipe';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  recipe: any;
  ingredients = [];
  constructor(
    private recipeService: RecipeService,
    private recipeIngredientService: RecipeIngredientsService,
    private route: ActivatedRoute
  ) { 
    const recipeId = this.route.snapshot.paramMap.get('uid');
    this.recipe = {
      title: null,
      time: null,
      picture: null,
      procedure: null,
    }
    console.log(recipeId);
    this.recipeService.getById(recipeId).valueChanges().subscribe( (data: RecipeInterface) => {
      this.recipe = data;
      this.recipeIngredientService.get(data.uid).valueChanges().subscribe( ingredients => {
       ingredients.forEach( (row: RecipeIngredientsInterface) => {
        this.ingredients.push(row);
       });
      });
    });
  }

  ngOnInit() {
    
  }

}
