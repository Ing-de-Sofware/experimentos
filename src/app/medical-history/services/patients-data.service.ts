import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, map, catchError} from 'rxjs';
import { BaseService } from "../../shared/services/base.service";
import { PatientEntity } from "../../profiles/model/patient.entity";

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService extends BaseService<PatientEntity> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'https://json-server-vercel-open.vercel.app';
    this.resourceEndpoint = '/patients';
  }

  /**
   * Retorna el paciente por su ID mapeando los campos del backend
   * al modelo de PatientEntity que usamos en frontend.
   */
  override getById(id: any): Observable<PatientEntity> {
    return this.http.get<any>(`${this.basePath}${this.resourceEndpoint}/${id}`).pipe(
      map((raw) => {
        const patient = new PatientEntity();
        patient.id = raw.id;
        patient.firstName = raw.name;
        patient.lastName = raw.lastname;
        patient.gender = raw.gender;
        patient.age = this.calculateAge(raw.birthdate);
        patient.phoneNumber = raw.phone;
        patient.email = raw.email;
        patient.image = raw.image;
        patient.birthday = raw.birthdate;
        patient.typeofblood = raw.type_of_blood;
        return patient;
      })
    );
  }
  override getAll(): Observable<PatientEntity[]> {
    return this.http.get<any[]>(`${this.basePath}${this.resourceEndpoint}`).pipe(
      map((rawList) => {
        console.log('debug rawlist pacientes:', rawList);
        return rawList
          .filter(raw => !!raw.name && !!raw.lastname && !!raw.birthdate) // evitar omisiones
          .map((raw, i) => {
            console.log(`Paciente [${i}]`, raw);
            const patient = new PatientEntity();
            patient.id = raw.id;
            patient.firstName = raw.name;
            patient.lastName = raw.lastname;
            patient.gender = raw.gender;
            patient.age = this.calculateAge(raw.birthdate);
            patient.phoneNumber = raw.phone;
            patient.email = raw.email;
            patient.image = raw.image ? `/assets/images/${raw.image}` : 'https://via.placeholder.com/150';
            patient.birthday = raw.birthdate;
            patient.typeofblood = raw.type_of_blood;
            console.log(`Incluyendo paciente ${patient.id} con imagen: ${patient.image}`);
            return patient;
          });
      }),
      catchError(this.handleError)
    );
  }




  private calculateAge(birthdate: string): number {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  // Este método lo dejamos comentado por ahora porque no está implementado en el mock
  getProfileIdByPatientId(id: number): Observable<number> {
  return this.http.get<number>(`${this.basePath}${this.resourceEndpoint}/${id}/profile-id`);
  }

}
