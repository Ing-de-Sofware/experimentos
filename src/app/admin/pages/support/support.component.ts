import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class SupportComponent {

}
