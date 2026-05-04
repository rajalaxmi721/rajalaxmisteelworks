import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, Package, Settings, BarChart, Phone, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const { user, users, fetchUsers } = useAuth();

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin-login" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-800 text-white md:min-h-screen">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-6 flex md:flex-col overflow-x-auto md:overflow-x-visible">
          <div className="px-6 py-3 bg-blue-600 flex items-center gap-3 cursor-pointer whitespace-nowrap">
            <Users size={20} />
            <span>Manage Users</span>
          </div>
          <div className="px-6 py-3 hover:bg-slate-700 flex items-center gap-3 cursor-pointer text-slate-400 whitespace-nowrap">
            <Package size={20} />
            <span>Manage Products</span>
          </div>
          <div className="px-6 py-3 hover:bg-slate-700 flex items-center gap-3 cursor-pointer text-slate-400 whitespace-nowrap">
            <BarChart size={20} />
            <span>Sales Reports</span>
          </div>
          <div className="px-6 py-3 hover:bg-slate-700 flex items-center gap-3 cursor-pointer text-slate-400 whitespace-nowrap">
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Interested Customers List</h1>
          <div className="flex gap-2">
            <button onClick={() => fetchUsers()} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
              Refresh Data
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
              Export to CSV
            </button>
          </div>
        </header>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions (Enquiry)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length > 0 ? users.map((u, i) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div className="ml-4 font-medium text-gray-900">{u.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold">{u.phone || 'No Phone'}</div>
                    <div className="text-xs text-gray-500">{u.email || 'No Email'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(u.joinedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-2">
                      <a 
                        href={`tel:${u.phone}`} 
                        className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200 title"
                        title="Call Customer"
                      >
                        <Phone size={18} />
                      </a>
                      <a 
                        href={`https://wa.me/${u.phone}?text=Hi ${u.name}, I'm calling from Rajlaxmi Steel Works regarding your enquiry.`} 
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200"
                        title="WhatsApp Enquiry"
                      >
                        <MessageSquare size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center text-gray-400">
                    No customers registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
