import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../../services/chat.service';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
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
