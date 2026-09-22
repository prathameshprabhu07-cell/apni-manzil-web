import React, { useEffect, useState } from "react";
import {
  Truck,
  ClipboardList,
  MapPin,
  CheckCircle,
  Bell,
  ArrowUpRight,
  Star,
  ShieldCheck,
  FileText,
  Building2,
  CreditCard,
  Package,
  IndianRupee,
  Route,
  User,
  Mail,
  Phone,
} from "lucide-react";

import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { auth, db } from "../firebaseConfig";

const VendorDashboard = ({ partnerData }) => {
  const [firebasePartner, setFirebasePartner] = useState(null);
  const [loadingPartner, setLoadingPartner] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoadingPartner(false);
        return;
      }

      try {
        console.log("🔐 Logged-in Firebase UID:", user.uid);

        const q = query(
          collection(db, "partner_profiles"),
          where("Firebase_UID", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();

          console.log("✅ Partner profile loaded:", data);

          setFirebasePartner(data);
        } else {
          console.log(
            "❌ Partner profile not found for UID:",
            user.uid
          );
        }
      } catch (error) {
        console.error(
          "❌ Partner profile fetch error:",
          error
        );
      } finally {
        setLoadingPartner(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const partner = firebasePartner || partnerData || {};

  const partnerType = String(
    partner.Partner_Type ||
      partner.partnerType ||
      partner.Service_Type ||
      ""
  );

  const isTruckOwner = partnerType
    .toLowerCase()
    .includes("truck owner");

  const isTransporter = partnerType
    .toLowerCase()
    .includes("transporter");

  const isVerified =
    String(partner.Partner_Status || "").toLowerCase() === "active";

  const services = toList(
    partner.Services ||
      partner.Service_Categories ||
      partner.Service_Category
  );

  const vehicleTypes = toList(
    partner.Vehicle_Types ||
      partner.Vehicle_Categories
  );

  const serviceCities = toList(
    partner.Service_Cities ||
      partner.Service_Cities_Covered
  );

  const routes = toList(
    partner.Preferred_Routes ||
      partner.Routes
  );

  if (loadingPartner) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#001D3D] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-black text-[#001D3D] uppercase tracking-widest">
            Loading Partner Dashboard...
          </p>
        </div>
      </div>
    );
  }

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
                {partner.Company_Name ||
                  partner.Business_Name ||
                  "Partner Dashboard"}
              </h1>

              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.25em]">
                {partnerType || "Apni Manzil Partner"}
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-2 mt-4">

            <Badge
              text={`Partner ID: ${
                partner.Partner_ID || "—"
              }`}
              className="bg-blue-50 text-blue-700"
            />

            <Badge
              text={partner.Partner_Status || "Pending"}
              className={
                isVerified
                  ? "bg-green-50 text-green-700"
                  : "bg-orange-50 text-orange-700"
              }
            />

            <Badge
              text={`Verification: ${
                partner.Verification_Status || "Pending"
              }`}
              className="bg-purple-50 text-purple-700"
            />

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

          <button
            type="button"
            className="bg-[#001D3D] text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest"
          >
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
          icon={<ClipboardList size={20} />}
          label="Total Leads"
          value={partner.Total_Leads ?? 0}
          sub="Assigned to you"
        />

        <StatCard
          icon={<CheckCircle size={20} />}
          label="Total Bookings"
          value={partner.Total_Bookings ?? 0}
          sub="Confirmed bookings"
        />

        <StatCard
          icon={<Star size={20} />}
          label="Rating"
          value={partner.Partner_Rating || "0"}
          sub="Customer rating"
        />

        <StatCard
          icon={<ShieldCheck size={20} />}
          label="Lead Eligible"
          value={partner.Lead_Eligible || "No"}
          sub="Partner eligibility"
        />

      </div>


      {/* =====================================================
          BUSINESS INFORMATION
      ===================================================== */}

      <Section
        title="Business Information"
        icon={<Building2 size={20} />}
      >

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <Info
            label="Company / Business Name"
            value={
              partner.Company_Name ||
              partner.Business_Name
            }
          />

          <Info
            label="Partner Type"
            value={partnerType}
          />

          <Info
            label="Contact Person"
            value={
              partner.Contact_Person ||
              partner.Full_Name ||
              partner.Owner_Name
            }
          />

          <Info
            label="Year Started"
            value={
              partner.Year_Started ||
              partner.Years_In_Business
            }
          />

          <Info
            label="Mobile"
            value={partner.Mobile}
          />

          <Info
            label="WhatsApp"
            value={partner.WhatsApp}
          />

          <Info
            label="Email"
            value={
              partner.Email ||
              partner.Login_Email
            }
          />

          <Info
            label="Website"
            value={partner.Website}
          />

          <Info
            label="Business Type"
            value={partner.Business_Type}
          />

          <Info
            label="GST Registered"
            value={partner.GST_Registered}
          />

          <Info
            label="GST Number"
            value={partner.GST_Number}
          />

          <Info
            label="PAN"
            value={partner.PAN}
          />

          <Info
            label="Address"
            value={
              partner.Full_Address ||
              partner.Business_Address
            }
          />

          <Info
            label="City"
            value={partner.City}
          />

          <Info
            label="State"
            value={partner.State}
          />

          <Info
            label="Pincode"
            value={partner.Pincode}
          />

        </div>

      </Section>


      {/* =====================================================
          PARTNER SERVICES
      ===================================================== */}

      <Section
        title="Partner Services"
        icon={<Package size={20} />}
      >

        <div className="flex flex-wrap gap-3">

          {services.length > 0 ? (
            services.map((service, index) => (

              <span
                key={`${service}-${index}`}
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

        {isTransporter && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <StatusBox
              label="FTL"
              value={partner.FTL}
            />

            <StatusBox
              label="PTL"
              value={partner.PTL}
            />

            <StatusBox
              label="Dedicated"
              value={partner.Dedicated_Transportation}
            />

            <StatusBox
              label="Return Load"
              value={partner.Return_Load}
            />

          </div>
        )}

      </Section>


      {/* =====================================================
          SERVICE COVERAGE / ROUTES
      ===================================================== */}

      <Section
        title="Service Coverage & Routes"
        icon={<MapPin size={20} />}
      >

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <TagBox
            title="Service Cities"
            items={serviceCities}
          />

          <TagBox
            title="Pickup Cities"
            items={partner.Pickup_Cities}
          />

          <TagBox
            title="Delivery Cities"
            items={partner.Delivery_Cities}
          />

        </div>

        <div className="mt-6">

          <TagBox
            title="Preferred Routes"
            items={routes}
          />

        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

          <StatusBox
            label="Local Delivery"
            value={partner.Local_Delivery}
          />

          <StatusBox
            label="Within City"
            value={partner.Within_City}
          />

          <StatusBox
            label="Interstate"
            value={partner.Interstate}
          />

          <StatusBox
            label="Maharashtra"
            value={partner.Maharashtra}
          />

          <StatusBox
            label="Pan India"
            value={partner.Pan_India}
          />

        </div>

      </Section>


      {/* =====================================================
          FLEET
      ===================================================== */}

      <Section
        title="Fleet & Vehicles"
        icon={<Truck size={20} />}
      >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div>

            <p className="text-[10px] font-black uppercase text-slate-400 mb-4">
              Vehicle Categories
            </p>

            <div className="flex flex-wrap gap-3">

              {vehicleTypes.length > 0 ? (
                vehicleTypes.map((vehicle, index) => (

                  <span
                    key={`${vehicle}-${index}`}
                    className="px-4 py-3 rounded-xl bg-blue-50 text-blue-700 text-xs font-black"
                  >
                    🚚 {formatVehicle(vehicle)}
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
              label="Own Trucks"
              value={
                partner.Own_Trucks ??
                partner.Own_Vehicles
              }
            />

            <MiniInfo
              label="Attached Trucks"
              value={
                partner.Attached_Trucks ??
                partner.Attached_Vehicles
              }
            />

            <MiniInfo
              label="Total Fleet"
              value={
                partner.Total_Fleet ??
                partner.Fleet_Size
              }
            />

            <MiniInfo
              label="Fleet Size"
              value={
                partner.fleetSize ??
                partner.Fleet_Size
              }
            />

          </div>

        </div>


        {/* Transporter specific */}

        {isTransporter && (

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">

            <Info
              label="Rate Type"
              value={partner.Rate_Type}
            />

            <Info
              label="Minimum Trip Charge"
              value={
                partner.Minimum_Trip_Charge
                  ? `₹${partner.Minimum_Trip_Charge}`
                  : ""
              }
            />

            <Info
              label="Minimum KM"
              value={partner.Minimum_KM}
            />

          </div>

        )}


        {/* Truck owner specific */}

        {isTruckOwner && (

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">

            <Info
              label="Vehicle Number"
              value={partner.Vehicle_Number}
            />

            <Info
              label="Vehicle Type"
              value={partner.Vehicle_Type}
            />

            <Info
              label="Capacity"
              value={partner.Capacity_Ton}
            />

            <Info
              label="Body Type"
              value={partner.Body_Type}
            />

            <Info
              label="Ownership"
              value={partner.Ownership}
            />

            <Info
              label="RC Number"
              value={partner.RC_Number}
            />

          </div>

        )}

      </Section>


      {/* =====================================================
          PRICING
      ===================================================== */}

      <Section
        title="Pricing"
        icon={<IndianRupee size={20} />}
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <PriceCard
            title="Minimum Trip"
            value={partner.Minimum_Trip_Charge}
          />

          <PriceCard
            title="Per KM"
            value={partner.Per_KM_Rate}
            suffix="/ KM"
          />

          <PriceCard
            title="Minimum KM"
            value={partner.Minimum_KM}
          />

          <PriceCard
            title="Toll"
            value={partner.Toll_Included}
            rupee={false}
          />

          <PriceCard
            title="Driver Allowance"
            value={partner.Driver_Allowance_Included}
            rupee={false}
          />

          <PriceCard
            title="Loading"
            value={partner.Loading_Included}
            rupee={false}
          />

          <PriceCard
            title="Unloading"
            value={partner.Unloading_Included}
            rupee={false}
          />

        </div>

      </Section>


      {/* =====================================================
          OPERATIONS
      ===================================================== */}

      <Section
        title="Operations"
        icon={<Route size={20} />}
      >

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <Info
            label="Minimum Notice"
            value={partner.Minimum_Notice_Period}
          />

          <Info
            label="Pickup Time"
            value={partner.Preferred_Pickup_Time}
          />

          <Info
            label="Working Days"
            value={partner.Working_Days}
          />

          <Info
            label="Lead Receive Mode"
            value={partner.Lead_Receive_Mode}
          />

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          <StatusBox
            label="Immediate Load"
            value={partner.Immediate_Load}
          />

          <StatusBox
            label="Advance Booking"
            value={partner.Advance_Booking}
          />

          <StatusBox
            label="24/7 Support"
            value={partner.Support_24_7}
          />

          <StatusBox
            label="GPS Tracking"
            value={partner.GPS_Tracking}
          />

          <StatusBox
            label="ePOD"
            value={partner.EPOD}
          />

          <StatusBox
            label="Door to Door"
            value={partner.Door_To_Door}
          />

          <StatusBox
            label="Warehousing"
            value={partner.Warehousing}
          />

          <StatusBox
            label="Insurance Assistance"
            value={partner.Insurance_Assistance}
          />

        </div>

      </Section>


      {/* =====================================================
          DOCUMENTS & VERIFICATION
      ===================================================== */}

      <Section
        title="Verification & Documents"
        icon={<FileText size={20} />}
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <Verification
            label="Business Proof"
            value={partner.Business_Proof_Verified}
          />

          <Verification
            label="GST"
            value={partner.GST_Verified}
          />

          <Verification
            label="Address"
            value={partner.Address_Verified}
          />

          <Verification
            label="Mobile"
            value={partner.Mobile_Verified}
          />

          <Verification
            label="WhatsApp"
            value={partner.WhatsApp_Verified}
          />

          <Verification
            label="Documents"
            value={partner.Documents_Checked}
          />

          <Verification
            label="Google Profile"
            value={partner.Google_Profile_Verified}
          />

          <Verification
            label="RC"
            value={partner.RC_Verified}
          />

        </div>

      </Section>


      {/* =====================================================
          PAYMENT / BANK
      ===================================================== */}

      <Section
        title="Payment / Bank Details"
        icon={<CreditCard size={20} />}
      >

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <Info
            label="Account Holder"
            value={
              partner.Account_Holder ||
              partner.Account_Holder_Name
            }
          />

          <Info
            label="Bank"
            value={partner.Bank_Name}
          />

          <Info
            label="Account Number"
            value={
              partner.Account_Number
                ? `****${String(
                    partner.Account_Number
                  ).slice(-4)}`
                : ""
            }
          />

          <Info
            label="IFSC"
            value={
              partner.IFSC ||
              partner.IFSC_Code
            }
          />

          <Info
            label="UPI"
            value={
              partner.UPI ||
              partner.UPI_ID
            }
          />

        </div>

      </Section>


      {/* =====================================================
          ADDITIONAL INFORMATION
      ===================================================== */}

      <Section
        title="Additional Information"
        icon={<ClipboardList size={20} />}
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Info
            label="Google Business Profile"
            value={partner.Google_Business_Profile}
          />

          <Info
            label="Additional Information"
            value={partner.Additional_Information}
          />

        </div>

      </Section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="mt-8 bg-[#001D3D] rounded-[28px] p-6 text-white flex flex-col md:flex-row justify-between gap-4">

        <div>

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            Apni Manzil Partner Network
          </p>

          <p className="text-lg font-black mt-1">
            One Solution for All Logistics
          </p>

        </div>

        <div className="text-left md:text-right">

          <p className="text-[10px] text-slate-300 uppercase font-bold">
            Last Updated
          </p>

          <p className="font-bold text-sm">
            {partner.Last_Updated ||
              partner.Registered_At ||
              "—"}
          </p>

        </div>

      </div>

    </div>
  );
};


/* =====================================================
   HELPERS
===================================================== */

const toList = (value) => {

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (!value) {
    return [];
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};


const formatVehicle = (vehicle) => {

  if (typeof vehicle === "string") {
    return vehicle;
  }

  if (vehicle && typeof vehicle === "object") {

    const type =
      vehicle.Vehicle_Type ||
      vehicle.vehicleType ||
      "";

    const count =
      vehicle.Vehicle_Count ??
      vehicle.count ??
      "";

    const capacity =
      vehicle.Capacity ||
      vehicle.capacity ||
      "";

    return [
      type,
      count ? `(${count})` : "",
      capacity ? `- ${capacity}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  return String(vehicle || "");
};


/* =====================================================
   SECTION
===================================================== */

const Section = ({
  title,
  icon,
  children,
}) => {

  return (
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
};


/* =====================================================
   BADGE
===================================================== */

const Badge = ({
  text,
  className,
}) => {

  return (
    <span
      className={`px-4 py-2 rounded-full text-[10px] font-black uppercase ${className}`}
    >
      {text}
    </span>
  );
};


/* =====================================================
   STAT CARD
===================================================== */

const StatCard = ({
  icon,
  label,
  value,
  sub,
}) => {

  return (
    <div className="bg-white p-6 rounded-[26px] border border-slate-100 shadow-sm">

      <div className="flex justify-between items-start">

        <div className="p-3 bg-slate-50 rounded-xl text-[#001D3D]">
          {icon}
        </div>

        <ArrowUpRight
          size={16}
          className="text-slate-300"
        />

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
};


/* =====================================================
   INFO
===================================================== */

const Info = ({
  label,
  value,
}) => {

  return (
    <div className="bg-slate-50 rounded-2xl p-4">

      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="text-sm font-black text-[#001D3D] mt-2 break-words">
        {value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
          ? String(value)
          : "Not provided"}
      </p>

    </div>
  );
};


/* =====================================================
   MINI INFO
===================================================== */

const MiniInfo = ({
  label,
  value,
}) => {

  return (
    <div className="bg-slate-50 rounded-2xl p-4">

      <p className="text-[9px] font-black uppercase text-slate-400">
        {label}
      </p>

      <p className="text-lg font-black text-[#001D3D] mt-1">
        {value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
          ? value
          : "0"}
      </p>

    </div>
  );
};


/* =====================================================
   PRICE CARD
===================================================== */

const PriceCard = ({
  title,
  value,
  suffix = "",
  rupee = true,
}) => {

  const hasValue =
    value !== undefined &&
    value !== null &&
    String(value).trim() !== "";

  return (
    <div className="bg-slate-50 rounded-2xl p-5">

      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
        {title}
      </p>

      <p className="text-2xl font-black text-[#001D3D] mt-2">

        {hasValue
          ? `${rupee ? "₹" : ""}${value}`
          : "—"}

        {suffix && (
          <span className="text-xs text-slate-400 ml-1">
            {suffix}
          </span>
        )}

      </p>

    </div>
  );
};


/* =====================================================
   TAG BOX
===================================================== */

const TagBox = ({
  title,
  items,
}) => {

  const list = toList(items);

  return (
    <div className="bg-slate-50 rounded-2xl p-5">

      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4">
        {title}
      </p>

      <div className="flex flex-wrap gap-2">

        {list.length > 0 ? (

          list.map((item, index) => (

            <span
              key={`${String(item)}-${index}`}
              className="px-3 py-2 rounded-lg bg-white border border-slate-100 text-xs font-bold text-[#001D3D]"
            >
              {typeof item === "object"
                ? formatVehicle(item)
                : item}
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


/* =====================================================
   STATUS BOX
===================================================== */

const StatusBox = ({
  label,
  value,
}) => {

  const normalized = String(
    value ?? ""
  ).toLowerCase();

  const yes =
    normalized === "yes" ||
    normalized === "true" ||
    normalized === "active";

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
        {value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
          ? String(value)
          : "No"}
      </span>

    </div>
  );
};


/* =====================================================
   VERIFICATION
===================================================== */

const Verification = ({
  label,
  value,
}) => {

  const normalized = String(
    value ?? ""
  ).toLowerCase();

  const verified =
    normalized === "verified" ||
    normalized === "yes" ||
    normalized === "true";

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