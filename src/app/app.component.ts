import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserTypeService } from './shared/services/user-type.service';
import { UserType } from './shared/model/user-type.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend_version0_0';
  isAuthRoute: boolean = false;
  userType: UserType | null = null;

  constructor(
    private userTypeService: UserTypeService,
    private router: Router
  ) {
    this.userTypeService.userType$.subscribe(type => this.userType = type);

    // Escucha los cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentPath = event.urlAfterRedirects.split('?')[0].replace(/\/$/, '');
        this.isAuthRoute = [
          '/login',
          '/register',
          '/forgot-password',
          '/selectRole'
        ].includes(currentPath);
      });
  }

  showMedicalHistoryPage: boolean = false;

  navigateToMedicalHistory() {
    this.showMedicalHistoryPage = true;
  }
}
