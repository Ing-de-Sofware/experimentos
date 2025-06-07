import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIcon,
  ]
})
export class HeaderAdminComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    const stored = localStorage.getItem('dark-mode');
    this.isDarkMode = stored === 'true';

    // Aplica la clase dark-mode si está activada
    const layout = document.querySelector('.admin-layout');
    if (this.isDarkMode && layout) {
      layout.classList.add('dark-mode');
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('dark-mode', String(this.isDarkMode));

    const layout = document.querySelector('.admin-layout');
    if (layout) {
      layout.classList.toggle('dark-mode', this.isDarkMode);
    }
  }
}
