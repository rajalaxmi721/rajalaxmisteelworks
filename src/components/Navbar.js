import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, ChevronDown, Menu, X, Mic, Languages } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { useLanguage } from '../context/LanguageContext';
import { mockProducts } from '../data/mockProducts';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useSearch();
  const { language, toggleLanguage, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const suggestionRef = useRef(null);

  const categories = [
    'All Works & Welding Works', 
    'Steel reeling', 
    'Glass reeling', 
    'Metal windows works', 
    'Metal reeling (grill) works', 
    'MS gate work', 
    'Rolling shutter',
    'All type bike trollyes', 
    'Vibratory earth rammer service (dummas)', 
    'Generator rent', 
    '3D name plates'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
    setShowSuggestions(false);
    setIsMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 1) {
      const filtered = mockProducts
        .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    setIsMobileMenuOpen(false);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser does not support voice search.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Indian English for better local accent recognition

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      const currentText = finalTranscript || interimTranscript;
      setSearchTerm(currentText);
      
      // Show live suggestions while speaking
      if (currentText.trim().length > 1) {
        const filtered = mockProducts
          .filter(p => p.name.toLowerCase().includes(currentText.toLowerCase()))
          .slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }

      // Execute search when speech is final
      if (finalTranscript) {
        setSearchQuery(finalTranscript);
        setShowSuggestions(false);
        setIsMobileMenuOpen(false);
        recognition.stop();
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="py-3 flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start leading-tight min-w-fit" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">Rajlaxmi</span>
            <span className="text-[8px] md:text-[10px] text-blue-100 italic flex items-center font-bold">
              RAJLAXMI STEEL WORKS & 3D PRINTING <span className="ml-1 text-yellow-400">★</span>
            </span>
          </Link>

          {/* Search Bar Container - Hidden on small mobile, shown on md+ */}
          <div className="hidden sm:block flex-1 max-w-xl relative" ref={suggestionRef}>
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder={t('nav_search')}
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full py-2 px-4 pr-20 text-black rounded-full focus:outline-none shadow-inner text-sm focus:ring-2 focus:ring-yellow-400 transition-all"
              />
              <button 
                type="button" 
                onClick={startListening}
                className={`absolute right-10 top-2 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-blue-600'}`}
                title="Voice Search"
              >
                <Mic size={18} />
              </button>
              <button type="submit" className="absolute right-3 top-2 text-blue-600">
                <Search size={18} />
              </button>
            </form>

            {/* Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 shadow-2xl rounded-xl overflow-hidden border border-gray-100 z-50">
                {suggestions.map((s) => (
                  <div 
                    key={s.id}
                    onClick={() => selectSuggestion(s)}
                    className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0 text-sm"
                  >
                    <Search size={14} className="text-gray-400" />
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            <button 
              onClick={toggleLanguage}
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/20 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest active:scale-95 group"
            >
              <Languages size={14} className="text-yellow-400 group-hover:rotate-12 transition-transform" />
              {language === 'en' ? 'ಕನ್ನಡ' : 'English'}
            </button>

            <div 
              className="relative group" 
              onMouseEnter={() => setShowServices(true)} 
              onMouseLeave={() => setShowServices(false)}
            >
              <button 
                onClick={() => setShowServices(!showServices)}
                className="flex items-center gap-2 hover:text-yellow-400 transition-all py-2 border-2 border-transparent hover:border-yellow-400/30 px-4 rounded-xl active:scale-95"
              >
                {t('nav_services')} <ChevronDown size={16} className={`transition-transform duration-300 ${showServices ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-0 w-72 bg-white text-gray-800 shadow-2xl rounded-2xl py-3 border border-gray-100 transition-all duration-300 ${showServices ? 'opacity-100 visible translate-y-3' : 'opacity-0 invisible translate-y-0'}`}>
                <div className="max-h-[80vh] overflow-y-auto custom-scrollbar px-2">
                  <div className="text-[10px] text-gray-400 px-4 mb-2 tracking-widest uppercase font-black">{t('sidebar_categories')}</div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowServices(false);
                        window.scrollTo({ top: document.getElementById('services')?.offsetTop - 100, behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all text-[12px] font-bold border-l-4 mb-1 flex items-center justify-between group ${selectedCategory === cat ? 'text-blue-600 bg-blue-50 border-blue-600 shadow-sm' : 'border-transparent text-gray-600'}`}
                    >
                      <span>{cat}</span>
                      <div className={`w-1.5 h-1.5 rounded-full transition-all ${selectedCategory === cat ? 'bg-blue-600' : 'bg-transparent group-hover:bg-blue-200'}`}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <a href="#about" className="hover:text-yellow-400 transition-colors">{t('nav_about')}</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">{t('nav_contact')}</a>

            <a href="tel:+917349760721" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-5 py-2.5 rounded-full flex items-center gap-2 hover:from-white hover:to-white hover:scale-105 transition-all shadow-[0_10px_20px_rgba(234,179,8,0.3)] font-black active:scale-95 group">
              <Phone size={14} className="group-hover:animate-bounce" />
              <span>{t('nav_call')}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search - Only on extra small screens */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full py-2 px-4 pr-20 text-black rounded-lg focus:outline-none text-sm focus:ring-2 focus:ring-yellow-400"
            />
            <button 
              type="button" 
              onClick={startListening}
              className={`absolute right-10 top-2 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-blue-600'}`}
              title="Voice Search"
            >
              <Mic size={18} />
            </button>
            <button type="submit" className="absolute right-3 top-2 text-blue-600">
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-blue-700 shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="font-black text-xl italic uppercase tracking-tighter">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-blue-800 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
              <div className="space-y-3">
                <h3 className="text-[10px] uppercase font-bold text-blue-300 tracking-widest">Our Services</h3>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: document.getElementById('services')?.offsetTop - 100, behavior: 'smooth' });
                      }}
                      className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-yellow-400 text-blue-900' : 'bg-blue-800 text-blue-100 hover:bg-blue-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-blue-600 space-y-4 font-bold text-lg uppercase italic">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-yellow-400">About Us</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-yellow-400">Contact Us</a>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-blue-600 space-y-4">
              <button 
                onClick={toggleLanguage}
                className="w-full bg-blue-800 text-blue-100 p-4 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-xl active:scale-95 border border-blue-600"
              >
                <Languages size={20} className="text-yellow-400" />
                {language === 'en' ? 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ' : 'Switch to English'}
              </button>
              <a href="tel:+917349760721" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 p-4 rounded-2xl flex items-center justify-center gap-3 font-black shadow-xl active:scale-95 transition-transform">
                <Phone size={20} />
                {t('nav_call')}: +91 734 976 0721
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
