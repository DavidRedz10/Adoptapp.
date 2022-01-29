import { Component, OnInit } from '@angular/core';
import { AuthService } from "../servicios/auth.service";
import { Router } from "@angular/router";
import { FirstServiceService } from '../first-service.service';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';

interface userData{
  Password: string;
  Email: string;
  User: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  animalList = [];
  userData: userData;
  userForm: FormGroup;

  email:string;
  password:string;

  constructor(
    private authService: AuthService,
    private firebaseService: FirstServiceService,
    public router: Router,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      User: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  /*Registro de usuario por medio de un email y contraseña directamente a firebase*/
/*Se validan los datos*/
  signUp(email, password){
    this.authService.RegisterUser(this.email, this.password)      
    .then((res) => {
      this.firebaseService.create_user(this.userForm.value).then(resp =>{
        this.userForm.reset();
        alert('Se ha registrado exitosamente')
        this.router.navigate(['login']);
         })
    }).catch((error) => {
      alert('El correo o la contraseña ingresadas son invalidos, intente nuevamente')
    })
}

  
  

}
