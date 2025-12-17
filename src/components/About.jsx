'use client';
import React from 'react';
import { motion } from 'framer-motion'; 

export function About() {
  return (
    <section id="about" className="py-20 px-6 bg-linear-to-br from-[#F5E6D3] to-[#E8D4C0]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-gray-900 mb-6" 
              style={{ fontSize: '3.5rem', lineHeight: '1.1', fontWeight: '500' }}
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="block text-[#D4A574]"
              >
                Tentang
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="block hover:text-[#C17A4F] transition-colors"
              >
                Pelet Ikan
              </motion.span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-sm tracking-widest uppercase mb-8"
            >
              NUTRISI TERBAIK UNTUK BUDIDAYA IKAN ANDA
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-gray-600 leading-relaxed">
                <span className="font-semibold text-[#D4A574]">Nutrimix</span> adalah produsen pelet ikan premium yang menghasilkan pakan berkualitas tinggi dengan menggunakan <span className="font-semibold text-[#C17A4F]">teknologi modern</span> dan bahan-bahan pilihan terbaik. Pelet ikan kami dirancang dengan <span className="font-semibold text-[#D4A574]">formula khusus</span> melalui proses produksi yang terstandar untuk mendukung pertumbuhan optimal ikan budidaya Anda. Mengandung <span className="font-semibold text-[#C17A4F]">protein, vitamin, dan mineral esensial</span> yang dibutuhkan ikan untuk kesehatan, daya tahan tubuh, dan pertumbuhan yang maksimal. Telah digunakan oleh <span className="font-semibold text-[#D4A574]">ribuan pembudidaya ikan</span> di Indonesia dengan hasil pertumbuhan yang lebih cepat dan kualitas ikan yang lebih baik.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}