"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip,Legend} from "chart.js";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FormulaModal({
  show,
  onClose,
  onChoose,
  formulaData
}) {
  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        sidebar.style.opacity = '0';
        sidebar.style.pointerEvents = 'none';
      }
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
      
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        sidebar.style.opacity = '';
        sidebar.style.pointerEvents = '';
      }
    }
    
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
      
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        sidebar.style.opacity = '';
        sidebar.style.pointerEvents = '';
      }
    };
  }, [show]);

  if (!formulaData) return null;

  const { name, berat_pelet, category, ingredients, protein } = formulaData;

  const processedIngredients = Array.isArray(ingredients) 
    ? ingredients.map((ing, index) => ({
        name: typeof ing === 'string' ? ing : (ing.name || `Ingredient ${index + 1}`),
        amount: typeof ing === 'object' ? (ing.gram || 0) : 0
      }))
    : [];

  const ingredientData = {
    labels: processedIngredients.map(ing => ing.name),
    datasets: [
      {
        data: processedIngredients.map(ing => ing.amount),
        backgroundColor: ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#D2691E", "#BC8F8F"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: { 
      legend: { 
        position: "bottom",
        labels: {
          font: {
            size: 11
          }
        }
      } 
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'manual':
        return 'bg-[#EDE6DF]/70 text-[#6C5F57]';
      case 'otomatis':
        return 'bg-[#6C5F57]/20 text-[#6C5F57]';
      default:
        return 'bg-[#6C5F57]/30 text-[#6C5F57]';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 w-full h-screen bg-black z-40"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl w-full max-w-sm sm:max-w-2xl md:max-w-3xl p-4 sm:p-5 shadow-lg">
              
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#6C5F57]">{name}</h2>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(category)}`}>
                  {category === 'manual' ? 'Manual' : category === 'otomatis' ? 'Otomatis' : 'Otomatis/Manual'}
                </span>
              </div>

              <div className="flex gap-4 mb-4 text-sm text-[#7d6f66]">
                <span className="bg-[#EDE6DF]/50 px-2 py-1 rounded">Berat: {berat_pelet || 0}g</span>
                {protein && <span className="bg-[#EDE6DF]/50 px-2 py-1 rounded">Protein: {protein}g</span>}
              </div>

              <div className="bg-[#FFF1E5] text-[#6C5F57] p-2 rounded-xl mb-4 text-center font-medium text-sm">
                Perhatikan bahan dan nutrisi sebelum memilih formula.
              </div>

              {processedIngredients.length > 0 && (
                <div className="mb-4 overflow-x-auto">
                  <table className="min-w-full bg-white rounded-2xl shadow-md overflow-hidden text-sm">
                    <thead className="bg-[#F5F0EB]">
                      <tr>
                        <th className="text-left px-3 py-2 text-[#6C5F57] font-medium">Bahan</th>
                        <th className="text-left px-3 py-2 text-[#6C5F57] font-medium">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedIngredients.map((ingredient, index) => (
                        <tr key={index} className="border-b last:border-b-0 border-gray-200 hover:bg-[#FAF6F1] transition-colors">
                          <td className="px-3 py-2 text-[#6C5F57]">{ingredient.name}</td>
                          <td className="px-3 py-2 text-[#6C5F57]">{ingredient.amount}g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex flex-row flex-wrap gap-4 mb-4 justify-center sm:justify-start">
                {processedIngredients.length > 0 && (
                  <div className="flex-1 w-full max-w-[150px] sm:max-w-none sm:h-40 p-1">
                      <h3 className="font-medium text-[#6C5F57] mb-1 text-sm text-center sm:text-left">Ingredients</h3>
                      <div className="w-full aspect-square sm:aspect-auto">
                      <Pie data={ingredientData} options={chartOptions} />
                      </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-3">
                <div className="text-[#6C5F57] font-medium bg-[#FFF1E5] px-3 py-2 rounded-xl text-xs text-center sm:text-left">
                  Klik Pilih Formula untuk mulai menggiling
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-gray-200 text-[#6C5F57] hover:bg-gray-300 text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => onChoose(formulaData)}
                    className="px-4 py-2 rounded-xl bg-[#CBBFB4] text-white hover:bg-[#bca8a0] text-sm"
                  >
                    Pilih Formula
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
