import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(identifier, password, 'admin');
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Invalid Admin credentials');
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-lg p-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">Admin Portal</h2>
          <p className="text-slate-500 mt-2">Rajlaxmi Steel Works & 3D Printing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Admin Email / Phone</label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-md py-3 px-4 focus:border-blue-600 outline-none transition-colors"
              placeholder="admin@raj.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-md py-3 px-4 focus:border-blue-600 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md shadow-lg hover:bg-blue-700 transition-all uppercase tracking-widest">
            Access Dashboard
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-100">
          <button 
            onClick={() => navigate('/login')}
            className="text-slate-400 text-sm hover:text-blue-600"
          >
            ← Back to Customer Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
