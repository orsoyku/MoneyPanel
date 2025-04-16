import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    template: `
    <div class="app-container">
      <header class="app-header">
        <div class="logo">
          <h1>Moneytolia</h1>
          <img src="assets/logo.svg" alt="Moneytolia Logo" class="logo-image" />
        </div>
        <div class="user-actions">
          <button (click)="logout()" class="logout-button">Çıkış Yap</button>
        </div>
      </header>
      <div class="main-content">
        <aside class="sidebar">
          <nav>
            <ul>
              <li>
                <a routerLink="/dashboard" routerLinkActive="active">Kampanya Listesi</a>
              </li>
              <li>
                <a routerLink="/campaign/create" routerLinkActive="active">Kampanya Oluştur</a>
              </li>
            </ul>
          </nav>
        </aside>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
    styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      height: 60px;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }
    
    .logo {
      display: flex;
      align-items: center;
    }
    
    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }
    
    .logo-image {
      height: 40px;
      margin-left: 12px;
    }
    
    .logout-button {
      padding: 0.5rem 1rem;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.3s;
    }
    
    .logout-button:hover {
      background-color: #d32f2f;
    }
    
    .main-content {
      display: flex;
      flex: 1;
    }
    
    .sidebar {
      width: 250px;
      background-color: #2c3e50;
      color: white;
      padding: 1.5rem 0;
    }
    
    .sidebar nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .sidebar nav li {
      margin-bottom: 0.5rem;
    }
    
    .sidebar nav a {
      display: block;
      padding: 0.75rem 1.5rem;
      color: #ecf0f1;
      text-decoration: none;
      transition: background-color 0.3s;
    }
    
    .sidebar nav a:hover {
      background-color: #34495e;
    }
    
    .sidebar nav a.active {
      background-color: #3498db;
      font-weight: 500;
    }
    
    .content {
      flex: 1;
      padding: 2rem;
      background-color: #f9f9f9;
    }
  `]
})
export class LayoutComponent {
    constructor(private authService: AuthService) { }

    logout(): void {
        this.authService.logout();
    }
} 