"use client"
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '../../utils/supabase/client'
import { toast } from 'sonner'
import MapSection from './MapSection'

function ListingMapView({ type }) {

    const [listing, setListing] = useState([])
    const [searchAddress, setSearchAddress] = useState()
    const [bedCount, setBedCount] = useState(0)
    const [bathCount, setBathroomCount] = useState(0)
    const [parkingCount, setParkingCount] = useState(0)
    const [homeType, setHomeType] = useState(null)
    const [coordinates, setCoordinates] = useState()

    useEffect(() => {
        getLatestListing()
    }, [])

    const getLatestListing = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*, listingImages(url, listing_id)')
            .eq('active', true)
            .eq('type', type)
            .order('id', { ascending: true })


        if (data) {
            setListing(data)
        }
        if (error) {
            toast.error('Error fetching listing data')
        }
    }

    const handleSearchClick = async () => {
        // const search = searchAddress?.address;
        // const searchTerm = search.split(',')[0]?.trim();

        // if (!searchTerm) {
        //     // This handles cases where searchAddress is null or address is missing
        //     toast.error("Please select a location from the dropdown");
        //     return;
        // }


        let query = supabase
            .from('listing')
            .select('*, listingImages(url, listing_id)')
            .eq('active', true)
            .eq('type', type)
            .gte('bedroom', bedCount)
            .gte('bathroom', bathCount)
            .gte('parking', parkingCount)
            // .ilike('address', `%${searchTerm}%`)
            .order('id', { ascending: true })

        // if (bedCount > 0) {
        //     query = query.gte('bedroom', bedCount)
        // }

        // if (bathCount > 0) {
        //     query = query.gte('bathroom', bathCount)
        // }

        // if (parkingCount > 0) {
        //     query = query.gte('parking', parkingCount)
        // }

        if (homeType) {
            query = query.eq('property_type', homeType)
        }

        if (searchAddress?.address) {
            const searchTerm = searchAddress.address.split(',')[0].trim()
            query = query.ilike('address', `%${searchTerm}%`)
        }

        const { data, error } = await query

        if (error) {
            console.error("Supabase Error:", error);
            toast.error("Search failed");
        } else {
            setListing(data);
            if (data.length === 0) {
                toast.info("No listings found for this location");
            }
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
                <Listing setCoordinates={setCoordinates} setBedroom={setBedCount} setBathroom={setBathroomCount} setParking={setParkingCount} setHomeType={setHomeType} searchedAddress={(value) => setSearchAddress(value)} handleSearchClick={handleSearchClick} listing={listing} />
            </div>
            <div className='fixed right-10 md:w-[350px] lg:w-[450px] xl:w-[650px]'>
                <MapSection listing={listing} coordinates={coordinates}/>
            </div>
        </div>
    )
}

export default ListingMapView