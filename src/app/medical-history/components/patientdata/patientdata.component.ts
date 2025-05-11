import { Component, OnInit } from '@angular/core';
import { PatientsDataService } from "../../services/patients-data.service";
import { PatientEntity } from "../../../profiles/model/patient.entity";
import { ProfilesEntity } from "../../../profiles/model/profiles.entity";
import { ProfilesService } from "../../../profiles/services/profiles.service";

@Component({
  selector: 'app-patientdata',
  templateUrl: './patientdata.component.html',
  styleUrls: ['./patientdata.component.css']
})
export class PatientdataComponent implements OnInit {
  patient: PatientEntity = new PatientEntity();
  profile: ProfilesEntity = new ProfilesEntity();
  isLoading = true;

  constructor(
    private patientsDataService: PatientsDataService,
    private profileDataService: ProfilesService
  ) {}

  ngOnInit() {
    this.getPatientAndProfileDetails('1'); // ⚠️ reemplaza '1' por el ID real en producción
  }

  getPatientAndProfileDetails(patientId: string) {
    this.patientsDataService.getProfileIdByPatientId(Number(patientId))
      .subscribe({
        next: (profileId: number) => {
          this.profileDataService.getProfileDetails(profileId.toString())
            .subscribe({
              next: (data: ProfilesEntity) => {
                this.profile = data;
              },
              error: (err) => {
                console.error('Error fetching profile details:', err);
              }
            });

          this.patientsDataService.getById(patientId)
            .subscribe({
              next: (data: PatientEntity) => {
                this.patient = data;
                this.isLoading = false; // ✅ marcar como cargado después de ambos
              },
              error: (err) => {
                console.error('Error fetching patient details:', err);
                this.isLoading = false;
              }
            });
        },
        error: (err) => {
          console.error('Error fetching profile ID:', err);
          this.isLoading = false;
        }
      });
  }
}
