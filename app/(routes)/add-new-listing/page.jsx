"use client"
import { useState } from 'react'
import AddressSearch from '../../_components/AddressSearch'
import { Button } from '@/components/ui/button'
import { supabase } from '../../../utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import Loading from './loading'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Aurora from '../../_components/Aurora'

const AddNewListing = () => {
    const [selectedLocation, setSelectedLocation] = useState();
    const [loader, setLoader] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    const nextHandler = async () => {
        setLoader(true);
        const { data, error } = await supabase
            .from('listing')
            .insert([
                { address: selectedLocation.address, coordinates: selectedLocation.coordinates, createdBy: user?.primaryEmailAddress.emailAddress },
            ])
            .select()
        if (data) {
            setLoader(false);
            // console.log("Data inserted successfully:", data);
            toast.success("New address added successfully!")
            router.replace('/edit-listing/' + data[0].id)
        }
        if (error) {
            setLoader(false);
            // console.error("Error inserting data:", error);
            toast.error("Error adding new address!")
        }

    }
    return (
        <>

            <div className='mt-10 md:mx-56 lg:mx-80'>
                <h2 className="text-2xl font-bold text-white text-center">Add New Listing</h2>
                <div className='w-full p-10 px-28 rounded-lg border shadow-md flex flex-col gap-5 bg-white/80'>
                    <h2 className='text-gray-700'>Enter Address which you want to list</h2>
                    <AddressSearch setSelectedLocation={(value) => setSelectedLocation(value)} />
                    {loader ?
                        <div className='text-center'>
                            <Loading />
                            <p className="mt-4 font-medium text-gray-700">Loading...</p>
                        </div> :
                        <Button className='hover:bg-violet-400' disabled={!selectedLocation} variant="brand" onClick={nextHandler}>
                            Next
                        </Button>}
                </div>
                <div className="absolute inset-0 -z-10">
                    <Aurora
                        colorStops={["#B19EEF", "#ADD8E6", "#5227FF"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={1}
                    />
                </div>
            </div>

        </>
    )
}

export default AddNewListing