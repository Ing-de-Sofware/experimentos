export interface Message {
  sender: string; // email o tipo: 'admin' o 'paciente'
  receiver: string; // destino del mensaje
  content: string;
  timestamp: string;
  file?: { name: string; url: string }; // opcional
}

// Nota: Los mockMessages se actualizan para reflejar la nueva estructura.
// Se asume que 'sender' y 'receiver' ahora almacenarán identificadores como emails.
// El campo 'id' se ha eliminado según la nueva especificación.
// Los campos 'receiverId', 'from', 'to' han sido reemplazados por 'receiver'.
const mockMessages: Message[] = [
  // Pedro Sanchez – TCK-004
  {
    sender: 'pedro@patient.hormonalcare.com', // Anteriormente 'user', 'from'
    receiver: 'admin@hormonalcare.com',      // Anteriormente 'admin', 'to', 'receiverId'
    content: 'Hi, I’m not getting my medication reminders.',
    timestamp: '2025-06-10T15:21:00Z'
  },
  {
    sender: 'admin@hormonalcare.com',        // Anteriormente 'admin', 'from'
    receiver: 'pedro@patient.hormonalcare.com', // Anteriormente 'user', 'to', 'receiverId'
    content: 'We’re checking your reminder configuration. Thanks!',
    timestamp: '2025-06-10T15:25:00Z'
  },

  // Dr. Laura Martinez – TCK-005 (Asumiendo que un doctor también puede chatear con admin)
  {
    sender: 'laura@doctor.hormonalcare.com',
    receiver: 'admin@hormonalcare.com',
    content: 'My patient history page shows blank.',
    timestamp: '2025-06-12T08:46:00Z'
  },
  {
    sender: 'admin@hormonalcare.com',
    receiver: 'laura@doctor.hormonalcare.com',
    content: 'Could you share a screenshot of the issue?',
    timestamp: '2025-06-12T08:47:00Z'
  },

  // Marco Rojas – TCK-006
  {
    sender: 'marco@patient.hormonalcare.com',
    receiver: 'admin@hormonalcare.com',
    content: 'App crashes every time after login.',
    timestamp: '2025-06-01T12:11:00Z'
  },
  {
    sender: 'admin@hormonalcare.com',
    receiver: 'marco@patient.hormonalcare.com',
    content: 'Thanks Marco, we’ll release a fix in the next update.',
    timestamp: '2025-06-01T12:15:00Z'
  },

  // Dr. Andrea Paredes – TCK-007
  {
    sender: 'andrea@doctor.hormonalcare.com',
    receiver: 'admin@hormonalcare.com',
    content: 'Lab results won’t open for patient #4532.',
    timestamp: '2025-06-13T17:02:00Z'
  },
  {
    sender: 'admin@hormonalcare.com',
    receiver: 'andrea@doctor.hormonalcare.com',
    content: 'We’re checking access permissions for that lab report.',
    timestamp: '2025-06-13T17:06:00Z'
  },

  // Lucia Fernandez – TCK-008
  {
    sender: 'lucia@patient.hormonalcare.com',
    receiver: 'admin@hormonalcare.com',
    content: 'No doctor is listed on my profile page.',
    timestamp: '2025-06-05T09:31:00Z'
  },
  {
    sender: 'admin@hormonalcare.com',
    receiver: 'lucia@patient.hormonalcare.com',
    content: 'We’ve assigned Dr. Laura Martinez to you.',
    timestamp: '2025-06-05T09:33:00Z'
  },

  // Dr. Rafael Castillo – TCK-009
  {
    sender: 'rafael@doctor.hormonalcare.com',
    receiver: 'admin@hormonalcare.com',
    content: 'Platform gets very slow during virtual consults.',
    timestamp: '2025-06-14T20:01:00Z'
  },
  {
    sender: 'admin@hormonalcare.com',
    receiver: 'rafael@doctor.hormonalcare.com',
    content: 'Thanks for reporting. We’re monitoring server usage.',
    timestamp: '2025-06-14T20:05:00Z'
  }
];
