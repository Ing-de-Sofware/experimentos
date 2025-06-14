import { Component } from '@angular/core';
import {MatCard, MatCardActions} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  standalone: true,
  imports: [
    MatCardActions,
    MatLabel,
    MatFormField,
    MatCard,
    CommonModule
  ],
  styleUrls: ['./card-modal.component.css'] // Aquí está la corrección
})
export class CardModalComponent {
  showModal = true;
}
