import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dignosesandtreatment',
  templateUrl: './dignosesandtreatment.component.html',
  styleUrl: './dignosesandtreatment.component.css'
})
export class DignosesandtreatmentComponent {
  constructor(private router: Router) { }

  navigateTo(path: string): void {
    this.router.navigate(['/medical-history', path]);
  }
}
