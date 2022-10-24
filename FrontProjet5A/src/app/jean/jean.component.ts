import { Component, OnInit } from '@angular/core';
import { article } from '../article';

@Component({
  selector: 'app-jean',
  templateUrl: './jean.component.html',
  styleUrls: ['./jean.component.css']
})
export class JeanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listeJeans: article[] = [
    {id:1, name:"Jean délavé", image:"assets/jeanDelave.webp", description: "poche", prix: 27, taille: "M", note: 3, commentaire: "beau", quantite: 10 },
    {id:2, name:"Jean ample", image:"assets/jeanAmple.webp", description: "sans poche", prix: 28, taille: "L", note: 3, commentaire: "beau", quantite: 10 },
    {id:3, name:"Jean Homme", image:"assets/jeanHommeSkinny.webp", description: "poche", prix: 30, taille: "S", note: 3, commentaire: "beau", quantite: 10 },
    {id:4, name:"Jean moulant", image:"assets/jeanAbloc.webp", description: "sans poche", prix: 25, taille: "XL", note: 3, commentaire: "beau", quantite: 10 },
    {id:5, name:"Jean Bersha", image:"assets/jeanBersha.webp", description: "sans poche", prix: 26, taille: "S", note: 3, commentaire: "beau", quantite: 10 },
    {id:6, name:"Jean zippé", image:"assets/jeanZippe.webp", description: "poche", prix: 27, taille: "M", note: 3, commentaire: "beau", quantite: 10 }
  ];

}
