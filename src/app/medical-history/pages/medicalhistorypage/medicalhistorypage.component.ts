import { Component } from '@angular/core';

@Component({
  selector: 'app-medicalhistorypage',
  templateUrl: './medicalhistorypage.component.html',
  styleUrls: ['./medicalhistorypage.component.css']
})
export class MedicalhistorypageComponent {
  patient = {
    name: 'Gabriel Ramirez',
    age: 31,
    gender: 'Male',
    photo: 'https://i.pravatar.cc/150?img=3',
    mainInfo: {
      weight: '72 kg',
      height: '1.75 m',
      bloodType: 'O+',
      allergies: 'None'
    },
    history: {
      reason: 'Regular hormonal evaluation',
      antecedents: 'No known chronic illnesses. Family history of thyroid issues.',
      exams: ['Blood test', 'Hormonal test'],
      externalReports: ['Endocrinologist referral - Jan 2024'],
      treatments: ['Levotiroxina 100mg – 1 daily']
    }
  };
}
