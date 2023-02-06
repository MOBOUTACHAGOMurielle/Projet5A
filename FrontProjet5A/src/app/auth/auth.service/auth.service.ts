import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { ToastService } from 'src/app/notification/services/toast.service';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public host = environment.host;
  private token !: string | null;
  private loggedInUsername !: string |null;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router:Router,private toastService: ToastService) {}

  public login(formData: FormData): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, formData, { observe: 'response' });
  }

  public logout(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/logout`, formData);
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, user);
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
    localStorage.setItem('user', JSON.stringify(user));
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
}