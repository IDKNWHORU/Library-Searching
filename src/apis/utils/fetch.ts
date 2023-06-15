import { APIRequest } from "../Request";

export class FetchAPI implements APIRequest {
  get(url: string): Promise<Response> {
    return fetch(url);
  }
}
