import { Injectable } from '@angular/core';
import { AnnouncementEntity } from '../model/announcement.entity';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private readonly localStorageKey = 'announcements';

  constructor() {}

  // Obtiene todos los comunicados guardados
  getAll(): AnnouncementEntity[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  // Obtiene los comunicados destinados a una audiencia específica (o a todos)
  getForAudience(audience: 'patients' | 'doctors'): AnnouncementEntity[] {
    return this.getAll().filter(a => a.audience === audience || a.audience === 'all');
  }

  // Obtiene los comunicados no leídos destinados a una audiencia específica (o a todos)
  getUnreadForAudience(audience: 'patients' | 'doctors'): AnnouncementEntity[] {
    const all = this.getForAudience(audience);
    const readIds = this.getReadIds(audience);
    return all.filter(a => !readIds.includes(a.id));
  }

  // Crea y guarda un nuevo comunicado
  create(announcement: AnnouncementEntity): void {
    const list = this.getAll();
    list.push(announcement);
    localStorage.setItem(this.localStorageKey, JSON.stringify(list));
  }

  // Marca un comunicado como leído por su ID
  markAsRead(id: string, audience: 'patients' | 'doctors'): void {
    const key = `read-announcements-${audience}`;
    const readIds = this.getReadIds(audience);

    if (!readIds.includes(id)) {
      readIds.push(id);
      localStorage.setItem(key, JSON.stringify(readIds));
    }
  }

  private getReadIds(audience: 'patients' | 'doctors'): string[] {
    const key = `read-announcements-${audience}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }

  // 🧪 Métodos reales con backend (para futuro uso)
  /*
  constructor(private http: HttpClient) {}

  getAll(): Observable<AnnouncementEntity[]> {
    return this.http.get<AnnouncementEntity[]>(this.endpoint);
  }

  create(announcement: AnnouncementEntity): Observable<AnnouncementEntity> {
    return this.http.post<AnnouncementEntity>(this.endpoint, announcement);
  }
  */
}
