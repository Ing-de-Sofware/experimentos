export interface AnnouncementEntity {
  id: number;
  message: string;
  audience: 'medico' | 'paciente';
  createdAt: string;
}
