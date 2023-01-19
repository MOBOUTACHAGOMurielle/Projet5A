import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { article } from '../article';
import { panierService } from '../panier/panier.servcie';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnteteComponent implements OnInit {

  articles: article[] = [];
  public totalItem : number = 0;
  public errMsg: string | undefined;
  public searchTerm : string='';

  constructor(
    private panierService: panierService
  ) { }

  ngOnInit() {
    this.panierService.getProducts().subscribe(res=>{
     this.totalItem = res.length
    });
  }

search(event:any){
  this.searchTerm = (event.target as HTMLInputElement).value;
  this.panierService.search.next(this.searchTerm);
  console.log(this.searchTerm);
}

}
