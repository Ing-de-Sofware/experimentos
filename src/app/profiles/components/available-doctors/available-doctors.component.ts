import { Component } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { CommonModule} from '@angular/common';
import { Router} from '@angular/router';
import { DoctorService } from '../../../../../../../experimentos-hormonal-care-web-frontend/src/app/patient/services/doctor.service';
import { Doctor } from '../../../../../../../experimentos-hormonal-care-web-frontend/src/app/patient/models/doctor.models';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-available-doctors',
  standalone: true,
  templateUrl: './available-doctors.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  styleUrls: ['./available-doctors.component.css']
})
export class AvailableDoctorsComponent {
  constructor(private doctorService: DoctorService, private router: Router) {}
  doctors: Doctor[] = [];
  ngOnInit() {
    this.doctors = this.doctorService.getDoctors();
  }
  searchQuery: string = '';
  sortOption :string ='';
  goBack() {
    this.router.navigate(['/homePatient']); //
  }

  get filteredDoctors(): Doctor[] {
    let result = this.doctors.filter(doc =>
      doc.name.toLowerCase().includes(this.searchQuery.toLowerCase().trim())
    );

    if (this.sortOption === 'price') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'rating') {
      result = result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }

  goToDoctorProfile(doctorId: number): void {
    this.router.navigate(['/doctor-profile', doctorId]);
  }



  navigateToDoctors() {
    this.router.navigate(['/doctor-list']);
  }
}
