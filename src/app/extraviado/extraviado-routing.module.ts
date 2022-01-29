import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtraviadoPage } from './extraviado.page';

const routes: Routes = [
  {
    path: '',
    component: ExtraviadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraviadoPageRoutingModule {}
