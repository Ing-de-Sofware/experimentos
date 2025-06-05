import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  private userTypeSubject = new BehaviorSubject<'endocrinologist' | 'patient' | 'admin' | null>(null);
  userType$ = this.userTypeSubject.asObservable();

  constructor() {
    const savedType = localStorage.getItem('userType') as 'endocrinologist' | 'patient' | 'admin' | null;
    if (savedType) {
      this.userTypeSubject.next(savedType);
    }
  }

  setUserType(type: 'endocrinologist' | 'patient' | 'admin') {
    this.userTypeSubject.next(type);
    localStorage.setItem('userType', type);
  }

  getUserType(): 'endocrinologist' | 'patient' | 'admin' | null {
    return this.userTypeSubject.value;
  }
}

