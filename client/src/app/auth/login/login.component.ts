import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  ngOnInit(): void {
    console.log('LoginComponent initialized');
  }
  handleSubmit(event: Event, loginForm: NgForm) {
    event.preventDefault();
    console.log(loginForm);

    const email = loginForm.form.controls['email'].value;
    const password = loginForm.form.controls['password'].value;

    this.loginService.login(email, password).subscribe((response) => {
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
    });
  }
}
