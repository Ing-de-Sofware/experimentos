import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private url = 'https://json-server-vercel-open.vercel.app/doctors'; // Ajusta esta URL a la ubicación real de tu db.json

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
