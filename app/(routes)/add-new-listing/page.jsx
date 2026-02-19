"use client"
import { useState } from 'react'
import AddressSearch from '../../_components/AddressSearch'
import { Button } from '@/components/ui/button'
import { supabase } from '../../../utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import Loading from './loading'
import { useRouter } from 'next/navigation'

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
        <div className='mt-10 md:mx-56 lg:mx-80'>
            <div className="p-10 flex flex-col gap-5 items-center justify-center">
                <h2 className="text-2xl font-bold">Add New Listing</h2>
                <div className='w-full p-10 px-28 rounded-lg border shadow-md flex flex-col gap-5'>
                    <h2 className='text-gray-500'>Enter Address which you want to list</h2>
                    <AddressSearch setSelectedLocation={(value) => setSelectedLocation(value)} />
                    {loader ?
                        <div className='text-center'>
                            <Loading />
                            <p className="mt-4 font-medium text-gray-700">Loading...</p>
                        </div> : <Button disabled={!selectedLocation} variant="brand" onClick={nextHandler}>Next</Button>}
                </div>
            </div>
        </div>
    )
}

export default AddNewListing