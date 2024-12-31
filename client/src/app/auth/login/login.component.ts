import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { verifyFormInputs } from '../utils/verifyFormInputs';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  http: HttpService = inject(HttpService);
  router: Router = inject(Router);
  toaster: ToastrService = inject(ToastrService);
  ngOnInit(): void {
    console.log('LoginComponent initialized');
  }
  private loginUrl: string = 'http://localhost:3000/api/v1/login';
  handleSubmit(event: Event, loginForm: NgForm) {
    event.preventDefault();
    console.log(loginForm);

    const email = loginForm.form.controls['email'].value;
    const password = loginForm.form.controls['password'].value;
    const verification = verifyFormInputs(email, password);
    if (!verification.status) {
      this.toaster.error(verification.msg);
      return;
    }
    this.http
      .post(this.loginUrl, { email, password }, { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          if (response?.status == true) {
            console.log(response);
            // document.cookie = `accessToken = ${response?.user?.accessToken}`;
            localStorage.setItem('user', JSON.stringify(response?.user));
            this.router.navigateByUrl('/home', {
              // replaceUrl: true,
            });
          } else {
            console.log('Login failed', response);
          }
        },
        error: (err) => {
          this.toaster.error(err?.error?.msg || 'Login failed');
          console.log('Login failed', err);
        },
      });
  }
}