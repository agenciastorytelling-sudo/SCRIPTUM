import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { 
  Script, 
  ScriptRental, 
  IpWhitelist, 
  WhatsAppConfig, 
  PaymentCheckout,
  PaymentStatus as PaymentStatusModel
} from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  // Scripts
  getScripts(filters?: any): Observable<Script[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }
    return this.http.get<Script[]>(`${environment.apiUrl}/scripts`, { 
      headers: this.getHeaders(),
      params 
    });
  }

  getScript(id: number): Observable<Script> {
    return this.http.get<Script>(`${environment.apiUrl}/scripts/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Script Rentals
  getMyRentals(): Observable<ScriptRental[]> {
    return this.http.get<ScriptRental[]>(`${environment.apiUrl}/rentals/my`, {
      headers: this.getHeaders()
    });
  }

  // IP Whitelist
  getMyWhitelist(): Observable<IpWhitelist[]> {
    return this.http.get<IpWhitelist[]>(`${environment.apiUrl}/whitelist/my`, {
      headers: this.getHeaders()
    });
  }

  addIpToWhitelist(ip: string, note?: string): Observable<IpWhitelist> {
    return this.http.post<IpWhitelist>(`${environment.apiUrl}/whitelist`, {
      ip,
      note
    }, { headers: this.getHeaders() });
  }

  removeIpFromWhitelist(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/whitelist/${id}`, {
      headers: this.getHeaders()
    });
  }

  // WhatsApp Config
  getMyWhatsAppConfig(): Observable<WhatsAppConfig | null> {
    return this.http.get<WhatsAppConfig>(`${environment.apiUrl}/whatsapp/my`, {
      headers: this.getHeaders()
    });
  }

  saveWhatsAppConfig(config: Partial<WhatsAppConfig>): Observable<WhatsAppConfig> {
    return this.http.post<WhatsAppConfig>(`${environment.apiUrl}/whatsapp`, config, {
      headers: this.getHeaders()
    });
  }

  testWhatsAppConfig(): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${environment.apiUrl}/whatsapp/test`, {}, {
      headers: this.getHeaders()
    });
  }

  // Payments
  createCheckout(scriptIds: number[]): Observable<PaymentCheckout> {
    return this.http.post<PaymentCheckout>(`${environment.apiUrl}/payments/checkout`, {
      scriptIds
    }, { headers: this.getHeaders() });
  }

  getPaymentStatus(paymentId: string): Observable<PaymentStatusModel> {
    return this.http.get<PaymentStatusModel>(`${environment.apiUrl}/payments/${paymentId}/status`, {
      headers: this.getHeaders()
    });
  }

  // Admin endpoints
  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/clients`, {
      headers: this.getHeaders()
    });
  }

  getAllRentals(): Observable<ScriptRental[]> {
    return this.http.get<ScriptRental[]>(`${environment.apiUrl}/admin/rentals`, {
      headers: this.getHeaders()
    });
  }

  createScript(script: Partial<Script>): Observable<Script> {
    return this.http.post<Script>(`${environment.apiUrl}/admin/scripts`, script, {
      headers: this.getHeaders()
    });
  }

  updateScript(id: number, script: Partial<Script>): Observable<Script> {
    return this.http.put<Script>(`${environment.apiUrl}/admin/scripts/${id}`, script, {
      headers: this.getHeaders()
    });
  }

  deleteScript(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/scripts/${id}`, {
      headers: this.getHeaders()
    });
  }
}