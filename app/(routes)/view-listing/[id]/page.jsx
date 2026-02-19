"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../utils/supabase/client'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { Slider } from '../_components/Slider'
import Details from '../_components/Details'

function ViewListing() {
    const params = usePathname()
    const [listingDetail, setListingDetail] = useState()

    useEffect(() => {
        getListingDetail()
    }, [])


    const getListingDetail = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*, listingImages(url, listing_id)')
            .eq('id', params.split('/')[2])
            .eq('active', true)
        if (data) {
            setListingDetail(data[0])
        }
        if (error){
            toast.error("Can't retrieve data, Server Side Error")
        }
    }
    return (
        <div className='px-4 md:px-32 lg:px-56 my-3'>
            <Slider imageList={listingDetail?.listingImages} />
            <Details listingDetail={listingDetail}/>
        </div>
    )
}

export default ViewListing