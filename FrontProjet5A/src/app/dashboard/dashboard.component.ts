import { Component, OnInit } from '@angular/core';
import { categorie } from '../categories';
import { panierService } from '../panier/panier.servcie';
import { dashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public errMsg: string | undefined;
  searchKey:string= " ";

  constructor(private dashboardService: dashboardService,
    private panierService: panierService
    ) { }

  listeCategorie: categorie[] = [];

  ngOnInit(): void {
    this.dashboardService.getCategories().subscribe({
      next: listeCategorie => {
        this.listeCategorie = listeCategorie;
      },
      error: err => this.errMsg = err
    });

    this.panierService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }  
}
