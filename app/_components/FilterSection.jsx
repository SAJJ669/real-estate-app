import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Bath, BedDouble, CarFront } from 'lucide-react'

function FilterSection({ setBedroom, setBathroom, setParking, setHomeType }) {
    return (
        <div className='grid grid-cols-2 md:flex gap-2 px-4 py-3'>
            <Select onValueChange={setBedroom}>
                <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="3"><BedDouble className='flex gap-2 text-brand-purple' />3+</SelectItem>
                    <SelectItem value="4"><BedDouble className='flex gap-2 text-brand-purple' />4+</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={setBathroom}>
                <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Bathroom" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2"><Bath className='flex gap-2 text-brand-purple' />2+</SelectItem>
                    <SelectItem value="3"><Bath className='flex gap-2 text-brand-purple' />3+</SelectItem>
                    <SelectItem value="4"><Bath className='flex gap-2 text-brand-purple' />4+</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={setParking}>
                <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Parking" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2"><CarFront className='flex gap-2 text-brand-purple' />2+</SelectItem>
                    <SelectItem value="3"><CarFront className='flex gap-2 text-brand-purple' />3+</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={(value)=>{value == 'All' ? setHomeType(null) : setHomeType(value)}}>
                <SelectTrigger className="bg-background">
                    <SelectValue placeholder="House Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Single Family House">Single Family House</SelectItem>
                    <SelectItem value="Town House">Town House</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterSection