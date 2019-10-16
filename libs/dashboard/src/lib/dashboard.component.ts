import { Component, OnInit } from '@angular/core';
import { AuthService } from "@demo/core";

@Component({
  selector: 'demo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService)
  {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
