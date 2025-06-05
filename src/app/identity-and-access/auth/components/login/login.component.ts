import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserTypeService} from "../../../../shared/services/user-type.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  loginError = false;

  // ✅ Usuarios simulados localmente
  MOCK_USERS = [
    { email: 'paciente@gmail.com', password: '123456', role: 'patient' },
    { email: 'doctor@gmail.com', password: '123456', role: 'endocrinologist' },
    { email: 'admin@gmail.com', password: '123456', role: 'admin' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userTypeService: UserTypeService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    this.loginError = false;

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    const foundUser = this.MOCK_USERS.find(
      user =>
        user.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        user.password.trim() === password.trim()
    );

    if (!foundUser) {
      this.loginError = true;
      return;
    }

    console.log('Redirigiendo al dashboard del rol:', foundUser.role);


    this.userTypeService.setUserType(foundUser.role as 'patient' | 'endocrinologist' | 'admin');

    switch (foundUser.role) {
      case 'patient':
        this.router.navigate(['/homePatient']);
        break;
      case 'endocrinologist':
        this.router.navigate(['/homeDoctor']);
        break;
      case 'admin':
        this.router.navigate(['/adminDashboard']);
        break;
      default:
        this.loginError = true;
    }

  }

  goToRegister(): void {
    this.router.navigateByUrl('/selectRole');
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
