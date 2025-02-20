import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PeopleServiceService } from '../../services/peeps/people-service.service';
import {User} from "../../model/user";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  currentStep: number = 0;
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: PeopleServiceService) {
    this.form = this.fb.group({
      user_firstName: ['', Validators.required],
      user_lastName: [''],
      user_phoneNr: [''],
      user_email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  nextStep() {
    if (this.currentStep < 1) {
      this.currentStep++;
    } else {
      this.submitForm();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      const newUser: User = {
        id: 0,
        first_name: this.form.value.user_firstName,
        last_name: this.form.value.user_lastName,
        phone_nr: this.form.value.user_phoneNr,
        email: this.form.value.user_email,
        username: this.form.value.username,
        password: this.form.value.password,
        user_type: 'user',
        is_enabled: false
      };

      this.userService.addUser(newUser).subscribe(
        response => {
          console.log('User added:', response);
          alert('User registered successfully!');
          this.form.reset();
          this.currentStep = 0;
        },
        error => {
          console.error('Error registering user:', error);
          alert('Failed to register. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
