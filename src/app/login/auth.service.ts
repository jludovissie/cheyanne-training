import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from './user.model';
import { tap , catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn:'root'
})

export class AuthService{
  currentUser = new BehaviorSubject<User>(null);
  userToken: string = null ;

  //user= new Subject<User>();

  constructor(private http: HttpClient , private router : Router){}

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=environment.firebaseAPIKey' ,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
       ).pipe(catchError(this.handleError),
       tap(resData => {
         this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
       }))
  }

  login(email:string, password: string){
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=environment.firebaseAPIKey',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
       ).pipe(
          catchError(this.handleError),
          tap(resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn
              );
          })
       );

    }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(
        email,
        userId,
        token,
        expirationDate
      );
      this.currentUser.next(user);
      localStorage.setItem("userData", JSON.stringify(user))
  }
  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error has occurred';
    if (!errorRes.error || errorRes.error.error){
      return throwError(errorMessage)
    }
    switch(errorRes.error.error.message){
      case 'Email_Exists':
        errorMessage ='this email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.'
        break;
      case 'INVALID_PASSWORD' :
        errorMessage = 'This password is invalid'
        break;

    }
      return throwError(errorMessage)
  };
  signOut(){
    this.currentUser.next(null);
    this.router.navigate(['home'])
  }

};
