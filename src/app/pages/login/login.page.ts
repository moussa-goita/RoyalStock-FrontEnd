<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {IonicModule} from "@ionic/angular";
=======
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { AuthService } from 'src/app/services/auth.service';
>>>>>>> goita

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule, IonicModule ]
=======
  imports: [CommonModule, FormsModule, IonicModule]
>>>>>>> goita
})
export class LoginPage {

  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    );
  }

}
