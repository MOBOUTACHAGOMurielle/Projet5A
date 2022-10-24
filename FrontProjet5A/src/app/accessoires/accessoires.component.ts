import { Component, OnInit } from '@angular/core';
import { article } from '../article';

@Component({
  selector: 'app-accessoires',
  templateUrl: './accessoires.component.html',
  styleUrls: ['./accessoires.component.css']
})
export class AccessoiresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listeAccessoires: article[] = [
    {id:13, name:"jaune", image:"assets/jaune.jfif", description: "poche", prix: 27, taille: "M", note: 3, commentaire: "beau", quantite: 10 },
    {id:14, name:"douche", image:"assets/douche.jfif", description: "sans poche", prix: 28, taille: "L", note: 5, commentaire: "beau", quantite: 10 },
    {id:15, name:"fleurs", image:"assets/fleurs.jfif", description: "poche", prix: 30, taille: "S", note: 3, commentaire: "beau", quantite: 10 },
    {id:16, name:"montre fille", image:"assets/montreFille.jfif", description: "sans poche", prix: 25, taille: "XL", note: 4, commentaire: "beau", quantite: 10 },
    {id:17, name:"sac", image:"assets/sac.jfif", description: "sans poche", prix: 26, taille: "S", note: 8, commentaire: "beau", quantite: 10 },
    {id:18, name:"foulard", image:"assets/foulard.jfif", description: "poche", prix: 27, taille: "M", note: 10, commentaire: "beau", quantite: 10 }
  ];

}
