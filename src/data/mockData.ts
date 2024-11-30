import { Product, Complaint } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Premium Water Heater X1000',
    serialNumber: 'WH1000-123',
    warrantyExpiryDate: new Date('2025-12-31')
  },
  {
    id: 'p2',
    name: 'Smart Thermostat Pro',
    serialNumber: 'ST200-456',
    warrantyExpiryDate: new Date('2024-06-30')
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: 'c1',
    customerId: 'u1',
    productId: 'p1',
    description: 'Water heater not maintaining temperature',
    status: 'pending',
    dateCreated: new Date('2024-03-15')
  }
];