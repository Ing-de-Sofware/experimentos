import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Mensaje {
  remitente: 'doctor' | 'paciente';
  contenido: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MockChatService {
  private mensajesSubject = new BehaviorSubject<Mensaje[]>([]);
  mensajes$ = this.mensajesSubject.asObservable();

  enviarMensaje(mensaje: Mensaje) {
    const actual = this.mensajesSubject.value;
    this.mensajesSubject.next([...actual, mensaje]);
  }

  limpiarChat() {
    this.mensajesSubject.next([]);
  }
}
