import fetch from "node-fetch";
import { APIRequest } from "../apis/Request";

export class FetchTestAPI implements APIRequest {
    get(url: string): Promise<any> {
      return fetch(url);
    }
  }