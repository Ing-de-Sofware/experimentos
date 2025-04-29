import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BaseService } from "../../shared/services/base.service";
import { MedicalHistoryEntity } from "../model/medical-history.entity";

@Injectable({
  providedIn: 'root'
})

export class MedicalHistoryService extends BaseService<MedicalHistoryEntity> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'https://json-server-vercel-open.vercel.app';
    this.resourceEndpoint = '/medical_history';
  }

  getMedicalHistoryDetails(id: string): Observable<MedicalHistoryEntity> {
    return this.http.get<MedicalHistoryEntity>(`${this.basePath}${this.resourceEndpoint}/${id}`);
  }
}
