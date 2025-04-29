import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatFormField} from "@angular/material/form-field";

import {MatButton} from "@angular/material/button";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {JsonPipe} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";


interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-patients-upload-exam',
  templateUrl: './patients-upload-exam.component.html',
  styleUrl: './patients-upload-exam.component.css'
})
export class PatientsUploadExamComponent {

  animal: string = '';
  name: string = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name, animal: this.animal},
      width: '600px', // Cambia esto al ancho que desees
      height: '500px',
    });
    dialogRef.afterOpened().subscribe(() => {
      dialogRef.addPanelClass('my-dialog');
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview.html',standalone: true,
  styleUrls: ['./patients-upload-exam.component.css'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,

    MatButton,
    FormsModule,
    MatInput,
    JsonPipe,
    MatCheckbox,
    ReactiveFormsModule,
  ],
})

export class DialogOverviewExampleDialog {
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
