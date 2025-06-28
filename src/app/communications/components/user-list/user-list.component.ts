import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import {NgForOf} from "@angular/common";

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  @Output() userSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  selectUser(email: string): void {
    this.userSelected.emit(email);
  }
}
