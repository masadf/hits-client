import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout-nav',
  providers: [AuthService],
  templateUrl: './logout-nav.component.html',
  styleUrls: ['./logout-nav.component.scss']
})
export class LogoutNavComponent {


  private authService: AuthService;
  private router: Router;


  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  getText() {
    return window.location.pathname == "/login" ? "Регистрация" : "Войти";
  }

  getUrl() {
    return window.location.pathname == "/login" ? "/registration" : "/login";
  }

  logout() {
    this.authService.logout().then(() => {
        this.authService.setAuth(false, "");
        this.router.navigate(["/login"]);
      }
    );
  }

  isAuth() {
    return this.authService.isAuth();
  }
}
