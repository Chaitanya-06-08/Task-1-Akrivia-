import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path:'signup',
    component: SignupComponent,
    title: 'Signup',
  },
  {
    path:'home',
    component: HomeComponent,
    title: 'Home',
  }
];
