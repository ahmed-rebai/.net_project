import { useState, useEffect } from 'react';
import { Complaint } from '../types';
import { api } from '../services/api';

export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await api.getComplaints();
      setComplaints(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const addComplaint = async (complaint: Omit<Complaint, 'id' | 'dateCreated' | 'status'>) => {
    try {
      const newComplaint = await api.createComplaint(complaint);
      setComplaints(prev => [...prev, newComplaint]);
      return newComplaint;
    } catch (err) {
      setError('Failed to create complaint');
      throw err;
    }
  };

  const updateComplaintStatus = async (complaintId: string, newStatus: 'pending' | 'in-progress' | 'resolved') => {
    try {
      const updatedComplaint = await api.updateComplaintStatus(complaintId, newStatus);
      setComplaints(prev => prev.map(c => c.id === complaintId ? updatedComplaint : c));
    } catch (err) {
      setError('Failed to update complaint status');
      throw err;
    }
  };

  return {
    complaints,
    loading,
    error,
    addComplaint,
    updateComplaintStatus,
    refreshComplaints: fetchComplaints
  };
}