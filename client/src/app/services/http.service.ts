import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);
  constructor() {}

  get(url:string, options?: any) {
    return this.http.get(url, options);
  }
  post(url:string, body: any, options?: any) {
    return this.http.post(url, body, options);
  }
}
