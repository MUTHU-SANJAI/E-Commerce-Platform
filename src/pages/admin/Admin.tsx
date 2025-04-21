import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingCart, BarChart2 } from 'lucide-react';

const Admin = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Total Products</h3>
            <Package className="text-indigo-600" size={24} />
          </div>
          <p className="text-3xl font-bold">120</p>
          <p className="text-green-500 text-sm mt-2">+5% from last month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Total Users</h3>
            <Users className="text-indigo-600" size={24} />
          </div>
          <p className="text-3xl font-bold">1,240</p>
          <p className="text-green-500 text-sm mt-2">+12% from last month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Total Orders</h3>
            <ShoppingCart className="text-indigo-600" size={24} />
          </div>
          <p className="text-3xl font-bold">85</p>
          <p className="text-green-500 text-sm mt-2">+3% from last month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Revenue</h3>
            <BarChart2 className="text-indigo-600" size={24} />
          </div>
          <p className="text-3xl font-bold">$12,456</p>
          <p className="text-green-500 text-sm mt-2">+8% from last month</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/admin/products" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Package className="text-indigo-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold">Manage Products</h3>
          </div>
          <p className="text-gray-600">Add, edit, or remove products from your store</p>
        </Link>

        <Link 
          to="/admin/orders" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <ShoppingCart className="text-indigo-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold">Manage Orders</h3>
          </div>
          <p className="text-gray-600">View and process customer orders</p>
        </Link>

        <Link 
          to="/admin/users" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Users className="text-indigo-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold">Manage Users</h3>
          </div>
          <p className="text-gray-600">View and manage user accounts</p>
        </Link>
      </div>
    </div>
  );
};

export default Admin;