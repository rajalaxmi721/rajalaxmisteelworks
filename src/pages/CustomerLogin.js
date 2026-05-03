import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = await login(identifier, password, 'user');
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } else {
      const result = await register({ name, email: identifier.includes('@') ? identifier : '', phone: identifier.includes('@') ? phone : identifier, password });
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-sm flex flex-col md:flex-row overflow-hidden min-h-[500px]">
        {/* Left Panel */}
        <div className="bg-blue-600 text-white p-10 md:w-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{isLogin ? 'Customer Login' : 'Join Rajalaxmi Steel'}</h2>
            <p className="text-blue-100 text-lg">
              {isLogin 
                ? 'Get access to your Orders, Wishlist and Recommendations' 
                : 'Sign up with your details to get started'}
            </p>
          </div>
          <img 
            src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png" 
            alt="Login Illustration" 
            className="w-full mt-auto"
          />
        </div>

        {/* Right Panel - Form */}
        <div className="p-10 flex-1 relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors peer"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                  Enter Full Name
                </label>
              </div>
            )}
            
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-0 top-2 text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                Enter Email / Mobile number
              </label>
            </div>

            {!isLogin && identifier.includes('@') && (
              <div className="relative">
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors peer"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                  Enter Mobile Number
                </label>
              </div>
            )}

            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-0 top-2 text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                Enter Password
              </label>
            </div>

            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-sm shadow-md hover:bg-orange-600 transition-colors uppercase tracking-wider">
              {isLogin ? 'Login' : 'Continue'}
            </button>

            <div className="text-center mt-6">
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-bold hover:underline"
              >
                {isLogin ? 'New to Rajalaxmi? Create an account' : 'Existing User? Log in'}
              </button>
            </div>
            
            <div className="text-center border-t pt-4">
              <Link to="/admin-login" className="text-gray-400 text-xs hover:text-blue-600">
                Are you an Admin? Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
