import { Complaint, Product } from '../types';
import { mockProducts, mockComplaints } from '../data/mockData';

let complaints = [...mockComplaints];
let nextComplaintId = complaints.length + 1;

export const api = {
  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts), 500);
    });
  },

  getComplaints: async (): Promise<Complaint[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(complaints), 500);
    });
  },

  createComplaint: async (complaint: Omit<Complaint, 'id' | 'dateCreated' | 'status'>): Promise<Complaint> => {
    return new Promise((resolve) => {
      const newComplaint: Complaint = {
        ...complaint,
        id: `c${nextComplaintId++}`,
        dateCreated: new Date(),
        status: 'pending'
      };
      complaints = [...complaints, newComplaint];
      setTimeout(() => resolve(newComplaint), 500);
    });
  },

  updateComplaintStatus: async (complaintId: string, newStatus: 'pending' | 'in-progress' | 'resolved'): Promise<Complaint> => {
    return new Promise((resolve, reject) => {
      const complaintIndex = complaints.findIndex(c => c.id === complaintId);
      if (complaintIndex === -1) {
        reject(new Error('Complaint not found'));
        return;
      }

      const updatedComplaint = {
        ...complaints[complaintIndex],
        status: newStatus
      };

      complaints = [
        ...complaints.slice(0, complaintIndex),
        updatedComplaint,
        ...complaints.slice(complaintIndex + 1)
      ];

      setTimeout(() => resolve(updatedComplaint), 500);
    });
  }
};