import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, LanguageCode } from '../../services/language.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, TranslateModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  currentLang: LanguageCode;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService
  ) {
    this.currentLang = this.languageService.getCurrentLanguageValue();
  }

  logout(): void {
    this.authService.logout();
  }

  changeLanguage(lang: LanguageCode): void {
    this.languageService.changeLanguage(lang);
    this.currentLang = lang;
  }
} 