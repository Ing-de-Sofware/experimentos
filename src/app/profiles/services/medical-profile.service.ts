import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BaseService } from "../../shared/services/base.service";
import { MedicalEntity } from "../model/medical.entity";

@Injectable({
  providedIn: 'root'
})

export class MedicalsProfileService extends BaseService<MedicalEntity> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'https://hormonal-care-backend.up.railway.app/api/v1';
   // this.basePath = 'http://localhost:8080/api/v1';
    this.resourceEndpoint = '/doctor/doctor';
  }

  getDoctorDetails(id: string): Observable<MedicalEntity> {
    return this.http.get<MedicalEntity>(`${this.basePath}${this.resourceEndpoint}/${id}`);
  }


  getProfileIdByDoctorId(id: number): Observable<number> {
    return this.http.get<number>(`${this.basePath}${this.resourceEndpoint}/${id}/profile-id`);
  }
}
