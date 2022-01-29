import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtraviadoInfoPage } from './extraviado-info.page';

const routes: Routes = [
  {
    path: '',
    component: ExtraviadoInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraviadoInfoPageRoutingModule {}
