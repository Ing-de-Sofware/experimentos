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

  public users: DoctorProfile[] = [];

  private _liveChatUsers: DoctorProfile[] = [];

  getUsers(): Observable<DoctorProfile[]> {
    return this.http.get<DoctorProfile[]>(`${this.apiUrl}/doctors`);
  }

  getDoctorByEmail(email: string): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile[]>(`${this.apiUrl}/doctors?email=${email}`).pipe(
      map(doctors => doctors[0])
    );
  }

  getMessages(from: string, to: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages?_sort=timestamp&_order=asc`).pipe(
      map(messages =>
        messages.filter(
          message =>
            (message.from === from && message.to === to) ||
            (message.from === to && message.to === from)
        )
      )
    );
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages`, message);
  }

  getMessagesByReceiver(receiverId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages?receiverId=${receiverId}&_sort=timestamp&_order=asc`);
  }

  addUserIfNotExists(user: DoctorProfile): void {
    const existing = this.users.find(u => u.id === user.id);
    if (!existing) {
      this.users.unshift(user);
    }
  }

  addUserToLiveChat(user: DoctorProfile): void {
    const exists = this._liveChatUsers.find(u => u.id === user.id);
    if (!exists) {
      this._liveChatUsers.unshift(user);
    }
  }

  // ✅ Método corregido para que devuelva usuarios mock si está vacío
  getLiveChatUsers(): DoctorProfile[] {
    if (this._liveChatUsers.length === 0) {
      this._liveChatUsers = [
        {
          id: 101,
          name: 'Laura',
          lastname: 'Martinez',
          fee: 0,
          gender: '',
          image: '',
          title: '',
          college_number: '',
          RNE: '',
          undergraduate: '',
          specialty: '',
          sub_speciality: '',
          code_of_doctor: '',
          subscription_id: 0,
          email: 'laura@doctor.hormonalcare.com',
          password: ''
        },
        {
          id: 102,
          name: 'Pedro',
          lastname: 'Sanchez',
          fee: 0,
          gender: '',
          image: '',
          title: '',
          college_number: '',
          RNE: '',
          undergraduate: '',
          specialty: '',
          sub_speciality: '',
          code_of_doctor: '',
          subscription_id: 0,
          email: 'pedro@patient.hormonalcare.com',
          password: ''
        },
        {
          id: 103,
          name: 'Marco',
          lastname: 'Rojas',
          fee: 0,
          gender: '',
          image: '',
          title: '',
          college_number: '',
          RNE: '',
          undergraduate: '',
          specialty: '',
          sub_speciality: '',
          code_of_doctor: '',
          subscription_id: 0,
          email: 'marco@patient.hormonalcare.com',
          password: ''
        },
        {
          id: 104,
          name: 'Andrea',
          lastname: 'Paredes',
          fee: 0,
          gender: '',
          image: '',
          title: '',
          college_number: '',
          RNE: '',
          undergraduate: '',
          specialty: '',
          sub_speciality: '',
          code_of_doctor: '',
          subscription_id: 0,
          email: 'andrea@doctor.hormonalcare.com',
          password: ''
        },
        {
          id: 105,
          name: 'Lucia',
          lastname: 'Fernandez',
          fee: 0,
          gender: '',
          image: '',
          title: '',
          college_number: '',
          RNE: '',
          undergraduate: '',
          specialty: '',
          sub_speciality: '',
          code_of_doctor: '',
          subscription_id: 0,
          email: 'lucia@patient.hormonalcare.com',
          password: ''
        },
        {
          id: 106,
          name: 'Rafael',
          lastname: 'Castillo',
          fee: 0,
          gender: '',
          image: '',
          title: '',
          college_number: '',
          RNE: '',
          undergraduate: '',
          specialty: '',
          sub_speciality: '',
          code_of_doctor: '',
          subscription_id: 0,
          email: 'rafael@doctor.hormonalcare.com',
          password: ''
        }
      ];
    }

    return this._liveChatUsers;
  }
}
