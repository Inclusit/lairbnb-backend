import { Property } from "@prisma/client";
import PropertyModal from "./PropertyModal";
import CardLayout from "./CardLayout";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

type PropertyCardProps = {
    property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Använd en riktig bild URL istället för en tom div */}
                <img
                    src={/* property.imageUrl || */ `https://picsum.photos/400/300?random=${property.id}`} // eller en standardbild
                    alt={property.name}
                    className="w-full h-32 object-cover"
                />
                <CardContent className="p-4">
                    <h2 className="font-semibold text-xl mb-2">{property.name}</h2>
                    <p className="text-gray-600 mb-4">
                        {property.description?.length > 100 
                            ? `${property.description.slice(0, 100)}...` 
                            : property.description || "Ingen beskrivning tillgänglig."}
                    </p>
                    <Button onClick={() => setOpen(true)}>Visa mer</Button>
                </CardContent>
                <PropertyModal property={property} open={open} onClose={() => setOpen(false)} />
            </Card>
        </>
    );
}