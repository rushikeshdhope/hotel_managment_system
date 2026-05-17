// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(role: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}
