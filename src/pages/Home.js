import React, { useState, useMemo, useEffect } from 'react';
import { mockProducts } from '../data/mockProducts';
import { Star, Filter, ShoppingCart, ChevronDown, MessageSquare, Phone, X, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { searchQuery, selectedCategory, setSelectedCategory } = useSearch();
  const { language, t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortBy, setSortBy] = useState('random');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(8);
  }, [selectedCategory]);

  const marqueeProducts = useMemo(() => {
    // Select specific distinct IDs to represent the best of the portfolio
    const selectedIds = [2, 3, 6, 50, 4, 5, 8, 10]; 
    const selected = mockProducts.filter(p => selectedIds.includes(p.id));
    
    // Shuffle the selected items
    const shuffled = [...selected];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Duplicate exactly once for a seamless infinite scroll loop (CSS -50% translation)
    return [...shuffled, ...shuffled];
  }, []);

  const processedProducts = useMemo(() => {
    let filtered = [...mockProducts];
    
    // 1. Category Filter
    if (selectedCategory !== 'All Works & Welding Works') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    } else {
      // Shuffling logic for "All Works" to show variety
      const grouped = filtered.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      }, {});

      const categories = Object.keys(grouped);
      const result = [];
      const maxItemsPerCategory = Math.max(...categories.map(c => grouped[c].length));

      for (let i = 0; i < maxItemsPerCategory; i++) {
        categories.forEach(cat => {
          if (grouped[cat][i]) {
            result.push(grouped[cat][i]);
          }
        });
      }
      filtered = result;
    }

    // 2. Sorting Logic
    if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === 'random') {
      // Create a stable random sort by shuffling
      const shuffled = [...filtered];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      filtered = shuffled;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const filteredProducts = processedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const getSuggestedProducts = (currentProduct) => {
    let suggestions = mockProducts.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);
    
    if (suggestions.length < 3) {
      const moreSuggestions = mockProducts
        .filter(p => p.id !== currentProduct.id && !suggestions.find(s => s.id === p.id))
        .sort((a, b) => b.reviews - a.reviews)
        .slice(0, 3 - suggestions.length);
      suggestions = [...suggestions, ...moreSuggestions];
    }
    
    return suggestions.slice(0, 3);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Banner / Hero Section */}
      <div className="bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-4">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl h-80 flex items-center justify-center text-white overflow-hidden relative shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200" 
              alt="Welding Banner" 
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">{t('hero_title')}</h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 font-light italic">{t('hero_subtitle')}</p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                 <a href="#about" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-8 py-4 rounded-full font-black hover:from-white hover:to-white hover:scale-105 transition-all shadow-[0_10px_20px_rgba(234,179,8,0.3)] text-center uppercase tracking-widest text-sm">{t('hero_learn_more')}</a>
                 <a 
                   href="#services" 
                   onClick={() => setSelectedCategory('All Works & Welding Works')}
                   className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-black hover:bg-white hover:text-blue-900 hover:scale-105 transition-all text-center uppercase tracking-widest text-sm shadow-xl"
                 >
                   {t('hero_our_services')}
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-scrolling Gallery Section */}
      <div className="bg-white pt-8 pb-12 overflow-hidden border-b border-gray-100 mb-8">
        <div className="container mx-auto px-4 mb-6">
          <h2 className="text-center text-sm font-black text-gray-400 uppercase tracking-[0.3em]">
            {t('gallery_title')}
          </h2>
        </div>
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Fading edges for seamless look */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-scroll flex gap-8 px-8 py-4">
            {marqueeProducts.map((product, idx) => (
              <div 
                key={`marquee-${product.id}-${idx}`} 
                className="relative w-56 h-64 sm:w-72 sm:h-80 flex-shrink-0 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer group border-4 border-white"
                onClick={() => setSelectedImage(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=Welding+Project'; }}
                />
                
                {/* Permanent gradient to make text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Text Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="inline-block bg-yellow-400 text-blue-900 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow-md">
                    {product.category.split(' ')[0]}
                  </div>
                  <h3 className="text-white font-black text-lg leading-tight mb-1 line-clamp-2 drop-shadow-md">
                    {product.name}
                  </h3>
                  <div className="w-8 h-1 bg-yellow-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0"></div>
                </div>
                
                {/* Hover Action Button */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 text-white text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl">
                  {t('gallery_view')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Product Grid Area */}
      <div id="services" className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <aside className="w-full md:w-72 flex-shrink-0">
            {/* Mobile Category Dropdown */}
            <div className="md:hidden mb-6">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between font-black text-blue-900 uppercase tracking-tight active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <Filter size={18} className="text-blue-600" />
                  <span>{selectedCategory === 'All Works & Welding Works' ? t('sidebar_categories') : t(Object.keys(translations.en).find(key => translations.en[key] === selectedCategory))}</span>
                </div>
                <ChevronDown size={20} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${isCategoryOpen ? 'max-h-[500px] mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 grid grid-cols-1 gap-1">
                  {[
                    { key: 'sidebar_all_works', value: 'All Works & Welding Works' },
                    { key: 'sidebar_steel_reeling', value: 'Steel reeling' },
                    { key: 'sidebar_glass_reeling', value: 'Glass reeling' },
                    { key: 'sidebar_metal_windows', value: 'Metal windows works' },
                    { key: 'sidebar_metal_grill', value: 'Metal reeling (grill) works' },
                    { key: 'sidebar_ms_gate', value: 'MS gate work' },
                    { key: 'sidebar_rolling_shutter', value: 'Rolling shutter' },
                    { key: 'sidebar_bike_trollies', value: 'All type bike trollyes' },
                    { key: 'sidebar_earth_rammer', value: 'Vibratory earth rammer service (dummas)' },
                    { key: 'sidebar_generator', value: 'Generator rent' },
                    { key: 'sidebar_name_plates', value: '3D name plates' }
                  ].map(item => (
                    <button 
                      key={item.key} 
                      onClick={() => {
                        setSelectedCategory(item.value);
                        setIsCategoryOpen(false);
                      }}
                      className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${selectedCategory === item.value ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-50'}`}
                    >
                      {t(item.key)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Categories List */}
            <div className="hidden md:block bg-white p-6 shadow-sm rounded-2xl border border-gray-100 sticky top-28 z-20">
              <h3 className="font-black text-xs uppercase text-gray-400 mb-6 tracking-widest border-b pb-2 flex items-center justify-between">
                {t('sidebar_categories')}
                <Filter size={14} />
              </h3>
              <ul className="space-y-1">
                {[
                  { key: 'sidebar_all_works', value: 'All Works & Welding Works' },
                  { key: 'sidebar_steel_reeling', value: 'Steel reeling' },
                  { key: 'sidebar_glass_reeling', value: 'Glass reeling' },
                  { key: 'sidebar_metal_windows', value: 'Metal windows works' },
                  { key: 'sidebar_metal_grill', value: 'Metal reeling (grill) works' },
                  { key: 'sidebar_ms_gate', value: 'MS gate work' },
                  { key: 'sidebar_rolling_shutter', value: 'Rolling shutter' },
                  { key: 'sidebar_bike_trollies', value: 'All type bike trollyes' },
                  { key: 'sidebar_earth_rammer', value: 'Vibratory earth rammer service (dummas)' },
                  { key: 'sidebar_generator', value: 'Generator rent' },
                  { key: 'sidebar_name_plates', value: '3D name plates' }
                ].map(item => (
                  <li 
                    key={item.key} 
                    onClick={() => setSelectedCategory(item.value)}
                    className={`cursor-pointer px-4 py-2.5 rounded-xl transition-all text-sm font-bold flex items-center justify-between group ${selectedCategory === item.value ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                  >
                    <span>{t(item.key)}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === item.value ? 'bg-white' : 'bg-gray-200 group-hover:bg-blue-400'}`}></span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Product Grid */}
          <div className="flex-1">
            <div className="bg-white p-6 shadow-sm mb-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-100">
              <h2 className="font-black text-2xl text-blue-900 uppercase italic tracking-tighter">
                {selectedCategory === 'All Works & Welding Works' ? t('grid_featured') : t(Object.keys(translations.en).find(key => translations.en[key] === selectedCategory))}
                <span className="text-sm font-normal text-gray-400 ml-3 lowercase tracking-normal">({filteredProducts.length} {t('grid_models_found')})</span>
              </h2>
              <div className="flex items-center gap-6 text-xs font-bold uppercase text-gray-400 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                <button 
                  onClick={() => setSortBy('random')}
                  className={`${sortBy === 'random' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'} transition-all pb-1 whitespace-nowrap`}
                >
                  {t('grid_random')}
                </button>
                <button 
                  onClick={() => setSortBy('popularity')}
                  className={`${sortBy === 'popularity' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'} transition-all pb-1 whitespace-nowrap`}
                >
                  {t('grid_popularity')}
                </button>
              </div>
            </div>

            {visibleProducts.length > 0 ? (
              <>
                {visibleProducts.length === 1 && selectedCategory !== 'All Works & Welding Works' ? (
                  <div className="w-full">
                    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 flex flex-col items-center text-center shadow-sm max-w-4xl mx-auto">
                    <div 
                      className="relative w-full max-w-2xl h-64 sm:h-96 mb-8 overflow-hidden rounded-2xl bg-gray-50 cursor-pointer shadow-md"
                      onClick={() => setSelectedImage(visibleProducts[0])}
                    >
                      <img 
                        src={visibleProducts[0].image} 
                        alt={visibleProducts[0].name} 
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Welding+Product'; }}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 shadow-sm z-10">
                        {visibleProducts[0].category}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-black text-blue-900 uppercase tracking-tight mb-4">
                      {visibleProducts[0].name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-8">
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-md flex items-center shadow-sm">
                        {visibleProducts[0].rating} <Star size={12} className="ml-1 fill-current" />
                      </span>
                      <span className="text-gray-400 text-xs font-bold">({visibleProducts[0].reviews} reviews)</span>
                    </div>

                    <div className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl whitespace-pre-line text-left bg-blue-50 p-6 sm:p-8 rounded-2xl border border-blue-100">
                      {visibleProducts[0].description}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                      <a 
                        href={`https://wa.me/917349760721?text=${encodeURIComponent(`Hi Rajalaxmi Steel Works, I am interested in: ${visibleProducts[0].name}.\n\nProduct Link: ${window.location.origin}/#product-${visibleProducts[0].id}\n\nPlease provide more details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:from-white hover:to-white hover:text-green-600 hover:scale-105 transition-all shadow-[0_10px_20px_rgba(34,197,94,0.3)] active:scale-95 text-sm"
                      >
                        <MessageSquare size={20} />
                        {t('grid_enquire_whatsapp')}
                      </a>
                      <a 
                        href="tel:+917349760721"
                        className="flex-1 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:from-white hover:to-white hover:text-blue-900 hover:scale-105 transition-all shadow-[0_10px_20px_rgba(30,58,138,0.3)] active:scale-95 text-sm"
                      >
                        <Phone size={20} />
                        {t('grid_call_now')}
                      </a>
                    </div>
                  </div>

                  {/* Suggested Products Section */}
                  <div className="mt-16 w-full max-w-5xl mx-auto border-t border-gray-200 pt-10 pb-8">
                    <h3 className="text-xl font-black text-blue-900 uppercase tracking-widest mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start gap-4">
                      <div className="w-8 h-1 bg-yellow-400 rounded-full"></div>
                      {t('grid_you_may_like')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getSuggestedProducts(visibleProducts[0]).map(product => (
                        <div 
                          key={`suggested-${product.id}`}
                          className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
                          onClick={() => setSelectedImage(product)}
                        >
                          <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-gray-50">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=Welding+Product'; }}
                            />
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-blue-900 shadow-sm z-10">
                              {product.category}
                            </div>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight line-clamp-2 hover:text-blue-600 transition-colors mb-2">
                            {product.name}
                          </h4>
                          <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center shadow-sm">
                                {product.rating} <Star size={10} className="ml-1 fill-current" />
                              </span>
                              <span className="text-gray-400 text-[10px] font-bold ml-1">({product.reviews})</span>
                            </div>
                            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-sm group-hover:from-blue-900 group-hover:to-blue-800 group-hover:text-white transition-all transform group-hover:scale-105">
                              {t('grid_view')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visibleProducts.map((product) => (
                      <div 
                        key={product.id} 
                        id={`product-${product.id}`}
                        className="bg-white p-4 hover:shadow-2xl transition-all duration-300 cursor-pointer group rounded-2xl border border-gray-100 flex flex-col scroll-mt-28"
                      >
                        <div 
                          className="relative h-56 mb-4 overflow-hidden rounded-xl bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedImage(product)}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=Welding+Product'; }}
                          />
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-blue-900 shadow-sm z-10">
                            {product.category}
                          </div>
                        </div>
                        <h3 
                          className="text-sm font-bold h-10 overflow-hidden line-clamp-2 mb-2 hover:text-blue-600 transition-colors uppercase tracking-tight cursor-pointer"
                          onClick={() => setSelectedImage(product)}
                        >
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-6">
                          <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center shadow-sm">
                            {product.rating} <Star size={10} className="ml-1 fill-current" />
                          </span>
                          <span className="text-gray-400 text-[10px] font-bold">({product.reviews} reviews)</span>
                        </div>
                        
                        <div className="mt-auto">
                          <a 
                            href={`https://wa.me/917349760721?text=${encodeURIComponent(`Hi Rajalaxmi Steel Works, I am interested in: ${product.name}.\n\nProduct Link: ${window.location.origin}/#product-${product.id}\n\nPlease provide more details.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:from-yellow-400 hover:to-yellow-500 hover:text-blue-900 transition-all shadow-lg active:scale-95 hover:scale-[1.02]"
                          >
                            <MessageSquare size={18} />
                            {t('grid_enquire_now')}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            
            {visibleCount < filteredProducts.length && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  className="bg-white text-blue-900 border-2 border-blue-900 px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-900 hover:text-white hover:scale-105 transition-all shadow-xl flex items-center gap-3 active:scale-95 group"
                >
                  {t('grid_load_more')} <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white p-24 text-center rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg italic">{t('grid_no_products')}</p>
            <button 
              onClick={() => setSelectedCategory('All Works & Welding Works')}
              className="mt-6 text-blue-900 font-bold hover:underline"
            >
              {t('grid_reset')}
            </button>
          </div>
        )}
          </div>
        </div>
      </div>

      {/* About Us / Company Description Section */}
      <section id="about" className="container mx-auto px-4 py-16 mt-12 mb-12 bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 relative rounded-[2rem] overflow-hidden shadow-2xl h-[400px] sm:h-[550px] group bg-blue-900 flex items-center justify-center">
            <img 
              src={process.env.PUBLIC_URL + "/owner.jpeg"} 
              alt={`Shrikanth Irappanavar - ${t('about_owner_ceo')}`} 
              className="absolute inset-0 w-full h-full object-cover object-center scale-[1.35] hover:scale-[1.45] transition-transform duration-700"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/10 to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-8 left-8 text-white pointer-events-none z-20">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-3 shadow-lg">{t('about_owner_ceo')}</div>
              <h3 className="text-3xl font-black drop-shadow-xl tracking-tight">Shrikanth Irappanavar</h3>
            </div>
          </div>

          {/* Right Side - Text */}
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-3xl font-black mb-6 text-blue-900 uppercase tracking-tight flex items-center gap-4">
              <div className="h-1 w-12 bg-yellow-400 rounded-full flex-shrink-0"></div>
              {t('hero_title')}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 italic border-l-4 border-yellow-400 pl-4 bg-gray-50 py-3 pr-2 rounded-r-xl">
              {t('about_desc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all hover:-translate-y-1">
                <h3 className="font-bold text-blue-900 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> {t('about_quality')}</h3>
                <p className="text-sm text-gray-600">{t('about_quality_desc')}</p>
              </div>
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all hover:-translate-y-1">
                <h3 className="font-bold text-blue-900 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> {t('about_innovation')}</h3>
                <p className="text-sm text-gray-600">{t('about_innovation_desc')}</p>
              </div>
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 sm:col-span-2 hover:shadow-md transition-all hover:-translate-y-1">
                <h3 className="font-bold text-blue-900 mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> {t('about_customer')}</h3>
                <p className="text-sm text-gray-600">{t('about_customer_desc')}</p>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-2xl shadow-lg border border-blue-700 hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-black text-xl shadow-inner">SI</div>
              <div>
                <p className="text-xs text-blue-200 font-bold uppercase tracking-widest mb-1">{t('about_owner_ceo')}</p>
                <p className="font-black text-lg tracking-tight">Shrikanth Irappanavar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="container mx-auto px-4 py-12 mt-12 mb-12">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-blue-700">
          
          {/* Left Side - Contact Info & Actions */}
          <div className="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center text-left text-white">
            <a 
              href="https://www.google.com/maps/place/16%C2%B020'13.2%22N+74%C2%B057'42.4%22E/@16.336995,74.9591884,17z/data=!3m1!4b1!4m4!3m3!8m2!3d16.336995!4d74.9617633?hl=en&entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/10 text-yellow-400 text-xs font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-6 w-max border border-white/10 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer"
            >
              {t('contact_visit')}
            </a>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight leading-tight">
              {t('contact_quote_part1')} <br className="hidden sm:block"/><span className="text-yellow-400">{t('contact_quote_part2')}</span>
            </h2>
            <p className="text-blue-100 mb-10 text-lg leading-relaxed max-w-md font-light">
              {t('contact_desc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="tel:+917349760721" className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-6 py-4 rounded-xl font-black shadow-[0_10px_20px_rgba(234,179,8,0.3)] hover:from-white hover:to-white hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95 text-sm uppercase tracking-widest">
                 <Phone size={20} /> {t('grid_call_now')}
              </a>
              <a href="https://wa.me/917349760721" className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-black shadow-[0_10px_20px_rgba(34,197,94,0.3)] hover:from-white hover:to-white hover:text-green-600 hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95 text-sm uppercase tracking-widest">
                 <MessageSquare size={20} /> {language === 'en' ? 'WHATSAPP' : 'ವಾಟ್ಸಾಪ್'}
              </a>
            </div>

            <div className="border-t border-blue-700/50 pt-8 mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-white font-black mb-3 uppercase tracking-widest text-base flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div> 
                  {t('nav_contact')} & {t('contact_location')}
                </h4>
                <p className="text-blue-100 text-base leading-loose">
                  <span className="text-white font-bold">{t('contact_mobile')}:</span> <a href="tel:+917349760721" className="hover:text-yellow-400 transition-colors">+91 7349760721</a><br/>
                  <span className="text-white font-bold">{t('contact_email')}:</span> <a href="mailto:rajalaxmisteelworks@gmail.com" className="hover:text-yellow-400 transition-colors">rajalaxmisteelworks@gmail.com</a><br/>
                  <span className="text-white font-bold">{t('contact_location')}:</span> SSR College Opposite, Gokak Road Mudalagi-591312
                </p>
              </div>
              <a 
                href="https://www.google.com/maps/place/16%C2%B020'13.2%22N+74%C2%B057'42.4%22E/@16.336995,74.9591884,17z/data=!3m1!4b1!4m4!3m3!8m2!3d16.336995!4d74.9617633?hl=en&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 text-sm"
              >
                <MapPin size={16} className="text-yellow-400" /> {t('contact_get_directions')}
              </a>
            </div>
          </div>

          {/* Right Side - Google Map */}
          <div className="lg:w-1/2 h-80 lg:h-auto min-h-[400px] relative bg-gray-800">
            <iframe 
              title="Rajalaxmi Steel Works Location"
              src="https://maps.google.com/maps?q=16.336995,74.9617633&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* Inner shadow overlay for the map to blend it perfectly with the rounded container */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(30,58,138,0.5)]"></div>
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6">
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          ></div>
          <div className="relative max-w-5xl w-full z-10">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-11 right-0 bg-white/15 hover:bg-white/30 text-white p-2.5 rounded-full transition-all z-20"
            >
              <X size={22} />
            </button>
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row" style={{maxHeight: '85vh'}}>
               {/* Left - Image */}
               <div className="w-full md:w-3/5 bg-gray-900 flex items-center justify-center" style={{minHeight: '300px'}}>
                  <img 
                    src={selectedImage.image} 
                    alt={selectedImage.name} 
                    className="w-full h-full object-contain"
                    style={{maxHeight: '85vh'}}
                  />
               </div>
               {/* Right - Details */}
               <div className="w-full md:w-2/5 bg-white p-6 sm:p-8 flex flex-col justify-center overflow-y-auto">
                 <div className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-4">
                    {selectedImage.category}
                 </div>
                 <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">
                    {selectedImage.name}
                 </h2>
                 <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    {selectedImage.description}
                 </p>
                 <div className="flex items-center gap-2 mb-6">
                    <span className="bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center shadow-sm">
                      {selectedImage.rating} <Star size={10} className="ml-1 fill-current" />
                    </span>
                    <span className="text-gray-400 text-xs font-semibold">({selectedImage.reviews} reviews)</span>
                 </div>
                 <a 
                    href={`https://wa.me/917349760721?text=${encodeURIComponent(`Hi Rajalaxmi Steel Works, I am interested in: ${selectedImage.name}.\n\nProduct Link: ${window.location.origin}/#product-${selectedImage.id}\n\nPlease provide more details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg active:scale-95 text-sm"
                  >
                    <MessageSquare size={18} />
                    ENQUIRE ON WHATSAPP
                 </a>
                 <a 
                    href="tel:+917349760721"
                    className="w-full mt-3 bg-blue-900 text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-800 transition-all shadow-lg active:scale-95 text-sm"
                  >
                    <Phone size={18} />
                    CALL NOW
                 </a>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
