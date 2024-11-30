import React from 'react';
import { Complaint } from '../../types';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ComplaintListProps {
  complaints: Complaint[];
}

const statusIcons = {
  'pending': <Clock className="w-5 h-5 text-yellow-500" />,
  'in-progress': <AlertCircle className="w-5 h-5 text-blue-500" />,
  'resolved': <CheckCircle className="w-5 h-5 text-green-500" />
};

export function ComplaintList({ complaints }: ComplaintListProps) {
  if (complaints.length === 0) {
    return (
      <div className="text-gray-500 text-sm">No complaints found</div>
    );
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <div key={complaint.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              Complaint #{complaint.id}
            </span>
            <div className="flex items-center">
              {statusIcons[complaint.status]}
              <span className="ml-2 text-sm text-gray-500 capitalize">
                {complaint.status.replace('-', ' ')}
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">{complaint.description}</p>
          <div className="mt-3 text-xs text-gray-500">
            {new Date(complaint.dateCreated).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}