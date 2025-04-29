import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReasonOfConsultationService {

   private basePath = 'https://hormonal-care-backend.up.railway.app/api/v1';
  //private basePath = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getReasonOfConsultation(medicalRecordId: number): Observable<any> {
    return this.http.get<any>(`${this.basePath}/medical-record/reasons-of-consultation/medicalRecordId/${medicalRecordId}`);
  }

  postReasonOfConsultation(data: {description: string, symptoms: string, medicalRecordId: number}): Observable<any> {
    return this.http.post<any>(`${this.basePath}/medical-record/reasons-of-consultation`, data);
  }
}
