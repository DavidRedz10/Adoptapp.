import { Component, OnInit } from '@angular/core';
import { AuthService } from "../servicios/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;

  constructor(private authService: AuthService,
    public router: Router
    ) { }

  ngOnInit() {
  }

/* Inicio de sesión con consulta a la base de datos */
  OnSubmitLogin(){
  this.authService.login(this.email,this.password)
   .then((res) => {
    this.router.navigate(['tabs/tab1']);
  }).catch(err => alert('los datos son incorrectos o no existe el usuario'))
 }


 loginFacebook(){



 }

}
