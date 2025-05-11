export class PatientEntity {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  weight: number;
  phoneNumber: string;
  email: string;
  image: string;
  birthday: string;
  typeofblood: string;

  constructor() {
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.gender = "";
    this.weight = 0;
    this.age = 0;
    this.phoneNumber = "";
    this.email = "";
    this.image = "";
    this.birthday = "";
    this.typeofblood = "";
  }
}
