import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {GoogleCalendarService} from "../../services/google-calendar-service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-event-card',
  templateUrl: './add-event-card.component.html',
  styleUrls: ['./add-event-card.component.css']
})
export class AddEventCardComponent implements OnInit {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private googleCalendarService: GoogleCalendarService, private snackBar: MatSnackBar) {
    this.eventForm = this.fb.group({
      eventDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      patientEmail: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  createEvent() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const startDateTime = new Date(formValue.eventDate);
      const [startHours, startMinutes] = formValue.startTime.split(':');
      startDateTime.setHours(startHours, startMinutes);

      const endDateTime = new Date(formValue.eventDate);
      const [endHours, endMinutes] = formValue.endTime.split(':');
      endDateTime.setHours(endHours, endMinutes);

      const eventDetails = {
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        email: formValue.patientEmail,
        summary: formValue.title,
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };

      this.googleCalendarService.createGoogleEvent(eventDetails).then(() => {
        this.snackBar.open('Event created', '', {
          duration: 4000,
        });
        this.eventForm.reset();
      }).catch((error) => {
        console.error('Error creating event', error);
      });
    } else {
      console.error('Form is not valid');
    }
  }
}
