import { Component, OnInit } from '@angular/core';
import { article } from '../article';
import { panierService } from '../panier/panier.servcie';
import { teeshirtService } from './tee-shirt.service';

@Component({
  selector: 'app-tee-shirt',
  templateUrl: './tee-shirt.component.html',
  styleUrls: ['./tee-shirt.component.css']
})
export class TeeShirtComponent implements OnInit {

  public errMsg: string | undefined;
  searchKey:string= " ";

  constructor(private teeShirtService: teeshirtService,
    private panierService: panierService) { }

  listeTeeShirt: article[] = [];

  ngOnInit(): void {
    this.teeShirtService.getTeeShirt().subscribe({
      next: listeTeeShirt => {
        this.listeTeeShirt = listeTeeShirt;
      },

      error: err => this.errMsg = err
    });

    this.panierService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
}
