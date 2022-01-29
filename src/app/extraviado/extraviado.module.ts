import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtraviadoPageRoutingModule } from './extraviado-routing.module';

import { ExtraviadoPage } from './extraviado.page';

import { FirstServiceService } from '../first-service.service';

import {FormGroup, Validators, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExtraviadoPageRoutingModule
  ],
  declarations: [ExtraviadoPage]
})


export class ExtraviadoPageModule {

  constructor()
  {
  }

}
