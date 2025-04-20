import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, LanguageCode } from '../../services/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  currentLang: LanguageCode;

  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.currentLang = this.languageService.getCurrentLanguageValue();
  }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'LOGIN.ERROR.REQUIRED';
      return;
    }

    const isAuthenticated = this.authService.login(this.username, this.password);

    if (isAuthenticated) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'LOGIN.ERROR.INVALID';
    }
  }

  changeLanguage(lang: LanguageCode): void {
    this.languageService.changeLanguage(lang);
    this.currentLang = lang;
  }
} 