import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card-profile-patiens',
  templateUrl: './info-card-profile-patiens.component.html',
  styleUrl: './info-card-profile-patiens.component.css'
})
export class InfoCardProfilePatiensComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() link: string = '';
}
