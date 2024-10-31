"use client";

import { Property } from "@prisma/client";
import { useEffect, useState } from "react";

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
        <div>
            <h1>Properties</h1>
            <ul>
                {properties.map((property) => (
                    <li key={property.id}>
                        <h2>{property.name}</h2>
                        <p>{property.description}</p>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}
