//src/app/layout.tsx

"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import CarouselComp from "@/components/CarouselComp";
import Homepage from "@/components/Homepage";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" >
       
      
      <main className="flex-grow flex items-center justify-center flex-col"/*  max-w-[780px] mx-auto p-4" */>
       <div className="w-full p-4"> 
        </div>
        <div className="max-w-980px">
          <Homepage />
          </div> 
          
        </main>

        
    </div>
  );
}
