"use client"
import React from 'react';
import { GeoapifyContext, GeoapifyGeocoderAutocomplete } from '@geoapify/react-geocoder-autocomplete';
import { MapPin } from 'lucide-react';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
// import "../../app/globals.css";

const AddressSearch = ({ setSelectedLocation }) => {
    const onPlaceSelect = (value) => {
        if (value) {
            // Extracting the data you need
            const { lat, lon, formatted } = value.properties;

            // Storing it in your parent state
            setSelectedLocation({
                address: formatted,
                coordinates: { lat, lon }
            });
        }
    };

    return (
        <div className='flex items-center w-full'>
            <MapPin className='h-10 w-10 p-2 rounded-l-lg text-violet-600 bg-purple-200' />
            <div className="flex-1">
                <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_AUTOCOMPLETE_KEY}>
                    <GeoapifyGeocoderAutocomplete
                        placeholder="Search property address"
                        type="street"
                        placeSelect={(place) => onPlaceSelect(place)}
                    />
                </GeoapifyContext>
            </div>
        </div>
    )
}

export default AddressSearch