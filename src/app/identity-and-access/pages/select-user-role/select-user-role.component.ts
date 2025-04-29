import { Component } from '@angular/core';
import {UserTypeService} from "../../../shared/services/user-type.service";

@Component({
  selector: 'app-select-user-role',
  templateUrl: './select-user-role.component.html',
  styleUrls: ['./select-user-role.component.css']
})
export class SelectUserRoleComponent {
  optionRoles = [
    { path: '/homePatient', title: 'Patient', icon: 'assets/images/patient-icon.png'},
    { path: '/homeDoctor', title: 'Endocrinologist', icon: 'assets/images/doctor-icon.png'},
  ]
  constructor(private userTypeService: UserTypeService) {} // Inyecta el servicio

  setUserType(type: string) {
    if (type === 'endocrinologist' || type === 'patient') {
      this.userTypeService.setUserType(type);
    } else {
      console.error(`Invalid user type: ${type}`);
    }
  }
}
