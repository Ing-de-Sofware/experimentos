import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent implements OnInit {

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();

    // ❌ Si no es paciente, redirige
    if (userType !== 'patient') {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    // 🧱 Bloquea retroceso
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
  }
}
