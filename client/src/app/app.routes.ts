import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
export const routes: Routes = [
  {
    path:'login',
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
    children: [
      {
        path: 'table',
        component: TableComponent,
      },
      {
        path:'fileUpload',
        component: FileUploadComponent,
      }
    ]
  },
  {
    path:'',
    redirectTo: '/home/table',
    pathMatch: 'full',
  },
  {
    path:'**',
    redirectTo: 'login',
  }
];
