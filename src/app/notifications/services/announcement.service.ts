import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { AnnouncementEntity } from '../model/announcement.entity';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  // private readonly endpoint = '/announcements';

  private readonly localStorageKey = 'announcements';

  // constructor(private http: HttpClient) {}
  constructor() {}

  // 🔁 Simulación temporal con LocalStorage
  getAll(): AnnouncementEntity[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  getForAudience(audience: 'patients' | 'doctors'): AnnouncementEntity[] {
    return this.getAll().filter(a => a.audience === audience);
  }

  getUnreadForAudience(audience: 'patients' | 'doctors'): AnnouncementEntity[] {
    return this.getForAudience(audience).filter(a => !a.isRead);
  }

  create(announcement: AnnouncementEntity): void {
    const list = this.getAll();
    list.push(announcement);
    localStorage.setItem(this.localStorageKey, JSON.stringify(list));
  }

  markAsRead(id: string): void {
    const list = this.getAll();
    const index = list.findIndex(a => a.id === id);
    if (index !== -1) {
      list[index].isRead = true;
      localStorage.setItem(this.localStorageKey, JSON.stringify(list));
    }
  }

  // 🧪 Métodos reales con backend (descomentar cuando esté disponible)
  /*
  getAll(): Observable<AnnouncementEntity[]> {
    return this.http.get<AnnouncementEntity[]>(this.endpoint);
  }

  create(announcement: AnnouncementEntity): Observable<AnnouncementEntity> {
    return this.http.post<AnnouncementEntity>(this.endpoint, announcement);
  }
  */
}
