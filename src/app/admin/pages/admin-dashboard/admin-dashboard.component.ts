import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [NgChartsModule]
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

  // Gráfico de barras
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  barChartData: ChartData<'bar'> = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    datasets: [
      { data: [35, 49, 32, 50, 40], label: 'Pacientes' },
      { data: [20, 34, 27, 44, 30], label: 'Seguimientos' }
    ]
  };

  // Gráfico de torta
  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Search Engines', 'Direct Click', 'Referral'],
    datasets: [
      { data: [30, 30, 40] }
    ]
  };

  pieChartType: ChartType = 'pie';

  goTo(route: string) {
    // Puedes usar router.navigate si lo deseas
  }
}
