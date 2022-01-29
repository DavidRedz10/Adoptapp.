import { Component, OnInit } from '@angular/core';
import { AuthService } from "../servicios/auth.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  name: string;

  constructor(private authservice : AuthService) { }

  ngOnInit() {

    this.authservice.getUserAuth().subscribe(user => console.log(user))
  }

}
