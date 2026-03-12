import React from 'react';
import { FiTarget, FiAward, FiUsers } from 'react-icons/fi';

const About = () => {
  return (
    <div className="container py-5">
      {/* 1. Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">About Apni Manzil</h1>
        <p className="text-muted mx-auto" style={{maxWidth: '700px'}}>
          Kudal (Sindhudurg) madhye sthapit, Apni Manzil he ek modern logistics aggregator platform aahe. 
          Amche lakshya logistics kshetrat ek naveen kranti aanne aahe.
        </p>
      </div>

      <div className="row g-4 text-center">
        {/* Our Moto */}
        <div className="col-md-4">
          <div className="p-4 border-0 shadow-sm rounded-4 bg-white h-100">
            <FiTarget size={40} className="text-success mb-3" />
            <h5 className="fw-bold">Amcha Moto</h5>
            <p className="small text-muted">"Pratyek Parcel la Tyachya Manzili Paryant Surakshit Pohchavne."</p>
          </div>
        </div>

        {/* What We Are */}
        <div className="col-md-4">
          <div className="p-4 border-0 shadow-sm rounded-4 bg-white h-100">
            <FiUsers size={40} className="text-warning mb-3" />
            <h5 className="fw-bold">Apan Kay Ahot?</h5>
            <p className="small text-muted">Apan MSME, small business ani samanya lokaanchya logistics samasya sathi ek single-window solution ahot.</p>
          </div>
        </div>

        {/* Our Vision */}
        <div className="col-md-4">
          <div className="p-4 border-0 shadow-sm rounded-4 bg-white h-100">
            <FiAward size={40} className="text-info mb-3" />
            <h5 className="fw-bold">Amcha Prayatna</h5>
            <p className="small text-muted">Kudal pasun suru jhalele he karya, sampurna Maharashtra ani Bharatbhar vistarne ani tech-driven delivery dene.</p>
          </div>
        </div>
      </div>

      {/* Detailed Services Info */}
      <div className="mt-5 p-4 bg-light rounded-4">
        <h4 className="fw-bold mb-3">Amchi Services Detail Madhe:</h4>
        <p>Apan courier services pasun te heavy transport paryant sagle options ekach thikani deto. Amcha uddesh ha aahe ki customer la vegveglya thikani bhataknyachi garaj nako, tar 'Apni Manzil' var sarv kahi milave.</p>
      </div>
    </div>
  );
};

export default About;