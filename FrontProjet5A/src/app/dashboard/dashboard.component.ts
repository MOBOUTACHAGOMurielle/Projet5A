import { Component, OnInit } from '@angular/core';
import { categorie } from '../categories';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  listeCategories: categorie[] = [
    {id:1, name:"Jean", image:"assets/jeans.jpg", description: "Achetez vos jeans 100% coton"},
    {id:2, name:"Manteau", image:"assets/manteau.jpg", description: "Soyey prêts pour l'hiver avec nos manteaux vapeurs"},
    {id:3, name:"Tee-Shirt", image:"assets/teeshirt.webp", description: "Découvrez nos tee-shirt ecologique pour sauver la planète"},
    {id:4, name:"Accessoires", image:"assets/montre.jfif", description: "Venez découvir nos accessoires"}
  ];
}
