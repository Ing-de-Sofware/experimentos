export class ProfilesEntity {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  phoneNumber: string;
  email: string;
  image: string;
  birthday: string;
  fullName: string;
  patientRecordId: string;

  constructor() {
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.gender = "";
    this.age = 0;
    this.phoneNumber = "";
    this.email = "";
    this.image = "";
    this.birthday = "";
  }
}
