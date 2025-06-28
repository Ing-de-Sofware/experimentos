import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {UserListComponent} from "./components/user-list/user-list.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule,
    MatIconModule,
    UserListComponent
  ]
})
export class UserManagementComponent {

}
