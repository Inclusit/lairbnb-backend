"use client";
import { useEffect, useState } from "react";
import { Property } from "@prisma/client";
import PropertyCard from "@/components/admin-comps/PropertyCard";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation"; // Use next/navigation for useRouter
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function MyProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading, token } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/login");
    }
    if (user) {
      fetchProperties();
    }

    console.log("Properties:", properties);
  }, [user, router]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/me/properties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data: Property[] = await response.json();
      setProperties(data);
      setLoading(false);
    } catch (error: any) {
      console.warn("Error: Failed to fetch properties", error.message);
      setLoading(false);
    }
  };

    const deleteProperty = async (propertyId: string)  => {
        
        try {
            const response = await fetch(`${BASE_URL}/api/properties/${propertyId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete property");
            }

            const updatedProperties = properties.filter((property) => property.id !== propertyId);
            setProperties(updatedProperties);
            

        } catch (error: any) {
            console.warn("Error: Failed to delete property", error.message);
        
        }

        router.refresh();
    };


  return (
    <>
      <div className="align-middle">
        <h2>Mina properties</h2>
        <Button>
          <a href="/me/properties/create">Lägg upp din property</a>
        </Button>
      </div>
      {loading ? (
        <p>Hämtar properties...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-16">
          {properties.map((property) => (
            <div key={property.id}>
              <PropertyCard property={property} />
              {(user?.id === property.ownerId || user?.isAdmin === true) && (
                <>
                  <Button
                    onClick={() => router.push(`/me/properties/${property.id}`)}
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Uppdatera property
                  </Button>
                  <Button
                    onClick={() => deleteProperty(property.id)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                    >
                    Radera property
                    </Button>
                  
                </>
              )}
            </div>
          ))}

          {properties.length === 0 && (
            <p className="text-center">Du äger inga properties</p>
          )}
        </div>
      )}
    </>
  );
}
