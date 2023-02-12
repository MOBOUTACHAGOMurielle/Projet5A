import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { allArticlesService } from '../all-articles/all-articles.service';
import { article } from '../article';
import { NotificationType } from '../enum/notification-type.enum';
import { panierService } from '../panier/panier.servcie';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnteteComponent implements OnInit {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  public username: null | string = null;
  public articleFilter = 'article';
  articles: article[] = [];
  public totalItem : number = 0;
  public errMsg: string | undefined;
  public searchTerm : string='';
  filteredArticles!: article[];

  constructor(
    private listeArticles: allArticlesService,private router: Router, /*private notification: NotificationService*/
    private panierService: panierService
  ) { }

  ngOnInit() {
    this.totalItem = this.panierService.user.panier.lignePanier.length
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.panierService.search.next(this.searchTerm);
    console.log(this.searchTerm);
  }

  isUserAuthenticated() {
    const token: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.username = this.jwtHelper.decodeToken(token).sub;
      return true;
    }
    else {
      return false;
    }
  }

  public logOut = () => {
    // this.notification.notify(NotificationType.SUCCESS, "User logout successful")
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    this.router.navigate(["connexion"]);
  }




  public get articlesFiltered(): string {

    return this.articleFilter;
  }

  public set articlesFiltered(filter:string) {
    
    this.articleFilter = filter;

    this.filteredArticles = this.articlesFiltered ? this.filtered(this.articlesFiltered) : this.articles; // si notre articleFiltered reçoit 
    //une nouvelle valeur alors on filtre les hotels avec pour criter la valeur de l'hoter sauvegardée avec le get  sinon retourne la liste des articles
  }

  private filtered(criteria: string): article[] {
    
    criteria = criteria.toLocaleLowerCase();

    const res = this.articles.filter(
      (article: article) => article.name.toLocaleLowerCase().indexOf(criteria)!=-1
    );

    return res;
  }

}
