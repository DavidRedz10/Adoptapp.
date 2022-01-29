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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  sliderConfig = {
    lidesPerView: 1.4,
    spaceBetween: 10,
    speed: 999,
    loop: true,
    centeredSlides: true,
    autoplay: true,
    slideShadows: true,
    disableOnInteraction: true
  }

  /* Variables a usar con las respectivas listas */
  animalList: any[];
  animalListBackup: any[];
  categoriesList = [];
  perdidosList = [];
  adoptadosList = [];

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
    /*Collection: "Categorias"*/
    this.firebaseService.read_animals().subscribe(data => {
      loading.present();
            this.categoriesList = data.map(e => {
              return {
                id: e.payload.doc.id,
                isEdit: false,
                Category: e.payload.doc.data()['Category'],
                Color: e.payload.doc.data()['Color'],
                Category_Image: e.payload.doc.data()['Category_Image'],    
              };
            })
           loading.dismiss() ;
            console.log(this.categoriesList);
      
          });

                   /* Filtra animales en adopcion */
    /*Collection: "Categorias"*/
    this.firebaseService.read_animals().subscribe(data => {
      this.adoptadosList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Breed: e.payload.doc.data()['Breed'],
          Category: e.payload.doc.data()['Category'],
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          typeAge: e.payload.doc.data()['typeAge'],
          Image: e.payload.doc.data()['Image'],
          Image2: e.payload.doc.data()['Image2'],
          Image3: e.payload.doc.data()['Image3'],
          Place: e.payload.doc.data()['Place'],
          Info: e.payload.doc.data()['Info']
        };
      })
      console.log(this.adoptadosList);

    });

                       /* Filtra animales perdidos */
    /*Collection: "Categorias"*/
    this.firebaseService.read_animals().subscribe(data => {
      this.perdidosList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Breed: e.payload.doc.data()['Breed'],
          Category: e.payload.doc.data()['Category'],
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          typeAge: e.payload.doc.data()['typeAge'],
          Image: e.payload.doc.data()['Image'],
          Image2: e.payload.doc.data()['Image2'],
          Image3: e.payload.doc.data()['Image3'],
          Place: e.payload.doc.data()['Place'],
          Info: e.payload.doc.data()['Info']
        };
      })
      console.log(this.perdidosList);

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

     /* Metodo para pasar datos al presionar/ Perfil Animal barra de busqueda*/
  perfilPage(animales: Animales) {

    this.nav.navigateForward(['perfil-animal/', animales]);

  }

       /* Metodo para pasar datos al presionar/ Perfil Animal barra de busqueda*/
       perfilPage2() {

        this.nav.navigateForward('perfil-animal');
    
      }

}
