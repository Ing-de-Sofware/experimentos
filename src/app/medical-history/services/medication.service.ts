import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private basePath = 'https://hormonal-care-backend.up.railway.app/api/v1';
  //private basePath = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getMedication(medicalRecordId: number): Observable<any> {
    return this.http.get<any>(`${this.basePath}/medical-record/medications/medicalRecordId/${medicalRecordId}`);
  }

  postMedication(data: {medicationName: string, amount: string, concentration: string, frequency: string, medicalRecordId: number}): Observable<any> {
    return this.http.post<any>(`${this.basePath}/medical-record/medications`, data);
  }
}
