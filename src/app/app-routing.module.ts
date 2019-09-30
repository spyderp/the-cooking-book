import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule', canActivate: [AuthGuardService] },
  { path: 'recipe1', loadChildren: './recipe1/recipe1.module#Recipe1PageModule' },
  { path: 'recipe2', loadChildren: './recipe2/recipe2.module#Recipe2PageModule' },
  { path: 'recipe3', loadChildren: './recipe3/recipe3.module#Recipe3PageModule' },
  { path: 'view/:uid', loadChildren: './view/view.module#ViewPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
