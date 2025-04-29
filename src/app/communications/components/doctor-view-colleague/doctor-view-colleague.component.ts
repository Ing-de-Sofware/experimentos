import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorProfile } from '../../model/doctor-profile';

import {ButtonSendMessageComponent} from "../button-send-message/button-send-message.component";
import {
  DatepickerProfileColleagueComponent
} from "../datepicker-profile-colleague/datepicker-profile-colleague.component";
import {
  HourpickerProfileColleagueComponent
} from "../hourpicker-profile-colleague/hourpicker-profile-colleague.component";
import {SpaceAssignPatientComponent} from "../space-assign-patient/space-assign-patient.component";
import {ButtonSaveScheduleComponent} from "../button-save-schedule/button-save-schedule.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {  EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-doctor-view-colleague',
  templateUrl: './doctor-view-colleague.component.html',
  styleUrl: './doctor-view-colleague.component.css',
  imports: [
    ButtonSendMessageComponent,
    DatepickerProfileColleagueComponent,
    HourpickerProfileColleagueComponent,
    SpaceAssignPatientComponent,
    ButtonSaveScheduleComponent,
    MatGridTile,
    MatGridList,
    MatButtonModule, MatDialogModule
  ],
  standalone: true
})
export class DoctorViewColleagueComponent {
  @Output() sendMessageClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DoctorProfile) { }

  sendMessageToDoctor() {
    this.sendMessageClicked.emit(this.data.email);
  }
}


