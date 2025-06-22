export interface AnnouncementEntity {
  id: string;
  title: string;
  description: string;
  message: string;
  audience: 'patients' | 'doctors' | 'all'; // ✅ incluye 'all'
  createdAt: string;
  isRead?: boolean;
}
