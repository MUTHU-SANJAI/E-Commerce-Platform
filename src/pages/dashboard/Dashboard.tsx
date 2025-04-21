import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Clock } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome back, {user?.name || 'User'}!</h2>
        <p className="text-gray-600 mb-4">
          Manage your account, track orders, and update your preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/dashboard/orders" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <ShoppingBag className="text-indigo-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold">My Orders</h3>
          </div>
          <p className="text-gray-600">View and track your recent orders</p>
        </Link>

        <Link 
          to="/dashboard/profile" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <User className="text-indigo-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold">Profile</h3>
          </div>
          <p className="text-gray-600">Update your personal information</p>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Clock className="text-indigo-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <p className="text-gray-600">No recent activity to display</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;