import * as React from "react"
import Image from 'next/image'
import { Card, CardContent } from "~/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"

type CarouselItem = {
  id: number
  imageUrl: string
  caption: string
}

export default function ImageCarousel({ items }: { items: CarouselItem[] }) {
  return (
    <Carousel className="w-100">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="relative w-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.caption}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <p className="text-center mt-2">{item.caption}</p>
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
  )
}