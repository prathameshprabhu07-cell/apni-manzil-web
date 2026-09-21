import React, { useState } from "react";
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Clock,
  Package,
  Truck,
  Boxes,
  Monitor,
  Server,
  Armchair,
  FileText,
  Snowflake,
  ShieldAlert,
  Camera,
  Video,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Loader2,
  X,
} from "lucide-react";

const initialForm = {
  contactName: "",
  companyName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  gstNumber: "",

  moveType: "within_city",
  shiftingDate: "",
  pickupTime: "",

  pickupAddress: "",
  pickupCity: "",
  pickupState: "",
  pickupPincode: "",
  pickupFloor: "Ground Floor",
  pickupLift: "yes",
  pickupParking: "yes",
  pickupAccessIssue: "no",

  dropAddress: "",
  dropCity: "",
  dropState: "",
  dropPincode: "",
  dropFloor: "Ground Floor",
  dropLift: "yes",
  dropParking: "yes",
  dropAccessIssue: "no",

  items: {
    officeTables: 0,
    officeChairs: 0,
    workstations: 0,
    cabinets: 0,
    computers: 0,
    laptops: 0,
    monitors: 0,
    printers: 0,
    servers: 0,
    networking: 0,
    filesCartons: 0,
    acUnits: 0,
    pantryItems: 0,
    electronics: 0,
    other: 0,
  },

  approxBoxes: "",
  approxWeight: "dont_know",

  services: {
    packing: true,
    loading: true,
    transportation: true,
    unloading: true,
    unpacking: false,
    dismantling: false,
    reassembly: false,
    itHandling: false,
    acInstallation: false,
    fragileHandling: false,
    storage: false,
  },

  specialItems: {
    server: false,
    safeLocker: false,
    heavyMachinery: false,
    largePrinter: false,
    generator: false,
    glassFragile: false,
    other: false,
  },

  specialInstructions: "",
  agree: false,
};

const itemConfig = [
  { key: "officeTables", label: "Office Tables", icon: Building2 },
  { key: "officeChairs", label: "Office Chairs", icon: Armchair },
  { key: "workstations", label: "Workstations", icon: Building2 },
  { key: "cabinets", label: "Cabinets / Cupboards", icon: Boxes },
  { key: "computers", label: "Desktop Computers", icon: Monitor },
  { key: "laptops", label: "Laptops", icon: Monitor },
  { key: "monitors", label: "Monitors", icon: Monitor },
  { key: "printers", label: "Printers / Scanners", icon: Package },
  { key: "servers", label: "Servers", icon: Server },
  { key: "networking", label: "Networking Equipment", icon: Server },
  { key: "filesCartons", label: "Files / Cartons", icon: FileText },
  { key: "acUnits", label: "AC Units", icon: Snowflake },
  { key: "pantryItems", label: "Pantry Equipment", icon: Package },
  { key: "electronics", label: "Other Electronics", icon: Monitor },
  { key: "other", label: "Other Items", icon: Package },
];

const serviceConfig = [
  ["packing", "Professional Packing"],
  ["loading", "Loading"],
  ["transportation", "Transportation"],
  ["unloading", "Unloading"],
  ["unpacking", "Unpacking"],
  ["dismantling", "Furniture Dismantling"],
  ["reassembly", "Furniture Reassembly"],
  ["itHandling", "IT / Computer Handling"],
  ["acInstallation", "AC Dismantling / Installation"],
  ["fragileHandling", "Fragile Item Handling"],
  ["storage", "Temporary Storage"],
];

const specialConfig = [
  ["server", "Server"],
  ["safeLocker", "Safe / Locker"],
  ["heavyMachinery", "Heavy Machinery"],
  ["largePrinter", "Large Printer / Copier"],
  ["generator", "Generator"],
  ["glassFragile", "Glass / Fragile Items"],
  ["other", "Other Special Items"],
];

function Section({ number, title, icon: Icon, children, open, onToggle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
            {number}
          </div>

          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-slate-800">{title}</span>
          </div>
        </div>

        {open ? (
          <ChevronUp className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </button>

      {open && <div className="border-t border-slate-100 p-5">{children}</div>}
    </div>
  );
}

function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const selectClass = inputClass;

export default function OfficeShiftingForm({
  onSubmit,
  isSubmitting = false,
}) {
  const [form, setForm] = useState(initialForm);

  const [openSections, setOpenSections] = useState({
    customer: true,
    move: true,
    pickup: true,
    drop: true,
    items: true,
    services: true,
    special: true,
    photos: true,
    final: true,
  });

  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateItem = (key, value) => {
    const numberValue = Math.max(0, Number(value) || 0);

    setForm((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        [key]: numberValue,
      },
    }));
  };

  const updateService = (key, value) => {
    setForm((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [key]: value,
      },
    }));
  };

  const updateSpecial = (key, value) => {
    setForm((prev) => ({
      ...prev,
      specialItems: {
        ...prev.specialItems,
        [key]: value,
      },
    }));
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files || []);
    setPhotos(files.slice(0, 8));
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("Please confirm that the information provided is correct.");
      return;
    }

    if (form.mobile.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }

    if (!form.shiftingDate) {
      alert("Please select the shifting date.");
      return;
    }

    const payload = {
      ...form,
      photos,
      video,
      serviceType: "office_shifting",
      requestSource: "apni_manzil",
      submittedAt: new Date().toISOString(),
    };

    if (onSubmit) {
      await onSubmit(payload);
    } else {
      console.log("OFFICE SHIFTING REQUEST:", payload);
      alert("Office shifting request submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-7 text-white shadow-lg">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
                <Building2 className="h-4 w-4" />
                Apni Manzil
              </div>

              <h1 className="text-2xl font-bold md:text-3xl">
                Office Shifting
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-blue-50 md:text-base">
                Tell us about your office move and get quotations from
                suitable relocation partners.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-white/10 p-4 md:block">
              <Truck className="h-14 w-14" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* 1 Customer */}
          <Section
            number="01"
            title="Customer & Company Details"
            icon={User}
            open={openSections.customer}
            onToggle={() => toggleSection("customer")}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Contact Person Name" required>
                <input
                  className={inputClass}
                  value={form.contactName}
                  onChange={(e) => update("contactName", e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </Field>

              <Field label="Company / Office Name" required>
                <input
                  className={inputClass}
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  placeholder="Company name"
                  required
                />
              </Field>

              <Field label="Mobile Number" required>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    className={`${inputClass} pl-11`}
                    type="tel"
                    maxLength="10"
                    value={form.mobile}
                    onChange={(e) =>
                      update(
                        "mobile",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>
              </Field>

              <Field label="WhatsApp Number">
                <input
                  className={inputClass}
                  type="tel"
                  maxLength="10"
                  value={form.whatsapp}
                  onChange={(e) =>
                    update(
                      "whatsapp",
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  placeholder="WhatsApp number"
                />
              </Field>

              <Field label="Email">
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    className={`${inputClass} pl-11`}
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="company@example.com"
                  />
                </div>
              </Field>

              <Field label="GST Number" hint="Optional">
                <input
                  className={inputClass}
                  value={form.gstNumber}
                  onChange={(e) =>
                    update("gstNumber", e.target.value.toUpperCase())
                  }
                  placeholder="GSTIN (optional)"
                />
              </Field>
            </div>
          </Section>

          {/* 2 Move */}
          <Section
            number="02"
            title="Shifting Requirement"
            icon={CalendarDays}
            open={openSections.move}
            onToggle={() => toggleSection("move")}
          >
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Shifting Type" required>
                <select
                  className={selectClass}
                  value={form.moveType}
                  onChange={(e) => update("moveType", e.target.value)}
                >
                  <option value="within_city">Within Same City</option>
                  <option value="between_cities">One City to Another</option>
                </select>
              </Field>

              <Field label="Shifting Date" required>
                <input
                  className={inputClass}
                  type="date"
                  value={form.shiftingDate}
                  onChange={(e) => update("shiftingDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </Field>

              <Field label="Preferred Pickup Time">
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    className={`${inputClass} pl-11`}
                    type="time"
                    value={form.pickupTime}
                    onChange={(e) => update("pickupTime", e.target.value)}
                  />
                </div>
              </Field>
            </div>
          </Section>

          {/* 3 Pickup */}
          <Section
            number="03"
            title="Current Office – Pickup"
            icon={MapPin}
            open={openSections.pickup}
            onToggle={() => toggleSection("pickup")}
          >
            <div className="space-y-5">
              <Field label="Complete Pickup Address" required>
                <textarea
                  className={inputClass}
                  rows="3"
                  value={form.pickupAddress}
                  onChange={(e) => update("pickupAddress", e.target.value)}
                  placeholder="Building, street, area, landmark..."
                  required
                />
              </Field>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="City" required>
                  <input
                    className={inputClass}
                    value={form.pickupCity}
                    onChange={(e) => update("pickupCity", e.target.value)}
                    placeholder="Mumbai"
                    required
                  />
                </Field>

                <Field label="State" required>
                  <input
                    className={inputClass}
                    value={form.pickupState}
                    onChange={(e) => update("pickupState", e.target.value)}
                    placeholder="Maharashtra"
                    required
                  />
                </Field>

                <Field label="Pincode" required>
                  <input
                    className={inputClass}
                    maxLength="6"
                    value={form.pickupPincode}
                    onChange={(e) =>
                      update(
                        "pickupPincode",
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    placeholder="400001"
                    required
                  />
                </Field>

                <Field label="Office Floor">
                  <select
                    className={selectClass}
                    value={form.pickupFloor}
                    onChange={(e) => update("pickupFloor", e.target.value)}
                  >
                    <option>Ground Floor</option>
                    <option>1st Floor</option>
                    <option>2nd Floor</option>
                    <option>3rd Floor</option>
                    <option>4th Floor</option>
                    <option>5th Floor</option>
                    <option>6th Floor+</option>
                  </select>
                </Field>

                <Field label="Lift Available?">
                  <select
                    className={selectClass}
                    value={form.pickupLift}
                    onChange={(e) => update("pickupLift", e.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </Field>

                <Field label="Loading / Parking Available?">
                  <select
                    className={selectClass}
                    value={form.pickupParking}
                    onChange={(e) => update("pickupParking", e.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </Field>
              </div>

              <Field label="Narrow Lane / Access Problem?">
                <select
                  className={selectClass}
                  value={form.pickupAccessIssue}
                  onChange={(e) =>
                    update("pickupAccessIssue", e.target.value)
                  }
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* 4 Drop */}
          <Section
            number="04"
            title="New Office – Drop"
            icon={MapPin}
            open={openSections.drop}
            onToggle={() => toggleSection("drop")}
          >
            <div className="space-y-5">
              <Field label="Complete Drop Address" required>
                <textarea
                  className={inputClass}
                  rows="3"
                  value={form.dropAddress}
                  onChange={(e) => update("dropAddress", e.target.value)}
                  placeholder="New office building, street, area..."
                  required
                />
              </Field>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="City" required>
                  <input
                    className={inputClass}
                    value={form.dropCity}
                    onChange={(e) => update("dropCity", e.target.value)}
                    placeholder="Pune"
                    required
                  />
                </Field>

                <Field label="State" required>
                  <input
                    className={inputClass}
                    value={form.dropState}
                    onChange={(e) => update("dropState", e.target.value)}
                    placeholder="Maharashtra"
                    required
                  />
                </Field>

                <Field label="Pincode" required>
                  <input
                    className={inputClass}
                    maxLength="6"
                    value={form.dropPincode}
                    onChange={(e) =>
                      update(
                        "dropPincode",
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    placeholder="411001"
                    required
                  />
                </Field>

                <Field label="Office Floor">
                  <select
                    className={selectClass}
                    value={form.dropFloor}
                    onChange={(e) => update("dropFloor", e.target.value)}
                  >
                    <option>Ground Floor</option>
                    <option>1st Floor</option>
                    <option>2nd Floor</option>
                    <option>3rd Floor</option>
                    <option>4th Floor</option>
                    <option>5th Floor</option>
                    <option>6th Floor+</option>
                  </select>
                </Field>

                <Field label="Lift Available?">
                  <select
                    className={selectClass}
                    value={form.dropLift}
                    onChange={(e) => update("dropLift", e.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </Field>

                <Field label="Unloading / Parking Available?">
                  <select
                    className={selectClass}
                    value={form.dropParking}
                    onChange={(e) => update("dropParking", e.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </Field>
              </div>

              <Field label="Narrow Lane / Access Problem?">
                <select
                  className={selectClass}
                  value={form.dropAccessIssue}
                  onChange={(e) => update("dropAccessIssue", e.target.value)}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* 5 Items */}
          <Section
            number="05"
            title="Office Items & Approximate Quantity"
            icon={Package}
            open={openSections.items}
            onToggle={() => toggleSection("items")}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {itemConfig.map(({ key, label, icon: Icon }) => (
                <div
                  key={key}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {label}
                    </span>
                  </div>

                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={form.items[key]}
                    onChange={(e) => updateItem(key, e.target.value)}
                    placeholder="Quantity"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Approx. Number of Boxes / Cartons">
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  value={form.approxBoxes}
                  onChange={(e) => update("approxBoxes", e.target.value)}
                  placeholder="e.g. 30"
                />
              </Field>

              <Field label="Approx. Total Weight">
                <select
                  className={selectClass}
                  value={form.approxWeight}
                  onChange={(e) => update("approxWeight", e.target.value)}
                >
                  <option value="dont_know">I Don't Know</option>
                  <option value="under_100">Under 100 kg</option>
                  <option value="100_300">100–300 kg</option>
                  <option value="300_500">300–500 kg</option>
                  <option value="500_1000">500 kg–1 Ton</option>
                  <option value="over_1000">More than 1 Ton</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* 6 Services */}
          <Section
            number="06"
            title="Services Required"
            icon={Truck}
            open={openSections.services}
            onToggle={() => toggleSection("services")}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {serviceConfig.map(([key, label]) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    form.services[key]
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.services[key]}
                    onChange={(e) => updateService(key, e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </Section>

          {/* 7 Special */}
          <Section
            number="07"
            title="Heavy / Special / Fragile Items"
            icon={ShieldAlert}
            open={openSections.special}
            onToggle={() => toggleSection("special")}
          >
            <p className="mb-4 text-sm text-slate-500">
              Select anything that requires special handling.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {specialConfig.map(([key, label]) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    form.specialItems[key]
                      ? "border-orange-400 bg-orange-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.specialItems[key]}
                    onChange={(e) =>
                      updateSpecial(key, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-orange-600"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </Section>

          {/* 8 Photos */}
          <Section
            number="08"
            title="Office Photos / Video"
            icon={Camera}
            open={openSections.photos}
            onToggle={() => toggleSection("photos")}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Upload Office / Item Photos
                </label>

                <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition">
                  <Camera className="mb-3 h-8 w-8 text-blue-500" />
                  <span className="font-medium text-slate-700">
                    Click to upload photos
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    Up to 8 images
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotos}
                  />
                </label>

                {photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {photos.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="relative rounded-xl border border-slate-200 p-2"
                      >
                        <div className="truncate text-xs text-slate-600">
                          {file.name}
                        </div>

                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute right-1 top-1 rounded-full bg-white p-1 shadow"
                        >
                          <X className="h-3 w-3 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Short Office Video
                </label>

                <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition">
                  <Video className="mb-3 h-8 w-8 text-blue-500" />
                  <span className="font-medium text-slate-700">
                    Upload a short video
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    Optional – helps partners estimate the requirement
                  </span>

                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) =>
                      setVideo(e.target.files?.[0] || null)
                    }
                  />
                </label>

                {video && (
                  <div className="mt-3 rounded-xl bg-blue-50 p-3 text-sm text-blue-700">
                    Video selected: {video.name}
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* 9 Final */}
          <Section
            number="09"
            title="Special Instructions & Submit"
            icon={CheckCircle2}
            open={openSections.final}
            onToggle={() => toggleSection("final")}
          >
            <div className="space-y-5">
              <Field label="Special Instructions">
                <textarea
                  className={inputClass}
                  rows="4"
                  value={form.specialInstructions}
                  onChange={(e) =>
                    update("specialInstructions", e.target.value)
                  }
                  placeholder="Tell us anything else about your office shifting requirement..."
                />
              </Field>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => update("agree", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
                  required
                />

                <span className="text-sm text-slate-600">
                  I confirm that the information provided by me is correct
                  and can be used by Apni Manzil to arrange quotations from
                  relevant logistics / relocation partners.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    GET OFFICE QUOTATIONS
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                Apni Manzil will review your requirement and connect it with
                suitable relocation partners.
              </p>
            </div>
          </Section>
        </form>
      </div>
    </div>
  );
}