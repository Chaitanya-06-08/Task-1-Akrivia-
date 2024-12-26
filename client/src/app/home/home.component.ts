import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  showProfileState: boolean = false;
  user: { email: string; password: string } | undefined = undefined;
  private logoutUrl: string = 'http://localhost:3000/api/logout';
  ngOnInit() {
    let loggedUser: string | null = localStorage.getItem('user');
    if (loggedUser) {
      this.user = JSON.parse(loggedUser);
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  toggleProfile() {
    this.showProfileState = !this.showProfileState;
  }
  logout() {
    console.log(this.user);
    
    this.http
      .post(this.logoutUrl, { email: this.user?.email }, { withCredentials: true })
      .subscribe((response) => {
        console.log(response);
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      });
  }
}
