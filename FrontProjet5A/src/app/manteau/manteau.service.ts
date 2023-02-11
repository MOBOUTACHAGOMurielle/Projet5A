import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { catchError, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { article } from "../article"
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class manteauService {

    private readonly MANTEAU_API_URL = environment.host;

    constructor(private http: HttpClient){}

    public getManteau(): Observable<article[]> {
      return this.http.get<article[]>(`${this.MANTEAU_API_URL}/article/categories/Manteau`).pipe(
        tap(unManteau => console.log('manteau: ', unManteau)),
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
