export class MedicalAppointmentEntity {
  id: number;
  eventDate: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  doctorId: number;
  patientId: number;

  constructor() {
    this.id = 0;
    this.eventDate = "";
    this.startTime = "";
    this.endTime = "";
    this.title = "";
    this.description = "";
    this.doctorId = 0;
    this.patientId = 0;
  }
}
