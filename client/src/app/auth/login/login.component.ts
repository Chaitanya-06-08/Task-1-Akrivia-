import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  handleSubmit(event:Event,form:NgForm) {
    event.preventDefault();
    console.log(form);
    
    console.log(form.form.controls['email'].value);
    console.log(form.form.controls['password'].value);
    
    console.log('Form submitted');
  }
}
