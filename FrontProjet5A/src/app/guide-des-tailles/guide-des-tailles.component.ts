import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

export interface Tailles {
  Taille: string;
  FR: string;
  Carrure: number;
  Longueur: number;
  Manches: number;
  Poitrine: number;
  Poignet: number;
}


const ELEMENT_DATA: Tailles[] = [
  {Taille: 'XS', FR: '34', Carrure: 37.5, Longueur: 85,Manches: 58.5,Poitrine: 80,Poignet: 18},
  {Taille: 'S', FR: '36', Carrure: 38.5, Longueur: 87,Manches: 59.5,Poitrine: 84,Poignet: 19},
  {Taille: 'M', FR: '38', Carrure: 39.5, Longueur: 89,Manches: 60.5,Poitrine: 88,Poignet: 20},
  {Taille: 'L', FR: '40-42', Carrure: 41, Longueur: 91,Manches: 61.5,Poitrine: 94,Poignet: 21}
];

@Component({
  selector: 'app-guide-des-tailles',
  templateUrl: './guide-des-tailles.component.html',
  styleUrls: ['./guide-des-tailles.component.css']
})
export class GuideDesTaillesComponent implements OnInit {

  constructor(public dialogRef: DialogRef<GuideDesTaillesComponent>) {}

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['Taille', 'FR', 'Carrure', 'Longueur', 'Manches', 'Poitrine', 'Poignet'];
  dataSource = ELEMENT_DATA;
  
  onClose() {
    this.dialogRef.close();
  }

}
