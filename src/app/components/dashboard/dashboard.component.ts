import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Client, IpWhitelist, ScriptRental, WhatsAppConfig, RentalPaymentStatus } from '../../models/client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: Client | null = null;
  activeTab = 'whitelist';
  
  // Whitelist
  whitelist: IpWhitelist[] = [];
  newIp = '';
  newIpNote = '';
  whitelistLoading = false;
  
  // Rentals
  rentals: ScriptRental[] = [];
  rentalsLoading = false;
  
  // WhatsApp
  whatsappConfig: WhatsAppConfig | null = null;
  whatsappForm = {
    instanceName: '',
    apiKey: '',
    webhookUrl: '',
    isActive: false
  };
  whatsappLoading = false;
  whatsappTesting = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.loadWhitelist();
    this.loadRentals();
    this.loadWhatsAppConfig();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Whitelist methods
  loadWhitelist(): void {
    this.whitelistLoading = true;
    this.apiService.getMyWhitelist().subscribe({
      next: (data) => {
        this.whitelist = data;
        this.whitelistLoading = false;
      },
      error: (err) => {
        console.error('Error loading whitelist:', err);
        this.whitelistLoading = false;
      }
    });
  }

  addIp(): void {
    if (!this.newIp.trim()) return;
    
    this.whitelistLoading = true;
    this.apiService.addIpToWhitelist(this.newIp.trim(), this.newIpNote.trim() || undefined).subscribe({
      next: (newEntry) => {
        this.whitelist.push(newEntry);
        this.newIp = '';
        this.newIpNote = '';
        this.whitelistLoading = false;
      },
      error: (err) => {
        console.error('Error adding IP:', err);
        this.whitelistLoading = false;
      }
    });
  }

  removeIp(id: number): void {
    if (!confirm('Tem certeza que deseja remover este IP?')) return;
    
    this.apiService.removeIpFromWhitelist(id).subscribe({
      next: () => {
        this.whitelist = this.whitelist.filter(item => item.id !== id);
      },
      error: (err) => {
        console.error('Error removing IP:', err);
      }
    });
  }

  // Rentals methods
  loadRentals(): void {
    this.rentalsLoading = true;
    this.apiService.getMyRentals().subscribe({
      next: (data) => {
        this.rentals = data;
        this.rentalsLoading = false;
      },
      error: (err) => {
        console.error('Error loading rentals:', err);
        this.rentalsLoading = false;
      }
    });
  }

  isRentalActive(rental: ScriptRental): boolean {
    return new Date(rental.endDate) > new Date() && rental.paymentStatus === RentalPaymentStatus.APPROVED;
  }

  // WhatsApp methods
  loadWhatsAppConfig(): void {
    this.apiService.getMyWhatsAppConfig().subscribe({
      next: (config) => {
        if (config) {
          this.whatsappConfig = config;
          this.whatsappForm = {
            instanceName: config.instanceName,
            apiKey: config.apiKey,
            webhookUrl: config.webhookUrl,
            isActive: config.isActive
          };
        }
      },
      error: (err) => {
        console.error('Error loading WhatsApp config:', err);
      }
    });
  }

  saveWhatsAppConfig(): void {
    this.whatsappLoading = true;
    this.apiService.saveWhatsAppConfig(this.whatsappForm).subscribe({
      next: (config) => {
        this.whatsappConfig = config;
        this.whatsappLoading = false;
        alert('Configuração salva com sucesso!');
      },
      error: (err) => {
        console.error('Error saving WhatsApp config:', err);
        this.whatsappLoading = false;
        alert('Erro ao salvar configuração');
      }
    });
  }

  testWhatsAppConfig(): void {
    this.whatsappTesting = true;
    this.apiService.testWhatsAppConfig().subscribe({
      next: (result) => {
        this.whatsappTesting = false;
        alert(result.message);
      },
      error: (err) => {
        console.error('Error testing WhatsApp:', err);
        this.whatsappTesting = false;
        alert('Erro ao testar configuração');
      }
    });
  }
}