import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupService: SignupService = inject(SignupService);
  router: Router = inject(Router);
  handleSubmit(event: Event, signupForm: NgForm) {
    event.preventDefault();
    console.log(signupForm);
    const email = signupForm.form.controls['email'].value;
    const password = signupForm.form.controls['password'].value;
    this.signupService.signup(email, password).subscribe((response) => {
      if (response?.status == true) {
        console.log('Signup successful');
      } else {
        console.log('Signup failed', response);
      }
    });
  }
  goToLogin(){
    this.router.navigateByUrl('/');
  }
}
