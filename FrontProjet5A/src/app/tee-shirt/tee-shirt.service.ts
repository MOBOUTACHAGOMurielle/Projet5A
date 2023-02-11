import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { article } from '../article';

@Injectable({
    providedIn: 'root'
}
)
export class teeshirtService {

    private readonly TEE_SHIRT_API_URL = environment.host;

    constructor(private http: HttpClient){}

    public getTeeShirt(): Observable<article[]> {
      return this.http.get<article[]>(`${this.TEE_SHIRT_API_URL}/article/categories/Tee-shirt`).pipe(
        tap(unTeeShirt => console.log('manteau: ', unTeeShirt)),
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
