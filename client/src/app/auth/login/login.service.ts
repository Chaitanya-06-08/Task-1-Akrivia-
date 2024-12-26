import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/api/login';
  private http: HttpClient = inject(HttpClient);
  login(email: string, password: string) {
    return this.http.post<{status: boolean,msg:string,user:any}>(this.loginUrl, {
      email,
      password,
    });
  }
}
