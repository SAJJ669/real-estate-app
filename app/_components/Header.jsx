"use client"
import { Button } from '@/components/ui/button'
import { useClerk, UserButton, useUser } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, PlusCircle } from "lucide-react"
import Aurora from './Aurora';
const Header = () => {

    const { user, isSignedIn, isLoaded } = useUser();
    const router = useRouter()
    const path = usePathname();
    const { signOut } = useClerk();
    // useEffect(() => {
    //     if (isLoaded) {
    //         console.log("isSignedIn:", isSignedIn);
    //         console.log("user:", user);
    //     }
    // }, [isLoaded]);


    return (
        <div className="p-3 px-10 flex justify-between shadow-sm fixed top-0 w-full bg-[#f1f3f4] z-10">
            <div className='flex gap-10 items-center'>
                <Image src={'/logo.svg'} width={150} height={150} alt='Logo' />
                <ul className='hidden md:flex gap-10'>
                    <Link href={'/'}>
                        <li className={`hover:text-brand-purple font-medium cursor-pointer ${path === '/' && 'text-brand-purple'}`}>For Sell</li>
                    </Link>
                    <Link href={'/rent'}>
                        <li className={`hover:text-brand-purple font-medium cursor-pointer ${path === '/rent' && 'text-brand-purple'}`}>For Rent</li>
                    </Link>
                    <li className={`hover:text-brand-purple font-medium cursor-pointer ${path === '/agents-finder' && 'text-brand-purple'}`}>Agents Finder</li>
                </ul>
            </div>
            <div className='flex items-center gap-3'>
                <Link href={isSignedIn ? "/add-new-listing" : "/sign-in"}>
                    <Button variant="brand" className="flex gap-2"><Plus className='h-5 w-5' />Post Ad</Button>
                </Link>
                <Link href={'/sign-in'}>
                    {isSignedIn ? <div className="flex flex-col items-center w-full scale-120">
                        <DropdownMenu>
                            {/* The element that triggers the menu */}
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="rounded-full w-10 h-10 p-0 overflow-hidden">
                                    <Image className="rounded-full" src={user?.imageUrl} width={35} height={35} alt='ProfileImg' />
                                </Button>
                            </DropdownMenuTrigger>

                            {/* The actual menu content */}
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.primaryEmailAddress.emailAddress}</p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <Link className="flex gap-2 items-center" href={'/user'}>
                                        <DropdownMenuItem className='w-full cursor-pointer'>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link className="flex gap-2 items-center" href={'/user/my-listing'}>
                                        <DropdownMenuItem className='w-full cursor-pointer'>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            <span>My Listing</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/' })} className="text-red-600 focus:text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div> : <Button variant="brand">Login</Button>}
                </Link>
            </div>
        </div>
    )
}

export default Header