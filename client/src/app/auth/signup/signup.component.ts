import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../services/http.service';
import { verifyFormInputs } from '../utils/verifyFormInputs';
@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  http: HttpService = inject(HttpService);
  router: Router = inject(Router);
  toaster: ToastrService = inject(ToastrService);
  private signupUrl: string = 'http://localhost:3000/api/signup';
  handleSubmit(event: Event, signupForm: NgForm) {
    event.preventDefault();
    console.log(signupForm);
    const email = signupForm.form.controls['email'].value;
    const password = signupForm.form.controls['password'].value;
    const verification = verifyFormInputs(email, password);
    if (!verification.status) {
      this.toaster.error(verification.msg);
      return;
    }
    this.http
      .post(this.signupUrl, { email, password }, { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          if (response?.status == true) {
            this.toaster.success('Signup successful');
            this.router.navigateByUrl('/login');
          } else {
            console.log('Signup failed', response);
          }
        },
        error: (error) => {
          console.log('Signup failed', error);
          this.toaster.error(error?.error?.msg || 'Signup failed');
        },
      });
  }
  goToLogin() {
    this.router.navigateByUrl('/');
  }
}
