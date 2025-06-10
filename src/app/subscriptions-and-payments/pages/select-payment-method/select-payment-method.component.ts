import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  standalone: true,
  imports: [
    MatCardActions,
    MatDivider,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCheckbox,
    MatToolbar
  ],
  styleUrl: './select-payment-method.component.css'
})
export class SelectPaymentMethodComponent {

}
