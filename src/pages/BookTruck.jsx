import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, MapPin, Calendar, Package, 
  Weight, Truck, ChevronRight, Phone, CheckCircle2, Edit3
} from 'lucide-react';

const BookTruck = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    pickup: '',
    drop: '',
    date: '',
    materialType: 'Industrial Goods',
    otherMaterial: '', // New field for 'Other' option
    weight: '',
    truckCategory: '', 
    truckSize: '',
    mobile: ''
  });

  const truckOptions = {
    Open: ["17 Feet Open", "20 Feet Open", "22 Feet Open", "24 Feet Open", "10 Whl Open", "12 Whl Open", "14 Whl Open", "16 Whl Open", "18 Whl Open", "40 Feet Flat Bed", "40 Feet Semi Bed"],
    Closed: ["20 Feet Closed", "22 Feet Closed", "24 Feet Closed", "32 Feet Single Axle", "32 Feet S.A. High Cube", "32 Feet Multi Axle", "32 Feet M.A. High Cube", "32 Feet Triple Axle"],
    Mini: ["7 ft", "7.5 ft", "8 ft", "9 ft", "10 ft", "12 ft", "14 ft", "16 ft"]
  };

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (category) => {
    setBookingData({ ...bookingData, truckCategory: category, truckSize: '' });
  };

  const isFirstStepValid = () => {
    const isMaterialValid = bookingData.materialType === 'Other' ? bookingData.otherMaterial : true;
    return (
      bookingData.pickup && 
      bookingData.drop && 
      bookingData.date && 
      bookingData.weight && 
      bookingData.truckCategory && 
      bookingData.truckSize &&
      isMaterialValid
    );
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "truck_bookings"), {
        ...bookingData,
        status: "Pending",
        timestamp: new Date()
      });
      alert("Booking Successful! Our team will contact you shortly.");
      navigate('/truck-transport');
    } catch (error) {
      alert("Error saving booking. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      <div className="bg-[#002D5E] text-white p-6 flex items-center gap-4 sticky top-0 z-50 shadow-lg">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"><ArrowLeft size={20}/></button>
        <h1 className="text-xl font-black italic uppercase tracking-tighter">Book <span className="text-orange-400">Truck</span></h1>
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <form onSubmit={handleBooking} className="space-y-6">
          
          {step === 1 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              
              {/* 📍 1. Route Selection */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
                <h2 className="flex items-center gap-2 font-black uppercase text-xs text-blue-600 mb-2 tracking-widest"><MapPin size={16}/> Route Details</h2>
                <div className="space-y-3">
                  <input name="pickup" placeholder="Enter Pickup Location" required className="form-input" onChange={handleChange} />
                  <input name="drop" placeholder="Enter Drop Location" required className="form-input" onChange={handleChange} />
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-400 ml-4 mb-1 uppercase">Loading Date</label>
                    <input type="date" name="date" required className="form-input" onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* 📦 2. Load Details */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
                <h2 className="flex items-center gap-2 font-black uppercase text-xs text-orange-600 mb-2 tracking-widest"><Package size={16}/> Load Information</h2>
                <select name="materialType" className="form-input font-bold" onChange={handleChange} value={bookingData.materialType}>
                  <option>Industrial Goods</option>
                  <option>Household Shifting</option>
                  <option>Agriculture / Perishables</option>
                  <option>Construction Materials</option>
                  <option>E-commerce / FMCG</option>
                  <option value="Other">Other (Please Specify)</option>
                </select>

                {/* Conditional Input for 'Other' */}
                {bookingData.materialType === 'Other' && (
                  <div className="relative animate-in zoom-in-95 duration-200">
                    <Edit3 size={18} className="absolute left-4 top-4 text-orange-500" />
                    <input 
                      name="otherMaterial" 
                      placeholder="Specify your load type..." 
                      required 
                      className="form-input pl-12 border-orange-200 bg-orange-50/30" 
                      onChange={handleChange} 
                    />
                  </div>
                )}

                <div className="relative">
                   <Weight size={18} className="absolute left-4 top-4 text-slate-400" />
                   <input type="number" name="weight" step="0.1" placeholder="Total Weight (in Tons)" required className="form-input pl-12" onChange={handleChange} />
                </div>
              </div>

              {/* 🚛 3. Truck Configuration */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
                <h2 className="flex items-center gap-2 font-black uppercase text-xs text-green-600 mb-2 tracking-widest"><Truck size={16}/> Vehicle Selection</h2>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(truckOptions).map((cat) => (
                    <button 
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`py-3 text-[11px] font-black uppercase rounded-xl border-2 transition-all ${bookingData.truckCategory === cat ? 'border-[#002D5E] bg-[#002D5E] text-white shadow-md' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      {cat} Body
                    </button>
                  ))}
                </div>

                {bookingData.truckCategory && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Select {bookingData.truckCategory} Size</label>
                    <select 
                      name="truckSize" 
                      required 
                      className="form-input font-black text-[#002D5E]" 
                      value={bookingData.truckSize}
                      onChange={handleChange}
                    >
                      <option value="">-- Choose Capacity --</option>
                      {truckOptions[bookingData.truckCategory].map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <button 
                type="button" 
                onClick={() => isFirstStepValid() ? setStep(2) : alert("Please fill all details and select a truck.")}
                disabled={!isFirstStepValid()}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 ${isFirstStepValid() ? 'bg-[#002D5E] text-white hover:bg-blue-900' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                Continue to Contact <ChevronRight size={20}/>
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100 text-center space-y-6">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-[#002D5E]">
                  <Phone size={32} />
                </div>
                <h2 className="text-2xl font-[1000] uppercase italic tracking-tighter">Quick Verification</h2>
                <p className="text-slate-500 font-bold leading-tight">Enter your mobile number to confirm the booking request.</p>
                <div className="relative">
                  <span className="absolute left-5 top-4 font-black text-slate-400">+91</span>
                  <input 
                    type="tel" name="mobile" placeholder="Mobile Number" 
                    required className="form-input text-center text-xl tracking-[0.3em] pl-12" 
                    maxLength="10" onChange={handleChange} 
                  />
                </div>
                <button 
                  disabled={loading || bookingData.mobile.length < 10} 
                  className={`group w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 ${bookingData.mobile.length === 10 ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-400'}`}
                >
                  {loading ? "Processing..." : "Confirm Booking"}
                  {!loading && <CheckCircle2 size={20} className="group-hover:scale-125 transition-transform"/>}
                </button>
                <button type="button" onClick={() => setStep(1)} className="text-slate-400 font-bold text-xs uppercase underline tracking-tighter hover:text-slate-600 transition">Back to Details</button>
              </div>
            </div>
          )}

          {/* 🚛 ✅ UPDATED: Fleet Photo Made Larger and More Impactful */}
          <div className="mt-12 -mx-4 md:-mx-12 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white animate-in fade-in slide-in-from-bottom-8">
            <img 
              src="/fleet-all-logistics.png" 
              alt="Apni Manzil Fleet" 
              className="w-full h-auto object-cover block"
            />
          </div>

        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border-radius: 1.25rem;
          border: 2px solid #f1f5f9;
          font-weight: 700;
          outline: none;
          transition: all 0.2s;
          color: #1e293b;
        }
        .form-input:focus {
          border-color: #002D5E;
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default BookTruck;