import { Component, OnInit } from '@angular/core';
import { article } from '../article';

@Component({
  selector: 'app-tee-shirt',
  templateUrl: './tee-shirt.component.html',
  styleUrls: ['./tee-shirt.component.css']
})
export class TeeShirtComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listeTeeShirt: article[] = [
    {id:19, name:"polo à motif", image:"assets/poloAmotif.webp", description: "poche", prix: 27, taille: "M", note: 3, commentaire: "beau", quantite: 10 },
    {id:20, name:"polo avec col", image:"assets/poloAvecCol.webp", description: "sans poche", prix: 28, taille: "L", note: 5, commentaire: "beau", quantite: 10 },
    {id:21, name:"polo coloré", image:"assets/poloColoré.webp", description: "poche", prix: 30, taille: "S", note: 3, commentaire: "beau", quantite: 10 },
    {id:22, name:"polo Imprimé", image:"assets/poloImprimé.webp", description: "sans poche", prix: 25, taille: "XL", note: 4, commentaire: "beau", quantite: 10 },
    {id:23, name:"polo Rayé", image:"assets/poloRayé.webp", description: "sans poche", prix: 26, taille: "S", note: 8, commentaire: "beau", quantite: 10 },
    {id:24, name:"polo avec Rayure", image:"assets/poloRayure.webp", description: "poche", prix: 27, taille: "M", note: 10, commentaire: "beau", quantite: 10 }
  ];


}
