import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../model/message';
import { DoctorProfile } from '../model/doctor-profile';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://json-server-vercel-open.vercel.app';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<DoctorProfile[]> {
    return this.http.get<DoctorProfile[]>(`${this.apiUrl}/doctors`);
  }

  getDoctorByEmail(email: string): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile[]>(`${this.apiUrl}/doctors?email=${email}`).pipe(
      map(doctors => doctors[0]) // Asume que el correo electrónico es único y solo devuelve el primer doctor
    );
  }

  getMessages(from: string, to: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages?_sort=timestamp&_order=asc`).pipe(
      map(messages => messages.filter(
        message => (message.from === from && message.to === to) || (message.from === to && message.to === from)
      ))
    );
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages`, message);
  }
}
