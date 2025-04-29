import { Component } from '@angular/core';
import {UserTypeService} from "./shared/services/user-type.service";
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend_version0_0';

  userType: 'endocrinologist' | 'patient' | null = null;

  constructor(private userTypeService: UserTypeService, public router: Router) {
    this.userTypeService.userType$.subscribe(type => this.userType = type);
  }

  showMedicalHistoryPage: boolean = false;
  navigateToMedicalHistory() {
    this.showMedicalHistoryPage = true;
  }

}
