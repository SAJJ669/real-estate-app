"use client"
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Formik } from 'formik'
import { usePathname } from 'next/navigation'
import { supabase } from '../../../../utils/supabase/client'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import FileUpload from '../_components/FileUpload'
import Loading from '../../add-new-listing/loading'

const EditListing = () => {
    const params = usePathname()
    const { user, isSignedIn, isLoaded } = useUser()
    const router = useRouter()
    const [listing, setListing] = useState(null)
    const [images, setImages] = useState([])
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (!isLoaded) return

        if (!isSignedIn) {
            router.replace('/')
            return
        }
        user && verifyUser()
    }, [user, isSignedIn, isLoaded])

    const onSubmitHandler = async (formValue) => {
        setLoader(true);
        const { data, error } = await supabase
            .from('listing')
            .update(formValue)
            .eq('id', params.split('/')[2])
            .select()
        if (data) {
            toast.success('Listing updated successfully!')
            setLoader(false)
        }

        for (const image of images) {
            setLoader(true)
            const file = image
            const fileName = Date.now().toString()
            const fileExt = fileName.split('.').pop()
            const { data, error } = await supabase.storage
                .from('listingImages')
                .upload(`${fileName}`, file, { contentType: `image/${fileExt}`, upsert: false })

            if (error) {
                toast.error('Error uploading image')
                setLoader(false)
            }
            else {
                const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName
                const { data, error } = await supabase
                    .from('listingImages')
                    .insert([{ url: imageUrl, listing_id: params.split('/')[2] }])
                    .select()
                if (data) { setLoader(false) }
                if (error) {
                    toast.error('Error saving image url')
                    setLoader(false)
                }
                toast.success('Image uploaded successfully!')
            }
            setLoader(false)
        }
    }

    const verifyUser = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*, listingImages(listing_id, url)')
            .eq('createdBy', user?.primaryEmailAddress.emailAddress)
            .eq('id', params.split('/')[2])

        if (!data || data.length === 0) {
            console.log("Access Denied or Listing not found");
            router.replace('/'); // Force redirect to home
        }

        setListing(data[0]);
    }

    const publishBtnHandler = async () => {
        setLoader(true)
        const { data, error } = await supabase
            .from('listing')
            .update({ active: true })
            .eq('id', params.split('/')[2])
            .select()

        if (data) {
            setLoader(false)
            toast.success('Listing pubished successfully!')
            router.push('/view-listings')
        }

    }

    // Show loading while Clerk is loading OR while Supabase is verifying
    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loading className="animate-spin h-10 w-10" />
                <p className="mt-4 text-slate-500">Authenticating...</p>
            </div>
        );
    }

    // Only render the form if we found a listing
    if (!listing) return null;

    return (
        <div className='px-10 md:px-36 my-10'>
            <h2 className='font-bold text-2xl'>Enter some more details for the listing</h2>
            <Formik
                initialValues={{ type: '', property_type: '', fullName: user?.fullName, profileImage: user?.imageUrl }}
                onSubmit={(values) => {
                    onSubmitHandler(values)
                }}>
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='p-5 border rounded-lg shadow-md grid gap-7 mt-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-lg text-slate-500'>Rent or Sell?</h2>
                                    <RadioGroup defaultValue={listing?.type || 'sell'} onValueChange={(e) => values.type = e}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="rent" id="rent" />
                                            <Label htmlFor="rent">Rent</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="sell" id="sell" />
                                            <Label htmlFor="sell">Sell</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className='text-lg text-slate-500'>Property Type</h2>
                                    <Select defaultValue={listing?.property_type} onValueChange={(e) => values.property_type = e}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="Choose property type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Single Family House">Single Family House</SelectItem>
                                            <SelectItem value="Town House">Town House</SelectItem>
                                            <SelectItem value="Condo">Condo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Bedroom</h2>
                                    <Input defaultValue={listing?.bedroom} onChange={handleChange} type="number" className="bg-background" id="bedroom" name="bedroom" placeholder="Ex.2" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Bathroom</h2>
                                    <Input defaultValue={listing?.bathroom} onChange={handleChange} type="number" className="bg-background" id="bathroom" name="bathroom" placeholder="Ex.2" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Builtin</h2>
                                    <Input defaultValue={listing?.builtin} onChange={handleChange} type="number" className="bg-background" id="builtin" name="builtin" placeholder="Enter Year (e.g 2019)" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Parking</h2>
                                    <Input defaultValue={listing?.parking} onChange={handleChange} type="number" className="bg-background" id="parking" name="parking" placeholder="Ex.2" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Lot Size (Sq.ft)</h2>
                                    <Input defaultValue={listing?.lotsize} onChange={handleChange} type="number" className="bg-background" id="lotsize" name="lotsize" placeholder="" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Area (Sq.ft)</h2>
                                    <Input defaultValue={listing?.area} onChange={handleChange} type="number" className="bg-background" id="area" name="area" placeholder="Ex.1900 Sq.ft" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Sellng Price ($)</h2>
                                    <Input defaultValue={listing?.price} onChange={handleChange} type="number" className="bg-background" id="price" name="price" placeholder="400000" />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>HOA (Per Month) ($)</h2>
                                    <Input defaultValue={listing?.hoa} onChange={handleChange} type="number" className="bg-background" id="hoa" name="hoa" placeholder="100" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-10'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Description</h2>
                                    <Textarea
                                        defaultValue={listing?.description}
                                        onChange={handleChange}
                                        className="bg-background"
                                        id="description"
                                        name="description"
                                        placeholder="Your feedback helps us improve..."
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className='font-lg text-gray-500 my-2'>Upload property images</h2>
                                <FileUpload imageList={listing?.listingImages} setImages={(value) => { setImages(value) }} />
                            </div>
                            <div className='flex gap-7 justify-end'>
                                <Button disabled={loader} variant="outline" className="border-brand-purple text-brand-purple">{loader ? <Loading className="animate-spin" /> : "Save"}</Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button type="button" disabled={loader} variant="brand">{loader ? <Loading className="animate-spin" /> : "Save & Publish"}</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Want to Publish?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Do you want to save the changes and publish the listing? You can always edit or unpublish it later.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => publishBtnHandler()}>{loader ? <Loading className="animate-spin" /> : "Continue"}</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default EditListing