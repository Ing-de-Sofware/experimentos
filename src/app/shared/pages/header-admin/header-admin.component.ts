import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import {DarkModeService} from "../../services/dark-mode.service";
import { Router } from "@angular/router";
import { AuthenticationService} from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIcon,
  ]
})
export class HeaderAdminComponent implements OnInit {
  isDarkMode = false;

  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.toggle();
  }
  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
