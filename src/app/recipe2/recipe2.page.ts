import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RecipeService } from '../services/recipe.service';
import { RecipeInterface } from '../interfaces/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-recipe2',
  templateUrl: './recipe2.page.html',
  styleUrls: ['./recipe2.page.scss'],
})
export class Recipe2Page implements OnInit {
  recipe: RecipeInterface;
  procedure: string;
  constructor(
    public toastController: ToastController,
    private auth: AuthenticationService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('uid');
    this.auth.getStatus().subscribe( status => {
    this.recipeService.getById(recipeId).valueChanges().subscribe( (data: RecipeInterface) => {
      this.recipe = data;
      if(data.procedure && data.procedure.length > 0) {
        this.procedure = data.procedure;
      }
      console.log(this.recipe);
    }, (e) => {
      console.log(e);
    });
    }, (e) => {
      console.log(e);
    });
  }
  submit(next = 'save') {
    let save = true;
    this.recipe.procedure = this.procedure;
    this.recipeService.create(this.recipe).then(data => {
      this.msgToast('Datos guardardos');
    }).catch(e => {
      save = false;
      this.msgToast('ERROR: No se pudieron guardar los datos intente nuevamente', 'danger');  
    });
    if (save) {
      if (next === 'save') {
        this.router.navigate(['/main']);
      } else if (next === 'next') {
        this.router.navigate(['/recipe3', this.recipe.uid]);
      } else if (next === 'prev') {
        this.router.navigate(['/recipe1', this.recipe.uid]);
      }
    }
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
