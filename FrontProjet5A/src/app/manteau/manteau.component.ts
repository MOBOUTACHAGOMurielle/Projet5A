import { Component, OnInit } from '@angular/core';
import { article } from '../article';

@Component({
  selector: 'app-manteau',
  templateUrl: './manteau.component.html',
  styleUrls: ['./manteau.component.css']
})
export class ManteauComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listeManteau: article[] = [
    {id:7, name:"manteau à Bouton", image:"assets/manteauBouton.webp", description: "poche", prix: 27, taille: "M", note: 3, commentaire: "beau", quantite: 10 },
    {id:8, name:"manteau Col Mao", image:"assets/manteauColMao.webp", description: "sans poche", prix: 28, taille: "L", note: 5, commentaire: "beau", quantite: 10 },
    {id:9, name:"manteau Homme", image:"assets/manteauH.webp", description: "poche", prix: 30, taille: "S", note: 3, commentaire: "beau", quantite: 10 },
    {id:10, name:"manteau Revers", image:"assets/manteauRevers.webp", description: "sans poche", prix: 25, taille: "XL", note: 4, commentaire: "beau", quantite: 10 },
    {id:11, name:"manteau Universitaire", image:"assets/ManteauUniv.webp", description: "sans poche", prix: 26, taille: "S", note: 8, commentaire: "beau", quantite: 10 },
    {id:12, name:"veste Zippée", image:"assets/vesteZippe.webp", description: "poche", prix: 27, taille: "M", note: 10, commentaire: "beau", quantite: 10 }
  ];

}
