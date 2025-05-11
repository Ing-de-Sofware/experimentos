import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';
import { Location } from '@angular/common';
import { PatientsDataService } from '../../../medical-history/services/patients-data.service';
import { PatientEntity } from '../../../profiles/model/patient.entity';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css']
})
export class HomeDoctorComponent implements OnInit {

  searchTerm: string = '';
  patients: PatientEntity[] = [];

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private location: Location,
    private patientsDataService: PatientsDataService
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();

    if (userType !== 'endocrinologist') {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    this.loadPatients();

    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
  }

  loadPatients(): void {
    this.patientsDataService.getAll().subscribe({
      next: (data: PatientEntity[]) => {
        this.patients = data;
      },
      error: (err) => {
        console.error('Error loading patients', err);
      }
    });
  }

  get filteredPatients() {
    return this.patients.filter(p =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
