import { Component, OnInit, ViewChild } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-gestion.commande',
  templateUrl: './gestion.commande.component.html',
  styleUrls: ['./gestion.commande.component.css']
})
export class GestionCommandeComponent implements OnInit {


    // MatPaginator Inputs
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];
  
    // MatPaginator Output
    pageEvent?: PageEvent;




  public commandeFilter = '00000000';
  constructor() { }

  ngOnInit(): void {
  }

}
