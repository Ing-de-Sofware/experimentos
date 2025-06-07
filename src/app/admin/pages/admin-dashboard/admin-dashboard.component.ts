import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [NgChartsModule]
})
export class AdminDashboardComponent implements OnInit {
  isDarkMode = false;

  @ViewChild('lineChart') lineChart!: BaseChartDirective;
  @ViewChild('stackedChart') stackedChart!: BaseChartDirective;
  @ViewChild('pieChart') pieChart!: BaseChartDirective;
  @ViewChild('barChart') barChart!: BaseChartDirective;

  ngOnInit(): void {
    const stored = localStorage.getItem('dark-mode');
    this.isDarkMode = stored === 'true';
    this.applyChartTheme();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('dark-mode', String(this.isDarkMode));
    this.applyChartTheme();
  }

  private applyChartTheme(): void {
    const legendColor = this.isDarkMode ? '#ffffff' : '#333333';
    const ticksColor = this.isDarkMode ? '#ffffff' : '#555555';

    this.lineChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { color: legendColor } }
      },
      scales: {
        x: { ticks: { color: ticksColor } },
        y: { beginAtZero: true, ticks: { color: ticksColor } }
      }
    };

    this.stackedBarOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { color: legendColor } }
      },
      scales: {
        x: { stacked: true, ticks: { color: ticksColor } },
        y: { stacked: true, beginAtZero: true, ticks: { color: ticksColor } }
      }
    };

    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { color: legendColor } }
      }
    };

    this.barChartOptions = {
      responsive: true,
      plugins: {
        legend: { labels: { color: legendColor } }
      },
      scales: {
        x: { ticks: { color: ticksColor } },
        y: { beginAtZero: true, ticks: { color: ticksColor } }
      }
    };

    // Forzar reemplazo completo de opciones en los gráficos
    setTimeout(() => {
      if (this.lineChart) {
        this.lineChart.options = this.lineChartOptions;
        this.lineChart.update();
      }
      if (this.stackedChart) {
        this.stackedChart.options = this.stackedBarOptions;
        this.stackedChart.update();
      }
      if (this.pieChart) {
        this.pieChart.options = this.pieChartOptions;
        this.pieChart.update();
      }
      if (this.barChart) {
        this.barChart.options = this.barChartOptions;
        this.barChart.update();
      }
    }, 0);
  }


  goTo(route: string) {}

  cards = [
    { title: 'Enviar Comunicados', description: 'Envía comunicados a médicos y pacientes', icon: 'campaign', route: '/announcementsAdmin' },
    { title: 'Reasignar Pacientes', description: 'Reasigna pacientes a otros médicos', icon: 'sync_alt', route: '/reassign' },
    { title: 'Revisar Logs de Acceso', description: 'Visualiza accesos sospechosos', icon: 'security', route: '/logs' },
    { title: 'Soporte Técnico', description: 'Gestiona mensajes de soporte', icon: 'support_agent', route: '/support' },
    { title: 'Gestión de Usuarios', description: 'Visualiza y administra usuarios registrados', icon: 'group', route: '/user-management' }
  ];

  // === Charts ===

  public lineChartLabels: string[] = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
  public lineChartData = [
    {
      data: [50, 65, 70, 80],
      label: 'Consultas',
      fill: true,
      tension: 0.4,
      borderColor: '#42A5F5',
      backgroundColor: 'rgba(66,165,245,0.2)',
      pointBackgroundColor: '#42A5F5'
    },
    {
      data: [40, 45, 60, 72],
      label: 'Seguimientos',
      fill: true,
      tension: 0.4,
      borderColor: '#66BB6A',
      backgroundColor: 'rgba(102,187,106,0.2)',
      pointBackgroundColor: '#66BB6A'
    }
  ];
  public lineChartOptions: any;

  public stackedBarLabels: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  public stackedBarData = [
    { label: 'INFO', data: [30, 25, 35, 40, 32], backgroundColor: '#64b5f6' },
    { label: 'WARN', data: [12, 14, 9, 10, 8], backgroundColor: '#ffb74d' },
    { label: 'ERROR', data: [4, 2, 6, 3, 1], backgroundColor: '#e57373' }
  ];
  public stackedBarOptions: any;

  public barChartData: ChartData<'bar'> = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    datasets: [
      { data: [35, 49, 32, 50, 40], label: 'Pacientes' },
      { data: [20, 34, 27, 44, 30], label: 'Seguimientos' }
    ]
  };
  public barChartOptions: any;

  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Search Engines', 'Direct Click', 'Referral'],
    datasets: [{ data: [30, 30, 40] }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: any;
}
