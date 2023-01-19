import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationType } from '../enum/notification-type.enum';
import { EventTypes } from '../notification/models/event-types';
import { ToastService } from '../notification/services/toast.service';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  public invalidLogin: boolean = false;

  constructor(private router: Router, private http: HttpClient,private toastService: ToastService) { }

  ngOnInit(): void {
  }


  public login = (form: NgForm) => {
    const credentials = this.createloginFormData(form.value);

    this.http.post(environment.host + "/api/login",
      credentials
    ).subscribe({
      next: (response) => {
        // this.sendNotification(NotificationType.SUCCESS, "User login successful");
        this.showToast(EventTypes.Success,"Login status","User login successful");
        const token = (<any>response).access_token;
        const refreshToken = (<any>response).refresh_token;
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        this.invalidLogin = false;
        this.router.navigate(["/"]);
      },
      error: (err) => {
        // this.sendNotification(NotificationType.ERROR, err.error.message);
        this.showToast(EventTypes.Error,"Login status","Bad Credentials");
        console.error(err)
        this.invalidLogin = true;
      },
      complete: () => console.info('Login complete')
    });
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


  createloginFormData(user : any){
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    
    return formData;
  }


}
