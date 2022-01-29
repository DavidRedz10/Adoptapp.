import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavController, ToastController } from '@ionic/angular';

import { ImageURL } from '../image-url' ;
import { Router } from '@angular/router';

interface AnimalData{
  Name: string;
  Age: number;
  Place: string;
  Info: string;
  Category: string;
  Breed: string;
  Image: string
}

@Component({
  selector: 'app-extraviado',
  templateUrl: './extraviado.page.html',
  styleUrls: ['./extraviado.page.scss'],
})
export class ExtraviadoPage implements OnInit {
 
  imageUrl = {} as ImageURL;
  urlLink = [];
  animalData: AnimalData;
  animalForm: FormGroup;

     // Upload Task 
  fileUploadTask: AngularFireUploadTask;
  fileUploadTask2: AngularFireUploadTask;
  fileUploadTask3: AngularFireUploadTask;

  // Progress in percentage
  percentageVal: Observable<number>;
  percentageVal2: Observable<number>;
  percentageVal3: Observable<number>;

  // Snapshot of uploading file
  trackSnapshot: Observable<any>;
  trackSnapshot2: Observable<any>;
  trackSnapshot3: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;
  UploadedImageURL2: Observable<string>;
  UploadedImageURL3: Observable<string>;
 
  //Uploaded Image List
  files: Observable<ImageData[]>;

  //File details  
  imgName:string;
  imgSize:number;

  fileUpload: boolean;
  fileUpload2: boolean;
  fileUpload3: boolean;
  fileUploadAux: boolean;
  fileUploadAux2: boolean;
  
  private filesCollection: AngularFirestoreCollection<ImageData>;

  constructor(private afStorage: AngularFireStorage, 
    private afs: AngularFirestore,
     public fb: FormBuilder, 
     public router: Router,
     private toastController: 
     ToastController) {
    this.animalData = {} as AnimalData;
  
    this.fileUpload = false;
    this.fileUpload2 = false;
    this.fileUpload3 = false;
    this.fileUploadAux = false;
    this.fileUploadAux2 = false;

    // Define uploaded files collection
    this.filesCollection = afs.collection<ImageData>('Animalitos');
    this.files = this.filesCollection.valueChanges();
   }

   ngOnInit(){
    this.animalForm = this.fb.group({
      Image: ['', [Validators.required]],
      Image2: ['', [Validators.required]],
      Image3: ['', [Validators.required]],
    });
    
  }
  
 async uploadImage(event: FileList) {

    // The File object
    const file = event.item(0)

    const toast = await this.toastController.create({
      message: 'Selecciona un archivo de imagen valido',
      color: 'dark',
      duration: 5000
    });

    const toast2 = await this.toastController.create({
      message: 'Tu imagen fue cargada con exito',
      color: 'success',
      duration: 4000
    });

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
      toast.present();
     console.error('unsupported file type :( ')
     return;
    }

    this.imgName = file.name;

    // The storage path
    const fileStoragePath = `Animalitos/${new Date().getTime()}`;

    //File reference
    const imageRef = this.afStorage.ref(fileStoragePath);

    // The main task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file );

    // Get file progress percentage
    this.percentageVal = this.fileUploadTask.percentageChanges();

   
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedImageURL = imageRef.getDownloadURL();       
        this.UploadedImageURL.subscribe(resp=>{
          toast2.present();
          this.imageUrl.imageData = resp;
          this.fileUpload = true;
          this.fileUploadAux = true;
          this.animalForm.patchValue({
            Image: resp,
          })
         
     /*  this.animalForm.get('Image').setValue({
         Image: resp
       }) */ 
        
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.imgSize = snap.totalBytes;
      })
    )
  }

  async uploadImage2(event: FileList) {

    // The File object
    const file = event.item(0)

    const toast = await this.toastController.create({
      message: 'Selecciona un archivo de imagen valido',
      color: 'dark',
      duration: 5000
    });

    const toast2 = await this.toastController.create({
      message: 'Tu imagen fue cargada con exito',
      color: 'success',
      duration: 4000
    });

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
      toast.present();
     console.error('unsupported file type :( ')
     return;
    }

    this.imgName = file.name;

    // The storage path
    const fileStoragePath = `Animalitos/${new Date().getTime()}`;

    //File reference
    const imageRef = this.afStorage.ref(fileStoragePath);

    // The main task
    this.fileUploadTask2 = this.afStorage.upload(fileStoragePath, file );

    // Get file progress percentage
    this.percentageVal2 = this.fileUploadTask2.percentageChanges();

   
    this.trackSnapshot2 = this.fileUploadTask2.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedImageURL2 = imageRef.getDownloadURL();       
        this.UploadedImageURL2.subscribe(resp2=>{
          toast2.present();
          this.imageUrl.imageData2 = resp2;
          this.fileUpload2 = false;
          this.fileUploadAux = false;
          this.fileUpload3 = true;
          this.fileUploadAux2 = true;
          this.animalForm.patchValue({
            Image2: resp2,
          })
         
     /*  this.animalForm.get('Image').setValue({
         Image: resp
       }) */ 
        
        },error=>{
          console.error(error);
        })
      }),
      tap(snap2 => {
          this.imgSize = snap2.totalBytes;
      })
    )
  }

  async uploadImage3(event: FileList) {

    // The File object
    const file = event.item(0)

    const toast = await this.toastController.create({
      message: 'Selecciona un archivo de imagen valido',
      color: 'dark',
      duration: 5000
    });

    const toast2 = await this.toastController.create({
      message: 'Tu imagen fue cargada con exito',
      color: 'success',
      duration: 4000
    });

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
      toast.present();
     console.error('unsupported file type :( ')
     return;
    }

    this.imgName = file.name;

    // The storage path
    const fileStoragePath = `Animalitos/${new Date().getTime()}`;

    //File reference
    const imageRef = this.afStorage.ref(fileStoragePath);

    // The main task
    this.fileUploadTask3 = this.afStorage.upload(fileStoragePath, file );

    // Get file progress percentage
    this.percentageVal3 = this.fileUploadTask3.percentageChanges();

   
    this.trackSnapshot3 = this.fileUploadTask3.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedImageURL3 = imageRef.getDownloadURL();       
        this.UploadedImageURL3.subscribe(resp3=>{
          toast2.present();
          this.imageUrl.imageData3 = resp3;
          this.fileUpload3 = false;
          this.fileUploadAux2 = false;
          this.animalForm.patchValue({
            Image3: resp3,
          })
         
     /*  this.animalForm.get('Image').setValue({
         Image: resp
       }) */ 
        
        },error=>{
          console.error(error);
        })
      }),
      tap(snap3 => {
          this.imgSize = snap3.totalBytes;
      })
    )
  }

  infoPage() {
    this.router.navigate(['extraviado-info/'], {
      queryParams: {
        value: JSON.stringify(this.imageUrl.imageData),
        value2: JSON.stringify(this.imageUrl.imageData2),
        value3: JSON.stringify(this.imageUrl.imageData3),
      },
    });
  }

}