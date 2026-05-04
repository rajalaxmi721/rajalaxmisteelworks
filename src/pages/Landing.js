import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Award, Phone, Mail, MapPin, User } from 'lucide-react';

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-transparent relative z-10">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
          <span className="text-2xl font-black text-blue-900 tracking-tighter uppercase italic">Rajlaxmi</span>
        </div>
        <div className="hidden md:flex gap-8 items-center text-blue-900 font-bold text-sm uppercase">
          <a href="#about" className="hover:text-blue-600 transition-colors">About Us</a>
          <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-8 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Divine Blessings Section */}
      <div className="bg-white py-6 border-b border-slate-100">
        <div className="container mx-auto px-6 flex justify-center items-center gap-10 md:gap-20">
          <div className="text-center group">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg mb-2 group-hover:scale-110 transition-transform">
              <img src="/assets/blessing.png" alt="Shree Shivabodharanga Smarth" className="w-full h-full object-cover" />
            </div>
            <p className="text-[10px] md:text-xs font-bold text-blue-900 uppercase tracking-widest">Shree Shivabodharanga Smarth</p>
          </div>
          
          <div className="text-center group">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg mb-2 group-hover:scale-110 transition-transform">
              <img src="/assets/laxmi.png" alt="Goddess Laxmi" className="w-full h-full object-cover" />
            </div>
            <p className="text-[10px] md:text-xs font-bold text-blue-900 uppercase tracking-widest">Goddess Laxmi</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-black text-blue-950 mb-6 leading-tight">
              Precision <span className="text-blue-600">Steel Works</span> & Industrial Excellence
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              At Rajlaxmi Steel Works & Services, we specialize in high-grade welding, precision fabrication, and heavy-duty industrial equipment. Quality you can trust, durability you can see.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
              >
                Sign In <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="bg-white text-blue-900 border-2 border-blue-100 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-md"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
              <img 
                src="/assets/landing.png" 
                alt="3D Industrial" 
                className="w-full h-auto drop-shadow-[0_35px_35px_rgba(30,58,138,0.3)]" 
              />
            </div>
            {/* Decorative 3D elements (CSS circles) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">About Rajlaxmi Steel Works</h2>
            <p className="text-slate-500 text-lg">
              Since our inception, Rajlaxmi Steel Works & Services has been at the forefront of the steel industry. We don't just weld; we build the future with strength and precision. Our workshop is equipped with the latest technology to deliver custom solutions for every scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6">
                <ShieldCheck />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Guaranteed Quality</h3>
              <p className="text-slate-600">Every piece we fabricate undergoes rigorous testing to ensure it meets industrial safety standards.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="bg-blue-900 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6">
                <Zap />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Rapid Execution</h3>
              <p className="text-slate-600">Our team is committed to delivering your projects on time without compromising on precision.</p>
            </div>
            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6">
                <Award />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Expert Team</h3>
              <p className="text-slate-600">Certified welding professionals with decades of combined experience in complex steel fabrication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">Contact Us</h2>
            <p className="text-slate-500">Have a project in mind? Reach out to us today.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                  <User className="text-blue-600" /> Owner Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Managing Director</p>
                      <p className="text-xl font-bold text-slate-800">Mr. Rajlaxmi</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <a href="tel:+919900000000" className="flex items-center gap-4 group">
                    <div className="bg-green-100 p-3 rounded-xl text-green-600 group-hover:scale-110 transition-transform">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Phone Number</p>
                      <p className="text-lg font-bold text-slate-800">+91 99000 00000</p>
                    </div>
                  </a>

                  <a href="mailto:info@rajalaxmi.com" className="flex items-center gap-4 group">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Email Address</p>
                      <p className="text-lg font-bold text-slate-800">info@rajalaxmi.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-xl text-red-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Our Workshop</p>
                      <p className="text-lg font-bold text-slate-800">Industrial Estate, Bangalore, Karnataka</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed (Placeholder) */}
            <div className="h-[400px] rounded-2xl overflow-hidden border-4 border-slate-50 shadow-inner grayscale hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.986383637158!2d77.5929!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnMzQuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Shop Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2px] rounded-[3rem] inline-block mb-8 shadow-2xl">
            <div className="bg-white rounded-[3rem] px-6 py-10 md:px-12 flex flex-col items-center">
              <div className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-5 rounded-3xl text-white mb-6 shadow-lg transform hover:rotate-12 transition-transform">
                <InstagramIcon size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Follow Our 3D Design Journey</h2>
              <p className="text-slate-500 mb-8 max-w-md">Get exclusive looks at our latest 3D printing projects, name plates, and industrial steel works on Instagram.</p>
              <a 
                href="https://www.instagram.com/rajlaxmi_3d_designing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white px-10 py-4 rounded-full font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-3 active:scale-95"
              >
                @rajlaxmi_3d_designing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-blue-950 text-white text-center">
        <p className="text-blue-200 text-sm">© 2026 Rajlaxmi Steel Works & Services. Building Strength for Tomorrow.</p>
      </footer>
    </div>
  );
};

export default Landing;
