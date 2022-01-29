import { Component, OnInit } from '@angular/core';
import { FirstServiceService } from '../first-service.service';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-extraviado-info',
  templateUrl: './extraviado-info.page.html',
  styleUrls: ['./extraviado-info.page.scss'],
})
export class ExtraviadoInfoPage implements OnInit {

  animalList = [];
  animalForm: FormGroup;
  imageURL: any;
  imageURL2: any;
  imageURL3: any;

  constructor(public activatedRoute: ActivatedRoute,
    private nav: NavController,  
    private firebaseService: FirstServiceService, 
    public fb: FormBuilder, 
    private toastController: 
    ToastController) {

    this.activatedRoute.queryParams.subscribe((data) => {
      console.log(JSON.parse(data.value));
      console.log(JSON.parse(data.value2));
      console.log(JSON.parse(data.value3));
      let url = JSON.parse(data.value);
      let url2 = JSON.parse(data.value2);
      let url3 = JSON.parse(data.value3);
   this.imageURL = url;
   this.imageURL2 = url2;
   this.imageURL3 = url3;
   })
   }

   ngOnInit(){

    this.animalForm = this.fb.group({
      Name: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      typeAge: ['', [Validators.required]],
      Place: ['', [Validators.required]],
      Info: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Breed: ['', [Validators.required]],
      Image: this.imageURL,
      Image2: this.imageURL2,
      Image3: this.imageURL3,
    });
  }

  async CreateRecord(){

 
    const toast = await this.toastController.create({
      message: 'Tu adoptappble fue publicado con exito.',
      color: 'danger',
      duration: 4000
    });

    const toast2 = await this.toastController.create({
      message: 'Ocurrio un error desconocido.',
      color: 'dark',
      duration: 5000
    });


this.firebaseService.create_animal(this.animalForm.value).then(resp =>{

 toast.present().then(() => {
  this.animalForm.reset();
  this.nav.navigateForward('tabs/tab3');
});
  })
  .catch(error =>{
    toast2.present();
    console.log(error);
  })

  }

}
