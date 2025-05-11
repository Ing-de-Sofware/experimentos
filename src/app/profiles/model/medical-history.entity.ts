export class TreatmentAndMedication {
  drug_name: string;
  quantity: string;
  concentration: string;
  frequency: string;
  duration: string;

  constructor() {
    this.drug_name = "";
    this.quantity = "";
    this.concentration = "";
    this.frequency = "";
    this.duration = "";
  }
}

export class MedicalHistoryEntity {
  id: string;
  patient_id: number;
  doctors_id: number[];
  date: string;
  reason: string;
  symptoms: string[];
  weight: number;
  personal_background: string | string[];
  family_background: string;
  lab_results_id: number;
  physical_test: string;
  external_reports: string[];
  medical_exams: string[];
  diagnostic: string[];
  treatment_and_medication: TreatmentAndMedication[];

  constructor() {
    this.id = "";
    this.patient_id = 0;
    this.doctors_id = [];
    this.date = "";
    this.reason = "";
    this.weight = 0;
    this.symptoms = [];
    this.personal_background = "";
    this.family_background = "";
    this.lab_results_id = 0;
    this.physical_test = "";
    this.external_reports = [];
    this.medical_exams = [];
    this.diagnostic = [];
    this.treatment_and_medication = [];
  }
}
