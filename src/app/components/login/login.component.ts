import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="login-container">
      <div class="login-box">
        <h1>Moneytolia</h1>
        <div class="form-group">
          <label for="username">Kullanıcı Adı</label>
          <input 
            type="text" 
            id="username" 
            [(ngModel)]="username" 
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Şifre</label>
          <input 
            type="password" 
            id="password" 
            [(ngModel)]="password" 
            required
            class="form-control"
          />
        </div>
        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button (click)="login()" class="login-button">Giriş Yap</button>
        <div class="login-info">
          <p>Kullanıcı adı: admin</p>
          <p>Şifre: admin123</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    
    .login-box {
      width: 350px;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #4a90e2;
    }
    
    .login-button {
      width: 100%;
      padding: 0.75rem;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .login-button:hover {
      background-color: #3a7bc8;
    }
    
    .error-message {
      color: #e53935;
      margin-bottom: 1rem;
      text-align: center;
    }
    
    .login-info {
      margin-top: 1rem;
      border-top: 1px solid #eee;
      padding-top: 1rem;
      font-size: 0.875rem;
      color: #666;
    }
    
    .login-info p {
      margin: 0.25rem 0;
    }
  `]
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