import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private http: HttpClient = inject(HttpClient);
  private signupUrl: string = 'http://localhost:3000/api/signup';
  signup(email: string, password: string) {
    return this.http.post<{ status: boolean; msg: string }>(this.signupUrl, {
      email,
      password,
    });
  }
}
