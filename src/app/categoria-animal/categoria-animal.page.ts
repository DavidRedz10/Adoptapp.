import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstServiceService } from '../first-service.service';
import { Animales } from '../animales' ;
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categoria-animal',
  templateUrl: './categoria-animal.page.html',
  styleUrls: ['./categoria-animal.page.scss'],
})
export class CategoriaAnimalPage implements OnInit {

  animales = {} as Animales;
  animalList = [];

  constructor(private firebaseService: FirstServiceService, public activatedRoute: ActivatedRoute, private nav: NavController) { 

    this.activatedRoute.params.subscribe((data:any) => {
      console.log(data);
  
      this.animales.Category = data.Category

    })
  }

  ngOnInit() {
    this.firebaseService.read_animals().subscribe(data => {
      this.animalList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Breed: e.payload.doc.data()['Breed'],
          Category: e.payload.doc.data()['Category'],
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Image: e.payload.doc.data()['Image'],
          Image2: e.payload.doc.data()['Image2'],
          Image3: e.payload.doc.data()['Image3'],
          Place: e.payload.doc.data()['Place'],
          Type: e.payload.doc.data()['Type'],
          typeAge: e.payload.doc.data()['typeAge'],
          Info: e.payload.doc.data()['Info']
        };
      })
      console.log(this.animalList);

    });
  }

    perfilPage(animales: Animales) {

    this.nav.navigateForward(['perfil-animal/', animales]);

  }

}
