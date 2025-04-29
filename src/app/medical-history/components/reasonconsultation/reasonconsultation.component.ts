import { Component, OnInit } from '@angular/core';
import { ReasonOfConsultationService } from '../../services/reason-of-consultation.service';

@Component({
  selector: 'app-reasonconsultation',
  templateUrl: './reasonconsultation.component.html',
  styleUrls: ['./reasonconsultation.component.css']
})
export class ReasonconsultationComponent implements OnInit {
  description: string = '';
  symptoms: string = '';
  medicalRecordId: number = 4; // Aquí debes poner el ID del paciente

  constructor(private reasonOfConsultationService: ReasonOfConsultationService) {}

  ngOnInit() {
    this.reasonOfConsultationService.getReasonOfConsultation(this.medicalRecordId).subscribe(data => {
      this.description = data.description;
      this.symptoms = data.symptoms;
      this.medicalRecordId = data.medicalRecordId;
    });
  }

  editReasonOfConsultation() {
    const data = {
      description: this.description,
      symptoms: this.symptoms,
      medicalRecordId: this.medicalRecordId
    };

    this.reasonOfConsultationService.postReasonOfConsultation(data).subscribe(response => {
      console.log(response);
    });
  }
}
