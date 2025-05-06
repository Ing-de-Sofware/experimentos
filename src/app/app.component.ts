import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from './shared/services/user-type.service';
import { UserType } from './shared/model/user-type.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend_version0_0';

  get isAuthRoute(): boolean {
    return [
      '/login',
      '/register',
      '/forgot-password',
      '/selectRole'
    ].includes(this.router.url);
  }

  userType: UserType | null = null;

  constructor(
    private userTypeService: UserTypeService,
    public router: Router
  ) {
    this.userTypeService.userType$.subscribe(type => this.userType = type);
  }

  showMedicalHistoryPage: boolean = false;

  navigateToMedicalHistory() {
    this.showMedicalHistoryPage = true;
  }
}
