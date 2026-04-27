import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import api from '../api';

const SearchBar = () => {
  const [booking, setBooking] = useState({
    destination: '',
    check_in: '',
    check_out: '',
    guests: 1
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', booking);
      alert('Interest registered! Our premium consultant will contact you shortly.');
    } catch (error) {
      console.error('Error booking:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-6 -mt-16 relative z-20">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-wrap lg:flex-nowrap gap-6 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
            <MapPin size={16} /> Destination
          </label>
          <select 
            value={booking.destination}
            onChange={(e) => setBooking({...booking, destination: e.target.value})}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Where to?</option>
            <option value="Maldives">Maldives</option>
            <option value="Bali">Bali, Indonesia</option>
            <option value="Paris">Paris, France</option>
            <option value="Santorini">Santorini, Greece</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
            <Calendar size={16} /> Check In
          </label>
          <input 
            type="date" 
            value={booking.check_in}
            onChange={(e) => setBooking({...booking, check_in: e.target.value})}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
            <Calendar size={16} /> Check Out
          </label>
          <input 
            type="date" 
            value={booking.check_out}
            onChange={(e) => setBooking({...booking, check_out: e.target.value})}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex-1 min-w-[100px]">
          <label className="block text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
            <Users size={16} /> Guests
          </label>
          <input 
            type="number" 
            min="1" 
            value={booking.guests}
            onChange={(e) => setBooking({...booking, guests: parseInt(e.target.value)})}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button 
          onClick={handleBooking}
          className="btn-premium py-4 px-10 rounded-xl"
        >
          <Search size={20} /> Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
