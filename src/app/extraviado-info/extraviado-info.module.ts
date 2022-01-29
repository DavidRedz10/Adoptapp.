import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtraviadoInfoPageRoutingModule } from './extraviado-info-routing.module';

import { ExtraviadoInfoPage } from './extraviado-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExtraviadoInfoPageRoutingModule
  ],
  declarations: [ExtraviadoInfoPage]
})
export class ExtraviadoInfoPageModule {}
