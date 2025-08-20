import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Client | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        this.currentUserSubject.next(JSON.parse(user));
      } catch (error) {
        this.logout();
      }
    }
  }

  loginWithDiscord(): void {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${environment.discordClientId}&redirect_uri=${encodeURIComponent(environment.discordRedirectUri)}&response_type=code&scope=identify%20email%20guilds`;
    window.location.href = discordAuthUrl;
  }

  handleDiscordCallback(code: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/discord/callback`, { code })
      .pipe(
        tap((response: any) => {
          if (response.token && response.user) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles.includes('ADMIN' as any) || false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): Client | null {
    return this.currentUserSubject.value;
  }
}