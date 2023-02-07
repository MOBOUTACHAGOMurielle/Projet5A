import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { ToastService } from 'src/app/notification/services/toast.service';
import { FormGroup, NgForm } from '@angular/forms';
import { EventTypes } from 'src/app/notification/models/event-types';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER = 'user';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public host = environment.host;
  private token !: string | null;
  private loggedInUsername !: string |null;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router:Router,private toastService: ToastService) {}

  // public login(formData: FormData): Observable<HttpResponse<User>> {
  //   return this.http.post<User>(`${this.host}/user/login`, formData, { observe: 'response' });
  // }

  public login = (form: NgForm) => {
    const credentials = this.createloginFormData(form.value);

    let queryParams = new HttpParams();
    queryParams = queryParams.append("username",form.value.username);
    queryParams = queryParams.append("password",form.value.password);
    

    this.http.get<any>(environment.host + "/api/login",
    {params:queryParams}
    ).subscribe({
      next: (response) => {
        // this.sendNotification(NotificationType.SUCCESS, "User login successful");
        this.showToast(EventTypes.Success,"Login status","User login successful");
        const token = (<any>response).access_token;
        const refreshToken = (<any>response).refresh_token;
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        this.fetchuser(form,token);
        this.router.navigate(["/"]);
      },
      error: (err) => {
          this.showToast(EventTypes.Error,"Login status","Bad Credentials");
          console.error(err)
      },
      complete: () => console.info('Login complete')
    });
  }

  fetchuser(form: NgForm, token:any) {
    const Autheaders = new HttpHeaders()
   .set('Authorization', 'Bearer ' + token);
    this.http.get<any>(environment.host + "/api/user/" + form.value.username, { headers: Autheaders } ).subscribe(
      {
        next : (user) => {
          this.addUserToLocalCache(user);
          console.log(localStorage.getItem(USER))
        },
        error: (err) => {
          this.handleError(err);
        }
      }
      );
  }

  refreshuser() {
    const Autheaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY));
    var username : string = '';

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      username = this.jwtHelper.decodeToken(token).sub;

      this.http.get<any>(environment.host + "/api/user/" + username, { headers: Autheaders } ).subscribe(
        {
          next : (user) => {
            this.addUserToLocalCache(user);
            console.log(localStorage.getItem(USER))
          },
          error: (err) => {
            this.handleError(err);
          }
        }
        );
    }

  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }




  // public logout(formData: FormData): Observable<User> {
  //   return this.http.post<User>(`${this.host}/user/logout`, formData);
  // }

  // public register(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.host}/user/register`, user);
  // }



  public register = (form: FormGroup) => {

    const userstr = JSON.stringify(form.value, null, 2);
    const user = JSON.parse(userstr);

  
    console.log(user)

    this.http.post(environment.host + "/api/user/save",
    user
    ).subscribe({
      next: (response) => {
        this.toastService.showSuccessToast("Inscription status","User creation successful");
        this.router.navigate(["connexion"]);
      },
      error: (err) => {
        this.toastService.showErrorToast("Inscription status",err.error.message);
        console.error(err)
      },
      complete: () => console.info('register complete')
    });
  }



  public logOut(): void {
    
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users'); 
    
  }
  

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')??'');
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token??'';
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
        else return false
      }
      else return false;
    } else {
      this.logOut();
      return false;
    }
  }

  createLogoutFormData(username : string) {
    const formData = new FormData();
    formData.append('username', username);
    
    
    return formData;
  }

  createloginFormData(user : any){
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    
    return formData;
  }

  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!token || !refreshToken) {
      return false;
    }

    const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {

      const httpOptions = {
        headers: new HttpHeaders({ 
          'Authorization': `Bearer ${refreshToken}`
        })
      };

      const response = await lastValueFrom(this.http.get(environment.host + "g", httpOptions));
      const newToken = (<any>response).access_token;
      const newRefreshToken = (<any>response).refresh_token;
      localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
      this.toastService.showSuccessToast("Login Status", "Token renewed successfully");
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

  showToast(type: EventTypes,title : string ,message: string) {
    switch (type) {
      case EventTypes.Success:
        this.toastService.showSuccessToast(title, message);
        break;
      case EventTypes.Warning:
        this.toastService.showWarningToast(title, message);
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast(title, message);
        break;
      default:
        this.toastService.showInfoToast(title, message);
        break;
    }
  }

}