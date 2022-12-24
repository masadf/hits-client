import {Injectable} from '@angular/core';
import {Point} from "../utils/utils";
import instance from "../http/http";

@Injectable({
  providedIn: 'root'
})
export class HitsService {
  async addHit(point: Point): Promise<Response> {
    return await instance.post("/hit", point);
  }

  async getHits(): Promise<Response> {
    return await instance.get("/hits");
  }

  async clearHits(): Promise<Response> {
    return await instance.post("/clearHits");
  }

}
