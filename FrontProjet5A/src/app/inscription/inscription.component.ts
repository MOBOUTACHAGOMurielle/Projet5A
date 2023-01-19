import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastService } from '../notification/services/toast.service';
import { CustomValidators } from './customvalidator';
import { UserForm } from './userform';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  submitted = false;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });


  constructor(private router: Router, private http: HttpClient,private toastService: ToastService,private formBuilder: FormBuilder){

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [CustomValidators.match('password', 'confirmPassword')]
      }
    );



  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public register = () => {

    this.submitted = true;

    if (this.form.invalid) {
      this.toastService.showErrorToast("Registration Status"," Registration Form invalid ")
      return;
    }


    const userstr = JSON.stringify(this.form.value, null, 2);
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
      complete: () => console.info('Login complete')
    });
  }

 
}
