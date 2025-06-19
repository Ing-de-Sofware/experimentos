export interface Message {
  id: number;
  sender: 'admin' | 'user';
  receiverId: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
}
const mockMessages: Message[] = [
  // Pedro Sanchez – TCK-004
  {
    id: 1001,
    sender: 'user',
    receiverId: 'admin@hormonalcare.com',
    from: 'pedro@patient.hormonalcare.com',
    to: 'admin@hormonalcare.com',
    content: 'Hi, I’m not getting my medication reminders.',
    timestamp: '2025-06-10T15:21:00Z'
  },
  {
    id: 1002,
    sender: 'admin',
    receiverId: 'pedro@patient.hormonalcare.com',
    from: 'admin@hormonalcare.com',
    to: 'pedro@patient.hormonalcare.com',
    content: 'We’re checking your reminder configuration. Thanks!',
    timestamp: '2025-06-10T15:25:00Z'
  },

  // Dr. Laura Martinez – TCK-005
  {
    id: 1003,
    sender: 'user',
    receiverId: 'admin@hormonalcare.com',
    from: 'laura@doctor.hormonalcare.com',
    to: 'admin@hormonalcare.com',
    content: 'My patient history page shows blank.',
    timestamp: '2025-06-12T08:46:00Z'
  },
  {
    id: 1004,
    sender: 'admin',
    receiverId: 'laura@doctor.hormonalcare.com',
    from: 'admin@hormonalcare.com',
    to: 'laura@doctor.hormonalcare.com',
    content: 'Could you share a screenshot of the issue?',
    timestamp: '2025-06-12T08:47:00Z'
  },

  // Marco Rojas – TCK-006
  {
    id: 1005,
    sender: 'user',
    receiverId: 'admin@hormonalcare.com',
    from: 'marco@patient.hormonalcare.com',
    to: 'admin@hormonalcare.com',
    content: 'App crashes every time after login.',
    timestamp: '2025-06-01T12:11:00Z'
  },
  {
    id: 1006,
    sender: 'admin',
    receiverId: 'marco@patient.hormonalcare.com',
    from: 'admin@hormonalcare.com',
    to: 'marco@patient.hormonalcare.com',
    content: 'Thanks Marco, we’ll release a fix in the next update.',
    timestamp: '2025-06-01T12:15:00Z'
  },

  // Dr. Andrea Paredes – TCK-007
  {
    id: 1007,
    sender: 'user',
    receiverId: 'admin@hormonalcare.com',
    from: 'andrea@doctor.hormonalcare.com',
    to: 'admin@hormonalcare.com',
    content: 'Lab results won’t open for patient #4532.',
    timestamp: '2025-06-13T17:02:00Z'
  },
  {
    id: 1008,
    sender: 'admin',
    receiverId: 'andrea@doctor.hormonalcare.com',
    from: 'admin@hormonalcare.com',
    to: 'andrea@doctor.hormonalcare.com',
    content: 'We’re checking access permissions for that lab report.',
    timestamp: '2025-06-13T17:06:00Z'
  },

  // Lucia Fernandez – TCK-008
  {
    id: 1009,
    sender: 'user',
    receiverId: 'admin@hormonalcare.com',
    from: 'lucia@patient.hormonalcare.com',
    to: 'admin@hormonalcare.com',
    content: 'No doctor is listed on my profile page.',
    timestamp: '2025-06-05T09:31:00Z'
  },
  {
    id: 1010,
    sender: 'admin',
    receiverId: 'lucia@patient.hormonalcare.com',
    from: 'admin@hormonalcare.com',
    to: 'lucia@patient.hormonalcare.com',
    content: 'We’ve assigned Dr. Laura Martinez to you.',
    timestamp: '2025-06-05T09:33:00Z'
  },

  // Dr. Rafael Castillo – TCK-009
  {
    id: 1011,
    sender: 'user',
    receiverId: 'admin@hormonalcare.com',
    from: 'rafael@doctor.hormonalcare.com',
    to: 'admin@hormonalcare.com',
    content: 'Platform gets very slow during virtual consults.',
    timestamp: '2025-06-14T20:01:00Z'
  },
  {
    id: 1012,
    sender: 'admin',
    receiverId: 'rafael@doctor.hormonalcare.com',
    from: 'admin@hormonalcare.com',
    to: 'rafael@doctor.hormonalcare.com',
    content: 'Thanks for reporting. We’re monitoring server usage.',
    timestamp: '2025-06-14T20:05:00Z'
  }
];
