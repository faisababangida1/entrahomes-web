'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Your exact Supabase Vault connection
const supabaseUrl = 'https://ygcrtfifxfpnkhvolncs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3J0ZmlmeGZwbmtodm9sbmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTI1NDIsImV4cCI6MjA5Mzk4ODU0Mn0.oOWb8yb8rD2KlgayUHjd0POG9SO8275TzTrTwQrJpFA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [properties, setProperties] = useState([]);
  const FOUNDER_WHATSAPP = "2348000000000"; // Replace with your number

  useEffect(() => {
    async function fetchProperties() {
      const { data } = await supabase.from('properties').select('*').limit(10);
      if (data && data.length > 0) {
        setProperties(data);
      } else {
        // If vault is empty, show these premium placeholders so the app looks perfect
        setProperties([
          {
            id: 1, title: "3 Bedroom Apartment, Lekki 1", price: "₦ 6,500,000", location: "Lagos, Nigeria",
            image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 2, title: "Modern Studio Flat, Yaba", price: "₦ 1,200,000", location: "Lagos, Nigeria",
            image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 3, title: "4 Bedroom Duplex, Gwarinpa", price: "₦ 8,000,000", location: "Abuja, Nigeria",
            image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
          }
        ]);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      {/* 1. DEEP NAVY PREMIUM HEADER */}
      <div className="bg-[#0A1128] px-4 pt-6 pb-8 rounded-b-[2.5rem] shadow-lg">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-[#10B981]">Entra</span><span className="text-white">Homes</span>
          </div>
          <button className="bg-[#10B981] text-white text-sm font-semibold px-4 py-2 rounded-lg">
            List Property
          </button>
        </div>

        {/* Hero Text */}
        <h1 className="text-white text-4xl font-extrabold leading-tight mb-2">
          Bypass the 20% Agency Fee. Rent Direct.
        </h1>
        <p className="text-gray-300 text-sm mb-6">Find verified rentals in Lagos & Abuja.</p>

        {/* Search Bar */}
        <div className="bg-white p-1.5 rounded-xl flex items-center shadow-md">
          <span className="pl-3 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search Lekki, Lagos, Nigeria" 
            className="flex-grow px-3 py-2 outline-none text-gray-800 text-sm"
          />
          <button className="bg-[#F59E0B] hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm">
            Search
          </button>
        </div>
      </div>

      {/* 2. FILTER TABS */}
      <div className="px-4 py-6 flex space-x-3 overflow-x-auto hide-scrollbar">
        <button className="bg-white text-gray-800 border border-gray-200 px-5 py-1.5 rounded-full text-sm font-medium shadow-sm">All</button>
        <button className="bg-[#10B981] text-white px-5 py-1.5 rounded-full text-sm font-medium shadow-md">Apartment</button>
        <button className="bg-white text-gray-800 border border-gray-200 px-5 py-1.5 rounded-full text-sm font-medium shadow-sm">Studio</button>
        <button className="bg-white text-gray-800 border border-gray-200 px-5 py-1.5 rounded-full text-sm font-medium shadow-sm">Office</button>
      </div>

      {/* 3. SORTING */}
      <div className="px-4 flex justify-end mb-4">
        <span className="text-xs text-gray-500 font-medium">Sort: <span className="text-[#F59E0B] cursor-pointer">Lowest Price ⌄</span></span>
      </div>

      {/* 4. PROPERTY GRID */}
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop: any) => {
          // WhatsApp Concierge Link
          const message = encodeURIComponent(`Hello EntraHomes! I want to rent the "${prop.title}" in ${prop.location} for ${prop.price}.`);
          const whatsappUrl = `https://wa.me/${FOUNDER_WHATSAPP}?text=${message}`;

          return (
            <div key={prop.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              
              {/* Image & Trust Badges */}
              <div className="h-48 relative bg-gray-200">
                <img src={prop.image_url} alt={prop.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-[#10B981] text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center shadow-sm">
                  ✓ Verified Landlord
                </div>
                <div className="absolute top-3 right-3 bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm border border-gray-100 flex flex-col items-center leading-tight">
                  <span>0%</span>
                  <span className="text-[8px] text-gray-500">Agent Fee</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-gray-900 text-[15px] leading-tight mb-1">{prop.title}</h3>
                
                <div className="text-[#10B981] font-extrabold text-lg my-1">
                  {prop.price} <span className="text-xs font-medium text-gray-500">/ year</span>
                </div>
                
                <p className="text-gray-500 text-xs flex items-center mb-4">
                  📍 {prop.location}
                </p>

                {/* Concierge Button */}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-auto w-full bg-[#0A1128] hover:bg-gray-800 text-white text-center font-bold py-3 rounded-xl text-sm flex justify-center items-center gap-2 shadow-md transition-all">
                  <span className="text-[#10B981] text-lg">📱</span> Contact EntraHomes <span className="font-normal text-[10px] opacity-70 ml-1">(WhatsApp Concierge)</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
