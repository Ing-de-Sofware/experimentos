export class MedicationEntity {
  id: number;
  medicalRecordId: number;
  medicalTypeId: number;
  prescriptionId: number;
  name: string;
  amount: number;
  unitQ: string;
  value: number;
  unit: string;
  timesPerDay: number;
  timePeriod: string;
  drugName: string;
  quantity: string;
  concentration: string;
  frequency: string;
  duration: string;

  constructor() {
    this.id = 0;
    this.medicalRecordId = 0;
    this.medicalTypeId = 0;
    this.prescriptionId = 0;
    this.name = "";
    this.amount = 0;
    this.unitQ = "";
    this.value = 0;
    this.unit = "";
    this.timesPerDay = 0;
    this.timePeriod = "";
    this.drugName = "";
    this.quantity = "";
    this.concentration = "";
    this.frequency = "";
    this.duration = "";
  }
}
