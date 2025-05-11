import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, map } from 'rxjs';
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

  /**
   * Retorna el historial médico según el patient_id (no por ID directo del objeto).
   */
  getByPatientId(patientId: string): Observable<MedicalHistoryEntity> {
    return this.http.get<MedicalHistoryEntity[]>(`${this.basePath}${this.resourceEndpoint}?patient_id=${patientId}`)
      .pipe(
        map((results) => {
          const history = results[0];
          console.log('Cargado desde servicio:', history);
          // Aseguramos que weight sea número
          return {
            ...history,
            weight: Number(history?.weight) || 0
          } as MedicalHistoryEntity;

        })
      );
  }
}
