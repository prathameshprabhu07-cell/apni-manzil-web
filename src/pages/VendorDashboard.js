```javascript
import React from "react";
import {
  Truck,
  Wallet,
  ClipboardList,
  Map,
  CheckCircle,
  Bell,
  TrendingUp,
  ArrowUpRight,
  Clock,
  User,
  FileText,
  Building2,
  CreditCard,
  Star,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Package,
  IndianRupee,
} from "lucide-react";

const VendorDashboard = ({ partnerData }) => {
  // =====================================================
  // REAL PARTNER DATA
  // =====================================================

  const partner = partnerData || {};

  const services = partner.Services
    ? partner.Services.split(",").map((item) => item.trim())
    : [];

  const vehicleTypes = partner.Vehicle_Types
    ? partner.Vehicle_Types.split(",").map((item) => item.trim())
    : [];

  const serviceCities = partner.Service_Cities
    ? partner.Service_Cities.split(",").map((item) => item.trim())
    : [];

  const isVerified =
    String(partner.Partner_Status || "").toLowerCase() === "active";

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">

        <div>
          <div className="flex items-center gap-3 mb-2">

            <div className="p-3 bg-[#001D3D] rounded-2xl">
              <Truck className="text-white" size={26} />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#001D3D] uppercase italic tracking-tight">
                {partner.Company_Name || "Partner Dashboard"}
              </h1>

              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.25em]">
                Packers & Movers Partner
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-2 mt-4">

            <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase">
              Partner ID: {partner.Partner_ID || "—"}
            </span>

            <span
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase ${
                isVerified
                  ? "bg-green-50 text-green-700"
                  : "bg-orange-50 text-orange-700"
              }`}
            >
              {partner.Partner_Status || "Pending"}
            </span>

            <span className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-[10px] font-black uppercase">
              Verification: {partner.Verification_Status || "Pending"}
            </span>

          </div>
        </div>

        <div className="flex gap-3">

          <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase">
              Partner Rating
            </p>

            <p className="text-xl font-black text-[#FF5E00] flex items-center gap-1">
              <Star size={18} fill="currentColor" />
              {partner.Partner_Rating || "0"}
            </p>
          </div>

          <button className="bg-[#001D3D] text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">
            <Bell size={16} className="inline mr-2" />
            Notifications
          </button>

        </div>
      </div>


      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <StatCard
          icon={<ClipboardList />}
          label="Total Leads"
          value={partner.Total_Leads ?? 0}
          sub="Assigned to you"
        />

        <StatCard
          icon={<CheckCircle />}
          label="Total Bookings"
          value={partner.Total_Bookings ?? 0}
          sub="Completed / confirmed"
        />

        <StatCard
          icon={<Star />}
          label="Rating"
          value={partner.Partner_Rating || "0"}
          sub="Customer rating"
        />

        <StatCard
          icon={<ShieldCheck />}
          label="Lead Eligible"
          value={partner.Lead_Eligible || "No"}
          sub="Partner eligibility"
        />

      </div>


      {/* =====================================================
          BUSINESS INFORMATION
      ===================================================== */}

      <Section title="Business Information" icon={<Building2 />}>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <Info label="Company Name" value={partner.Company_Name} />
          <Info label="Owner Name" value={partner.Owner_Name} />
          <Info label="Service Type" value={partner.Service_Type} />
          <Info label="Years In Business" value={partner.Years_In_Business} />

          <Info label="Mobile" value={partner.Mobile} />
          <Info label="WhatsApp" value={partner.WhatsApp} />
          <Info label="Email" value={partner.Email} />
          <Info label="Website" value={partner.Website} />

          <Info label="Business Address" value={partner.Business_Address} />
          <Info label="City" value={partner.City} />
          <Info label="Pincode" value={partner.Pincode} />
          <Info label="Base City" value={partner.Base_City} />

        </div>

      </Section>


      {/* =====================================================
          SERVICE AREAS
      ===================================================== */}

      <Section title="Service Coverage" icon={<MapPin />}>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <TagBox
            title="Service Cities"
            items={serviceCities}
          />

          <TagBox
            title="Pickup Areas"
            items={partner.Pickup_Areas}
          />

          <TagBox
            title="Drop Areas"
            items={partner.Drop_Areas}
          />

        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

          <StatusBox
            label="Local Service"
            value={partner.Local_Service}
          />

          <StatusBox
            label="Intercity Service"
            value={partner.Intercity_Service}
          />

          <StatusBox
            label="Outstation Service"
            value={partner.Outstation_Service}
          />

        </div>

      </Section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <Section title="Packers & Movers Services" icon={<Package />}>

        <div className="flex flex-wrap gap-3">

          {services.length > 0 ? (
            services.map((service, index) => (
              <span
                key={index}
                className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-[#001D3D] text-xs font-black"
              >
                ✓ {service}
              </span>
            ))
          ) : (
            <p className="text-slate-400 text-sm">
              No services available
            </p>
          )}

        </div>

      </Section>


      {/* =====================================================
          VEHICLES & TEAM
      ===================================================== */}

      <Section title="Vehicles & Team" icon={<Truck />}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div>

            <p className="text-[10px] font-black uppercase text-slate-400 mb-4">
              Vehicle Types
            </p>

            <div className="flex flex-wrap gap-3">

              {vehicleTypes.length > 0 ? (
                vehicleTypes.map((vehicle, index) => (
                  <span
                    key={index}
                    className="px-4 py-3 rounded-xl bg-blue-50 text-blue-700 text-xs font-black"
                  >
                    🚚 {vehicle}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 text-sm">
                  No vehicle information
                </span>
              )}

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <MiniInfo
              label="Vehicles"
              value={partner.Number_Of_Vehicles}
            />

            <MiniInfo
              label="Workers"
              value={partner.Worker_Count}
            />

            <MiniInfo
              label="Own Vehicles"
              value={partner.Own_Vehicles}
            />

            <MiniInfo
              label="Attached Vehicles"
              value={partner.Attached_Vehicles}
            />

            <MiniInfo
              label="Loading Team"
              value={partner.Loading_Team}
            />

            <MiniInfo
              label="Driver Available"
              value={partner.Driver_Available}
            />

          </div>

        </div>

      </Section>


      {/* =====================================================
          PACKERS & MOVERS PRICING
      ===================================================== */}

      <Section title="Current Pricing" icon={<IndianRupee />}>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <PriceCard
            title="Local Minimum"
            value={partner.Local_Minimum_Charge}
          />

          <PriceCard
            title="Per KM"
            value={partner.Per_KM_Rate}
            suffix="/ KM"
          />

          <PriceCard
            title="1 BHK"
            value={partner.BHK_1_Price}
          />

          <PriceCard
            title="2 BHK"
            value={partner.BHK_2_Price}
          />

          <PriceCard
            title="3 BHK"
            value={partner.BHK_3_Price}
          />

          <PriceCard
            title="4 BHK"
            value={partner.BHK_4_Price}
          />

          <PriceCard
            title="Packing"
            value={partner.Packing_Charges}
          />

          <PriceCard
            title="Loading"
            value={partner.Loading_Charges}
          />

          <PriceCard
            title="Unloading"
            value={partner.Unloading_Charges}
          />

        </div>

      </Section>


      {/* =====================================================
          BUSINESS POLICIES
      ===================================================== */}

      <Section title="Business & Customer Policies" icon={<ClipboardList />}>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <Info
            label="Insurance Available"
            value={partner.Insurance_Available}
          />

          <Info
            label="Damage Claim Policy"
            value={partner.Damage_Claim_Policy}
          />

          <Info
            label="Unresolved Complaint"
            value={partner.Unresolved_Complaint}
          />

          <Info
            label="Working Hours"
            value={partner.Working_Hours}
          />

          <Info
            label="Lead Receive Mode"
            value={partner.Lead_Receive_Mode}
          />

          <Info
            label="Accept Leads"
            value={partner.Accept_Leads}
          />

        </div>

      </Section>


      {/* =====================================================
          VERIFICATION
      ===================================================== */}

      <Section title="Verification & Documents" icon={<FileText />}>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <Verification label="Business Proof" value={partner.Business_Proof_Verified} />
          <Verification label="GST" value={partner.GST_Verified} />
          <Verification label="Address" value={partner.Address_Verified} />
          <Verification label="Mobile" value={partner.Mobile_Verified} />
          <Verification label="WhatsApp" value={partner.WhatsApp_Verified} />
          <Verification label="Google Profile" value={partner.Google_Profile_Verified} />
          <Verification label="Documents" value={partner.Documents_Checked} />

        </div>

      </Section>


      {/* =====================================================
          BANK DETAILS
      ===================================================== */}

      <Section title="Payment / Bank Details" icon={<CreditCard />}>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <Info
            label="Account Holder"
            value={partner.Account_Holder_Name}
          />

          <Info
            label="Bank"
            value={partner.Bank_Name}
          />

          <Info
            label="Account Number"
            value={
              partner.Account_Number
                ? `****${String(partner.Account_Number).slice(-4)}`
                : ""
            }
          />

          <Info
            label="Account Type"
            value={partner.Account_Type}
          />

          <Info
            label="IFSC"
            value={partner.IFSC_Code}
          />

          <Info
            label="UPI"
            value={partner.UPI_ID}
          />

        </div>

      </Section>


      {/* =====================================================
          PROFILE FOOTER
      ===================================================== */}

      <div className="mt-8 bg-[#001D3D] rounded-[28px] p-6 text-white flex flex-col md:flex-row justify-between gap-4">

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            Apni Manzil Partner Network
          </p>

          <p className="text-lg font-black mt-1">
            One Solution for All Deliveries
          </p>
        </div>

        <div className="text-right">

          <p className="text-[10px] text-slate-300 uppercase font-bold">
            Last Updated
          </p>

          <p className="font-bold text-sm">
            {partner.Last_Updated || "—"}
          </p>

        </div>

      </div>

    </div>
  );
};


// =====================================================
// COMPONENTS
// =====================================================

const Section = ({ title, icon, children }) => (
  <section className="bg-white rounded-[28px] border border-slate-100 shadow-sm p-6 md:p-8 mb-8">

    <div className="flex items-center gap-3 mb-6">

      <div className="p-3 bg-slate-50 rounded-xl text-[#001D3D]">
        {icon}
      </div>

      <h2 className="text-xl font-black text-[#001D3D] uppercase italic">
        {title}
      </h2>

    </div>

    {children}

  </section>
);


const StatCard = ({ icon, label, value, sub }) => (
  <div className="bg-white p-6 rounded-[26px] border border-slate-100 shadow-sm">

    <div className="flex justify-between items-start">

      <div className="p-3 bg-slate-50 rounded-xl text-[#001D3D]">
        {icon}
      </div>

      <ArrowUpRight size={16} className="text-slate-300" />

    </div>

    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-5">
      {label}
    </p>

    <h3 className="text-3xl font-black text-[#001D3D] mt-1">
      {value}
    </h3>

    <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">
      {sub}
    </p>

  </div>
);


const Info = ({ label, value }) => (
  <div className="bg-slate-50 rounded-2xl p-4">

    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
      {label}
    </p>

    <p className="text-sm font-black text-[#001D3D] mt-2 break-words">
      {value || "Not provided"}
    </p>

  </div>
);


const MiniInfo = ({ label, value }) => (
  <div className="bg-slate-50 rounded-2xl p-4">

    <p className="text-[9px] font-black uppercase text-slate-400">
      {label}
    </p>

    <p className="text-lg font-black text-[#001D3D] mt-1">
      {value || "0"}
    </p>

  </div>
);


const PriceCard = ({ title, value, suffix = "" }) => (
  <div className="bg-slate-50 rounded-2xl p-5">

    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
      {title}
    </p>

    <p className="text-2xl font-black text-[#001D3D] mt-2">
      {value ? `₹${value}` : "—"}
      {suffix && (
        <span className="text-xs text-slate-400 ml-1">
          {suffix}
        </span>
      )}
    </p>

  </div>
);


const TagBox = ({ title, items }) => {

  const list = Array.isArray(items)
    ? items
    : String(items || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return (
    <div className="bg-slate-50 rounded-2xl p-5">

      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4">
        {title}
      </p>

      <div className="flex flex-wrap gap-2">

        {list.length > 0 ? (
          list.map((item, index) => (
            <span
              key={index}
              className="px-3 py-2 rounded-lg bg-white border border-slate-100 text-xs font-bold text-[#001D3D]"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400">
            Not provided
          </span>
        )}

      </div>

    </div>
  );
};


const StatusBox = ({ label, value }) => {

  const yes =
    String(value || "").toLowerCase() === "yes";

  return (
    <div className="flex justify-between items-center bg-slate-50 rounded-2xl p-5">

      <span className="text-xs font-black text-[#001D3D]">
        {label}
      </span>

      <span
        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
          yes
            ? "bg-green-100 text-green-700"
            : "bg-slate-200 text-slate-500"
        }`}
      >
        {value || "No"}
      </span>

    </div>
  );
};


const Verification = ({ label, value }) => {

  const verified =
    String(value || "").toLowerCase() === "verified";

  return (
    <div className="flex justify-between items-center bg-slate-50 rounded-2xl p-4">

      <span className="text-xs font-black text-[#001D3D]">
        {label}
      </span>

      <span
        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
          verified
            ? "bg-green-100 text-green-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {value || "Pending"}
      </span>

    </div>
  );
};


export default VendorDashboard;
```
