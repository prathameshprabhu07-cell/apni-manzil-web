import React, { useMemo, useState } from 'react';
import {
  Globe2,
  Package,
  ArrowRight,
  Search,
  RefreshCw,
  BarChart3,
  Ship,
  Factory,
  ExternalLink,
  Info,
  Database,
  MapPin,
  CircleDollarSign,
  ShieldCheck
} from 'lucide-react';

// ==========================================
// OFFICIAL TRADE AND COMMODITY DATA SOURCES
// ==========================================

const TRADE_SOURCES = [
  {
    id: 'india-trade',
    name: 'India Trade Analytics',
    category: 'Import & Export',
    description:
      'Explore Indian import-export statistics, trade values, country-wise trade and commodity-wise trade information.',
    url: 'https://trade-analytics.commerce.gov.in/public/indiaTrade',
    badge: 'Trade Analytics',
    color: 'blue'
  },
  {
    id: 'tradestat',
    name: 'TradeStat India',
    category: 'Import & Export',
    description:
      'Explore available Indian foreign trade statistics and historical import-export information.',
    url: 'https://tradestat.commerce.gov.in/',
    badge: 'Trade Statistics',
    color: 'emerald'
  },
  {
    id: 'agmarknet',
    name: 'AGMARKNET',
    category: 'Commodity Rates',
    description:
      'Find agricultural commodity prices and market arrivals reported by participating Indian markets.',
    url: 'https://agmarknet.gov.in/',
    badge: 'Agricultural Markets',
    color: 'orange'
  },
  {
    id: 'data-gov',
    name: 'Open Government Data',
    category: 'Commodity Rates',
    description:
      'Discover publicly available datasets published by Indian government departments.',
    url: 'https://www.data.gov.in/',
    badge: 'Open Data',
    color: 'purple'
  }
];

// ==========================================
// DASHBOARD CATEGORIES
// ==========================================

const DASHBOARD_SECTIONS = [
  {
    id: 'import-export',
    title: 'Import & Export',
    description:
      'Explore India’s imports, exports, trade values and historical comparisons.',
    icon: Globe2,
    color: '#2563eb',
    background: '#eff6ff',
    category: 'trade'
  },
  {
    id: 'commodity-rates',
    title: 'Commodity Market Rates',
    description:
      'Explore available agricultural commodity prices and other published market rates.',
    icon: Package,
    color: '#ea580c',
    background: '#fff7ed',
    category: 'rates'
  },
  {
    id: 'country-trade',
    title: 'Country-Wise Trade',
    description:
      'Research India’s trade relationships and available country-wise statistics.',
    icon: Ship,
    color: '#0f766e',
    background: '#f0fdfa',
    category: 'trade'
  },
  {
    id: 'trade-opportunities',
    title: 'Trade Opportunities',
    description:
      'Research products, potential markets and export opportunities using published data.',
    icon: Factory,
    color: '#7c3aed',
    background: '#f5f3ff',
    category: 'opportunities'
  }
];

// ==========================================
// FILTER OPTIONS
// ==========================================

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Categories' },
  { id: 'trade', label: 'Import & Export' },
  { id: 'rates', label: 'Commodity Rates' },
  { id: 'opportunities', label: 'Trade Opportunities' }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function InternationalTradeDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter dashboard categories
  const filteredSections = useMemo(() => {
    if (activeFilter === 'all') {
      return DASHBOARD_SECTIONS;
    }

    return DASHBOARD_SECTIONS.filter(
      (section) => section.category === activeFilter
    );
  }, [activeFilter]);

  // Search data sources
  const filteredSources = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return TRADE_SOURCES;
    }

    return TRADE_SOURCES.filter((source) => {
      const searchableText = [
        source.name,
        source.category,
        source.description,
        source.badge
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [searchTerm]);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-800">

      {/* =====================================
          HERO SECTION
      ====================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#002D5E] via-[#064789] to-[#0f172a] px-4 py-14 text-white sm:px-8 lg:px-16 lg:py-20">

        {/* Background decorations */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-14">

          {/* LEFT SIDE — HERO CONTENT */}

          <div className="relative z-10">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur-sm">
              <Globe2 size={18} className="text-orange-400" />
              International Trade Intelligence
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Global Trade.

              <span className="mt-2 block bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">
                Smarter Decisions.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
              Explore India’s import-export statistics, international trade
              values and available commodity market prices in one place.
              Discover useful resources to support your global trade research
              with Apni Manzil.
            </p>

            {/* HERO BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="#trade-dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-950/20 transition duration-300 hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-600"
              >
                Explore Trade Data
                <ArrowRight size={18} />
              </a>

              <a
                href="#official-sources"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-5 py-3.5 font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/10"
              >
                Official Data Sources
                <ExternalLink size={17} />
              </a>

            </div>

            {/* HERO FEATURE CARDS */}

            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition duration-300 hover:bg-white/15">
                <Globe2 className="mb-3 text-orange-400" size={26} />

                <h2 className="font-bold">
                  Global Trade
                </h2>

                <p className="mt-1 text-sm leading-5 text-blue-100">
                  International trade information
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition duration-300 hover:bg-white/15">
                <CircleDollarSign className="mb-3 text-amber-300" size={26} />

                <h2 className="font-bold">
                  Market Prices
                </h2>

                <p className="mt-1 text-sm leading-5 text-blue-100">
                  Available commodity prices
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition duration-300 hover:bg-white/15">
                <BarChart3 className="mb-3 text-emerald-300" size={26} />

                <h2 className="font-bold">
                  Trade Analysis
                </h2>

                <p className="mt-1 text-sm leading-5 text-blue-100">
                  Published trade statistics
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE — INTERNATIONAL TRADE IMAGE */}

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">

            {/* Image background glow */}

            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-500/30 via-blue-400/20 to-cyan-300/20 blur-2xl" />

            {/* Image container */}

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-sm">

              <img
                src="/international-trade.jpg"
                alt="Apni Manzil International Trade and Global Logistics"
                className="h-[300px] w-full rounded-[1.35rem] object-cover sm:h-[400px] lg:h-[480px]"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />

              {/* Fallback if image is missing */}

              <div className="absolute inset-2 -z-10 flex items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-[#064789] via-[#0b3b70] to-[#001a38]">
                <div className="px-6 text-center">
                  <Globe2
                    size={76}
                    className="mx-auto text-orange-400"
                  />

                  <p className="mt-4 text-xl font-black text-white">
                    Global Trade
                  </p>

                  <p className="mt-2 text-sm text-blue-100">
                    Connecting businesses across borders
                  </p>
                </div>
              </div>

              {/* Image bottom overlay */}

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#002D5E]/90 p-4 shadow-lg backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
                    <Globe2 size={26} className="text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-300">
                      Apni Manzil
                    </p>

                    <h2 className="mt-1 text-sm font-extrabold leading-5 text-white sm:text-lg">
                      Connecting Businesses to Global Markets
                    </h2>
                  </div>

                </div>
              </div>
            </div>

            {/* Floating badge */}

            <div className="absolute -right-1 -top-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-[#002D5E] shadow-xl sm:-right-4">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Explore Global Trade
            </div>

            {/* Floating bottom badge */}

            <div className="absolute -bottom-4 left-4 rounded-xl border border-white/20 bg-[#0b2341] px-4 py-3 shadow-xl sm:left-8">
              <div className="flex items-center gap-2">
                <Ship size={20} className="text-orange-400" />

                <span className="text-sm font-bold text-white">
                  Import & Export Resources
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================
          DATA TRANSPARENCY NOTICE
      ====================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-8 lg:px-16">

        <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 text-sm leading-6 text-blue-950">

          <Info
            className="mt-0.5 shrink-0 text-blue-600"
            size={21}
          />

          <div>
            <h2 className="font-bold">
              Data Transparency
            </h2>

            <p className="mt-1 text-blue-900">
              Live market data has not been connected yet. This dashboard
              currently provides access to external information sources.
              Actual figures and price movements will appear after the
              relevant data integrations are implemented and verified.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================
          DASHBOARD CATEGORIES
      ====================================== */}

      <section
        id="trade-dashboard"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-16"
      >

        <div className="mb-7">
          <p className="text-sm font-extrabold uppercase tracking-widest text-orange-600">
            Explore Markets
          </p>

          <h2 className="mt-2 text-2xl font-black text-[#002D5E] sm:text-3xl">
            International Trade Dashboard
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-500">
            Explore import-export information, commodity rates and
            country-wise trade resources.
          </p>
        </div>

        {/* CATEGORY FILTERS */}

        <div className="mb-7 flex flex-wrap gap-2">

          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
              className={`rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                activeFilter === filter.id
                  ? 'border-[#002D5E] bg-[#002D5E] text-white shadow-md'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-[#002D5E]'
              }`}
            >
              {filter.label}
            </button>
          ))}

        </div>

        {/* CATEGORY CARDS */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {filteredSections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >

                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:scale-105"
                  style={{
                    color: section.color,
                    backgroundColor: section.background
                  }}
                >
                  <Icon size={27} />
                </div>

                <h3 className="text-lg font-extrabold text-slate-800">
                  {section.title}
                </h3>

                <p className="mt-3 min-h-[96px] text-sm leading-6 text-slate-500">
                  {section.description}
                </p>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs font-bold text-amber-800">
                  <Info size={15} className="shrink-0" />
                  Data integration pending
                </div>

              </article>
            );
          })}

        </div>
      </section>

      {/* =====================================
          OFFICIAL DATA SOURCES
      ====================================== */}

      <section
        id="official-sources"
        className="mx-auto max-w-7xl px-4 pb-14 sm:px-8 lg:px-16"
      >

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-extrabold tracking-widest text-orange-600">
                <Database size={18} />
                DATA DIRECTORY
              </div>

              <h2 className="text-2xl font-black text-[#002D5E] sm:text-3xl">
                Trade & Market Sources
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Visit these external sources to explore published
                government trade statistics and available market data.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search data sources..."
                aria-label="Search data sources"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

            </div>
          </div>

          {/* SOURCE CARDS */}

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            {filteredSources.map((source) => (
              <article
                key={source.id}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 transition duration-200 hover:border-blue-200 hover:shadow-lg sm:p-6"
              >

                <div className="mb-4 flex items-center justify-between gap-3">

                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
                    {source.badge}
                  </span>

                  <ShieldCheck
                    size={20}
                    className="shrink-0 text-emerald-600"
                  />

                </div>

                <h3 className="text-lg font-extrabold text-slate-800">
                  {source.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {source.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <MapPin size={15} />
                  {source.category}
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-extrabold text-blue-800 transition hover:bg-blue-100"
                >
                  Open Data Source
                  <ArrowRight size={17} />
                </a>

              </article>
            ))}

            {filteredSources.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center md:col-span-2">

                <Search
                  size={30}
                  className="mx-auto text-slate-400"
                />

                <h3 className="mt-3 font-bold text-slate-700">
                  No Matching Sources
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try another search term.
                </p>

              </div>
            )}

          </div>
        </div>
      </section>

      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="border-t border-slate-200 bg-white px-4 py-7 sm:px-8">

        <div className="mx-auto flex max-w-7xl items-start gap-3">

          <RefreshCw
            size={18}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <p className="text-xs leading-6 text-slate-500">
            Apni Manzil International Trade Intelligence helps users
            discover trade statistics and commodity market information.
            Always verify the reporting period, currency, units and
            publication date with the original data provider.
            Live figures are not displayed until a verified data
            integration is available.
          </p>

        </div>
      </footer>

    </main>
  );
}