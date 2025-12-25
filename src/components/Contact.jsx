'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = ['Kolaborasi', 'Kerjasama', 'Bisnis', 'Produk'];

  useEffect(() => {
    const loadReCaptcha = () => {
      if (typeof window !== 'undefined' && !window.grecaptcha) {
        const script = document.createElement('script');
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        script.src = `https://www.google.com/recaptcha/api.js`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        script.onerror = () => {
          console.error('Failed to load reCAPTCHA v2 script');
        };
      }
    };
    
    const timer = setTimeout(loadReCaptcha, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let token = '';
      if (window.grecaptcha) {
        try {
          const recaptchaResponse = window.grecaptcha.getResponse();
          if (!recaptchaResponse) {
            alert('Silakan lengkapi verifikasi reCAPTCHA.');
            return;
          }
          token = recaptchaResponse;
        } catch (error) {
          console.error('reCAPTCHA v2 error:', error);
          alert('Verifikasi reCAPTCHA gagal. Silakan refresh halaman dan coba lagi.');
          return;
        }
      } else {
        alert('reCAPTCHA tidak siap. Silakan refresh halaman dan coba lagi.');
        return;
      }

      const response = await fetch('/api/validation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          token: token
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Verifikasi gagal');
      }

      if (result.success && result.requiresLinkVerification) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
        alert('Tautan verifikasi telah dikirim ke email Anda. Silakan cek inbox dan klik tautan untuk melanjutkan.');
      } else if (result.emailValid) {
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(`
          Nama: ${formData.name}
          Email: ${formData.email}

          Pesan:
          ${formData.message}

          ---
          Dikirim dari website Nutrimix
              `);
        
        const mailtoLink = `mailto:samtasamara@apps.ipb.ac.id?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        setFormData({ name: '', email: '', subject: '', message: '' });
        alert('Terima kasih! Email client Anda akan terbuka untuk mengirim pesan.');
      } else {
        throw new Error('Validasi gagal. Silakan coba lagi.');
      }
    } catch (error) {
      alert(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-linear-to-br from-[#F5F0EB] to-[#FAF6F1] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-[#E8D4C0] to-[#D8CDC3] rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-br from-[#D8CDC3] to-[#E8D4C0] rounded-full blur-3xl animate-pulse" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <motion.h2 className="text-gray-900 mb-8 relative" style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: '500' }}>
            Hubungi Kami
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-linear-to-r from-transparent to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Siap untuk memulai proyek Anda? Hubungi kami hari ini dan tim profesional kami akan siap membantu mewujudkan visi Anda.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-linear-to-br from-[#F5E6D3] to-[#E8D4C0] backdrop-blur-sm rounded-3xl p-8 shadow-md border border-[#D4A574]/20"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8 relative">
              <span className="bg-linear-to-r from-[#D4A574] to-[#C17A4F] bg-clip-text text-transparent">Informasi Kontak</span>
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-linear-to-r from-[#D4A574] to-[#C17A4F]"
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h3>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-4 p-6 rounded-l-full rounded-tr-full bg-white/60 backdrop-blur-sm border border-[#D4A574]/15">
                  <motion.div className="w-6 h-6 lg:w-12 lg:h-12 bg-linear-to-br from-[#D4A574] to-[#C17A4F] rounded-l-full rounded-t-full flex items-center justify-center shrink-0 shadow-md">
                    <Mail className="w-3 h-3 lg:w-6 lg:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-2 text-base">Email</h4>
                    <p className="text-gray-700 text-sm lg:text-md">inassaqia@gmail.com</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <div className="flex items-start gap-4 p-6 rounded-l-full rounded-br-full bg-white/60 backdrop-blur-sm border border-[#D4A574]/15">
                  <motion.div 
                    className="w-6 h-6 lg:w-12 lg:h-12 bg-linear-to-br from-[#D4A574] to-[#C17A4F] rounded-l-full flex items-center justify-center shrink-0 shadow-md"
                  >
                    <Phone className="w-3 h-3 lg:w-6 lg:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-2 text-base">Telepon</h4>
                    <p className="text-gray-700 text-sm lg:text-md">+628-22...</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group"
              >
                <div className="flex items-start gap-4 p-6 rounded-r-4xl lg:rounded-r-full rounded-tl-4xl lg:rounded-tl-full bg-white/60 backdrop-blur-sm border border-[#D4A574]/15">
                  <motion.div 
                    className="w-6 h-6 lg:w-12 lg:h-12 bg-linear-to-br from-[#D4A574] to-[#C17A4F] rounded-t-full rounded-r-full flex items-center justify-center shrink-0 shadow-md"
                  >
                    <MapPin className="w-3 h-3 lg:w-6 lg:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-2 text-base">Alamat</h4>
                    <p className="text-gray-700 font-medium text-sm lg:text-md">Sekolah Vokasi IPB</p>
                    <p className="text-gray-600 text-sm leading-relaxed mt-1">Jl. Kumbang No.14, RT.02/RW.06, Babakan, Kecamatan Bogor Tengah</p>
                    <p className="text-gray-600 text-sm">Kota Bogor, Jawa Barat 16128</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="group"
              >
                <div className="flex items-start gap-4 p-6 rounded-r-full rounded-bl-full bg-white/60 backdrop-blur-sm border border-[#D4A574]/15">
                  <motion.div 
                    className="w-6 h-6 lg:w-12 lg:h-12 bg-linear-to-br from-[#D4A574] to-[#C17A4F] rounded-b-full flex items-center justify-center shrink-0 shadow-md"
                  >
                    <Clock className="w-3 h-3 lg:w-6 lg:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2 text-base">Jam Operasional</h4>
                    <p className="text-gray-700 text-sm lg:text-md">Minggu: 09:00 - 18:00</p>             
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className=" p-10 border-5 border-[#D4A574]/50 rounded-3xl"
          >
            <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-[#D4A574] to-[#C17A4F] bg-clip-text text-transparent">Kirim Pesan</h3>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <label className="block text-sm font-semibold text-gray-800 mb-3 relative">
                  <span className="bg-linear-to-r from-[#D4A574] to-[#C17A4F] bg-clip-text text-transparent">Nama Lengkap</span>
                </label>
                <div className="relative">
                  <motion.div className="absolute inset-0 bg-linear-to-r from-[#E8D4C0] to-[#D8CDC3] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"/>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    whileFocus={{ scale: 1.02, borderColor: "#D4A574" }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full px-5 py-4 border-2 border-gray-200/60 rounded-full focus:ring-4 focus:ring-[#D4A574]/20 focus:border-[#D4A574] transition-all bg-white/95 backdrop-blur-sm placeholder-gray-400 hover:border-[#D4A574]/50 shadow-md hover:shadow-lg text-gray-800"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <label className="block text-sm font-semibold text-gray-800 mb-3 relative">
                  <span className="bg-linear-to-r from-[#D4A574] to-[#C17A4F] bg-clip-text text-transparent">Email</span>
                </label>
                <div className="relative">
                  <motion.div className="absolute inset-0 bg-linear-to-r from-[#E8D4C0] to-[#D8CDC3] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"/>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    whileFocus={{ scale: 1.02, borderColor: "#D4A574" }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full px-5 py-4 border-2 border-gray-200/60 rounded-full focus:ring-4 focus:ring-[#D4A574]/20 focus:border-[#D4A574] transition-all bg-white/95 backdrop-blur-sm placeholder-gray-400 hover:border-[#D4A574]/50 shadow-md hover:shadow-lg text-gray-800"
                    placeholder="email@example.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group"
              >
                <label className="block text-sm font-semibold text-gray-800 mb-3 relative">
                  <span className="bg-linear-to-r from-[#D4A574] to-[#C17A4F] bg-clip-text text-transparent">Kategori</span>
                </label>
                <div className="relative">
                  <motion.div className="absolute inset-0 bg-linear-to-r from-[#E8D4C0] to-[#D8CDC3] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"/>
                  <div className="relative">
                    <motion.button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-5 py-4 border-2 border-gray-200/60 rounded-full focus:ring-4 focus:ring-[#D4A574]/20 focus:border-[#D4A574] transition-all bg-white/95 backdrop-blur-sm text-left flex items-center justify-between shadow-md hover:shadow-lg"
                    >
                      <span className={`font-medium text-gray-300 transition-colors ${formData.subject ? 'text-gray-900' : 'text-gray-400'}`}>
                        {formData.subject || 'Pilih kategori'}
                      </span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
                          style={{ boxShadow: "0 20px 60px rgba(212, 165, 116, 0.15), 0 8px 20px rgba(0, 0, 0, 0.08)" }}
                        >
                          <div className="p-2">
                            {categories.map((category, index) => (
                              <motion.button
                                key={category}
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, subject: category }));
                                  setIsDropdownOpen(false);
                                }}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
                                whileHover={{ 
                                  backgroundColor: "linear-gradient(135deg, #F5F0EB 0%, #F8F4EF 100%)",
                                  scale: 1.02,
                                  transition: { duration: 0.2 }
                                }}
                                className="w-full px-4 py-3 text-left rounded-xl transition-all duration-300 group relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-linear-to-r from-[#F5E6D3] to-[#E8D4C0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-linear-to-r from-[#D4A574] to-[#C17A4F] opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100" />
                                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                                      {category}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-linear-to-r from-[#F5E6D3] to-[#E8D4C0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                      <div className="w-3 h-3 rounded-full bg-linear-to-r from-[#D4A574] to-[#C17A4F]" />
                                    </div>
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="group"
              >
                <label className="block text-sm font-semibold text-gray-800 mb-3 relative">
                  <span className="bg-linear-to-r from-[#D4A574] to-[#C17A4F] bg-clip-text text-transparent">Pesan</span>
                </label>
                <div className="relative">
                  <motion.div className="absolute inset-0 bg-linear-to-r from-[#E8D4C0] to-[#D8CDC3] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"/>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    whileFocus={{ scale: 1.02, borderColor: "#D4A574" }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full px-5 py-4 border-2 border-gray-200/60 rounded-2xl focus:ring-4 focus:ring-[#D4A574]/20 focus:border-[#D4A574] transition-all bg-white/95 backdrop-blur-sm placeholder-gray-400 hover:border-[#D4A574]/50 shadow-md hover:shadow-lg text-gray-800 resize-none"
                    placeholder="Tuliskan pesan Anda di sini..."
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="group"
              >
                <label className="block text-sm font-semibold text-gray-800 mb-3 relative">
                  <span className="bg-linear-to-r from-[#D4A574] to-[#C17A4F] bg-clip-text text-transparent">Verifikasi reCAPTCHA</span>
                </label>
                <div className="relative">
                  <div 
                    className="g-recaptcha" 
                    data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    data-callback="onRecaptchaSuccess"
                    data-expired-callback="onRecaptchaExpired"
                  ></div>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ boxShadow: "0 15px 40px rgba(212, 165, 116, 0.4), 0 0 0 2px rgba(212, 165, 116, 0.15)"}}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="relative w-full bg-linear-to-r from-[#D4A574] to-[#C17A4F] text-white py-5 px-8 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group shadow-xl hover:shadow-3xl"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  animate={{ rotate: isSubmitting ? 360 : 0 }}
                  transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}>
                  <Send className="w-5 h-5" />
                </motion.div>
                <span className="relative z-10 font-medium">{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10"
                >
                </motion.div>
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="my-16"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=Sekolah+Vokasi+IPB,Bogor&z=16&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}