import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../shared/services/user-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css']
})
export class HomeDoctorComponent implements OnInit {

  searchTerm: string = '';

  patients = [
    {
      name: 'Diego Jara',
      age: 31,
      typeOfCare: 'First date',
      hour: '8:00 am',
      diagnosis: 'To evaluate',
      alert: '-',
      photo: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Matias Lopez',
      age: 27,
      typeOfCare: 'Second date',
      hour: '10:00 am',
      diagnosis: 'To evaluate',
      alert: '-',
      photo: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Gabriel Ramirez',
      age: 31,
      typeOfCare: 'Third date',
      hour: '12:00 pm',
      diagnosis: 'To evaluate',
      alert: '-',
      photo: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: 'Juan Ramirez',
      age: 28,
      typeOfCare: 'Fifth date',
      hour: '5:00 pm',
      diagnosis: 'To evaluate',
      alert: '-',
      photo: 'https://i.pravatar.cc/150?img=4'
    },
    {
      name: 'Milagros Ramos',
      age: 34,
      typeOfCare: 'Sixth date',
      hour: '7:00 pm',
      diagnosis: 'To evaluate',
      alert: '-',
      photo: 'https://i.pravatar.cc/150?img=5'
    },
    {
      name: 'Camila Flores',
      age: 26,
      typeOfCare: 'Seventh date',
      hour: '11:00 am',
      diagnosis: 'To evaluate',
      alert: '-',
      photo: 'https://i.pravatar.cc/150?img=6'
    }
  ];

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const userType = this.userTypeService.getUserType();

    if (userType !== 'endocrinologist') {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
  }

  get filteredPatients() {
    return this.patients.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
