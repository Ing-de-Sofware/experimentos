import { MatTableDataSource } from '@angular/material/table';
export interface LogEntry {
  timestamp: string;
  user: string;
  eventType: string;
  ipAddress: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  location?: string;
  device?: string;
  actionId?: string;
}
