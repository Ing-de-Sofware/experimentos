import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent implements OnInit {

  selectedExam: File | null = null;

  constructor(
    private userTypeService: UserTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();

    // ✅ Si no es paciente, redirige
    if (userType !== 'patient') {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    // ✅ Bloquea el retroceso a login
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
  }

  // ✅ Manejador para input file
  onExamSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedExam = input.files[0];
    }
  }
}
