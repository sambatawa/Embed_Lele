'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Linkedin, Twitter, Github } from 'lucide-react';

const teamMembers = [
  { id: 1, name: 'Christiano Nicoma Boseke', role: 'Leader Project', image: 'https://drive.google.com/uc?export=view&id=1xemzkQDsE1QZIqe7s5JjQ69C1elpAw1A', email: 'sarah@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 2, name: 'Genta Fallah Munggaran Sonagar', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', email: 'michael@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 3, name: 'Irfan Rifqy Widya Syahbani', role: 'Lead Mechanical', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', email: 'emily@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 4, name: 'Dio Aranda', role: 'Lead Technical', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', email: 'david@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 5, name: 'Muhammad Aqil Ramadhani', role: 'Lead Designer', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80', email: 'jessica@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 6, name: 'Muhammad Rafi Riza Pratama', role: 'Lead Documenter', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', email: 'robert@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 7, name: 'Inas Samara Taqia', role: 'Developer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', email: 'amanda@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 8, name: 'Achlis Muhammad Yusuf', role: 'Developer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', email: 'james@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 9, name: 'Fauzi Luqman Noor Ikhwan', role: 'Developer', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80', email: 'sophie@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 10, name: 'Yehezkiel Junifer Reyno Oppier', role: 'Developer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', email: 'daniel@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 11, name: 'Muhammad Rakha Buana', role: 'Mechanical', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', email: 'olivia@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 12, name: 'Muhammad Dzaky Azzshahir', role: 'Mechanical', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', email: 'william@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 13, name: 'Daffa Ardyana Eka Putra', role: 'Mechanical', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80', email: 'isabella@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 14, name: 'Arya Kusuma Pratama', role: 'Mechanical', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', email: 'alexander@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 15, name: 'Ariel Pasha Ramaditya', role: 'Mechanical', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', email: 'mia@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 16, name: 'Sarah Aninditya', role: 'Technical', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', email: 'ethan@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 17, name: 'Raden Tuhibagus Ahmad K. S', role: 'Technical', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80', email: 'charlotte@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 18, name: 'Della Arviyanti', role: 'Technical', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', email: 'benjamin@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 19, name: 'Laras Desfyanti', role: 'Technical', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', email: 'amelia@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 20, name: 'Adinda Octhavia Indriyani', role: 'Designer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', email: 'lucas@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 21, name: 'Uzma Kratos Bijaksana', role: 'Designer', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80', email: 'harper@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 22, name: 'Muhammad Rifqi Annaufal', role: 'Documenter', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', email: 'henry@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 23, name: 'Michael Christian Handoko', role: 'Documenter', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', email: 'evelyn@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 24, name: 'Selpi Anjeli ', role: 'Documenter', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', email: 'sebastian@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 25, name: 'Fadila Azahra', role: 'Documenter', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80', email: 'abigail@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 26, name: 'Mikhail Hibrizi', role: 'Documenter', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', email: 'jack@company.com', linkedin: '#', twitter: '#', github: '#' },
  { id: 27, name: 'M Qyblat Ilmy Mahdi', role: 'Documenter', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', email: 'emilyc@company.com', linkedin: '#', twitter: '#', github: '#' }
];

export function Members() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const cardsPerPage = 3;
  const maxIndex = Math.max(0, teamMembers.length - cardsPerPage);

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

  const visibleMembers = teamMembers.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <section className="py-20 px-6 bg-gray-50">
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
            style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: '500' }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Get to know the talented individuals who make our company great. 
            We're a diverse team of 27 passionate professionals.
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
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {visibleMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex gap-2">
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.email}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          >
                            <Mail className="w-4 h-4 text-gray-700" />
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.linkedin}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          >
                            <Linkedin className="w-4 h-4 text-gray-700" />
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.twitter}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          >
                            <Twitter className="w-4 h-4 text-gray-700" />
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.github}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          >
                            <Github className="w-4 h-4 text-gray-700" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-gray-600 mb-4">{member.role}</p>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-1 bg-linear-to-r from-[#D4A574] to-[#C17A4F] rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
              currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </motion.button>
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

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              27
            </motion.div>
            <p className="text-gray-600">Team Members</p>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring" }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              15+
            </motion.div>
            <p className="text-gray-600">Departments</p>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring" }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              50+
            </motion.div>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, type: "spring" }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              100%
            </motion.div>
            <p className="text-gray-600">Dedication</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}