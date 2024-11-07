"use client";
import { useEffect, useState } from "react";
import { Property } from "@prisma/client";
import PropertyCard from "@/components/admin-comps/PropertyCard";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation"; // Use next/navigation for useRouter
import { Badge } from "@/components/ui/badge"; 

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function MyProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
            return;
        }

        const fetchProperties = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/properties/my`);
                if (!response.ok) {
                    throw new Error("Failed to fetch properties");
                }
                const data: Property[] = await response.json();
                setProperties(data);
                setLoading(false);
            } catch (error: any) {
                console.warn("Error: Failed to fetch properties", error.message);
            }
        };

        fetchProperties();
    }, [user]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-16">
                    {properties.map((property) => (
                        <div key={property.id}>
                            <PropertyCard property={property} />
                            {(user?.id === property.ownerId || user?.isAdmin === true) && (
                                <>
                                    <Badge className={property.availability ? "bg-green-500" : "bg-red-500"}>
                                        {property.availability ? "Available" : "Unavailable"}
                                    </Badge>
                                    <button
                                        onClick={() => router.push(`/update/${property.id}`)}
                                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Update Property
                                    </button>
                                </>
                            )}
                        </div>
                    ))}

                    {properties.length === 0 && (
                        <p className="text-center">No properties found.</p>
                    )}
                </div>
            )}
        </>
    );
}