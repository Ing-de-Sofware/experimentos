import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-button-send-message',
  templateUrl: './button-send-message.component.html',
  styleUrl: './button-send-message.component.css',
  standalone: true
})
export class ButtonSendMessageComponent {
  @Output() sendMessageClicked: EventEmitter<void> = new EventEmitter<void>();

  sendMessage() {
    this.sendMessageClicked.emit();
  }
}
