"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@prisma/client";
import { useUser } from "@/context/user";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function UpdateProperty() {
  const [property, setProperty] = useState<Property | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, token } = useUser();
  const router = useRouter();
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm<Property>();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchProperty = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/properties/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }
        const data: Property = await response.json();
        setProperty(data);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("location", data.location);
        setValue("pricePerNight", data.pricePerNight);
        setValue("availability", data.availability);
      } catch (error: any) {
        console.warn("Error: Failed to fetch property", error.message);
      }
    };

    fetchProperty();
  }, [user, id, router, token, setValue]);

  const onSubmit = async (data: Property) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/api/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          pricePerNight: Number(data.pricePerNight.toFixed(2)),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update property");
      }
      router.push("/me/properties");
    } catch (error: any) {
      console.warn("Error: Failed to update property", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          id="location"
          {...register("location")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="pricePerNight"
          className="block text-sm font-medium text-gray-700"
        >
          Price Per Night
        </label>
        <input
          type="number"
          step="0.01"
          id="pricePerNight"
          {...register("pricePerNight", { valueAsNumber: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="availability"
          className="block text-sm font-medium text-gray-700"
        >
          Availability
        </label>
        <select
          id="availability"
          {...register("availability")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Update Property"}
      </Button>
    </form>
  );
}
