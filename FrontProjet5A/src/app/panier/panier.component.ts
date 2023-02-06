import { Component, OnInit } from '@angular/core';
import { article } from '../article';
import { panierService } from './panier.servcie';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  // public errMsg: string | undefined;

  // constructor(private panierService: panierService) { }

  // listePanier: article[] = [];

  // ngOnInit() {
  //   // this.jeanService.getJean().subscribe({
  //   //   next: listeJeans => {
  //   //     this.listeJeans = listeJeans;
  //   //   },

  //   //   error: err => this.errMsg = err
  //   // });

  //   this.panierService.getPanier().subscribe(
  //     (listePanier : article []) => {
  //       this.listePanier = listePanier;
  //     },
  //     // error: err => this.errMsg = err
  //   );
  //   console.log(this.listePanier);
  // }

  public products : any = [];
  public grandTotal !: number;
  constructor(private panierService : panierService) { }

  ngOnInit(): void {
    this.panierService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.panierService.getTotalPrice();
    })
  }

  removeItem(item: any){
    this.panierService.removeCartItem(item);
  }
  
  emptycart(){
    this.panierService.removeAllCart();
  }

  inc(element:any) {
    if(element.quantite != 11){
      element.quantite += 1;
    }
  }

  dec(element:any) {
    if(element.quantite != 1){
      element.quantite -= 1;
    }
  }

}
