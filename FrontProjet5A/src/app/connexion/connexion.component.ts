import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth/auth.service/auth.service';
import { NotificationType } from '../enum/notification-type.enum';
import { EventTypes } from '../notification/models/event-types';
import { ToastService } from '../notification/services/toast.service';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER = 'user';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  public invalidLogin: boolean = false;

  constructor(private router: Router, private http: HttpClient,private toastService: ToastService, public authService:AuthenticationService) { }

  ngOnInit(): void {
  }

}
