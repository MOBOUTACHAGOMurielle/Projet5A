import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap, catchError, throwError, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { article } from "../article";
import { AuthenticationService } from "../auth/auth.service/auth.service";
import { User } from "../model/user";

@Injectable({
    providedIn: 'root'
})

export class panierService implements OnInit {
  removeCartItem // private handleError(error: HttpErrorResponse) {
    (item: any) {
      throw new Error('Method not implemented.');
  }
  //       console.error('An error occurred:', error.error);
  //     } else {
  //       console.error(
  //         `Backend returned code ${error.status}, body was: `, error.error);
  //     }
  //     return throwError(() => new Error('Something bad happened; please try again later.'));
  //   }
  /*
    getProducts(){
      return this.productList.asObservable();
      
    }
  
    
    setProduct(product : any){
      this.cartItemList.push(...product);
      this.productList.next(product);
    }*/
  removeAllCart() {
    throw new Error('Method not implemented.');
  }

    private readonly PANIER_API_URL = environment.host;

    public cartItemList: any = [];
    //public productList = new BehaviorSubject<any>([]);
    public search = new BehaviorSubject<string>("");

    public user! : User;

    constructor(private authService:AuthenticationService, private http: HttpClient, private route: Router) {
      this.user = this.authService.getUserFromLocalCache();
    }
  
    ngOnInit(): void {
      this.authService.refreshuser();
      this.user = this.authService.getUserFromLocalCache();
    }


    // public getPanier(): Observable<article[]> {

    //     return this.http.get<article[]>(this.JEAN_API_URL).pipe(
    //         tap(jeanHomme => console.log('jeans: ', jeanHomme)),
    //         catchError(this.handleError)
    //     );
    // }



    // private handleError(error: HttpErrorResponse) {
    //     if (error.status === 0) {
    //       console.error('An error occurred:', error.error);
    //     } else {
    //       console.error(
    //         `Backend returned code ${error.status}, body was: `, error.error);
    //     }
    //     return throwError(() => new Error('Something bad happened; please try again later.'));
    //   }
/*
  getProducts(){
    return this.productList.asObservable();
    
  }

  
  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }*/

  addtoCart(id_a:number, quantite:number, route:any){
    /*this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();*/

    //const articlestr = JSON.stringify(product,null,2);
    //   const articleJson = JSON.parse(articlestr);

    this.http.get(`${this.PANIER_API_URL}/panier/add/article/${id_a}/${quantite}/${this.user.panier.id_panier}`).subscribe({
      error: (err) => {
        console.error(err)
      },

      complete: () => {
        this.authService.refreshuser();
        this.route.navigateByUrl(route);
        console.info('save successful')
      }

    });
  }

  passerCommande(){
    this.http.get(`${this.PANIER_API_URL}/api/commande/${this.user.id}`).subscribe({
      error: (err) => {
        console.error(err)
      },

      complete: () => {
        this.authService.refreshuser();
        this.route.navigate(['/commande']);
        console.info('save successful')
      }

    });
  }

  removeToCart(id_lp:number){
    this.http.get(`${this.PANIER_API_URL}/panier/delete/article/${id_lp}/${this.user.panier.id_panier}`).subscribe({
      error: (err) => {
        console.error(err)
      },

      complete: () => {
        this.authService.refreshuser();
        console.info('save successful')
      }

    });
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.prix*a.quantite_stock;
    })
    return grandTotal;
  }
/*
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }*/
}
