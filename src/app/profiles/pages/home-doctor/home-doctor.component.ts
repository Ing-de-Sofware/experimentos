import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css'] // 🔧 corregido styleUrls en plural
})
export class HomeDoctorComponent implements OnInit {

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();

    // ❌ Redirige si no es endocrinologist
    if (userType !== 'endocrinologist') {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    // ⛔ Bloquea retroceso
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
  }
}
