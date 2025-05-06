import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from "../../../shared/services/user-type.service";
import { UserType } from '../../../shared/model/user-type.model';

@Component({
  selector: 'app-select-user-role',
  templateUrl: './select-user-role.component.html',
  styleUrls: ['./select-user-role.component.css']
})
export class SelectUserRoleComponent {
  optionRoles = [
    { type: 'patient', title: 'Patient', icon: 'assets/images/patient-icon.png' },
    { type: 'endocrinologist', title: 'Endocrinologist', icon: 'assets/images/doctor-icon.png' },
    { type: 'admin', title: 'Administrator', icon: 'assets/images/admin-icon.png' } // si vas a usar admin
  ];

  constructor(
    private userTypeService: UserTypeService,
    private router: Router
  ) {}

  selectRole(type: UserType) {
    this.userTypeService.setUserType(type);
    this.router.navigate(['/register']); // ✅ Aquí se redirige al formulario
  }
}
