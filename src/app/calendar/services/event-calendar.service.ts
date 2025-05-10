import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CalendarEvent {
  title: string;
  start: string; // ISO string
  end?: string;
  allDay?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventCalendarService {

  private eventsSubject = new BehaviorSubject<CalendarEvent[]>([]);
  public events$ = this.eventsSubject.asObservable();

  constructor() {}

  addEvent(event: CalendarEvent): void {
    const current = this.eventsSubject.value;
    this.eventsSubject.next([...current, event]);
  }

  getEvents(): CalendarEvent[] {
    return this.eventsSubject.value;
  }

  clearEvents(): void {
    this.eventsSubject.next([]);
  }
}
