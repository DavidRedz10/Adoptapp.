import { Component, OnInit } from '@angular/core';
import { FirstServiceService } from '../first-service.service';
import { Animales } from '../animales';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

/* Establece las propiedades y objetos del tipo Animal / interface interna */

interface AnimalData{
  Name: string;
  Age: number;
  Place: string;
  Info: string;
  Category: string;
  Breed: string;
  Image: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

/* Variables a usar con las respectivas listas */
  animalList: any[];
  dogList = [];
  catList = [];
  hamsterList = [];
  animalListBackup: any[];

  constructor(private firestore: AngularFirestore ,private firebaseService: FirstServiceService, private nav: NavController, private loadingCtrl: LoadingController) {
  }

 async ngOnInit(){

  const loading = await this.loadingCtrl.create({
    showBackdrop: false,
    mode: "ios",
    spinner: "crescent",
    duration: 10000,
    
  });

  /* Inicializa la coleccion de animales desde firebase para la barra de busqueda*/
    /*Collection: "Animalitos"*/
    this.animalList = await this.initializeItems();

      /* Inicializa la coleccion de categorias desde firebase */
    /*Collection: "Perros"*/
    this.firebaseService.read_dog().subscribe(data => {
loading.present();
      this.dogList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Category: e.payload.doc.data()['Category'],
          Breed: e.payload.doc.data()['Breed'],
          Background: e.payload.doc.data()['Background'],
          Category_Image: e.payload.doc.data()['Category_Image'],    
        };
      })
     loading.dismiss() ;
      console.log(this.dogList);

    });

          /* Inicializa la coleccion de categorias desde firebase */
    /*Collection: "Gatos"*/
    this.firebaseService.read_cat().subscribe(data => {

      this.catList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Category: e.payload.doc.data()['Category'],
          Breed: e.payload.doc.data()['Breed'],
          Background: e.payload.doc.data()['Background'],
          Category_Image: e.payload.doc.data()['Category_Image'],    
        };
      })
      console.log(this.catList);

    });

          /* Inicializa la coleccion de categorias desde firebase */
    /*Collection: "Hamsters"*/
   this.firebaseService.read_hamster().subscribe(data => {

  this.hamsterList = data.map(e => {
       return {
       id: e.payload.doc.id,
        isEdit: false,
     Category: e.payload.doc.data()['Category'],
        Breed: e.payload.doc.data()['Breed'],
        Background: e.payload.doc.data()['Background'],
       Category_Image: e.payload.doc.data()['Category_Image'],    
      };
    })
     console.log(this.hamsterList);

  }); 

  }
            /* Metodo para pasar datos al presionar*/
            /* Interface externa "Animales" ---> animales.ts*/
  categoryPage(animales: Animales) {

    this.nav.navigateForward(['tab2/categoria-animal/', animales]);

  }

  /* Trae la coleccion de animales desde firebase para la barra de busqueda */

  async initializeItems(): Promise<any> {
    const animalList = await this.firestore.collection('Animalitos')   /* Nombre de la coleccion */
      .valueChanges().pipe(first()).toPromise();
    this.animalListBackup = animalList;
    return animalList;
  }
  
    /* Filtra la coleccion de animales desde firebase para la barra de busqueda */

  async filterList(evt) {
    this.animalList = this.animalListBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.animalList = this.animalList.filter(currentAnimal => {
      if (currentAnimal.Name && searchTerm) { /* Condiciones de busqueda */
        return (currentAnimal.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentAnimal.Category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentAnimal.Breed.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  perfilPage(animales: Animales) {

    this.nav.navigateForward(['perfil-animal/', animales]);

  }
}
