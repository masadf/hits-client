import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  authService: AuthService;
  router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth = this.authService.isAuth();
    if (!isAuth) {
      this.router.navigate(["/login"]);
    }
    return isAuth;
  }

}
