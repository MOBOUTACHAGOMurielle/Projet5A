import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth.service/auth.service';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${environment.host}/api/login`) ) {
      console.log("ferfefegerg")
      return httpHandler.handle(httpRequest);
    }

    else if(httpRequest.url.includes(`${environment.host}/api/user/token/refresh`)) {
      httpRequest = httpRequest.clone({ headers: httpRequest.headers.set('Content-Type', 'application/json') });
      let refreshtoken: string | null = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (refreshtoken) {
        httpRequest = httpRequest.clone({ headers: httpRequest.headers.set('Authorization', 'Bearer ' + refreshtoken) });
      }
      return httpHandler.handle(httpRequest);
    }

    else {
      console.log("zadjzedbhzdb")
      httpRequest = httpRequest.clone({ headers: httpRequest.headers.set('Content-Type', 'application/json') });
      let token: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        console.log(token);
        httpRequest = httpRequest.clone({ headers: httpRequest.headers.set('Authorization', 'Bearer ' + token) });
      }
      return httpHandler.handle(httpRequest);

    }

  }

  // private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;

  //     if (this.authService.isLoggedIn()) {
  //       return this.authService.refreshToken().pipe(
  //         switchMap(() => {
  //           this.isRefreshing = false;

  //           return next.handle(request);
  //         }),
  //         catchError((error) => {
  //           this.isRefreshing = false;

  //           if (error.status == '403') {
  //             this.eventBusService.emit(new EventData('logout', null));
  //           }

  //           return throwError(() => error);
  //         })
  //       );
  //     }
  //   }

  //   return next.handle(request);
  // }

  // export const httpInterceptorProviders = [
  //   { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  // ];

}
