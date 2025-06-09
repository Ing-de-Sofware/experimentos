import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
  imports: [
    MatIcon,
    CommonModule,

  ],
  standalone: true
})
export class HomeAdminComponent implements OnInit {
  username: string = '';
  userId: number = 0;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUsername.subscribe(name => {
      this.username = name;
    });

    this.authService.currentUserId.subscribe(id => {
      this.userId = id;
    });

    // Validación opcional: redirige si no está logueado
    this.authService.isSignedIn.subscribe(isLogged => {
      if (!isLogged) {
        this.router.navigate(['/login']);
      }
    });
  }


  goTo(route: string): void {
    this.router.navigate([`/admin/${route}`]);
  }
}
