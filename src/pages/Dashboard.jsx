import React, { useState, useEffect } from 'react';
import { db } from "../firebase"; // तुझा Firebase पाथ
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // आपण 'leads' नावाच्या कलेक्शनमधून डेटा घेत आहोत
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Operational Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">{lead.customerName || "No Name"}</h3>
            <p className="text-gray-600"><strong>Phone:</strong> {lead.customerPhone}</p>
            <p className="text-gray-600"><strong>From:</strong> {lead.fromCity}</p>
            <p className="text-gray-600"><strong>To:</strong> {lead.toCity}</p>
            <p className="text-gray-600"><strong>Date:</strong> {lead.moveDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;