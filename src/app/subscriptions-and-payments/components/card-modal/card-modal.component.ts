import { Component } from '@angular/core';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css'] // Aquí está la corrección
})
export class CardModalComponent {
  showModal = true;
}
