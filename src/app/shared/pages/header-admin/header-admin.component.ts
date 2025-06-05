import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ColleagueSearchComponent} from "../../../communications/pages/colleague-search/colleague-search.component";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    ColleagueSearchComponent
  ]
})
export class HeaderAdminComponent {}
