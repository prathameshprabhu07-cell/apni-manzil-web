import React, { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  Headphones,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "917218852356";
const SUPPORT_EMAIL = "help@apnimanzil.co.in";
const SUPPORT_PHONE = "+917218852356";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Query",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailSubject = encodeURIComponent(
      `Apni Manzil Contact Query: ${formData.subject}`
    );

    const emailBody = encodeURIComponent(
      `New Contact Us Query\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || "Not provided"}\n` +
        `Query Type: ${formData.subject}\n\n` +
        `Message:\n${formData.message}`
    );

    const emailLink =
      `mailto:${SUPPORT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

    window.location.href = emailLink;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Apni Manzil! I need assistance.\n\n" +
        `Name: ${formData.name || "Not provided"}\n` +
        `Query: ${formData.subject}\n` +
        `Message: ${formData.message || "I have a question."}`
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002D5E] px-4 py-16 text-white sm:py-20">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <Headphones size={34} className="text-orange-400" />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
            We're Here to Help
          </p>

          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            Have a question about your shipment or our services? Contact our
            team. We're happy to help you find the right logistics solution.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-orange-600"
            >
              <MessageCircle size={19} />
              Chat on WhatsApp
            </a>

            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/20"
            >
              <Mail size={19} />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8 lg:col-span-3">
            <div className="mb-7">
              <p className="text-sm font-bold uppercase tracking-wider text-orange-500">
                Get in Touch
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-[#002D5E] sm:text-3xl">
                Send Us a Message
              </h2>

              <p className="mt-3 leading-6 text-slate-500">
                Fill out the form below and tell us how we can help you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-semibold text-slate-700"
                  >
                    What do you need help with?
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>General Query</option>
                    <option>Courier & Parcel Delivery</option>
                    <option>Hyperlocal / Bike Delivery</option>
                    <option>Truck & Transport</option>
                    <option>Packers & Movers</option>
                    <option>Warehouse & Storage</option>
                    <option>International Logistics</option>
                    <option>E-commerce Logistics</option>
                    <option>Booking & Payment</option>
                    <option>Tracking & Delivery</option>
                    <option>Partnership</option>
                    <option>Website Issue</option>
                    <option>Other Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-sm font-semibold text-slate-700"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your question or tell us how we can help..."
                  rows={5}
                  maxLength={3000}
                  className={`${inputClass} resize-y`}
                  required
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {formData.message.length}/3000 characters
                </p>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#002D5E] px-6 py-4 font-bold text-white transition hover:bg-[#003d7c] focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                <Send size={18} />
                Send Message via Email
              </button>

              {submitted && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-xl bg-blue-50 p-4 text-sm text-blue-800"
                >
                  <CheckCircle size={20} className="mt-0.5 shrink-0" />
                  <p>
                    Your email application should open with your message
                    prepared. Please send the email to complete your enquiry.
                  </p>
                </div>
              )}

              <p className="text-xs leading-5 text-slate-500">
                Clicking Send Message opens your device's configured email
                application. Your enquiry is not submitted automatically by
                this form.
              </p>
            </form>

            {/* WhatsApp Message Option */}
            <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <MessageCircle size={23} />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">
                    Prefer WhatsApp?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Send your question directly to our WhatsApp support.
                  </p>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    <MessageCircle size={18} />
                    Message Us on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <aside className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl bg-[#002D5E] p-6 text-white shadow-lg sm:p-8">
              <h2 className="text-2xl font-extrabold">Contact Information</h2>

              <p className="mt-3 leading-6 text-blue-100">
                Choose the contact method that works best for you.
              </p>

              <div className="mt-8 space-y-6">
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex items-start gap-4 rounded-xl transition hover:bg-white/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                    <Mail size={23} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-bold">Email Us</p>
                    <p className="mt-1 break-all text-sm text-blue-100">
                      {SUPPORT_EMAIL}
                    </p>
                    <p className="mt-1 text-xs text-orange-300">
                      Send us your questions
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${SUPPORT_PHONE}`}
                  className="flex items-start gap-4 rounded-xl transition hover:bg-white/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                    <Phone size={23} />
                  </div>

                  <div>
                    <p className="font-bold">Call Us</p>
                    <p className="mt-1 text-sm text-blue-100">
                      {SUPPORT_PHONE}
                    </p>
                    <p className="mt-1 text-xs text-orange-300">
                      Tap to call
                    </p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-xl transition hover:bg-white/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                    <MessageCircle size={23} />
                  </div>

                  <div>
                    <p className="font-bold">WhatsApp Support</p>
                    <p className="mt-1 text-sm text-blue-100">
                      Chat with our team
                    </p>
                    <p className="mt-1 text-xs text-orange-300">
                      Send a message
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                    <MapPin size={23} />
                  </div>

                  <div>
                    <p className="font-bold">Service Location</p>
                    <p className="mt-1 text-sm leading-6 text-blue-100">
                      Kudal, Sindhudurg,
                      <br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <Clock size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-[#002D5E]">
                    Customer Support
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Our website offers 24/7 support information. Actual
                    response times may vary depending on your query.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
              <h3 className="font-bold text-[#002D5E]">
                Looking for our services?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore our logistics solutions for your delivery and
                transportation needs.
              </p>

              <Link
                to="/"
                className="mt-4 inline-flex items-center gap-2 font-bold text-orange-600 transition hover:text-orange-700"
              >
                Explore Apni Manzil
                <Send size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;