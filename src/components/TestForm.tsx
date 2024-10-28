"use client";

import { FormEvent, useState } from "react";
import LocalStorageKit from "@/utils/localStorageKit";

export default function TestForm() {
  const [formType, setFormType] = useState<"login" | "register" | "update" | "booking" | "updateBooking">("login");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data: Record<string, any> = Object.fromEntries(formData.entries());

  // Konvertera pricePerNight till float om det finns
  if (data.pricePerNight) {
    data.pricePerNight = parseFloat(data.pricePerNight as string);
  }

    

    let url = "";
    let method: "POST" | "PUT" = "POST";
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Hämta token från LocalStorageKit om den finns och lägg till i headers
    const token = LocalStorageKit.get("@library/token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Ange rätt URL och metod beroende på formulärtyp
    switch (formType) {
      case "login":
        url = "/api/auth/login";
        break;
      case "register":
        url = "/api/properties";
        break;
      case "update":
        url = `/api/properties/${data.id}`;
        method = "PUT";
        break;
      case "booking":
        url = "/api/bookings";
        break;
      case "updateBooking":
        url = `/api/bookings/${data.bookingId}`;
        method = "PUT";
        break;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Om vi loggar in och får en token, spara den i LocalStorage
    if (formType === "login" && result.token) {
      LocalStorageKit.set("@library/token", result.token);
    }

    console.log(result);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {formType === "login"
          ? "Logga in"
          : formType === "register"
          ? "Registrera Property"
          : formType === "update"
          ? "Uppdatera Property"
          : formType === "booking"
          ? "Bokning"
          : "Uppdatera Bokning"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formType === "login" && (
          <>
            <div>
              <label htmlFor="email" className="block text-lg font-medium">Email:</label>
              <input type="email" id="email" name="email" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium">Lösenord:</label>
              <input type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
          </>
        )}

        {formType === "register" && (
          <>
            <div>
              <label htmlFor="name" className="block text-lg font-medium">Namn:</label>
              <input type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-medium">Beskrivning:</label>
              <input type="text" id="description" name="description" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="location" className="block text-lg font-medium">Plats:</label>
              <input type="text" id="location" name="location" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="pricePerNight" className="block text-lg font-medium">Pris per natt:</label>
              <input type="number" id="pricePerNight" name="pricePerNight" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
          </>
        )}

        {formType === "update" && (
          <>
            <div>
              <label htmlFor="id" className="block text-lg font-medium">Property ID:</label>
              <input type="text" id="id" name="id" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="name" className="block text-lg font-medium">Namn:</label>
              <input type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-medium">Beskrivning:</label>
              <input type="text" id="description" name="description" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="location" className="block text-lg font-medium">Plats:</label>
              <input type="text" id="location" name="location" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="pricePerNight" className="block text-lg font-medium">Pris per natt:</label>
              <input type="number" id="pricePerNight" name="pricePerNight" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
          </>
        )}

        {formType === "booking" && (
          <>
            <div>
              <label htmlFor="firstName" className="block text-lg font-medium">Förnamn:</label>
              <input type="text" id="firstName" name="firstName" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-lg font-medium">Efternamn:</label>
              <input type="text" id="lastName" name="lastName" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="checkInDate" className="block text-lg font-medium">Incheckning:</label>
              <input type="date" id="checkInDate" name="checkInDate" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="checkOutDate" className="block text-lg font-medium">Utcheckning:</label>
              <input type="date" id="checkOutDate" name="checkOutDate" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="propertyId" className="block text-lg font-medium">Property ID:</label>
              <input type="text" id="propertyId" name="propertyId" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
          </>
        )}

        {formType === "updateBooking" && (
          <>
            <div>
              <label htmlFor="bookingId" className="block text-lg font-medium">Booking ID:</label>
              <input type="text" id="bookingId" name="bookingId" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="checkInDate" className="block text-lg font-medium">Incheckning:</label>
              <input type="date" id="checkInDate" name="checkInDate" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
              <label htmlFor="checkOutDate" className="block text-lg font-medium">Utcheckning:</label>
              <input type="date" id="checkOutDate" name="checkOutDate" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
          </>
        )}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {formType === "login"
            ? "Logga in"
            : formType === "register"
            ? "Registrera Property"
            : formType === "update"
            ? "Uppdatera Property"
            : formType === "booking"
            ? "Boka"
            : "Uppdatera Bokning"}
        </button>
      </form>

      <div className="mt-4 flex justify-around">
        <button onClick={() => setFormType("login")} className="text-blue-500 bg-gray-200 p-2 rounded">Logga in</button>
        <button onClick={() => setFormType("register")} className="text-blue-500 bg-gray-200 p-2 rounded">Registrera</button>
        <button onClick={() => setFormType("update")} className="text-blue-500 bg-gray-200 p-2 rounded">Uppdatera</button>
        <button onClick={() => setFormType("booking")} className="text-blue-500 bg-gray-200 p-2 rounded">Bokning</button>
        <button onClick={() => setFormType("updateBooking")} className="text-blue-500 bg-gray-200 p-2 rounded">Uppdatera Bokning</button>
      </div>
    </div>
  );
}
