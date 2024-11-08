"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function createPropertyPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [pricePerNight, setPricePerNight] = useState<number | "">("")
    const {user, token} = useUser();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user || !token) {
            console.warn("Must be logged in to create a property");
            return;
        }

        const propertyData = {
            name,
            description,
            location,
            pricePerNight: typeof pricePerNight === "number" ? pricePerNight : 0,
            availability: false,
            ownerId: user.id

        };

        try {
            const response = await fetch(`${BASE_URL}/api/properties`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(propertyData)
            });

            if (response.ok) {
                router.push("/me/properties");
            } else {
                console.error("Failed to create property:", response.statusText);
            }

            router.push("/me/properties");
        } catch (error:any) {
            console.error("Failed to create property:", error);
        }
    }
    

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Registrera din property</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Namn</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Beskrivning</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Plats</label>
            <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700">Pris per natt</label>
            <input
                type="number"
                id="pricePerNight"
                value={pricePerNight}
                onChange={(e) => setPricePerNight(parseFloat(e.target.value))}
                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            />
            <Button type="submit">Skapa property</Button>
            </div>
        </form>
        </div>
    );
}