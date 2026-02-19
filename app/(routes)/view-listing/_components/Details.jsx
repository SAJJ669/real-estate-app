import React from 'react'
import { Bath, BedDouble, CalendarRange, CarFront, Home, LandPlot, MapPin, Ruler, Search } from 'lucide-react'
import MapSection from '../../../_components/MapSection'
import AgentDetails from './AgentDetails'

function Details({ listingDetail }) {
    
    return listingDetail && (
        <div className='my-6 flex gap-2 flex-col'>
            {/* <div className='p-3 hover:shadow-lg hover:shadow-emerald-900 rounded-lg transition cursor-pointer'> */}
            <div className='flex mt-2 flex-col gap-2'>
                <h2 className='font-bold text-3xl'>${listingDetail.price}</h2>
                <h2 className='flex gap-2 text-md text-gray-500'>
                    <MapPin className='h-5 w-5 flex-shrink-0' />{listingDetail.address}
                </h2>
                <h1 className='my-3 text-xl font-bold'>Key Features</h1>
                <div className='grid grid-cols-3 gap-2 justify-between'>
                    <h2 className='w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-brand-purple justify-center'>
                        <Home className='h-5 w-5' />{listingDetail?.property_type}
                    </h2>
                    <h2 className='w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-brand-purple justify-center'>
                        <BedDouble className='h-5 w-5' />{listingDetail?.bedroom} Bedroom
                    </h2>
                    <h2 className='w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-brand-purple justify-center'>
                        <Bath className='h-5 w-5' />{listingDetail?.bathroom} Bathroom
                    </h2>
                    <h2 className='w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-brand-purple justify-center'>
                        <LandPlot className='h-5 w-5' />{listingDetail?.area} Sq.ft
                    </h2>
                    <h2 className='w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-brand-purple justify-center'>
                        <CarFront className='h-5 w-5' />{listingDetail?.parking} Parking slots
                    </h2>
                    <h2 className='w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-brand-purple justify-center'>
                        <CalendarRange className='h-5 w-5' />Built in {listingDetail?.builtin}
                    </h2>
                </div>
                <div>
                    <h1 className='my-3 text-xl font-bold'>Description</h1>
                    <p>{listingDetail.description}</p>
                </div>
                <div>
                    <h1 className='my-3 text-xl font-bold'>Map</h1>
                    <MapSection coordinates={listingDetail.coordinates} listing={[listingDetail]} />
                </div>
                <div>
                    <h1 className='my-3 text-xl font-bold'>Contact Agents</h1>
                    <AgentDetails listingDetail={listingDetail} />
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Details