import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaAnimalPageRoutingModule } from './categoria-animal-routing.module';

import { CategoriaAnimalPage } from './categoria-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaAnimalPageRoutingModule
  ],
  declarations: [CategoriaAnimalPage]
})
export class CategoriaAnimalPageModule {}
