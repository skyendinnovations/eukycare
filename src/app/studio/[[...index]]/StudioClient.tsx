'use client';

import dynamic from 'next/dynamic';

const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
    </div>
  ),
});

export default function StudioClient() {
  return <AdminPanel />;
}
