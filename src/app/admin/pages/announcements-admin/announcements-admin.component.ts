import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementEntity } from '../../../notifications/model/announcement.entity';
import { AnnouncementService } from '../../../notifications/services/announcement.service';

@Component({
  selector: 'app-announcements-admin',
  templateUrl: './announcements-admin.component.html',
  styleUrls: ['./announcements-admin.component.css']
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
      audience: ['medico', Validators.required]
    });

    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAll().subscribe(data => {
      this.announcements = data;
    });
  }

  submit(): void {
    if (this.announcementForm.valid) {
      const newAnnouncement: AnnouncementEntity = {
        id: Date.now(), // simplificado para mock
        message: this.announcementForm.value.message,
        audience: this.announcementForm.value.audience,
        createdAt: new Date().toISOString()
      };

      this.announcementService.create(newAnnouncement).subscribe(() => {
        this.announcementForm.reset({ audience: 'medico' });
        this.loadAnnouncements(); // recargar la lista
      });
    }
  }
}
