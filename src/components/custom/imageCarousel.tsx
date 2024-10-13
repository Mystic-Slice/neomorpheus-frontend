import * as React from "react"
import Image from 'next/image'
import { Card, CardContent } from "~/components/ui/card"
import { CarouselItemType } from "~/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"

export default function ImageCarousel({ items }: { items: CarouselItemType[] }) {
  return (
    <div className="flex w-full items-center justify-center">
    <Carousel className="w-[500px] h-[500px] bg-red-500">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.slideNumber} className="w-[500px] h-[500px]">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col justify-center">
                    <img
                      src={item.images[0] || "/images/placeholder.png"}
                      alt={item.content}
                      className="w-[300px] h-[300px] self-center"
                    />
                    <p className="text-center mt-2">{item.content}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  )
}