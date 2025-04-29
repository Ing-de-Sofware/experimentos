import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  private userTypeSource = new BehaviorSubject<'endocrinologist' | 'patient' | null>(null);
  userType$ = this.userTypeSource.asObservable();

  setUserType(type: 'endocrinologist' | 'patient') {
    this.userTypeSource.next(type);
  }
}
