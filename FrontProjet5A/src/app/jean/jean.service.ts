import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { article } from "../article";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class jeanService {

    private readonly JEAN_API_URL = environment.host;

    constructor(private http: HttpClient){}

    public getJean(): Observable<article[]> {
      return this.http.get<article[]>(`${this.JEAN_API_URL}/article/categories/Jean`).pipe(
        tap(unJean => console.log('jean: ', unJean)),
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
