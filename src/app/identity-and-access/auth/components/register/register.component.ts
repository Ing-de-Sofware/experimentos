import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserTypeService } from '../../../../shared/services/user-type.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userType: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userTypeService: UserTypeService
  ) {}

  ngOnInit(): void {
    this.userType = this.userTypeService.getUserType();

    if (!this.userType) {
      this.router.navigate(['/selectRole']);
      return;
    }

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid || !this.userType) return;

    console.log('Usuario registrado:', this.registerForm.value);
    console.log('Rol:', this.userType);

    // 🔁 Redirección según el rol simulado
    if (this.userType === 'patient') {
      this.router.navigate(['/homePatient']);
    } else if (this.userType === 'endocrinologist') {
      this.router.navigate(['/homeDoctor']);
    } else if (this.userType === 'admin') {
      this.router.navigate(['/adminDashboard']);
    }
  }
}
