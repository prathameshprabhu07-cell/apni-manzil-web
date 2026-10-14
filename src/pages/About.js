import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  BarChart3,
  Globe2,
  Truck,
  CheckCircle2,
  ArrowRight,
  Package,
  MapPin,
  Clock3,
  Users,
  Target,
  HeartHandshake,
  Boxes,
  ChevronRight
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const colors = {
    navy: '#073B73',
    darkNavy: '#05264A',
    blue: '#1769D2',
    green: '#08A878',
    orange: '#FF9F43',
    text: '#203047',
    muted: '#65758B',
    light: '#F4F8FD',
    border: '#E5ECF5',
    white: '#FFFFFF'
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 22px',
    boxSizing: 'border-box'
  };

  const sectionStyle = {
    padding: '76px 0'
  };

  const sectionTitleStyle = {
    color: colors.navy,
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: 800,
    lineHeight: 1.2,
    margin: '0 0 16px'
  };

  const sectionTextStyle = {
    color: colors.muted,
    fontSize: '16px',
    lineHeight: 1.8,
    margin: 0
  };

  const cardStyle = {
    backgroundColor: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 8px 28px rgba(7, 59, 115, 0.055)',
    boxSizing: 'border-box',
    height: '100%',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
  };

  const iconBoxStyle = {
    width: '58px',
    height: '58px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Safety & Security',
      description:
        'We focus on secure shipment handling, reliable transportation partners and a dependable delivery experience.',
      color: '#087F5B',
      background: '#E4F8F0'
    },
    {
      icon: Zap,
      title: 'Smart Technology',
      description:
        'Technology-led logistics tools help customers access shipment information and manage their logistics more easily.',
      color: '#B96A00',
      background: '#FFF1D9'
    },
    {
      icon: BarChart3,
      title: 'Cost-Conscious Solutions',
      description:
        'Compare suitable transport options and make informed logistics decisions based on your shipment requirements.',
      color: '#1769D2',
      background: '#E7F0FF'
    },
    {
      icon: Globe2,
      title: 'Multiple Transport Options',
      description:
        'Explore road, rail, air and sea freight options according to service availability, destination and cargo needs.',
      color: '#7650C8',
      background: '#F0E9FF'
    },
    {
      icon: Clock3,
      title: 'Shipment Visibility',
      description:
        'Access available tracking information and shipment updates to stay informed throughout the delivery journey.',
      color: '#C45A19',
      background: '#FFF0E6'
    },
    {
      icon: HeartHandshake,
      title: 'Customer First',
      description:
        'We aim to make logistics simpler through clear information, practical solutions and a customer-focused approach.',
      color: '#087E8B',
      background: '#E1F8FA'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Share Your Requirements',
      description:
        'Tell us about your shipment, pickup location, destination, weight and dimensions.'
    },
    {
      number: '02',
      title: 'Explore Transport Options',
      description:
        'Review suitable logistics options based on your cargo, route, budget and service availability.'
    },
    {
      number: '03',
      title: 'Track Your Shipment',
      description:
        'Use the available tracking and shipment information to follow your delivery journey.'
    }
  ];

  const stats = [
    { icon: Package, title: 'Cargo Solutions', subtitle: 'For different shipment needs' },
    { icon: MapPin, title: 'Multiple Routes', subtitle: 'Domestic and international options' },
    { icon: Users, title: 'Business Focused', subtitle: 'For individuals and businesses' },
    { icon: Boxes, title: 'Flexible Choices', subtitle: 'Transport options for your cargo' }
  ];

  const handleGetStarted = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        backgroundColor: colors.white,
        color: colors.text,
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          background: `linear-gradient(115deg, ${colors.darkNavy} 0%, ${colors.navy} 60%, #1769B5 100%)`,
          color: colors.white,
          padding: '76px 0 82px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.055)',
            top: '-150px',
            right: '-80px',
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.13)',
            bottom: '-130px',
            left: '8%',
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            ...containerStyle,
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '9px',
                padding: '9px 15px',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.23)',
                backgroundColor: 'rgba(255,255,255,0.09)',
                marginBottom: '25px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              <Globe2 size={17} />
              YOUR LOGISTICS, SIMPLIFIED
            </div>

            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                lineHeight: 1.12,
                fontWeight: 850,
                letterSpacing: '-1.5px',
                margin: '0 0 24px',
                color: colors.white
              }}
            >
              Every Shipment.
              <br />
              Every Journey.
              <br />
              <span style={{ color: '#75E3BD' }}>Apni Manzil.</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                lineHeight: 1.85,
                color: 'rgba(255,255,255,0.84)',
                maxWidth: '560px',
                margin: '0 0 32px'
              }}
            >
              We are building a smarter way to explore logistics solutions.
              Apni Manzil brings transport choices, shipment information and
              technology together to help make moving cargo simpler.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <button
                type="button"
                onClick={handleGetStarted}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '15px 23px',
                  backgroundColor: colors.green,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 750,
                  cursor: 'pointer',
                  boxShadow: '0 8px 22px rgba(8,168,120,0.24)'
                }}
              >
                Explore Our Platform
                <ArrowRight size={19} />
              </button>

              <button
                type="button"
                onClick={() => {
                  document.getElementById('our-mission')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 22px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: colors.white,
                  border: '1px solid rgba(255,255,255,0.32)',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Discover Our Mission
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div
            style={{
              position: 'relative',
              minHeight: '350px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 'min(100%, 430px)',
                height: '320px',
                borderRadius: '32px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 24px 70px rgba(0,0,0,0.22)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1000&q=85"
                alt="Cargo containers and logistics transportation"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(5,38,74,0.04) 15%, rgba(5,38,74,0.86) 100%)'
                }}
              />
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 2,
                width: 'min(100%, 430px)',
                height: '320px',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '18px',
                  right: '18px',
                  padding: '17px',
                  borderRadius: '17px',
                  backgroundColor: 'rgba(255,255,255,0.96)',
                  color: colors.text,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '13px'
                }}
              >
                <div
                  style={{
                    ...iconBoxStyle,
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#E3F8EF',
                    borderRadius: '13px'
                  }}
                >
                  <CheckCircle2 size={26} color={colors.green} />
                </div>

                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800 }}>
                    One Platform, More Choices
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: colors.muted,
                      marginTop: '5px'
                    }}
                  >
                    Logistics made easier to navigate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS */}
      <section
        style={{
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.border}`
        }}
      >
        <div
          style={{
            ...containerStyle,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '0'
          }}
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '25px 15px',
                  borderRight:
                    index < stats.length - 1
                      ? `1px solid ${colors.border}`
                      : 'none'
                }}
              >
                <div
                  style={{
                    ...iconBoxStyle,
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: '#EDF4FF',
                    color: colors.blue
                  }}
                >
                  <Icon size={24} />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 800,
                      color: colors.navy,
                      marginBottom: '5px'
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      fontSize: '12px',
                      lineHeight: 1.5,
                      color: colors.muted
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT / MISSION */}
      <section id="our-mission" style={sectionStyle}>
        <div
          style={{
            ...containerStyle,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '55px',
            alignItems: 'center'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                color: colors.green,
                backgroundColor: '#E5F8F1',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1px',
                marginBottom: '18px'
              }}
            >
              WHO WE ARE
            </div>

            <h2 style={sectionTitleStyle}>
              Logistics That Moves You Forward
            </h2>

            <p style={{ ...sectionTextStyle, marginBottom: '18px' }}>
              Apni Manzil is a logistics-focused platform designed to help
              individuals, traders and businesses explore suitable
              transportation and shipment solutions from one place.
            </p>

            <p style={{ ...sectionTextStyle, marginBottom: '26px' }}>
              We believe logistics should feel less complicated. By bringing
              useful information, transport choices and digital tools together,
              we aim to help customers make more confident shipping decisions.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {[
                'A simpler way to explore logistics options',
                'Solutions designed around different cargo needs',
                'A focus on clarity, convenience and reliability'
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '11px'
                  }}
                >
                  <CheckCircle2
                    size={21}
                    color={colors.green}
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  />
                  <span
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: colors.text,
                      fontWeight: 600
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              borderRadius: '26px',
              padding: '14px',
              background: 'linear-gradient(135deg, #EAF3FF, #F4FBFF)'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85"
              alt="Warehouse operations supporting cargo movement"
              loading="lazy"
              style={{
                width: '100%',
                height: '360px',
                objectFit: 'cover',
                borderRadius: '19px',
                display: 'block'
              }}
            />

            <div
              style={{
                position: 'relative',
                margin: '-40px 14px 0',
                padding: '20px',
                backgroundColor: colors.white,
                borderRadius: '16px',
                boxShadow: '0 12px 35px rgba(7,59,115,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  ...iconBoxStyle,
                  backgroundColor: '#E4F8F0'
                }}
              >
                <Target size={29} color={colors.green} />
              </div>

              <div>
                <h3
                  style={{
                    margin: '0 0 5px',
                    fontSize: '16px',
                    color: colors.navy,
                    fontWeight: 800
                  }}
                >
                  Our Purpose
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: colors.muted,
                    lineHeight: 1.6
                  }}
                >
                  Make logistics easier to understand, compare and navigate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section
        style={{
          ...sectionStyle,
          backgroundColor: colors.light
        }}
      >
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 45px' }}>
            <div
              style={{
                color: colors.green,
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1.3px',
                marginBottom: '13px'
              }}
            >
              OUR DIRECTION
            </div>

            <h2 style={sectionTitleStyle}>Driven by Purpose</h2>

            <p style={sectionTextStyle}>
              Our mission and vision guide how we approach every logistics
              challenge and every opportunity to improve the customer experience.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px'
            }}
          >
            <div
              style={{
                ...cardStyle,
                background: `linear-gradient(145deg, ${colors.navy}, #1769B5)`,
                color: colors.white,
                border: 'none'
              }}
            >
              <div
                style={{
                  ...iconBoxStyle,
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  marginBottom: '24px'
                }}
              >
                <Target size={30} color="#75E3BD" />
              </div>

              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  margin: '0 0 14px',
                  color: colors.white
                }}
              >
                Our Mission
              </h3>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.9,
                  margin: 0,
                  color: 'rgba(255,255,255,0.84)'
                }}
              >
                To simplify logistics by helping customers discover practical
                transport options, access useful shipment information and make
                better-informed shipping decisions.
              </p>
            </div>

            <div style={cardStyle}>
              <div
                style={{
                  ...iconBoxStyle,
                  backgroundColor: '#E5F8F1',
                  marginBottom: '24px'
                }}
              >
                <Globe2 size={30} color={colors.green} />
              </div>

              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  margin: '0 0 14px',
                  color: colors.navy
                }}
              >
                Our Vision
              </h3>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.9,
                  margin: 0,
                  color: colors.muted
                }}
              >
                To build a trusted, technology-enabled logistics ecosystem
                where finding and managing suitable cargo transportation
                becomes simpler and more accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div
            style={{
              textAlign: 'center',
              maxWidth: '720px',
              margin: '0 auto 48px'
            }}
          >
            <div
              style={{
                color: colors.green,
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1.3px',
                marginBottom: '13px'
              }}
            >
              THE APNI MANZIL ADVANTAGE
            </div>

            <h2 style={sectionTitleStyle}>Why Choose Apni Manzil?</h2>

            <p style={sectionTextStyle}>
              A customer-focused approach, useful technology and flexible
              logistics choices—all designed to make your shipping journey easier.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
              gap: '22px'
            }}
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  style={cardStyle}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = 'translateY(-5px)';
                    event.currentTarget.style.boxShadow =
                      '0 18px 40px rgba(7,59,115,0.11)';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'translateY(0)';
                    event.currentTarget.style.boxShadow =
                      '0 8px 28px rgba(7,59,115,0.055)';
                  }}
                >
                  <div
                    style={{
                      ...iconBoxStyle,
                      backgroundColor: benefit.background,
                      marginBottom: '22px'
                    }}
                  >
                    <Icon size={29} color={benefit.color} />
                  </div>

                  <h3
                    style={{
                      fontSize: '19px',
                      fontWeight: 800,
                      color: colors.navy,
                      margin: '0 0 12px'
                    }}
                  >
                    {benefit.title}
                  </h3>

                  <p
                    style={{
                      color: colors.muted,
                      fontSize: '14px',
                      lineHeight: 1.85,
                      margin: 0
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          ...sectionStyle,
          backgroundColor: '#F4F8FD'
        }}
      >
        <div style={containerStyle}>
          <div
            style={{
              textAlign: 'center',
              maxWidth: '720px',
              margin: '0 auto 48px'
            }}
          >
            <div
              style={{
                color: colors.green,
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1.3px',
                marginBottom: '13px'
              }}
            >
              A SIMPLE PROCESS
            </div>

            <h2 style={sectionTitleStyle}>Your Journey Starts Here</h2>

            <p style={sectionTextStyle}>
              A straightforward approach to exploring your logistics requirements.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '24px'
            }}
          >
            {steps.map((step) => (
              <div
                key={step.number}
                style={{
                  ...cardStyle,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    fontSize: '44px',
                    lineHeight: 1,
                    fontWeight: 900,
                    color: '#DCE9FA',
                    marginBottom: '22px'
                  }}
                >
                  {step.number}
                </div>

                <h3
                  style={{
                    fontSize: '19px',
                    fontWeight: 800,
                    color: colors.navy,
                    margin: '0 0 12px'
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.85,
                    color: colors.muted,
                    margin: 0
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section style={{ padding: '76px 0' }}>
        <div
          style={{
            ...containerStyle,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '42px',
            alignItems: 'center'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: colors.green,
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1.2px',
                marginBottom: '16px'
              }}
            >
              <HeartHandshake size={18} />
              OUR COMMITMENT
            </div>

            <h2 style={sectionTitleStyle}>
              More Than Moving Cargo.
              <br />
              <span style={{ color: colors.green }}>Moving Forward.</span>
            </h2>

            <p style={{ ...sectionTextStyle, marginBottom: '20px' }}>
              Every shipment represents someone's effort, business or dream.
              We understand the importance of making logistics decisions with
              confidence.
            </p>

            <p style={sectionTextStyle}>
              Our commitment is to keep improving the way customers discover
              logistics services—with a focus on transparency, convenience and
              dependable information.
            </p>
          </div>

          <div
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(140deg, #E8F5FF, #E7FAF3)',
              padding: '34px',
              border: `1px solid ${colors.border}`
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px',
                marginBottom: '26px'
              }}
            >
              <div
                style={{
                  ...iconBoxStyle,
                  width: '50px',
                  height: '50px',
                  backgroundColor: colors.white
                }}
              >
                <ShieldCheck size={26} color={colors.green} />
              </div>

              <div>
                <h3
                  style={{
                    margin: '0 0 7px',
                    fontSize: '17px',
                    fontWeight: 800,
                    color: colors.navy
                  }}
                >
                  Trust Through Clarity
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: colors.muted,
                    lineHeight: 1.7
                  }}
                >
                  Clear information to help customers understand their options.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px',
                marginBottom: '26px'
              }}
            >
              <div
                style={{
                  ...iconBoxStyle,
                  width: '50px',
                  height: '50px',
                  backgroundColor: colors.white
                }}
              >
                <Zap size={26} color={colors.blue} />
              </div>

              <div>
                <h3
                  style={{
                    margin: '0 0 7px',
                    fontSize: '17px',
                    fontWeight: 800,
                    color: colors.navy
                  }}
                >
                  Technology With Purpose
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: colors.muted,
                    lineHeight: 1.7
                  }}
                >
                  Digital tools that help make logistics easier to navigate.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px'
              }}
            >
              <div
                style={{
                  ...iconBoxStyle,
                  width: '50px',
                  height: '50px',
                  backgroundColor: colors.white
                }}
              >
                <HeartHandshake size={26} color={colors.orange} />
              </div>

              <div>
                <h3
                  style={{
                    margin: '0 0 7px',
                    fontSize: '17px',
                    fontWeight: 800,
                    color: colors.navy
                  }}
                >
                  Customers at the Centre
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: colors.muted,
                    lineHeight: 1.7
                  }}
                >
                  Designed around real shipping requirements and user needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          padding: '0 0 70px'
        }}
      >
        <div
          style={{
            ...containerStyle,
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '26px',
              padding: 'clamp(32px, 6vw, 65px) 25px',
              textAlign: 'center',
              background: `linear-gradient(120deg, ${colors.darkNavy}, ${colors.navy}, #1769B5)`,
              color: colors.white
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                top: '-130px',
                left: '-70px',
                pointerEvents: 'none'
              }}
            />

            <div
              style={{
                position: 'absolute',
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.045)',
                bottom: '-130px',
                right: '-60px',
                pointerEvents: 'none'
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '9px 14px',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  fontSize: '12px',
                  fontWeight: 800,
                  marginBottom: '20px'
                }}
              >
                <Truck size={17} />
                LET'S MOVE FORWARD
              </div>

              <h2
                style={{
                  fontSize: 'clamp(27px, 4vw, 42px)',
                  lineHeight: 1.25,
                  fontWeight: 850,
                  margin: '0 0 16px',
                  color: colors.white
                }}
              >
                Ready to Find Your Logistics Solution?
              </h2>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.82)',
                  maxWidth: '620px',
                  margin: '0 auto 30px'
                }}
              >
                Explore Apni Manzil and discover a simpler way to approach your
                transportation and shipping requirements.
              </p>

              <button
                type="button"
                onClick={handleGetStarted}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '15px 25px',
                  backgroundColor: colors.green,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.18)'
                }}
              >
                Get Started
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BRAND STRIP */}
      <div
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: '20px 0',
          backgroundColor: '#FAFCFF'
        }}
      >
        <div
          style={{
            ...containerStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '9px',
            textAlign: 'center'
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 850,
              color: colors.navy
            }}
          >
            Apni Manzil
          </span>

          <span style={{ color: '#AAB7C8' }}>•</span>

          <span
            style={{
              fontSize: '13px',
              color: colors.muted
            }}
          >
            Your Journey, Our Commitment.
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;