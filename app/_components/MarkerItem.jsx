import { MapPin, X } from 'lucide-react';
import React, { useState } from 'react'
import { Marker } from 'react-map-gl/maplibre';
import { Popup } from 'react-map-gl/maplibre';

function MarkerItem({ item }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <Marker
        longitude={item.coordinates.lon}
        latitude={item.coordinates.lat}
        anchor="bottom"
      >
        <img
          src="/home.png"
          alt="pin"
          // We use onClick here to trigger the popup
          onClick={(e) => {
            e.stopPropagation(); // Prevents map click events
            setShowPopup(true);
          }}
          className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer"
        />
      </Marker>

      {showPopup && (
        <Popup
          longitude={item.coordinates.lon}
          latitude={item.coordinates.lat}
          anchor="top" // Positioned above the marker
          offset={10}  // Slight gap so it doesn't touch the icon
          onClose={() => setShowPopup(false)}
          closeOnClick={false} // Keeps it open if you click the map
          closeButton={false}
          className="z-50"
        >
          {/* <X /> */}
          {/* Custom Property Card Content */}
          <div className="w-[180px] rounded-lg overflow-hidden bg-white">
            <button
              className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md hover:bg-white transition-all"
              onClick={() => setShowPopup(false)}
            >
              <X className="w-5 h-5 text-gray-600" /> {/* Lucide 'X' icon */}
            </button>
            <img
              src={item.listingImages[0]?.url || '/placeholder.jpg'}
              className="h-24 w-full object-cover"
              alt="property"
            />
            <div className="p-2 flex flex-col gap-1">
              <h2 className="font-bold text-sm">${item.price.toLocaleString()}</h2>
              <p className="text-[10px] text-gray-500 line-clamp-2 leading-tight">
                {item.address}
              </p>
              <button
                className="mt-2 text-[10px] bg-brand-purple text-white py-1 rounded-md w-full"
                onClick={() => window.open(`/view-listing/${item.id}`, '_blank')}
              >
                View Details
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  )
}

export default MarkerItem