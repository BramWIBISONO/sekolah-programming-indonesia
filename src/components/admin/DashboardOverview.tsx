import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 mb-2">Total Events</h3>
          <p className="text-3xl font-black text-slate-800">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 mb-2">Blog Posts</h3>
          <p className="text-3xl font-black text-slate-800">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 mb-2">Journal Publications</h3>
          <p className="text-3xl font-black text-[#176DF8]">--</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
        <LayoutDashboard className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to SPI Admin</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Select a module from the sidebar to start managing the content on your website. 
          All changes made here will be instantly reflected on the public site once published.
        </p>
      </div>
    </div>
  );
};
