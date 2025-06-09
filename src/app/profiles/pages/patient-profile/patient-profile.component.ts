import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css'
})
export class PatientProfileComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
