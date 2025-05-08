import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule-follow-up',
  templateUrl: './schedule-follow-up.component.html',
  styleUrls: ['./schedule-follow-up.component.css']
})
export class ScheduleFollowUpComponent {
  medications: string[] = [
    'Levotiroxina', 'Metformina', 'Estrógeno y progesterona',
    'Testosterona', 'Corticosteroides', 'Levotiroxina'
  ];

  exams: string[] = ['Hormonal test', 'Blood test'];

  selectedExams: string[] = [];
  selectedDateTime: string = '';
}
