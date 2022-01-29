import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaAnimalPage } from './categoria-animal.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaAnimalPageRoutingModule {}
