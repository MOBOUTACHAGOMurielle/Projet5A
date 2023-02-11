import { Component, OnInit } from '@angular/core';
import { categorie } from '../categories';
import { panierService } from '../panier/panier.servcie';
import { categorieService } from '../nav/nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public errMsg: string | undefined;
  searchKey:string= " ";

  constructor(private categorieService: categorieService,
    private panierService: panierService
    ) { }

  listeCategorie: categorie[] = [];

  ngOnInit() {
    this.categorieService.getCategories().subscribe(
      (liste : categorie []) => {
        this.listeCategorie = liste;
      },
    );

    this.panierService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
}
