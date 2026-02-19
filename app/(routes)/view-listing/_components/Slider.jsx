import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function Slider({ imageList }) {
    return (
        <div>
            {imageList && imageList.length > 0 ? (
                <Carousel className="w-full">
                    <CarouselContent>
                        {imageList.map((item, index) => (
                            <CarouselItem key={index}>
                                <Image
                                    src={item.url}
                                    width={800}
                                    height={300}
                                    alt="img"
                                    className="rounded-xl object-cover w-full h-[460px]"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            ) : (
                <div className="w-full h-[360px] bg-slate-200 animate-pulse rounded-lg" />
            )}
        </div>
    )
}
