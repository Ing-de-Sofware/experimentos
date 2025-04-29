import { Component } from '@angular/core';
import {UserTypeService} from "../../services/user-type.service";

@Component({
  selector: 'app-header-for-user-type-service',
  templateUrl: './header-for-user-type-service.component.html',
  styleUrl: './header-for-user-type-service.component.css'
})
export class HeaderForUserTypeServiceComponent {
  userType: 'endocrinologist' | 'patient' | null = null;

  constructor(private userTypeService: UserTypeService) {
    this.userTypeService.userType$.subscribe(type => this.userType = type);
  }
}
