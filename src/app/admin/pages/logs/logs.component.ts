import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class LogsComponent {

}
