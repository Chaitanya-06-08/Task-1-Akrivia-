import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router, Route } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginService: LoginService = inject(LoginService);
  router:Router = inject(Router);
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
        this.router.navigateByUrl('/home');
      }
      else{
        console.log('Login failed', response);
      }
    });
  }
}
