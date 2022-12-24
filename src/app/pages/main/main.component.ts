import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HitsService} from "../../services/hits.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  disabled = false;
  xValList = [
    {name: "xVal", value: -5},
    {name: "xVal", value: -4},
    {name: "xVal", value: -3},
    {name: "xVal", value: -2},
    {name: "xVal", value: -1},
    {name: "xVal", value: 0},
    {name: "xVal", value: 1},
    {name: "xVal", value: 2},
    {name: "xVal", value: 3}
  ]
  rValList = [
    {name: "rVal", value: -5},
    {name: "rVal", value: -4},
    {name: "rVal", value: -3},
    {name: "rVal", value: -2},
    {name: "rVal", value: -1},
    {name: "rVal", value: 0},
    {name: "rVal", value: 1},
    {name: "rVal", value: 2},
    {name: "rVal", value: 3}
  ]
  chosenXValComponent?: any;
  chosenRValComponent?: any;
  points: FormGroup;
  http: HttpClient;
  message = "";
  authService: AuthService;
  hitsService: HitsService;
  router: Router;
  hits: any;

  constructor(http: HttpClient, authService: AuthService, router: Router, hitsService: HitsService) {
    this.points = new FormGroup({
      "rVal": new FormControl(1),
      "yVal": new FormControl(0)
    });
    this.http = http;
    this.authService = authService;
    this.router = router;
    this.hitsService = hitsService;
    this.getData();
  }

  selectXCheckbox(e: any) {
    if (this.chosenXValComponent) {
      this.chosenXValComponent.checked = false;
    }

    this.chosenXValComponent = e.target;
    this.points.removeControl("xVal");
    this.points.addControl("xVal", new FormControl(e.target.value));
  }

  selectRCheckbox(e: any) {
    if (this.chosenRValComponent) {
      this.chosenRValComponent.checked = false;
    }

    this.chosenRValComponent = e.target;
    this.points.removeControl("rVal");
    this.points.addControl("rVal", new FormControl(e.target.value));
  }

  getPointersBlockWidth() {
    return document.getElementById("pointers-block")!.offsetWidth / 2;
  }

  async sendData() {
    if (this.disabled) return;
    this.disabled = true;

    this.hitsService.addHit(this.points.value)
      .then((res) => {
        this.message = "";
        this.points.removeControl("yVal");
        this.points.addControl("yVal", new FormControl(0));
        this.getData();
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          this.authService.setAuth(false, "");
          this.router.navigate(["/login"]);
        }
        this.message = error.response.data.message;
      })
    this.disabled = false;
  }

  getData() {
    this.hitsService.getHits()
      .then((data: any) => {
        this.hits = data.data;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.authService.setAuth(false, "");
          this.router.navigate(["/login"]);
        }
        this.message = error.response.data.message;
      });

  }

  async clearHits() {
    if (this.disabled) return;
    this.disabled = true;
    await this.hitsService.clearHits()
      .then(() => {
        this.hits = [];
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.authService.setAuth(false, "");
          this.router.navigate(["/login"]);
        }
        this.message = error.response.data.message;
      });
    this.disabled = false;
  }

  setFieldsAfterClick(event: any) {
    if (this.disabled) return;
    let xVal = this.points.value.rVal * (event.offsetX - this.getPointersBlockWidth()) * 1.25 / this.getPointersBlockWidth();
    let yVal = this.points.value.rVal * (this.getPointersBlockWidth() - event.offsetY) * 1.25 / this.getPointersBlockWidth();
    this.points.removeControl("xVal");
    this.points.removeControl("yVal");
    this.points.addControl("xVal", new FormControl(xVal));
    this.points.addControl("yVal", new FormControl(yVal));
    this.sendData();
  }

  roundValue(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
