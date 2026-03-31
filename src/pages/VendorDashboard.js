import React from 'react';
import { Truck, PackageCheck, Wallet, Bell, BarChart3, PlusCircle } from 'lucide-react';

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#001D3D] uppercase italic tracking-tighter">Vendor <span className="text-[#FF5E00]">Portal</span></h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 text-black">Welcome back, Partner! Manage your business.</p>
          </div>
          <button className="bg-[#FF5E00] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#001D3D] transition-all shadow-lg shadow-orange-200">
            <PlusCircle size={16}/> Add New Vehicle
          </button>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Jobs', val: '12', icon: Truck, color: 'text-blue-600' },
            { label: 'New Leads', val: '05', icon: Bell, color: 'text-[#FF5E00]' },
            { label: 'Completed', val: '142', icon: PackageCheck, color: 'text-green-600' },
            { label: 'Total Earnings', val: '₹ 45,200', icon: Wallet, color: 'text-slate-900' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`p-4 bg-slate-50 rounded-2xl ${stat.color}`}><stat.icon size={24}/></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{stat.label}</p>
                <p className="text-xl font-black text-[#001D3D]">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WORK IN PROGRESS MESSAGE */}
        <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center space-y-4">
            <div className="w-20 h-20 bg-orange-50 text-[#FF5E00] rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={40} />
            </div>
            <h2 className="text-2xl font-black text-[#001D3D] uppercase">Vendor Tools Coming Soon</h2>
            <p className="max-w-md mx-auto text-slate-400 font-bold text-sm uppercase tracking-tight">
                We are building advanced analytics and live order management for our partners. Stay tuned!
            </p>
        </div>

      </div>
    </div>
  );
};

export default VendorDashboard;