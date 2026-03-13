import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, HomeIcon, Building2, Globe, Search, Cpu, PlaneTakeoff, Ship, Receipt, Handshake } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // Services Data
  const services = [
    { 
      id: 'courier', 
      title: 'Courier Services', 
      desc: 'Domestic & International', 
      icon: <Package size={30} color="#008a5e" />, 
      btnColor: '#008a5e' 
    },
    { 
      id: 'transport', 
      title: 'Transport', 
      desc: 'Heavy & Full Truck', 
      icon: <Truck size={30} color="#e64a19" />, 
      btnColor: '#e64a19' 
    },
    { 
      id: 'packers', 
      title: 'Packers & Movers', 
      desc: 'Safe Home Shifting', 
      icon: <HomeIcon size={30} color="#f57c00" />, 
      btnColor: '#f57c00' 
    },
    { 
      id: 'msme', 
      title: 'Business MSME', 
      desc: 'Bulk B2B Solutions', 
      icon: <Building2 size={30} color="#1976d2" />, 
      btnColor: '#1976d2' 
    },
    { 
      id: 'importexport', 
      title: 'Import & Export', 
      desc: 'Global Trade & Logistics', 
      icon: <Globe size={30} color="#6a1b9a" />, 
      btnColor: '#6a1b9a' 
    },
    { 
      id: 'airfreight', 
      title: 'Air Freight', 
      desc: 'Fast Cargo Services', 
      icon: <PlaneTakeoff size={30} color="#4fc3f7" />, 
      btnColor: '#4fc3f7' 
    },
    { 
      id: 'seafreight', 
      title: 'Sea Freight', 
      desc: 'Cost-Effective Cargo', 
      icon: <Ship size={30} color="#1a237e" />, 
      btnColor: '#1a237e' 
    },
    { 
      id: 'customs', 
      title: 'Customs Clearance', 
      desc: 'Hassle-Free Documentation', 
      icon: <Receipt size={30} color="#ffd600" />, 
      btnColor: '#ffd600' 
    },
    { 
      id: 'tradefinance', 
      title: 'Trade Finance', 
      desc: 'Funding for International Trade', 
      icon: <Handshake size={30} color="#d32f2f" />, 
      btnColor: '#d32f2f' 
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Segoe UI,