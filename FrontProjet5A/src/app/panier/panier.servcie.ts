import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap, catchError, throwError, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { article } from "../article";

@Injectable({
    providedIn: 'root'
})

export class panierService {

    // private readonly JEAN_API_URL = '/assets/api/jean.json';

    // constructor(private http: HttpClient){}

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

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.prix;
    })
    return grandTotal;
  }

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
  }
}