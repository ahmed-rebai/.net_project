import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { WelcomePage } from './components/auth/WelcomePage';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ComplaintForm } from './components/complaints/ComplaintForm';
import { ComplaintList } from './components/complaints/ComplaintList';
import { SAVDashboard } from './components/dashboard/SAVDashboard';
import { useComplaints } from './hooks/useComplaints';
import { useAuth } from './hooks/useAuth';

type AuthView = 'welcome' | 'login' | 'register';

export default function App() {
  const [authView, setAuthView] = useState<AuthView>('welcome');
  const { user, loading, error, login, register, logout, isAuthenticated } = useAuth();
  const { complaints, addComplaint, updateComplaintStatus } = useComplaints();

  const handleComplaintSubmit = async (data: { productId: string; description: string; purchaseDate: Date }) => {
    const currentDate = new Date();
    const purchaseDate = new Date(data.purchaseDate);
    const yearDiff = currentDate.getFullYear() - purchaseDate.getFullYear();
    const isUnderWarranty = yearDiff < 1;

    await addComplaint({
      ...data,
      customerId: user?.id || '',
      isUnderWarranty
    });
  };

  if (!isAuthenticated) {
    if (authView === 'welcome') {
      return <WelcomePage onRoleSelect={(role) => {
        setAuthView(role === 'sav' ? 'login' : 'register');
      }} />;
    }

    if (authView === 'login') {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <LoginForm
            onSubmit={login}
            onRegisterClick={() => setAuthView('register')}
            error={error}
            loading={loading}
          />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <RegisterForm
          onSubmit={register}
          onLoginClick={() => setAuthView('login')}
          error={error}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={logout} user={user} />
      {user.role === 'sav' ? (
        <SAVDashboard
          complaints={complaints}
          onStatusChange={updateComplaintStatus}
        />
      ) : (
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Customer Support Portal</h1>
              <p className="mt-2 text-sm text-gray-600">
                Submit your complaint or track existing service requests
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Submit a New Complaint</h2>
                <ComplaintForm onSubmit={handleComplaintSubmit} />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Complaints</h2>
                <div className="bg-white shadow rounded-lg p-6">
                  {loading ? (
                    <p className="text-gray-500 text-sm">Loading complaints...</p>
                  ) : error ? (
                    <p className="text-red-500 text-sm">{error}</p>
                  ) : (
                    <ComplaintList complaints={complaints.filter(c => c.customerId === user.id)} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}