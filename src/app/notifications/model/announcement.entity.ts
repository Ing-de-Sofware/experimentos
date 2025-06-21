export interface AnnouncementEntity {
  id: string;
  message: string;
  audience: 'patients' | 'doctors';
  createdAt: string;
  isRead?:boolean;
  title: string;
  description: string;
}
