import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {MainComponent} from "./pages/main/main.component";
import {LoginGuardGuard} from "./pages/login-guard.guard";
import {MainGuard} from "./pages/main.guard";

const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [LoginGuardGuard]},
  {path: "registration", component: RegistrationComponent, canActivate: [LoginGuardGuard]},
  {path: "", component: MainComponent, canActivate: [MainGuard], },
  {path: "**", redirectTo: "/", pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
