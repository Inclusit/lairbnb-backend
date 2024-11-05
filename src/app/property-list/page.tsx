//src/app/property-list/page.tsx
"use client";

import PropertyList from "@/components/admin-comps/PropertyList";
import { Searchbar } from "@/components/Searchbar";
import { useState } from "react";


export default function PropertyPage() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    return (
        <div>
            <div className="flex items-center justify-center w-full mt-7">
           <Searchbar onSearch={setSearchQuery} />
            </div>
            <PropertyList searchQuery={searchQuery} />
        </div>
    );
}