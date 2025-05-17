import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  cards = [
    {
      title: 'Enviar Comunicados',
      description: 'Envía comunicados a médicos y pacientes',
      icon: 'campaign',
      route: '/announcementsAdmin'
    },
    {
      title: 'Reasignar Pacientes',
      description: 'Reasigna pacientes a otros médicos',
      icon: 'sync_alt',
      route: '/reassign'
    },
    {
      title: 'Revisar Logs de Acceso',
      description: 'Visualiza accesos sospechosos',
      icon: 'security',
      route: '/logs'
    },
    {
      title: 'Soporte Técnico',
      description: 'Gestiona mensajes de soporte',
      icon: 'support_agent',
      route: '/support'
    },
    {
      title: 'Gestión de Usuarios',
      description: 'Visualiza y administra usuarios registrados',
      icon: 'group',
      route: '/user-management'
    }
  ];


  goTo(route: string) {
    // Aquí se usaría router.navigate, pero puede hacerse también por routerLink
  }
}
