import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { article } from "../article";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { categorie } from "../categories";

@Injectable({
    providedIn: 'root'
})

export class categorieService {

    private readonly CATEGORIES_API_URL = environment.host;

    public search = new BehaviorSubject<string>("");
    
    constructor(private http: HttpClient){}

    public getCategories(): Observable<categorie[]> {
        return this.http.get<categorie[]>(`${this.CATEGORIES_API_URL}/article/categorie/liste`).pipe(
          tap(categorie => console.log('categories: ', categorie)),
          catchError(this.handleError)
      );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
}