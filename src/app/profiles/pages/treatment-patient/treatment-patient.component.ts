import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

interface Treatment {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'En curso' | 'Finalizado' | 'Pendiente';
  doctorName: string;
  progress: number;
  medications: string[];
  currentSession: number;
  totalSessions: number;
  frequency: string;
  registroDiario?: RegistroDiario; // Se agrega propiedad opcional
}

interface RegistroDiario {
  sintomas: string;
  estado: string;
  notas: string;
}

@Component({
  selector: 'app-treatment-patient',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './treatment-patient.component.html',
  styleUrls: ['./treatment-patient.component.css'],
  providers: [DatePipe]
})
export class TreatmentPatientComponent {
  treatments: Treatment[] = [
    {
      id: 'T001', name: 'Terapia Hormonal', startDate: '2025-06-01', endDate: '2025-06-30',
      status: 'En curso', doctorName: 'Dra. Ana Gómez', progress: 50, medications: ['Estrógeno', 'Progesterona'],
      currentSession: 4, totalSessions: 10, frequency: '2 veces por semana'
    },
    {
      id: 'T002', name: 'Control Endocrino', startDate: '2025-04-10', endDate: '2025-05-10',
      status: 'Finalizado', doctorName: 'Dr. Julio Torres', progress: 100, medications: ['Levotiroxina'],
      currentSession: 10, totalSessions: 10, frequency: '1 vez por semana'
    },
    {
      id: 'T003', name: 'Vitaminas Complementarias', startDate: '2025-05-15', endDate: '2025-06-15',
      status: 'Pendiente', doctorName: 'Dra. Elena Pérez', progress: 0, medications: ['Vitamina D', 'Hierro'],
      currentSession: 0, totalSessions: 8, frequency: '1 vez por semana'
    },
    {
      id: 'T004', name: 'Fisioterapia', startDate: '2025-05-01', endDate: '2025-06-15',
      status: 'En curso', doctorName: 'Dra. Miriam Vega', progress: 60, medications: ['Paracetamol'],
      currentSession: 5, totalSessions: 8, frequency: '3 veces por semana'
    },
    {
      id: 'T005', name: 'Psicoterapia', startDate: '2025-06-01', endDate: '2025-07-01',
      status: 'Pendiente', doctorName: 'Dr. Martín Zúñiga', progress: 0, medications: [],
      currentSession: 0, totalSessions: 6, frequency: '2 veces por semana'
    },
    {
      id: 'T006', name: 'Control de Glucosa', startDate: '2025-05-10', endDate: '2025-06-10',
      status: 'Finalizado', doctorName: 'Dr. Luis Navarro', progress: 100, medications: ['Metformina'],
      currentSession: 4, totalSessions: 4, frequency: '1 vez por semana'
    },
    {
      id: 'T007', name: 'Terapia Nutricional', startDate: '2025-06-01', endDate: '2025-07-15',
      status: 'En curso', doctorName: 'Dra. Carmen León', progress: 30, medications: ['Suplementos'],
      currentSession: 2, totalSessions: 6, frequency: '2 veces por semana'
    },
    {
      id: 'T008', name: 'Revisión Cardíaca', startDate: '2025-04-01', endDate: '2025-05-01',
      status: 'Finalizado', doctorName: 'Dr. Ricardo Salas', progress: 100, medications: ['Aspirina'],
      currentSession: 6, totalSessions: 6, frequency: '1 vez por semana'
    },
    {
      id: 'T009', name: 'Terapia Respiratoria', startDate: '2025-06-10', endDate: '2025-07-20',
      status: 'Pendiente', doctorName: 'Dra. Silvia Huamán', progress: 0, medications: ['Salbutamol'],
      currentSession: 0, totalSessions: 6, frequency: '2 veces por semana'
    }
  ];

  semana = [
    { dia: 'Lun', cumplido: true },
    { dia: 'Mar', cumplido: true },
    { dia: 'Mié', cumplido: false },
    { dia: 'Jue', cumplido: true },
    { dia: 'Vie', cumplido: false },
    { dia: 'Sáb', cumplido: true },
    { dia: 'Dom', cumplido: false }
  ];

  modalRegistroAbierto = false;

  registroDiario: RegistroDiario = {
    sintomas: '',
    estado: '',
    notas: ''
  };

  abrirRegistro() {
    this.modalRegistroAbierto = true;
  }

  cerrarRegistro() {
    this.modalRegistroAbierto = false;
  }

  guardarRegistro() {
    const nuevoTratamiento: Treatment = {
      id: `T${this.treatments.length + 1}`,
      name: `Control Diario ${new Date().toLocaleDateString()}`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      status: 'En curso',
      doctorName: 'Paciente',
      progress: 100,
      medications: [],
      currentSession: 1,
      totalSessions: 1,
      frequency: 'Diario',
      registroDiario: { ...this.registroDiario } // se añade el registro
    };

    this.treatments.unshift(nuevoTratamiento);

    const diaActual = new Date().getDay();
    if (diaActual >= 1 && diaActual <= 7) {
      this.semana[diaActual - 1].cumplido = true;
    }

    alert('Registro diario guardado correctamente');
    this.cerrarRegistro();
  }

  marcarCumplimiento(dia: { dia: string; cumplido: boolean }) {
    dia.cumplido = !dia.cumplido;
  }

  verDetalles(t: Treatment) {
    alert(`Tratamiento: ${t.name}\nDoctor: ${t.doctorName}`);
  }

  descargarResumen(t: Treatment) {
    const resumen = `Tratamiento: ${t.name}\nInicio: ${t.startDate}\nFin: ${t.endDate}\nEstado: ${t.status}`;
    const blob = new Blob([resumen], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${t.name}_resumen.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
