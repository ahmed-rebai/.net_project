import React from 'react';
import { Settings } from 'lucide-react';

interface WelcomePageProps {
  onRoleSelect: (role: 'client' | 'sav') => void;
}

export function WelcomePage({ onRoleSelect }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="flex items-center mb-8">
        <Settings className="h-12 w-12 text-blue-600" />
        <h1 className="ml-3 text-3xl font-bold text-gray-900">AfterCare Pro</h1>
      </div>
      
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome</h2>
          <p className="mt-2 text-gray-600">Please select your role to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onRoleSelect('client')}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue as Client
          </button>
          
          <button
            onClick={() => onRoleSelect('sav')}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue as SAV Representative
          </button>
        </div>
      </div>
    </div>
  );
}