import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type LanguageCode = 'tr' | 'en';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLanguageSubject = new BehaviorSubject<LanguageCode>('tr');

    constructor(private translateService: TranslateService) {
        this.init();
    }

    init(): void {
        // Tarayıcıdan kaydedilmiş dil tercihini kontrol et
        const savedLang = localStorage.getItem('language') as LanguageCode;

        // Eğer kaydedilmiş bir dil tercihi varsa, onu kullan
        if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
            this.currentLanguageSubject.next(savedLang);
        } else {
            // Yoksa tarayıcı dilini kontrol et
            const browserLang = this.translateService.getBrowserLang();
            const defaultLang = browserLang === 'tr' ? 'tr' : 'en';
            this.currentLanguageSubject.next(defaultLang as LanguageCode);
            localStorage.setItem('language', defaultLang);
        }

        // Mevcut dili ve fallback dilini ayarla
        this.translateService.use(this.currentLanguageSubject.value);
        this.translateService.setDefaultLang('tr');
    }

    changeLanguage(lang: LanguageCode): void {
        this.translateService.use(lang);
        this.currentLanguageSubject.next(lang);
        localStorage.setItem('language', lang);
    }

    getCurrentLanguage(): Observable<LanguageCode> {
        return this.currentLanguageSubject.asObservable();
    }

    getCurrentLanguageValue(): LanguageCode {
        return this.currentLanguageSubject.value;
    }
} 