'use client';
import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export const Pembeli = React.memo(function Pembeli({ onSubmit }) {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Indonesia'
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!customerData.firstName) errors.firstName = 'Nama depan wajib diisi';
    if (!customerData.email) errors.email = 'Email wajib diisi';
    if (!customerData.phone) errors.phone = 'Nomor telepon wajib diisi';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(customerData);
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Depan *</label>
            <input
              type="text"
              value={customerData.firstName}
              onChange={(e) => setCustomerData({...customerData, firstName: e.target.value})}
              className={`required w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nama Depan"
            />
            {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Belakang</label>
            <input
              type="text"
              value={customerData.lastName}
              onChange={(e) => setCustomerData({...customerData, lastName: e.target.value})}
              className="required w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
              placeholder="Nama Belakang"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={customerData.email}
            onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
            className={`required w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="email"
          />
          {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP *</label>
          <input
            type="tel"
            value={customerData.phone}
            onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
            className={`required w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="08123456789"
          />
          {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
          <textarea
            value={customerData.address}
            onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
            className="required w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
            placeholder="Jl. Contoh No. 123, RT/RW 001/002"
            rows="2"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
            <input
              type="text"
              value={customerData.city}
              onChange={(e) => setCustomerData({...customerData, city: e.target.value})}
              className="required w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
              placeholder="Jakarta"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
            <input
              type="text"
              value={customerData.postalCode}
              onChange={(e) => setCustomerData({...customerData, postalCode: e.target.value})}
              className="required w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
              placeholder="12345"
            />
          </div>
        </div>
        {onSubmit && (
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-linear-to-r from-[#D4A574] to-[#C17A4F] text-white px-4 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        )}
      </form>
    </div>
  );
});