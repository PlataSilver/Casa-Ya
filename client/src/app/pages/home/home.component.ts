import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomeHeaderComponent } from '../../layout/home-header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HomeHeaderComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  name: string = '';
  email: string = '';

  onSignup() {
    if (this.name && this.email) {
      const signupInfo = {
        name: this.name,
        email: this.email,
        timestamp: new Date().toISOString()
      };

      // Store signup info in localStorage
      const existingSignups = JSON.parse(localStorage.getItem('signups') || '[]');
      existingSignups.push(signupInfo);
      localStorage.setItem('signups', JSON.stringify(existingSignups));

      console.log('Signup successful', signupInfo);
      this.name = '';
      this.email = '';
      alert('Thank you for signing up! We will contact you soon.');
    } else {
      alert('Please enter both name and email.');
    }
  }
}
