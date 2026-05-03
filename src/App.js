import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const AppContent = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <footer className="bg-slate-900 text-white py-12 mt-10">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-gray-500 font-bold uppercase text-xs mb-4">Contact Us</h4>
            <ul className="text-xs space-y-4">
              <li>
                <div className="font-bold text-yellow-400 mb-1">Mobile</div>
                <a href="tel:+917349760721" className="hover:text-white text-gray-300 transition-colors">+91 7349760721</a>
              </li>
              <li>
                <div className="font-bold text-yellow-400 mb-1">Email</div>
                <a href="mailto:rajalaxmisteelworks@gmail.com" className="hover:text-white text-gray-300 transition-colors break-all">rajalaxmisteelworks@gmail.com</a>
              </li>
              <li>
                <div className="font-bold text-yellow-400 mb-1">Location</div>
                <span className="text-gray-300">SSR College Opposite, Gokak Road Mudalagi-591312</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-500 font-bold uppercase text-xs mb-4">{t('footer_help')}</h4>
            <ul className="text-xs space-y-2">
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-500 font-bold uppercase text-xs mb-4">{t('footer_policy')}</h4>
            <ul className="text-xs space-y-2">
              <li>Return Policy</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1 lg:border-l lg:border-slate-700 lg:pl-8 pt-6 sm:pt-0 border-t sm:border-t-0 border-slate-700">
            <h4 className="text-gray-500 font-bold uppercase text-xs mb-4">{t('footer_social')}</h4>
            <ul className="text-xs space-y-2">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-700 text-center text-xs text-gray-500">
          <p>{t('footer_rights')}</p>
          <p className="mt-2 text-[10px] opacity-75 font-medium tracking-wider uppercase italic">Developed by Vishal S H</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <LanguageProvider>
          <Router>
            <AppContent />
          </Router>
        </LanguageProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
