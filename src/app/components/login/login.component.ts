import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Kullanıcı adı ve şifre zorunludur.';
      return;
    }

    const isAuthenticated = this.authService.login(this.username, this.password);

    if (isAuthenticated) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Kullanıcı adı veya şifre hatalı.';
    }
  }
} 