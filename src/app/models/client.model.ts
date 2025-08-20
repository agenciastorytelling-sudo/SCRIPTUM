export interface Client {
  id: number;
  discordId: string;
  email?: string;
  displayName: string;
  avatar?: string;
  roles: UserRole[];
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface IpWhitelist {
  id: number;
  clientId: number;
  ip: string;
  note?: string;
  createdAt: Date;
}

export interface Script {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  shortDescription?: string;
  isActive: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScriptRental {
  id: number;
  clientId: number;
  scriptId: number;
  script?: Script;
  startDate: Date;
  endDate: Date;
  paymentStatus: PaymentStatus;
  createdAt: Date;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}

export interface WhatsAppConfig {
  id: number;
  clientId: number;
  instanceName: string;
  apiKey: string;
  webhookUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentCheckout {
  paymentId: string;
  qrCodeBase64: string;
  copyPasteCode: string;
  amount: number;
}

export interface PaymentStatus {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  amount: number;
  createdAt: Date;
}