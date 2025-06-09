import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserTypeService } from '../../../../shared/services/user-type.service';
import { PrivacyDialogComponent } from '../../../../shared/components/privacy-dialog/privacy-dialog.component';
import { TermsDialogComponent } from '../../../../shared/components/terms-dialog/terms-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userType: string | null = null;
  recaptchaToken: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userTypeService: UserTypeService,
    private dialog: MatDialog
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
      confirmPassword: ['', Validators.required],
      acceptPolicies: [false, Validators.requiredTrue],
      recaptcha: ['', Validators.required]
    });
  }

  onCaptchaResolved(token: string): void {
    this.recaptchaToken = token;
    this.registerForm.get('recaptcha')?.setValue(token);
    console.log('reCAPTCHA token:', token);
  }

  onSubmit(): void {
    if (this.registerForm.invalid || !this.userType || !this.recaptchaToken) return;

    console.log('Usuario registrado:', this.registerForm.value);
    console.log('Rol:', this.userType);
    console.log('reCAPTCHA:', this.recaptchaToken);

    if (this.userType === 'patient') {
      this.router.navigate(['/homePatient']);
    } else if (this.userType === 'endocrinologist') {
      this.router.navigate(['/homeDoctor']);
    } else if (this.userType === 'admin') {
      this.router.navigate(['/admin']).then();
    }
  }

  openPrivacyDialog(event: Event): void {
    event.preventDefault();
    this.dialog.open(PrivacyDialogComponent);
  }

  openTermsDialog(event: Event): void {
    event.preventDefault();
    this.dialog.open(TermsDialogComponent);
  }
}
