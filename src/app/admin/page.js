"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/layout';
import AdminDashboard from '@/components/admin/admin';
import { ref, get, db } from '@/lib/firebase';

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    
    const checkAdminAccess = async () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const userEmail = localStorage.getItem('userEmail');
        
        
        if (isAuthenticated !== 'true' || !userEmail) {
          router.push('/login');
          return;
        }
        const adminsRef = ref(db, 'admins');
        const snapshot = await get(adminsRef);
        if (snapshot.exists()) {
          const admins = snapshot.val();
          const user = Object.values(admins).find(u => u.email === userEmail);
          if (user && (user.role === 'admin' || user.permissions === 'full')) {
            setIsAdmin(true);
          } else {
            router.push('/dashboard');
            return;
          }
        } else {
          router.push('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Error checking admin access:', error);
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminAccess();
  }, [router, mounted]);
  
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F5F0EB] via-[#F8F4EF] to-[#FAF6F1] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A574]"></div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return null;
  }
  
  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  );
}