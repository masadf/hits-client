import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: FormGroup;
  message = ""
  private router: Router;
  private authService: AuthService;

  constructor(router: Router, authService: AuthService) {
    this.login = new FormGroup({
      "username": new FormControl("", [Validators.pattern('\\S{2,20}')]),
      "password": new FormControl("", [Validators.pattern('\\S{6,60}')])
    })
    this.router = router;
    this.authService = authService;
  }

  sendForLogin() {
    if (!this.login.valid) return;
    if (this.login.get("username")?.value == '' ||
      this.login.get("password")?.value == '') return;

    this.authService.login(this.login.get("username")?.value, this.login.get("password")?.value)
      .then((data: any) => {
        this.authService.setAuth(true, data.data.token);
        this.router.navigate(["/"]);
      })
      .catch((error) => this.message = error.response.data.message);
  }
}



