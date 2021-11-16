import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../login/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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
  console.log(email);
  console.log(password);

    this.isLoading = true;

      authObs = this.authService.signup(email, password);

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
