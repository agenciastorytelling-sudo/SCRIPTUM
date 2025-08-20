import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Script, PaymentCheckout } from '../../models/client.model';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.scss']
})
export class ScriptsComponent implements OnInit {
  scripts: Script[] = [];
  filteredScripts: Script[] = [];
  loading = false;
  
  // Filters
  searchTerm = '';
  selectedFilter = 'all';
  
  // Payment modal
  showPaymentModal = false;
  selectedScript: Script | null = null;
  paymentData: PaymentCheckout | null = null;
  paymentLoading = false;
  paymentPolling = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadScripts();
  }

  loadScripts(): void {
    this.loading = true;
    this.apiService.getScripts().subscribe({
      next: (data) => {
        this.scripts = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading scripts:', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.scripts];
    
    // Search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(script => 
        script.name.toLowerCase().includes(term) ||
        script.description.toLowerCase().includes(term)
      );
    }
    
    // Category filter (you can extend this based on your needs)
    if (this.selectedFilter !== 'all') {
      // Add filter logic here
    }
    
    this.filteredScripts = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  buyScript(script: Script): void {
    this.selectedScript = script;
    this.showPaymentModal = true;
    this.generatePayment();
  }

  generatePayment(): void {
    if (!this.selectedScript) return;
    
    this.paymentLoading = true;
    this.apiService.createCheckout([this.selectedScript.id]).subscribe({
      next: (data) => {
        this.paymentData = data;
        this.paymentLoading = false;
        this.startPaymentPolling();
      },
      error: (err) => {
        console.error('Error creating payment:', err);
        this.paymentLoading = false;
        alert('Erro ao gerar pagamento');
      }
    });
  }

  startPaymentPolling(): void {
    if (!this.paymentData) return;
    
    this.paymentPolling = true;
    const pollInterval = setInterval(() => {
      this.apiService.getPaymentStatus(this.paymentData!.paymentId).subscribe({
        next: (status) => {
          if (status.status === 'approved') {
            clearInterval(pollInterval);
            this.paymentPolling = false;
            this.showPaymentSuccess();
          } else if (status.status === 'rejected' || status.status === 'expired') {
            clearInterval(pollInterval);
            this.paymentPolling = false;
            this.showPaymentError();
          }
        },
        error: (err) => {
          console.error('Error checking payment status:', err);
        }
      });
    }, 5000); // Poll every 5 seconds
    
    // Stop polling after 10 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
      this.paymentPolling = false;
    }, 600000);
  }

  showPaymentSuccess(): void {
    alert('Pagamento aprovado! Sua licença foi ativada.');
    this.closePaymentModal();
    // Optionally reload scripts or redirect to dashboard
  }

  showPaymentError(): void {
    alert('Pagamento não foi aprovado. Tente novamente.');
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.selectedScript = null;
    this.paymentData = null;
    this.paymentLoading = false;
    this.paymentPolling = false;
  }

  copyPixCode(): void {
    if (this.paymentData?.copyPasteCode) {
      navigator.clipboard.writeText(this.paymentData.copyPasteCode);
      alert('Código Pix copiado!');
    }
  }
}