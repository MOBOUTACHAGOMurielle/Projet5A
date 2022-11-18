import { Component, OnInit } from '@angular/core';
import { article } from '../article';
import { panierService } from '../panier/panier.servcie';
import { manteauService } from './manteau.service';

@Component({
  selector: 'app-manteau',
  templateUrl: './manteau.component.html',
  styleUrls: ['./manteau.component.css']
})
export class ManteauComponent implements OnInit {

  public errMsg: string | undefined;
  searchKey:string= " ";

  constructor(private manteauService: manteauService,
    private panierService: panierService
    ) { }

  listeManteau: article[] = [];

  ngOnInit(): void {
    this.manteauService.getManteau().subscribe({
      next: listeManteau => {
        this.listeManteau = listeManteau;
      },

      error: err => this.errMsg = err
    });

    this.panierService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }  
}
