import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  getPatients() {
    return [
      { name: 'Joseph Ortega', email: 'joseph.ortega@example.com' },
      { name: 'Camila Ríos', email: 'camila.rios@example.com' },
      { name: 'Valentina López', email: 'valentina.lopez@example.com' }
    ];
  }
}
