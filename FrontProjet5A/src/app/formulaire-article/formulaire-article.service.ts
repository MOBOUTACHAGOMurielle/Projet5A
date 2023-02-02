import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { article } from "../article";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class articleService {

    private readonly ARTICLE_API_URL = environment.host;

    public search = new BehaviorSubject<string>("");
    
    constructor(private http: HttpClient){}

    form: FormGroup = new FormGroup({
      id_article: new FormControl(null),
      name: new FormControl(''),
      prix: new FormControl(''),
      taille: new FormControl(''),
      quantite: new FormControl(''),
      image_url: new FormControl('')
    });
  
    initializeArticleFormGroup() {
      this.form.setValue({
        id_article: null,
        name: '',
        prix: '',
        taille: '',
        quantite: '',
        image_url: '',
      });
    }

    populateArticleForm(element:any) {
      this.form.setValue({
        id_article: element.id_article,
        name: element.name,
        prix: element.prix,
        taille: element.taille,
        quantite: element.quantite,
        image_url: element.image_url,
      })
    }

    public updateArticle = (element:any, id:number) =>{
      const articlestr = JSON.stringify(element,null,2);
      const articleJson = JSON.parse(articlestr);
    }

    public addNewArticle = (centre: any) => {

      const centrestr = JSON.stringify(centre,null,2);
      const centreJson = JSON.parse(centrestr);
  
    }
}