import { Injectable } from '@angular/core';
import { Doctor } from '../model/doctor.models';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Juan Egüa',
      specialty: 'Endocrinologist',
      sub_speciality: 'Diabetes and Metabolism',
      schoolNumber: 'CMP 123456',
      rne: 'RNE 654321',
      undergraduate: 'Universidad Nacional Mayor de San Marcos',
      postgraduate: 'Universidad Peruana Cayetano Heredia',
      image: 'assets/images/1.png',
      price: 100,
      rating: 4.8,
      availability: ['Monday 9:00-12:00', 'Wednesday 14:00-17:00'],
      certificates: [
        'assets/images/certificate_1_Juan.jpg',
        'assets/images/certificate_2_Juan.jpg',
      ]
    },
    {
      id: 2,
      name: 'Dr. Lucas Carmona',
      specialty: 'Endocrinologist',
      sub_speciality: 'Thyroid Disorders',
      schoolNumber: 'CMP 234567',
      rne: 'RNE 765432',
      undergraduate: 'Universidad Nacional de Trujillo',
      postgraduate: 'Universidad Científica del Sur',
      image: 'assets/images/2.png',
      price: 120,
      rating: 4.5,
      availability: ['Tuesday 10:00-13:00', 'Thursday 15:00-18:00'],
      certificates: [
        'assets/images/certificate_1_lucas.jpg',
        'assets/images/certificate_2_lucas.jpeg',
      ]
    },
    {
      id: 3,
      name: 'Dr. Rodríguez',
      specialty: 'Endocrinologist',
      sub_speciality: 'Obesity and Nutrition',
      schoolNumber: 'CMP 345678',
      rne: 'RNE 876543',
      undergraduate: 'Universidad Nacional de San Agustín de Arequipa',
      postgraduate: 'Pontificia Universidad Católica del Perú',
      image: 'assets/images/3.jpg',
      price: 100,
      rating: 4.7,
      availability: ['Friday 9:00-12:00', 'Saturday 10:00-13:00'],
      certificates: [
        'assets/images/certificate_1_rodriguez.jpg',
      ]
    },
    {
      id: 4,
      name: 'Dr. Pérez',
      specialty: 'Endocrinologist',
      sub_speciality: 'Pediatric Endocrinology',
      schoolNumber: 'CMP 456789',
      rne: 'RNE 987654',
      undergraduate: 'Universidad Ricardo Palma',
      postgraduate: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
      image: 'assets/images/4.jpg',
      price: 150,
      rating: 4.3,
      availability: ['Monday 13:00-16:00', 'Thursday 10:00-13:00'],
      certificates: [
        'assets/images/certificate_1_perez.jpg',
        'assets/images/certificate_2_perez.jpg',
      ]
    },
    {
      id: 5,
      name: 'Dr. Gómez',
      specialty: 'Endocrinologist',
      sub_speciality: 'Reproductive Endocrinology',
      schoolNumber: 'CMP 567890',
      rne: 'RNE 198765',
      undergraduate: 'Universidad Nacional Federico Villarreal',
      postgraduate: 'Universidad Peruana Cayetano Heredia',
      image: 'assets/images/5.jpg',
      price: 90,
      rating: 4.9,
      availability: ['Wednesday 9:00-12:00', 'Friday 14:00-17:00'],
      certificates: [
        'assets/images/certificate_1_gomez.jpg',
      ]
    },
    {
      id: 6,
      name: 'Dr. Torres',
      specialty: 'Endocrinologist',
      sub_speciality: 'Neuroendocrinology',
      schoolNumber: 'CMP 678901',
      rne: 'RNE 219876',
      undergraduate: 'Universidad Nacional del Altiplano',
      postgraduate: 'Universidad de San Martín de Porres',
      image: 'assets/images/6.jpg',
      price: 120,
      rating: 4.5,
      availability: ['Tuesday 15:00-18:00', 'Saturday 9:00-12:00'],
      certificates: [
        'assets/images/certificate_1_torres.jpg',
        'assets/images/certificate_2_torres.jpg',
      ]
    }
  ];

  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorById(id: number): Doctor | undefined {
    return this.doctors.find(doctor => doctor.id === id);
  }
}
