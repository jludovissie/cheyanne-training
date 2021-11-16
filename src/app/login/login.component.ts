import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
isLoginMode = true;
isLoading = false;
error: string = null;

  constructor(private authService:AuthService,
              private route: Router) { }

  ngOnInit(): void {}

onSubmit(form:NgForm){
  if (!form.valid){
    return;
  }
  const email = form.value.email;
  const password = form.value.password;
  let authObs: Observable<AuthResponseData>

    this.isLoading = true;
    {
      authObs = this.authService.login(email, password);
    }

      authObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading= false;
          this.route.navigate(['/workout'])
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      )
  form.reset()
}
}
