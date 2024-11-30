export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Complaint {
  id: string;
  customerId: string;
  productId: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  dateCreated: Date;
}

export interface Product {
  id: string;
  name: string;
  serialNumber: string;
  warrantyExpiryDate: Date;
}

export interface SparePart {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface TechnicalIntervention {
  id: string;
  complaintId: string;
  dateScheduled: Date;
  status: 'scheduled' | 'in-progress' | 'completed';
  isWarranty: boolean;
  laborCost: number;
  sparePartsUsed: Array<{
    partId: string;
    quantity: number;
  }>;
  totalCost: number;
}