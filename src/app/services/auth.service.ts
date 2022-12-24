import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import instance from "../http/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setAuth(isAuth: boolean, token: string) {
    localStorage.setItem("isAuth", String(isAuth));
    if (isAuth) {
      localStorage.setItem("token", token);
    }
    else {
      localStorage.removeItem("token");
    }

  }

  isAuth() {
    return localStorage.getItem("isAuth") == "true";
  }

  registration(username: String, password: String): Promise<Response> {
    return instance.post("registration", {username: username, password: password}, {withCredentials: true});
  }

  login(username: String, password: String): Promise<Response> {
    return instance.post("login", {username: username, password: password}, {withCredentials: true});
  }

  logout(): Promise<Response> {
    return instance.post("/logout", {}, {withCredentials: true})
  }

}
