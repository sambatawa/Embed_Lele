'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../components/Navbar.jsx';
import { Hero } from '../components/Hero.jsx';
import { Sponsor } from '../components/Sponsor.jsx';
import { About } from '../components/About.jsx';
import { Product } from '../components/Product.jsx';
import { Progress } from '../components/Progress.jsx';
import { FAQ } from '../components/FAQ.jsx';
import { Members } from '../components/Members.jsx';
import { Footer } from '../components/Footer.jsx';
import { LoginPage } from '../components/Login.jsx';
import { RegisterPage } from '../components/Register.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import "./globals.css";

export default function App() {
  const searchParams = useSearchParams();
  const isLogin = searchParams.get('login') === 'true';
  
  if (isLogin) {
    return React.createElement(
      'div',
      {
        className: 'min-h-screen bg-gradient-to-br from-[#F5F0EB] via-[#F8F4EF] to-[#FAF6F1]'
      },
      React.createElement(LoginPage, null)
    );
  }

  const isRegister = searchParams.get('register') === 'true';
  
  if (isRegister) {
    return React.createElement(
      'div',
      {
        className: 'min-h-screen bg-gradient-to-br from-[#F5F0EB] via-[#F8F4EF] to-[#FAF6F1]'
      },
      React.createElement(RegisterPage, null)
    );
  }
  
  return React.createElement(
    'div',
    {
      className: 'min-h-screen bg-linear-to-br from-[#F5F0EB] via-[#F8F4EF] to-[#FAF6F1]'
    },
    React.createElement(CustomCursor, null),
    React.createElement(Navbar, null),
    React.createElement(Hero, null),
    React.createElement(Sponsor, null),
    React.createElement(About, null),
    React.createElement(Product, null),
    React.createElement(Progress, null),
    React.createElement(FAQ, null),
    React.createElement(Members, null),
    React.createElement(Footer, null)
  );
}