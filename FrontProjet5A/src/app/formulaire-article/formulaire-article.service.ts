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
      quantite_stock: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
      note: new FormControl(''),
      categories:  new FormControl('')
    });

    initializeArticleFormGroup() {
      this.form.setValue({
        id_article: null,
        name: '',
        prix: '',
        taille: '',
        quantite_stock: '',
        image: '',
        description: '',
        note: '',
        categories: ''
      });
    }

    createArticleFormData(
      article : any,
      profileImage: File) {
        const formData = new FormData();
        //formData.append('currentusername', loggedInUsername);   
        formData.append('name', article.name);
        formData.append('description', article.description);
        formData.append('note', article.note.toString());
        formData.append('prix', article.prix.toString());
        formData.append('profileImage', profileImage);
        formData.append('taille', article.taille);
        formData.append('quantite_stock', article.quantite_stock.toString());
        formData.append('categorie', article.categories);
        return formData;  }

    populateArticleForm(element:any) {
      this.form.setValue({
        id_article: element.id_article,
        name: element.name,
        prix: element.prix,
        taille: element.taille,
        quantite_stock: element.quantite_stock,
        image: element.image,
        note: element.note,
        description: element.description,
        categories: element.categories.nom
      })
    }

    public updateArticle = (element:any, id:number) =>{
      const articlestr = JSON.stringify(element,null,2);
      const articleJson = JSON.parse(articlestr);

      this.http.post(`${this.ARTICLE_API_URL}/article/modify/${id}`, articleJson).subscribe({
        error: (err) => {
          console.error(err)
        },

        complete: () => console.info('modified successful')

      });
    }

    public addNewArticle = (article: any,f: File) => {

      const formData = this.createArticleFormData(article, f);
      //const articlestr = JSON.stringify(article,null,2);
      //const articleJson = JSON.parse(articlestr);

      console.log(article)
      this.http.post(`${this.ARTICLE_API_URL}/article/ajouter`, formData).subscribe({
        error: (err) => {
          console.error(err)
        },

        complete: () => console.info('save successful')

      });
    }

}
