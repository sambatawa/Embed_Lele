"use client";

import { motion } from "framer-motion";

const formatCatchphrase = (catchphrase) => {
  if (!catchphrase) return [];
  
  if (typeof catchphrase === 'string') {
    const items = catchphrase.split(',').map(item => item.trim());
    return items.map((item, index) => (
      <span 
        key={index}
        className="inline-block px-2 py-1 text-xs text-white font-medium rounded-xl mr-1 mb-1 shadow-lg backdrop-blur-sm relative overflow-hidden gradient-animate bg-linear-to-r from-[#d1ae84] via-[#D4A574] to-[#F4E4D4]"
      >
        <span className="relative z-10 drop-shadow-sm">{item}</span>
      </span>
    ));
  }
  
  if (Array.isArray(catchphrase)) {
    return catchphrase.map((item, index) => {
      const text = typeof item === 'string' ? item : (item.name || String(item));
      return (
        <span 
          key={index}
          className="inline-block px-2 py-1 text-xs text-white font-medium rounded-xl mr-1 mb-1 shadow-lg backdrop-blur-sm relative overflow-hidden gradient-animate bg-linear-to-r from-[#d1ae84] via-[#D4A574] to-[#F4E4D4]"
        >
          <span className="relative z-10 drop-shadow-sm">{text}</span>
        </span>
      );
    });
  }
  
  return [];
};

export default function FormulaCard({ title, berat_pelet, category, ingredients, protein, selected, onSelect, onModal }) {
  const formattedItems = formatCatchphrase(ingredients);
  
  return (
    <motion.div
      onClick={() => onModal({ title, berat_pelet, category, ingredients, protein })}
      whileTap={{ scale: 0.97 }}
      className={`group cursor-pointer p-4 rounded-2xl border shadow-sm bg-linear-to-br from-[#CBBFB4] via-[#D8CDC3] to-[#E7DFD7] backdrop-blur-xl border-[#EDE6DF] transition-all flex flex-col justify-between h-28
        ${selected ? "ring-2 ring-[#CBBFB4]" : ""}
      `}
    >
      <h3 className="text-xl font-bold text-[#6C5F57]">{title}</h3>

      <div className="flex flex-wrap gap-1 mt-1 transition-all">
        {formattedItems}
      </div>
    </motion.div>
  );
}
