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
  collectionName5 = "Users";

  
  constructor(
    private firestore: AngularFirestore,
  ) { }

  create_animal(record){
  return this.firestore.collection(this.collectionName).add(record);
  }

  read_animals(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
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
    return this.firestore.collection(this.collectionName5).add(record);
    }

    createAnimal(image: ImageData
      ): Promise<void> {
        const id = this.firestore.createId();
      
        return this.firestore.doc(`songList/${id}`).set({
          id,
          image
        });
      }
}