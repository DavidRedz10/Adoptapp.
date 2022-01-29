import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animales } from '../animales' ;

@Component({
  selector: 'app-perfil-animal',
  templateUrl: './perfil-animal.page.html',
  styleUrls: ['./perfil-animal.page.scss'],
})
export class PerfilAnimalPage implements OnInit {

  animales = {} as Animales;

  constructor(public activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe((data:any) => {
      console.log(data);
  
      this.animales.Category = data.Category
      this.animales.Image = data.Image
      this.animales.Image2 = data.Image2
      this.animales.Image3 = data.Image3
      this.animales.Name = data.Name
      this.animales.Age = data.Age
      this.animales.Info = data.Info
      this.animales.Type = data.Type
      this.animales.typeAge = data.typeAge
      this.animales.Breed = data.Breed
      
      
   })
  }

  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // autoplay:true,
  }

  ngOnInit() {
  }

}
