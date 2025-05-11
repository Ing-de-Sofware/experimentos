export class MedicalEntity {
  id: number;
  firstName: string ;
  lastName: string ;
  gender: string ;
  age :number;
  weight: number;
  phoneNumber: string ;
  email: string ;
  Image: string ;
  birthday: Date ;
  professionalIdentificationNumber:  string;
  subSpecialty:  string;
  certification:  string;
  appointmentFee:  number ;
  subscriptionId:  number ;
  fullName: string;



  constructor() {
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.gender = "";
    this.age = 0;
    this.weight = 0;
    this.phoneNumber = "";
    this.email = "";
    this.Image = "";
    this.birthday = new Date();
    this.professionalIdentificationNumber = "";
    this.subSpecialty = "";
    this.certification = "";
    this.appointmentFee = 0;
    this.subscriptionId = 0;

  }
}
