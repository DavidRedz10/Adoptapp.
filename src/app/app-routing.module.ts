import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'tab2/categoria-animal',
    loadChildren: () => import('./categoria-animal/categoria-animal.module').then( m => m.CategoriaAnimalPageModule)
  },
  {
    path: 'perfil-animal',
    loadChildren: () => import('./perfil-animal/perfil-animal.module').then( m => m.PerfilAnimalPageModule)
  },
  {
    path: 'extraviado',
    loadChildren: () => import('./extraviado/extraviado.module').then( m => m.ExtraviadoPageModule)
  },
  
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'extraviado-info',
    loadChildren: () => import('./extraviado-info/extraviado-info.module').then( m => m.ExtraviadoInfoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
