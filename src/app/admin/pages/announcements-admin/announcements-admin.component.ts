import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AnnouncementEntity } from '../../../notifications/model/announcement.entity';
import { AnnouncementService } from '../../../notifications/services/announcement.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-announcements-admin',
  templateUrl: './announcements-admin.component.html',
  styleUrls: ['./announcements-admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput
  ]
})
export class AnnouncementsAdminComponent implements OnInit {
  announcementForm!: FormGroup;
  announcements: AnnouncementEntity[] = [];

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.announcementForm = this.fb.group({
      message: ['', Validators.required],
      audience: ['doctors', Validators.required] // default correcto
    });

    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcements = this.announcementService.getAll();
  }

  submit(): void {
    if (this.announcementForm.valid) {
      const newAnnouncement: AnnouncementEntity = {
        id: crypto.randomUUID(), // más robusto que Date.now()
        message: this.announcementForm.value.message,
        audience: this.announcementForm.value.audience,
        createdAt: new Date().toISOString()
      };

      this.announcementService.create(newAnnouncement); // sin .subscribe
      this.announcementForm.reset({ audience: 'doctors' });
      this.loadAnnouncements();
    }
  }
}
