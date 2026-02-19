import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { Bath, BedDouble, MapPin, Eye, Edit, Ruler, Trash } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function UserListing() {

  const { user } = useUser()
  const [listing, setListing] = useState([])
  useEffect(() => {
    user && getUserListing()
  }, [user])
  const getUserListing = async () => {
    const { data, error } = await supabase
      .from('listing')
      .select('*, listingImages(url, listing_id)')
      .eq('createdBy', user?.primaryEmailAddress.emailAddress)

    setListing(data)
  }

  return (
    <div>
      <h2 className='font-bold text-2xl'>Manage Your Listing</h2>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {listing.length > 0 ? listing.map((item, index) => (
          <div key={item.id || index} className='relative p-3 hover:shadow-lg hover:shadow-emerald-900 rounded-lg transition cursor-pointer'>
            <h2 className='absolute top-2 left-2 bg-brand-purple text-white px-2 py-1 text-sm rounded-lg'>{item.active ? 'Published' : 'Draft'}</h2>
            <Image alt="Property" src={item?.listingImages[0]?.url || '/placeholder.jpg'} width={800} height={150} className='rounded-lg object-cover h-[270px]' />
            <div className='flex mt-2 flex-col gap-2'>
              <h2 className='font-bold text-xl'>${item.price}</h2>
              <h2 className='flex gap-2 text-sm text-gray-500'>
                <MapPin className='h-4 w-4 flex-shrink-0' />{item.address}
              </h2>
              <div className='flex gap-2 justify-between'>
                <h2 className='w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center'>
                  <BedDouble className='h-4 w-4' />{item?.bedroom}
                </h2>
                <h2 className='w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center'>
                  <Bath className='h-4 w-4' />{item?.bathroom}
                </h2>
                <h2 className='w-full flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center'>
                  <Ruler className='h-4 w-4' />{item?.area}
                </h2>
              </div>
              <div className='flex gap-2 mt-auto pt-2'>
                <Link href={`/view-listing/${item.id}`} className="flex-1">
                  <Button size="sm" variant='outline' className='w-full flex gap-1'>
                    <Eye className="h-4 w-4" /> View
                  </Button>
                </Link>

                <Link href={`/edit-listing/${item.id}`} className="flex-1">
                  <Button size="sm" className='w-full flex gap-1 bg-brand-purple hover:bg-purple-700'>
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                </Link>

                <Button size="sm" variant='destructive' className='px-3'>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )) : (
          <div className='col-span-full py-20 text-center border-2 border-dashed rounded-xl text-gray-400'>
            No listings found. Start by creating one!
          </div>
        )}
      </div>
    </div>
  )
}

export default UserListing