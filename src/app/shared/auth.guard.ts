import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { map, take } from "rxjs/operators";
import { AuthService } from "../login/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGaurd implements CanActivate{

  constructor(private authService: AuthService, private router: Router  ){}

