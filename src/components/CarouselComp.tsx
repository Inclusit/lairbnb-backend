import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Searchbar } from "@/components/Searchbar";

export default function CarouselSize() {
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-[1450px] w-full h-[550px] relative"> {/* Max bredd och höjd för karusellen */}

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[850px] "> 
          <Searchbar />
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full h-full "
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="flex justify-center h-full">
                <div className="p-2 h-full">
                  <Card className="w-full h-full flex items-center justify-center rounded-lg">
                    <CardContent className="flex items-center justify-center p-0 h-full rounded-lg">
                      <img
                        src={`https://picsum.photos/1450/550?random=${index}`} // Använda bild med dimensioner
                        alt={`Placeholder ${index + 1}`}
                        className="w-full h-full object-cover rounded-3xl" // Gör bilden responsiv
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}
