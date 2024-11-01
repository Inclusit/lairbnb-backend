"use client";

import { Property } from "@prisma/client";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function PropertyList() {
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {

            try {
            const response = await fetch(`${BASE_URL}/api/properties`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch properties");
            }

            const data: Property[] = await response.json();
            setProperties(data);

            } catch (error: any) {

                console.warn("Error: Failed to fetch properties", error.message);
            }
        };

        fetchProperties();

    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-16">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
}
