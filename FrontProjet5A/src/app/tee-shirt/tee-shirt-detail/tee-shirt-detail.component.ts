import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { article } from 'src/app/article';
import { panierService } from 'src/app/panier/panier.servcie';
import { teeshirtService } from '../tee-shirt.service';

@Component({
  selector: 'app-tee-shirt-detail',
  templateUrl: './tee-shirt-detail.component.html',
  styleUrls: ['./tee-shirt-detail.component.css']
})
export class TeeShirtDetailComponent implements OnInit {

  public teeShirt: article = <article>{};

  constructor(
    private route: ActivatedRoute,
    private listeTeeShirt: teeshirtService,
    private panierService: panierService
  ) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!; //+ pour convertir un string en un nombre snapshot recupère la valeur initiale
    
    this.listeTeeShirt.getTeeShirt().subscribe((liste: article[]) => {
      this.teeShirt = liste.find(shirt => shirt.id_article == id)!;
    })
  } 

  addToCart(item:any){
    this.panierService.addtoCart(item);
  }
}
