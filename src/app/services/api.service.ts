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
    // Para demonstração, retornamos dados mockados
    const mockScripts: Script[] = [
      {
        id: 1,
        name: 'Tablet Organizações',
        slug: 'tablet-organizacoes',
        price: 99.00,
        description: 'Tablet para gestão de organização com tudo de mais novo, e com um designer fácil de usar e colocar no seu servidor!',
        shortDescription: 'Tablet para gestão de organização',
        isActive: true,
        imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Sistema de Banco',
        slug: 'sistema-banco',
        price: 149.00,
        description: 'Sistema completo de banco para seu servidor FiveM com interface moderna e segura.',
        shortDescription: 'Sistema bancário completo',
        isActive: true,
        imageUrl: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'HUD Personalizado',
        slug: 'hud-personalizado',
        price: 79.00,
        description: 'HUD moderno e customizável para uma experiência única no seu servidor.',
        shortDescription: 'HUD moderno e customizável',
        isActive: false,
        imageUrl: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockScripts);
        observer.complete();
      }, 500);
    });
  }

  getScript(id: number): Observable<Script> {
    return this.http.get<Script>(`${environment.apiUrl}/scripts/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Script Rentals
  getMyRentals(): Observable<ScriptRental[]> {
    // Dados mockados para demonstração
    const mockRentals: ScriptRental[] = [
      {
        id: 1,
        clientId: 1,
        scriptId: 1,
        script: {
          id: 1,
          name: 'Tablet Organizações',
          slug: 'tablet-organizacoes',
          price: 99.00,
          description: 'Tablet para gestão de organização',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        paymentStatus: 'APPROVED' as any,
        createdAt: new Date()
      }
    ];
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockRentals);
        observer.complete();
      }, 300);
    });
  }

  // IP Whitelist
  getMyWhitelist(): Observable<IpWhitelist[]> {
    // Dados mockados para demonstração
    const mockWhitelist: IpWhitelist[] = [
      {
        id: 1,
        clientId: 1,
        ip: '192.168.1.100',
        note: 'Servidor principal',
        createdAt: new Date()
      }
    ];
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockWhitelist);
        observer.complete();
      }, 300);
    });
  }

  addIpToWhitelist(ip: string, note?: string): Observable<IpWhitelist> {
    // Simulação para demonstração
    const newEntry: IpWhitelist = {
      id: Date.now(),
      clientId: 1,
      ip: ip,
      note: note,
      createdAt: new Date()
    };
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(newEntry);
        observer.complete();
      }, 500);
    });
  }

  removeIpFromWhitelist(id: number): Observable<void> {
    // Simulação para demonstração
    return new Observable(observer => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 300);
    });
  }

  // WhatsApp Config
  getMyWhatsAppConfig(): Observable<WhatsAppConfig | null> {
    // Dados mockados para demonstração
    const mockConfig: WhatsAppConfig = {
      id: 1,
      clientId: 1,
      instanceName: 'meu-bot-demo',
      apiKey: '****hidden****',
      webhookUrl: 'https://exemplo.com/webhook',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockConfig);
        observer.complete();
      }, 300);
    });
  }

  saveWhatsAppConfig(config: Partial<WhatsAppConfig>): Observable<WhatsAppConfig> {
    // Simulação para demonstração
    const savedConfig: WhatsAppConfig = {
      id: 1,
      clientId: 1,
      instanceName: config.instanceName || '',
      apiKey: config.apiKey || '',
      webhookUrl: config.webhookUrl || '',
      isActive: config.isActive || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(savedConfig);
        observer.complete();
      }, 500);
    });
  }

  testWhatsAppConfig(): Observable<{ success: boolean; message: string }> {
    // Simulação para demonstração
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Configuração testada com sucesso! (modo demonstração)'
        });
        observer.complete();
      }, 1000);
    });
  }

  // Payments
  createCheckout(scriptIds: number[]): Observable<PaymentCheckout> {
    // Simulação para demonstração
    const mockCheckout: PaymentCheckout = {
      paymentId: 'demo_' + Date.now(),
      qrCodeBase64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      copyPasteCode: '00020126580014BR.GOV.BCB.PIX0136demo-pix-code-for-demonstration5204000053039865802BR5925DEMO MERCHANT6009SAO PAULO62070503***6304ABCD',
      amount: 99.00
    };
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockCheckout);
        observer.complete();
      }, 1000);
    });
  }

  getPaymentStatus(paymentId: string): Observable<PaymentStatusModel> {
    // Simulação para demonstração
    const mockStatus: PaymentStatusModel = {
      id: paymentId,
      status: 'pending',
      amount: 99.00,
      createdAt: new Date()
    };
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockStatus);
        observer.complete();
      }, 500);
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