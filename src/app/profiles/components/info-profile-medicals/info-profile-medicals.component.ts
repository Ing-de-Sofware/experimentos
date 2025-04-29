import { Component, OnInit } from '@angular/core';
import { MedicalEntity } from "../../model/medical.entity";
import { MedicalsProfileService } from "../../services/medical-profile.service";
import { ProfilesService } from "../../services/profiles.service";
import {ProfilesEntity} from "../../model/profiles.entity";

@Component({
  selector: 'app-info-profile-medicals',
  templateUrl: './info-profile-medicals.component.html',
  styleUrls: ['./info-profile-medicals.component.css']
})
export class InfoProfileMedicalsComponent implements OnInit {
  doctorData!: MedicalEntity;
  doctorProfileData!: ProfilesEntity; // Add a new property for doctor profile data
  dataSource: MedicalEntity[] = [];
  displayed: string[] = ['full_name', 'email', 'sub_speciality', 'professional_identification_number', 'appointment_fee'];

  constructor(private doctorService: MedicalsProfileService, private profileService: ProfilesService) {}

  ngOnInit() {
    const id = '1'; // replace '1' with the actual doctor ID
    this.getDoctorDetails(id);
  }

  private getDoctorDetails(id: string) {
    const numId = Number(id); // Convert string id to number
    this.doctorService.getDoctorDetails(numId.toString()).subscribe((response: MedicalEntity) => {
      this.doctorData = response;
      this.dataSource = [this.doctorData];

      // Get profile ID by doctor ID
      this.doctorService.getProfileIdByDoctorId(numId).subscribe((profileId: number) => {
        // Get profile details by profile ID
        this.profileService.getProfileDetails(profileId.toString()).subscribe((profile: ProfilesEntity) => {
          this.doctorProfileData = profile;

          // Update dataSource with doctor profile data
          if (this.dataSource.length > 0) {
            this.dataSource[0].fullName = this.doctorProfileData.fullName;
            this.dataSource[0].email = this.doctorProfileData.email;
          }
        });
      });
    });
  }
  sortData(sort: {active: string, direction: string}): void {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource = this.dataSource.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.fullName, b.fullName, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'qualification': return compare(a.subSpecialty, b.subSpecialty, isAsc);
        case 'school_N': return compare(a.professionalIdentificationNumber, b.professionalIdentificationNumber, isAsc);
        case 'fee': return compare(a.appointmentFee, b.appointmentFee, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
