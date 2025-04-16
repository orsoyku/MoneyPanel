import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

    // Default username and password
    private readonly USERNAME = 'admin';
    private readonly PASSWORD = 'admin123';

    constructor(private router: Router) {
        this.checkAuthStatus();
    }

    login(username: string, password: string): boolean {
        if (username === this.USERNAME && password === this.PASSWORD) {
            localStorage.setItem('isAuthenticated', 'true');
            this.isAuthenticatedSubject.next(true);
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem('isAuthenticated');
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    private checkAuthStatus(): void {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        this.isAuthenticatedSubject.next(isAuthenticated);
    }
} 