'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, Linkedin, Github } from 'lucide-react';

const teamMembers = [
  { id: 1, name: 'Christiano Nicoma Boseke', role: 'Leader Project', image: '/1.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 2, name: 'Genta Fallah Munggaran Sonagar', role: 'Lead Developer', image: '/2.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 3, name: 'Irfan Rifqy Widya Syahbani', role: 'Lead Mechanical', image: '/3.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 4, name: 'Dio Aranda', role: 'Lead Technical', image: '/1.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 5, name: 'Muhammad Aqil Ramadhani', role: 'Lead Designer', image: '/2.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 6, name: 'Muhammad Rafi Riza Pratama', role: 'Lead Documenter', image: '/3.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 7, name: 'Inas Samara Taqia', role: 'Developer', image: '/5.JPG', instagram: 'https://www.instagram.com/inassamarr', linkedin: 'https://www.linkedin.com/in/inas-samara-taqia/', github: 'https://github.com/sambatawa' },
  { id: 8, name: 'Achlis Muhammad Yusuf', role: 'Developer', image: '/2.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 9, name: 'Fauzi Luqman Noor Ikhwan', role: 'Developer', image: '/3.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 10, name: 'Yehezkiel Junifer Reyno Oppier', role: 'Developer', image: '/1.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 11, name: 'Muhammad Rakha Buana', role: 'Mechanical', image: '/2.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 12, name: 'Muhammad Dzaky Azzshahir', role: 'Mechanical', image: '/3.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 13, name: 'Daffa Ardyana Eka Putra', role: 'Mechanical', image: '/1.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 14, name: 'Arya Kusuma Pratama', role: 'Mechanical', image: '/2.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 15, name: 'Ariel Pasha Ramaditya', role: 'Mechanical', image: '/3.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 16, name: 'Sarah Aninditya', role: 'Technical', image: '/1.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 17, name: 'Raden Tuhibagus Ahmad K. S', role: 'Technical', image: '/2.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 18, name: 'Della Arviyanti', role: 'Technical', image: '/3.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 19, name: 'Laras Desfyanti', role: 'Technical', image: '/1.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 20, name: 'Adinda Octhavia Indriyani', role: 'Designer', image: '/2.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 21, name: 'Uzma Kratos Bijaksana', role: 'Designer', image: '/3.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 22, name: 'Muhammad Rifqi Annaufal', role: 'Documenter', image: '/1.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 23, name: 'Michael Christian Handoko', role: 'Documenter', image: '/2.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 24, name: 'Selpi Anjeli ', role: 'Documenter', image: '/3.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 25, name: 'Fadila Azahra', role: 'Documenter', image: '/1.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 26, name: 'Mikhail Hibrizi', role: 'Documenter', image: '/2.png', instagram: '#', linkedin: '#', github: '#' },
  { id: 27, name: 'M Qyblat Ilmy Mahdi', role: 'Documenter', image: '/3.png', instagram: '#', linkedin: '#', github: '#' }
];

export function Members() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(teamMembers.length / cardsPerPage);
  const maxIndex = totalPages - 1;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const visibleMembers = teamMembers.slice(
    currentIndex * cardsPerPage,
    (currentIndex + 1) * cardsPerPage
  );

  return (
    <section id="members" className="py-30 px-6">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-gray-900 mb-4"
            style={{ fontSize: '3rem', fontWeight: '500' }}
          >Temui Kami
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Kenali para individu berbakat yang membuat alat hebat ini. 
            Kami adalah tim yang beragam dari 27 anggota yang bersemangat dengan keahliannya.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction * 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 300 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="grid grid-cols-3 gap-8"
              >
                {visibleMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white rounded-t-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linaer-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white text-xl font-semibold mb-2">{member.name}</h3>
                        <p className="text-white/90 text-sm mb-4">{member.role}</p>
                        <div className="flex gap-2">
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.instagram}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <Instagram className="w-4 h-4 text-white" />
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.linkedin}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <Linkedin className="w-4 h-4 text-white" />
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.github}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <Github className="w-4 h-4 text-white" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {currentIndex > 0 && (
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-linear-to-r to-[#d4a674a9] from-[#c17b4f93] shadow-2xl flex items-center justify-center transition-all hover:shadow-3xl group"
            >
              <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          )}

          {currentIndex < maxIndex && (
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-linear-to-r from-[#d4a674a9] to-[#c17b4f93] shadow-2xl flex items-center justify-center transition-all hover:shadow-3xl group"
            >
              <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? 'bg-[#D4A574] w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="text-4xl font-bold text-gray-800 mb-2"
            >
              27
            </motion.div>
            <p className="text-gray-600">Anggota Tim</p>
          </div>
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, type: "spring" }} className="text-4xl font-bold text-gray-00 mb-2">
              1
            </motion.div>
            <p className="text-gray-600">Departemen</p>
          </div>
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, type: "spring" }} className="text-4xl font-bold text-gray-800 mb-2">
              20+
            </motion.div>
            <p className="text-gray-600">Proyek Selesai</p>
          </div>
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, type: "spring" }} className="text-4xl font-bold text-gray-800 mb-2">
              70%
            </motion.div>
            <p className="text-gray-600">Dedication</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}