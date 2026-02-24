import { Bath, BedDouble, MapPin, Ruler, Search } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddressSearch from './AddressSearch'
import { Button } from '@/components/ui/button'
import FilterSection from './FilterSection'
import Link from 'next/link'

function Listing({ listing, handleSearchClick, searchedAddress, setBedroom, setBathroom, setParking, setHomeType, setCoordinates }) {
    const [address, setAddress] = useState()
    const [hasSearched, setHasSearched] = useState(false)

    return (
        <div>
            <div className='p-3 flex items-center w-full justify-center'>
                <AddressSearch className='hide-geo-cross' setSelectedLocation={(value) => { searchedAddress(value), setAddress(value), setCoordinates(value?.coordinates) }} />
                <Button variant="brand" className="flex gap-2" onClick={()=>{handleSearchClick, setHasSearched(true)}}><Search />Search</Button>
            </div>
            <div>
                <FilterSection setBedroom={setBedroom} setBathroom={setBathroom} setParking={setParking} setHomeType={setHomeType} />
            </div>
            <div className='px-3 my-5'>
                {hasSearched && address && <h2 className='text-xl text-gray-400'>Showing {listing?.length} results for <span className='text-brand-purple font-bold'>{address?.address.split(',')[0]?.trim()}</span></h2>}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {listing?.length > 0 ? listing.map((item, index) => (
                    <Link key={item.id} href={`/view-listing/${item.id}`}>
                        <div className='p-3 border border-2 hover:shadow-lg hover:shadow-emerald-900 rounded-lg transition cursor-pointer'>
                            <Image alt="Property" src={item?.listingImages[0]?.url || '/placeholder.jpg'} width={800} height={150} className='rounded-lg object-cover h-[270px]' />
                            <div className='flex mt-2 flex-col gap-2'>
                                <h2 className='text-green-700 font-bold text-xl'>${item.price}</h2>
                                <h2 className='flex gap-2 text-sm text-gray-500'>
                                    <MapPin className='h-4 w-4 flex-shrink-0 my-1' />{item.address}
                                </h2>
                                <div className='flex gap-2 justify-between'>
                                    <h2 className='w-full flex gap-2 text-sm bg-brand-purple rounded-md p-2 text-white justify-center'>
                                        <BedDouble className='h-4 w-4' />{item?.bedroom}
                                    </h2>
                                    <h2 className='w-full flex gap-2 text-sm bg-brand-purple rounded-md p-2 text-white justify-center'>
                                        <Bath className='h-4 w-4' />{item?.bathroom}
                                    </h2>
                                    <h2 className='w-full flex gap-2 text-sm bg-brand-purple rounded-md p-2 text-white justify-center'>
                                        <Ruler className='h-4 w-4' />{item?.area}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </Link>
                )) : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                    <div key={index} className='p-3 rounded-lg border border-slate-100'>
                        {/* Image Placeholder */}
                        <div className='h-[170px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
                        {/* Title/Price Placeholder */}
                        <div className='h-6 w-1/3 bg-slate-200 animate-pulse rounded-md mt-3'></div>
                        {/* Address Placeholder */}
                        <div className='h-4 w-full bg-slate-200 animate-pulse rounded-md mt-2'></div>
                        {/* Icons Placeholder */}
                        <div className='flex gap-2 mt-3'>
                            <div className='h-8 w-full bg-slate-200 animate-pulse rounded-md'></div>
                            <div className='h-8 w-full bg-slate-200 animate-pulse rounded-md'></div>
                            <div className='h-8 w-full bg-slate-200 animate-pulse rounded-md'></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Listing