export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  sub_speciality?: string;    // Nueva propiedad
  schoolNumber?: string;    // Nueva propiedad
  rne?: string;             // Nueva propiedad
  undergraduate?: string;   // Nueva propiedad
  postgraduate?: string;    // Nueva propiedad
  image: string;
  price: number;
  rating: number;
  availability?: string[];
  certificates?: string[];  // Nueva propiedad
}
