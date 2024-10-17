import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { User } from '../../../Classes/User';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgIf,
    NgFor,
    MatCheckboxModule,
    MatError,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  user: User = new User();
  repassword: string = '';
  constructor() {
    this.user.dni = '';
    this.user.codiFederat = '';
    this.user.username = '';
    this.user.password = '';
    this.user.email = '';
    this.user.language = '';
  }
  goodLenght: boolean = false;
  public dniValid(): string {
    this.goodLenght = this.user.dni.length === 8;

    if (this.goodLenght === false) {
      if (this.user.dni.length === 0) {
        return 'DNI is required';
      } else {
        return 'DNI must have 8 digits';
      }
    } else {
      return '';
    }
  }
  onkeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.dniValid();
      console.log(this.goodLenght);
    }
  }

  findLetter() {
    let letters: string = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let mynum = parseInt(this.user.dni);
    mynum = (mynum % 23) - 1;
    if (this.user.dni !== undefined && this.user.dni.length === 8) {
      return letters.charAt(mynum);
    }
    return '';
  }
  CodiFederatValid(): string {
    if (this.user.codiFederat === '' || this.user.codiFederat === undefined) {
      return 'Codi federat is required';
    }
    return '';
  }

  UsernameValid() {
    if (this.user.username === '' || this.user.username === undefined) {
      return 'Username is required';
    }
    return '';
  }

  PasswordValid() {
    if (this.user.password === '' || this.user.password === undefined) {
      return 'Password is required';
    }
    return '';
  }
  confirmPass() {
    if (this.repassword === '' || this.repassword === undefined) {
      return 'Confirm Password is required';
    }
    if (this.repassword !== this.user.password) {
      return "Password Doesn't Match ";
    }

    return '';
  }

  isSelected(optionName: string): boolean {
    return this.selectedOptions.some((option) => option.name === optionName);
  }

  maxAllowed: number = 1400;
  totalSelectedValue: number = 0;
  options: { name: string; value: number }[] = [
    { name: '200 mile', value: 200 },
    { name: '400 mile', value: 400 },
    { name: '800 mile', value: 800 },
    { name: '1000 mile', value: 1000 },
  ];
  selectedOptions: { name: string; value: number }[] = [];

  onCheckboxChange(
    option: { name: string; value: number },
    event: MatCheckboxChange
  ) {
    const isChecked = event.checked;
    if (isChecked) {
      if (this.totalSelectedValue + option.value <= this.maxAllowed) {
        this.selectedOptions.push(option);
        this.totalSelectedValue += option.value;
      } else {
        event.source.checked = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You surpassed 1400 miles !',
        });
      }
    } else {
      const index = this.selectedOptions.findIndex(
        (opt) => opt.name === option.name
      );
      if (index > -1) {
        this.selectedOptions.splice(index, 1);
        this.totalSelectedValue -= option.value;
      }
    }
  }
  isDisabled(): boolean {
    return (
      this.user.dni === '' ||
      this.user.codiFederat === '' ||
      this.user.username === '' ||
      this.user.dni === undefined ||
      this.user.codiFederat === undefined ||
      this.user.username === undefined ||
      this.user.dni.length !== 8
    );
  }

  onSubmit() {
    const dniError = this.dniValid();
    const codiFederatError = this.CodiFederatValid();
    const usernameError = this.UsernameValid();
    const passwordError = this.PasswordValid();
    const confirmPasswordError = this.confirmPass();

    const hasError =
      dniError ||
      codiFederatError ||
      usernameError ||
      passwordError ||
      confirmPasswordError;

    if (!hasError && this.selectedOptions.length > 0) {
      Swal.fire({
        title: 'Good job!',
        text: 'Data uploaded successfully!',
        icon: 'success',
      });
    } else {
      let errorMessage = '';

      if (dniError) errorMessage += dniError + '\n';
      if (codiFederatError) errorMessage += codiFederatError + '\n';
      if (usernameError) errorMessage += usernameError + '\n';
      if (passwordError) errorMessage += passwordError + '\n';
      if (confirmPasswordError) errorMessage += confirmPasswordError + '\n';
      if (this.selectedOptions.length === 0) {
        errorMessage += 'At least one option must be selected.\n';
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage.trim(),
      });
    }
  }
}
