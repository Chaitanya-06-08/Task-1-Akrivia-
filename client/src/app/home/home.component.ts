import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../core/services/http.service';
import { LoadingComponent } from '../loading/loading.component';
import { logoutUrl } from '../../environments/environments';
import { verifyTokenUrl } from '../../environments/environments';
@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    LoadingComponent,
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  router: Router = inject(Router);
  http: HttpService = inject(HttpService);
  showProfileState: boolean = false;
  user: { email: string; password: string } | undefined = undefined;
  toaster: ToastrService = inject(ToastrService);
  loading: boolean = true;
  ngOnInit() {
    this.http.get(verifyTokenUrl, { withCredentials: true }).subscribe({
      next: (response: any) => {
        if (response?.status == false) {
          this.router.navigateByUrl('/login');
        } else {
          this.user = response?.user;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.loading = false;
          this.toaster.success(`Logged in successfully as ${this.user?.email}`);
        }
      },
      error: (error) => {
        console.log('Error verifying access token', error);
        this.router.navigateByUrl('/login');
      },
    });
  }
  toggleProfile() {
    this.showProfileState = !this.showProfileState;
  }
  logout() {
    this.http
      .post(logoutUrl, { email: this.user?.email }, { withCredentials: true })
      .subscribe((response) => {
        console.log(response);
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
        this.toaster.success('Logged out successfully');
      });
  }
}
