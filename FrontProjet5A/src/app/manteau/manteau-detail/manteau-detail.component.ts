import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { article } from 'src/app/article';
import { manteauService } from '../manteau.service';
import { panierService } from 'src/app/panier/panier.servcie';

@Component({
  selector: 'app-manteau-detail',
  templateUrl: './manteau-detail.component.html',
  styleUrls: ['./manteau-detail.component.css']
})
export class ManteauDetailComponent implements OnInit {

  public manteau: article = <article>{};

  constructor(
    private route: ActivatedRoute,
    private listeManteau: manteauService,
    private panierService: panierService
  ) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;

    this.listeManteau.getManteau().subscribe((liste: article[]) => {
      this.manteau = liste.find(manteau => manteau.id_article == id)!;
      console.log('hotel', this.manteau);
    })
  }

  addToCart(item:any){
    this.panierService.addtoCart(item);
  }
  
}
