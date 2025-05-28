import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { PeopleServiceService } from '../../services/peeps/people-service.service';
import {User} from "../../model/user";
import {AuthService} from "../../services/auth/auth.service";

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

  constructor(private fb: FormBuilder, private userService: PeopleServiceService,
               private router: Router) { //private authService: AuthService,
    this.form = this.fb.group({
      user_firstName: ['', Validators.required],
      user_lastName: [''],
      user_phoneNr: [''],
      user_email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      user_type: ['user'],
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

      if(this.form.value.password !== this.form.value.passwordConfirm) {
        alert('Passwords do not match.');
        return;
      }

      const newUser = new User(
        0,
        this.form.value.user_email as string,
        this.form.value.username as string,
        this.form.value.user_firstName as string,
        this.form.value.user_lastName as string,
        this.form.value.user_phoneNr as string,
        false,
        this.form.value.user_email as string,
        // 'user',
        this.form.value.password as string
      );

      //add user in firebase-authenthicator
      // this.authService.register(this.form.value.user_email, this.form.value.password)
      //   .then(() => {
      //     //console.log('Login successful');
      //     this.router.navigate(['/']);
      //   })
      //   .catch(error => {
      //     console.error('Login failed:', error.message);
      //   });

      //add user in big db
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
    localStorage.setItem('user_email', this.form.value.user_email);
    localStorage.setItem('user_type', this.form.value.user_type);
    this.router.navigate(['/']);
  }
}
