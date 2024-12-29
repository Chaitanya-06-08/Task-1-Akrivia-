import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  router: Router = inject(Router);
  http: HttpService = inject(HttpService);
  showProfileState: boolean = false;
  user: { email: string; password: string } | undefined = undefined;
  private logoutUrl: string = 'http://localhost:3000/api/logout';
  toaster: ToastrService = inject(ToastrService);

  ngOnInit() {
    const accessTokenUrl = 'http://localhost:3000/api/verifyAccessToken';
    this.http
      .get(accessTokenUrl, { withCredentials: true })
      .subscribe((response: any) => {
        console.log(response);
        if (response?.status == false) {
          this.router.navigateByUrl('/login');
        } else {
          this.user = response?.user
          this.toaster.success(`Logged in successfully as ${this.user?.email}`);
        }
      });
  }
  toggleProfile() {
    this.showProfileState = !this.showProfileState;
  }
  logout() {
    this.http
      .post(
        this.logoutUrl,
        { email: this.user?.email },
        { withCredentials: true }
      )
      .subscribe((response) => {
        console.log(response);
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
        this.toaster.success('Logged out successfully');
      });
  }
}
