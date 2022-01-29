import { Injectable } from '@angular/core';

import { AngularFireAuth} from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth :  AngularFireAuth) { }

  
/* Metodo de inicio de sesión haciendo uso de base de datos*/
  login (email:string, password: string){

    return new Promise ((resolve,rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user)
      }). catch (err => rejected(err))
    });
    
  }

/* Metodo de registro  haciendo uso de base de datos*/
  RegisterUser(email, password) {
    return this.AFauth.createUserWithEmailAndPassword(email, password)
  }

/*Obtención de detalles del usuario logeado*/
  getUserAuth(){
    return this.AFauth.authState
  }
}
