import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth: AuthService,
              public router: Router){}


canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot){
  return this.auth.currentUser.pipe(take(1),
  map((user) =>{
    const isAuthenticated = !!user;
    if (isAuthenticated) {return true}
    else {return this.router.createUrlTree(['login'])
  }}))
}

}
