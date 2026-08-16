import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, Home, Truck, Globe, Shield, 
  Headphones, Bell, Search, User, Plus, Download, FileText, 
  TrendingUp, CheckCircle, Clock, AlertCircle, ArrowUpRight, Menu, X, Upload
} from 'lucide-react';

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Recent shipments mock data based on your image
  const shipments = [
    { id: 'AMZ12345', destination: 'Mumbai', status: 'In Transit', statusColor: 'bg-emerald-500', date: '12 Aug 2023' },
    { id: 'AMZ67890', destination: 'Pune', status: 'Delivered', statusColor: 'bg-amber-500', date: '11 Aug 2023' },
    { id: 'AMZ45678', destination: 'Delhi', status: 'Pending', statusColor: 'bg-amber-400', date: '10 Aug 2023' },
    { id: 'AMZ98765', destination: 'Chennai', status: 'Delivered', statusColor: 'bg-emerald-500', date: '08 Aug 2023' },
    { id: 'AMZ66432', destination: 'Kolhapur', status: 'Return / RTO', statusColor: 'bg-orange-500', date: '07 Aug 2023' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF5E00] p-2 rounded-xl text-white font-black text-xl">AM</div>
            <div>
              <h1 className="font-black text-[#001D3D] text-lg leading-none">Apni Manzil</h1>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Logistics Hub</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-black">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'dashboard' ? 'bg-[#001D3D] text-white shadow-lg shadow-blue-900/20' : 'text-slate-600 hover:bg-slate-50'}`}>
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          
          <button onClick={() => setActiveTab('courier')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'courier' ? 'bg-[#001D3D] text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Package size={20} />
            <span className="text-left leading-tight">Courier & Parcel Services</span>
          </button>

          <button onClick={() => setActiveTab('home')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'home' ? 'bg-[#001D3D] text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Home size={20} />
            <span className="text-left leading-tight">Home & Personal Transport</span>
          </button>

          <button onClick={() => setActiveTab('industrial')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'industrial' ? 'bg-[#001D3D] text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Truck size={20} />
            <span className="text-left leading-tight">Industrial / Factory Transport</span>
          </button>

          <button onClick={() => setActiveTab('global')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'global' ? 'bg-[#001D3D] text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Globe size={20} />
            <span className="text-left leading-tight">International / Import-Export</span>
          </button>

          <button onClick={() => setActiveTab('specialized')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'specialized' ? 'bg-[#001D3D] text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Shield size={20} />
            <span className="text-left leading-tight">Specialized Transport</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">
            <Headphones size={20} />
            Support
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-20 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-600">
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search tracking ID, orders..." className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#001D3D]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#001D3D] text-white flex items-center justify-center font-black">
                <User size={20} />
              </div>
              <div className="hidden sm:block">
                <h4 className="font-bold text-xs text-[#001D3D]">Prathamesh</h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Active Member</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 space-y-6 flex-1">
          
          {/* Top 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-xl"><Package size={24} /></div>
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">Today</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-100">Shipments Today</h3>
              <p className="text-4xl font-black mt-1">58</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-xl"><Truck size={24} /></div>
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">Live</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-100">In Transit</h3>
              <p className="text-4xl font-black mt-1">124</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-xl"><CheckCircle size={24} /></div>
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">Success</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-100">Delivered</h3>
              <p className="text-4xl font-black mt-1">312</p>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-xl"><AlertCircle size={24} /></div>
                <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">Attention</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-100">Return / RTO</h3>
              <p className="text-4xl font-black mt-1">8</p>
            </div>
          </div>

          {/* Analytics & Quick Actions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Monthly Shipment Overview Chart Mock */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#001D3D] text-lg">Monthly Shipment Overview</h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">2026 Analytics</span>
              </div>
              
              <div className="h-64 flex items-end justify-between gap-2 pt-8 px-4 border-b border-slate-100">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, idx) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1 h-48">
                      <div className="w-1/2 bg-blue-600 rounded-t-md" style={{ height: `${(idx + 3) * 10}%` }}></div>
                      <div className="w-1/2 bg-amber-500 rounded-t-md" style={{ height: `${(idx + 1) * 8}%` }}></div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">{month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-600 rounded-full"></span><span className="text-xs font-bold text-slate-600">Shipments</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-500 rounded-full"></span><span className="text-xs font-bold text-slate-600">Returns</span></div>
              </div>
            </div>

            {/* Quick Actions & Analytics Card */}
            <div className="space-y-6">
              
              {/* Shipment Analytics summary */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-[#001D3D] text-base mb-4">Shipment Analytics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-500">Total Shipments</span>
                    <span className="font-black text-[#001D3D]">1,540</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-500">Successful Deliveries</span>
                    <span className="font-black text-emerald-600">1,480</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Buttons */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-[#001D3D] text-base mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20">
                    <Plus size={16} /> New Booking
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
                    <Upload size={16} /> Bulk Upload
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20">
                    <Download size={16} /> Export Report
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Recent Shipments Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-[#001D3D] text-lg">Recent Shipments</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-wider">
                    <th className="p-4 pl-6">Shipment ID</th>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Booked On</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                  {shipments.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-all">
                      <td className="p-4 pl-6 font-bold text-[#001D3D]">{item.id}</td>
                      <td className="p-4">{item.destination}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{item.date}</td>
                      <td className="p-4 pr-6 text-right">
                        <button className="px-4 py-1.5 bg-[#001D3D] text-white rounded-lg text-[11px] font-bold hover:bg-[#FF5E00] transition-all">
                          Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;