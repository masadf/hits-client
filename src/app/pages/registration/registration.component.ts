import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registration: FormGroup;
  message = "";
  private router: Router;
  authService: AuthService;


  constructor(router: Router, authService: AuthService) {
    this.registration = new FormGroup({
      "username": new FormControl("", [Validators.pattern('\\S{2,20}')]),
      "password": new FormControl("", [Validators.pattern('\\S{6,60}')])
    })
    this.router = router;
    this.authService = authService;
  }

  sendForRegistration() {
    if (!this.registration.valid) return;
    if (this.registration.get("username")?.value == '' ||
      this.registration.get("password")?.value == '') return;
    this.authService.registration(this.registration.get("username")?.value, this.registration.get("password")?.value)
      .then((data: any) => {
        this.authService.setAuth(true, data.data.token);
        this.router.navigate(["/"]);
      })
      .catch((error) => this.message = error.response.data.message);
  }
}
