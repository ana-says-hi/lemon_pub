import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {User} from "../../model/user";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  currentStep: number = 0;
  //form: FormGroup;
  formData: {
      user_firstName: string,
      user_lastName: string,
      user_phoneNr: string,
      user_email: string
      username: string,
      password: string,
      passwordConfirm: string
  }

  constructor(private fb: FormBuilder) {
    //console.log('consrtuctor');
    this.formData = {
      user_firstName: '',
      user_lastName: '',
      user_phoneNr: '',
      user_email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    };
    // this.form = this.fb.group({
    //     firstName: new FormControl(),
    //     //firstName: ['', Validators.required],
    //     lastName: [''],
    //     phone: ['',],
    //     email: ['', [Validators.required, Validators.email]],
    //     username: ['', Validators.required],
    //     password: ['', Validators.required],
    //     confirmPassword: ['', Validators.required]
    // });
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
    console.log('Form submitted');
    // if (this.form.valid) {
    //   this.formData = {
    //     // personalDetails: this.form.get('personalDetails')?.value,
    //     // accountDetails: this.form.get('accountDetails')?.value,
    //   };
    //   console.log('Form submitted:', this.formData);
    // } else {
    //   console.log('Form is invalid');
    // }
  }

}
