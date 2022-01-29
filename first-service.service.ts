import { Injectable } from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirstServiceService {

  collectionName = "Animalitos";
  collectionName2 = "Perros";
  collectionName3 = "Gatos";
  collectionName4 = "Hamsters";
  collectionName5 = "Categorias";
  collectionName6 = "Users";

  
  constructor(
    private firestore: AngularFirestore,
  ) { }

  create_animal(record){
  return this.firestore.collection(this.collectionName).add(record);
  }

  read_animals(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  read_animalsAdopt(){
    return this.firestore.collection(this.collectionName, ref => ref.where('Type', '==', 'En Adopcion')).snapshotChanges();
  }


  read_animalsLost(){
    return this.firestore.collection(this.collectionName, ref => ref.where('Type', '==', 'Extraviado')).snapshotChanges();
  }

  read_animal(animalId: string){
    return this.firestore.collection(this.collectionName).doc(animalId).get();
  }

  update_animal(recordID, record){
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_animal(record_id){
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  read_categories(){
    return this.firestore.collection(this.collectionName5).snapshotChanges();
  }

  read_dog(){
    return this.firestore.collection(this.collectionName2).snapshotChanges();
  }

  read_cat(){
    return this.firestore.collection(this.collectionName3).snapshotChanges();
  }

  read_hamster(){
    return this.firestore.collection(this.collectionName4).snapshotChanges();
  }

  create_user(record){
    return this.firestore.collection(this.collectionName6).add(record);
    }

}