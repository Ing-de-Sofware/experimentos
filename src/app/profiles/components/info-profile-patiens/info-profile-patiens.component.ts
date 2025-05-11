import { Component, OnInit } from '@angular/core';
import { PatientEntity } from "../../model/patient.entity";
import { PatientsProfileService } from "../../services/patients-profile.service";
import { ProfilesService } from "../../services/profiles.service";
import {ProfilesEntity} from "../../model/profiles.entity";
import {PatientsDataService} from "../../../medical-history/services/patients-data.service";

@Component({
  selector: 'app-info-profile-patiens',
  templateUrl: './info-profile-patiens.component.html',
  styleUrls: ['./info-profile-patiens.component.css']
})
export class InfoProfilePatiensComponent implements OnInit {
  patient: PatientEntity = new PatientEntity();
  profile: ProfilesEntity = new ProfilesEntity();

  constructor(private patientsDataService: PatientsDataService, private profileDataService: ProfilesService) {}
  ngOnInit() {
    this.getPatientAndProfileDetails('1'); // replace '1' with the actual patient ID
  }

  getPatientAndProfileDetails(patientId: string) {
    this.patientsDataService.getProfileIdByPatientId(Number(patientId))
      .subscribe((profileId: number) => {
        // Obtén los detalles del perfil
        this.profileDataService.getProfileDetails(profileId.toString())
          .subscribe((data: ProfilesEntity) => {
            console.log('Profile details:', data); // Log the profile details
            this.profile = data;
          }, error => {
            console.error('Error fetching profile details:', error);
          });

        // Obtén los detalles del paciente
        this.patientsDataService.getById(patientId)
          .subscribe((data: PatientEntity) => {
            console.log('Patient details:', data); // Log the patient details
            this.patient.typeofblood = data.typeofblood; // Solo guarda el tipo de sangre
          }, error => {
            console.error('Error fetching patient details:', error);
          });
      }, error => {
        console.error('Error fetching profile ID:', error);
      });
  }
}
