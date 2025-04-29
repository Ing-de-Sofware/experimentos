import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BaseService } from "../../shared/services/base.service";
import { PatientEntity } from "../model/patient.entity";


@Injectable({
  providedIn: 'root'
})


export class PatientsProfileService extends BaseService<PatientEntity> {

  constructor(http: HttpClient) {
    super(http);

    this.basePath = 'https://hormonal-care-backend.up.railway.app/api/v1';
    //this.basePath = 'http://localhost:8080/api/v1';
    this.resourceEndpoint = '/medical-record/patient';
  }

  getPatientDetails(id: string): Observable<PatientEntity> {
    return this.http.get<PatientEntity>(`${this.basePath}${this.resourceEndpoint}/${id}`);
  }

   getProfileIdByPatientId(id: number): Observable<number> {
    return this.http.get<number>(`${this.basePath}${this.resourceEndpoint}/${id}/profile-id`);
  }


}

