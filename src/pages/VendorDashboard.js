import React from 'react';
import { Truck, Wallet, ClipboardList, Map, CheckCircle, Bell, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample Data for Graphs
const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 7000 },
  { name: 'Thu', revenue: 5000 },
  { name: 'Fri', revenue: 9000 },
  { name: 'Sat', revenue: 11000 },
];

const VendorDashboard = () => {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* १. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#001D3D] uppercase italic tracking-tighter">Partner Elite</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em] flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Verified Logistics Partner
          </p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase">Rating</p>
              <p className="text-lg font-black text-[#FF5E00]">4.8/5.0</p>
           </div>
           <button className="bg-[#001D3D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#FF5E00] transition-all shadow-xl">
              Withdraw Funds
           </button>
        </div>
      </div>

      {/* २. Stats Grid (Point 8: Earnings, In-Process, Completed) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <PremiumStatCard label="Net Revenue" value="₹85,400" sub="+18%" icon={<Wallet className="text-blue-600"/>} />
        <PremiumStatCard label="In Progress" value="06" sub="Active Trips" icon={<Clock className="text-orange-500"/>} />
        <PremiumStatCard label="Completed" value="142" sub="Total Leads" icon={<CheckCircle className="text-green-600"/>} />
        <PremiumStatCard label="Pending Payments" value="₹12,200" sub="Under Process" icon={<TrendingUp className="text-purple-600"/>} />
      </div>

      {/* ३. Analytics & Active Leads Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Earnings Chart (Point 8: Revenue Visualization) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-black text-[#001D3D] uppercase italic tracking-tight">Revenue Analytics</h3>
             <select className="bg-slate-50 border-none rounded-lg text-[10px] font-black uppercase p-2 outline-none">
                <option>Weekly</option>
                <option>Monthly</option>
             </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="revenue" fill="#001D3D" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Quote Requests (Point 4: Marketplace) */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-[#001D3D] mb-6 uppercase italic tracking-tight border-l-4 border-[#FF5E00] pl-4">Live Bids</h3>
          <div className="space-y-6">
             <LeadItem from="Mumbai" to="Kudal" weight="5 Tons" price="12,500" />
             <LeadItem from="Pune" to="Goa" weight="2 Tons" price="8,000" />
             <LeadItem from="Delhi" to="Mumbai" weight="12 Tons" price="45,000" />
             <button className="w-full py-4 rounded-2xl bg-slate-50 text-[#001D3D] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#001D3D] hover:text-white transition-all">View All Market Leads</button>
          </div>
        </div>

      </div>

      {/* ४. Recent Operations Table (Point 8: All Process Detail) */}
      <div className="mt-10 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
           <h3 className="text-xl font-black text-[#001D3D] uppercase italic tracking-tight">Recent Operations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">Order ID</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">Route</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">Status</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">Payment</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <TableRow id="#AM-4421" route="Mumbai ➔ Pune" status="Active" price="₹4,500" statusColor="text-blue-600 bg-blue-50" />
              <TableRow id="#AM-4419" route="Kudal ➔ Sawantwadi" status="Completed" price="₹1,200" statusColor="text-green-600 bg-green-50" />
              <TableRow id="#AM-4415" route="Pune ➔ Kolhapur" status="Pending" price="₹6,800" statusColor="text-orange-600 bg-orange-50" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const PremiumStatCard = ({ label, value, sub, icon }) => (
  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:scale-105 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-4 rounded-2xl bg-slate-50 group-hover:bg-[#FF5E00] group-hover:text-white transition-colors">{icon}</div>
      <ArrowUpRight className="text-slate-300" size={16} />
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
    <h4 className="text-3xl font-black text-[#001D3D] my-1 tracking-tighter">{value}</h4>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">{sub}</p>
  </div>
);

const LeadItem = ({ from, to, weight, price }) => (
  <div className="p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
    <div className="flex justify-between items-start mb-2">
       <p className="font-black text-[#001D3D] text-xs uppercase tracking-tight">{from} ➔ {to}</p>
       <p className="text-[#FF5E00] font-black text-xs italic">₹{price}</p>
    </div>
    <div className="flex justify-between items-center">
       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{weight}</p>
       <button className="text-[9px] font-black uppercase bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">Bid Now</button>
    </div>
  </div>
);

const TableRow = ({ id, route, status, price, statusColor }) => (
  <tr className="hover:bg-slate-50/50 transition-colors">
    <td className="p-6 font-black text-[#001D3D] text-sm">{id}</td>
    <td className="p-6 font-bold text-slate-500 text-xs uppercase tracking-tighter">{route}</td>
    <td className="p-6">
       <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${statusColor}`}>{status}</span>
    </td>
    <td className="p-6 font-black text-[#001D3D] text-sm">{price}</td>
    <td className="p-6">
       <button className="text-[#FF5E00] font-black uppercase text-[10px] tracking-widest underline">Manage</button>
    </td>
  </tr>
);

export default VendorDashboard;