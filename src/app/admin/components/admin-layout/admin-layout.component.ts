import { Component, OnInit } from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {RouterOutlet} from "@angular/router";
import {
  HeaderForUserTypeServiceComponent
} from "../../../shared/components/header-for-user-type-service/header-for-user-type-service.component";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  imports: [
    TranslateModule,
    MatTooltip,
    MatIcon,
    RouterOutlet,
    HeaderForUserTypeServiceComponent
  ],
  standalone: true
})
export class AdminLayoutComponent implements OnInit {

  isSidebarClosed = false;
  isDarkMode = false;

  constructor(private translate: TranslateService) {
    // Configuración de idiomas disponibles (opcional, personalízalo)
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    const savedDarkMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedDarkMode === 'true';
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  switchLang(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.translate.use(lang);
  }
  changeLanguage():void{}
}
