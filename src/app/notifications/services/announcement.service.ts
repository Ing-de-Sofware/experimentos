import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnnouncementEntity } from '../model/announcement.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private readonly endpoint = '/announcements';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AnnouncementEntity[]> {
    return this.http.get<AnnouncementEntity[]>(this.endpoint);
  }

  create(announcement: AnnouncementEntity): Observable<AnnouncementEntity> {
    return this.http.post<AnnouncementEntity>(this.endpoint, announcement);
  }
}
