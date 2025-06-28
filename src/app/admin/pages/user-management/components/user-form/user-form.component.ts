import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

export interface UserFormData {
  name: string;
  email: string;
  role: 'Paciente' | 'Doctor' | 'Admin';
  status: 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() userData: UserFormData | null = null;
  @Output() formSubmit = new EventEmitter<UserFormData>();
  @Output() cancel = new EventEmitter<void>();

  get nameCtrl() {
    return this.userForm.get('name');
  }

  get emailCtrl() {
    return this.userForm.get('email');
  }

  get roleCtrl() {
    return this.userForm.get('role');
  }

  get statusCtrl() {
    return this.userForm.get('status');
  }





  userForm: FormGroup;

  roles = ['Paciente', 'Doctor', 'Admin'];
  statuses = ['Activo', 'Inactivo'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.userData) {
      this.userForm.patchValue(this.userData);
    }
  }

  submitForm(): void {
    if (this.userForm.valid) {
      this.formSubmit.emit(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }


}
