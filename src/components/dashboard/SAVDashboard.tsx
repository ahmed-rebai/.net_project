import React from 'react';
import { Complaint } from '../../types';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface SAVDashboardProps {
  complaints: Complaint[];
  onStatusChange: (complaintId: string, newStatus: 'pending' | 'in-progress' | 'resolved') => void;
}

export function SAVDashboard({ complaints, onStatusChange }: SAVDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Service Complaints Dashboard</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <li key={complaint.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        Complaint #{complaint.id}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{complaint.description}</p>
                    </div>
                    <div className="ml-4">
                      <select
                        value={complaint.status}
                        onChange={(e) => onStatusChange(complaint.id, e.target.value as any)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    {complaint.status === 'pending' && <Clock className="w-4 h-4 text-yellow-500 mr-1.5" />}
                    {complaint.status === 'in-progress' && <AlertCircle className="w-4 h-4 text-blue-500 mr-1.5" />}
                    {complaint.status === 'resolved' && <CheckCircle className="w-4 h-4 text-green-500 mr-1.5" />}
                    <span>Created on {new Date(complaint.dateCreated).toLocaleDateString()}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}