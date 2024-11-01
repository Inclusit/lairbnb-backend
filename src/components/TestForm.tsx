"use client";

import { FormEvent, useState } from "react";
import LocalStorageKit from "@/utils/localStorageKit";

export default function TestForm() {
  const [formType, setFormType] = useState<"login" | "register" | "update" | "booking" | "updateBooking" | "deleteProperty" | "deleteBooking">("login");
  const [LoggedIn, setLoggedIn] = useState(false);
  const [Email, setEmail] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, any> = Object.fromEntries(formData.entries());

    // Konvertera pricePerNight till float om det finns
    if (data.pricePerNight) {
      data.pricePerNight = parseFloat(data.pricePerNight as string);
    } 

    let url = "";
    let method: "POST" | "PUT" | "DELETE" = "POST";
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
      case "deleteProperty":
        url = `/api/properties/${data.id}`;
        method = "DELETE";
        break;
      case "deleteBooking":
        url = `/api/bookings/${data.bookingId}`;
        method = "DELETE";
        break;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: method !== "DELETE" ? JSON.stringify(data) : undefined, // Inget data för DELETE
    });

    const result = await response.json();

    // Om vi loggar in och får en token, spara den i LocalStorage
    if (formType === "login" && result.token) {
      LocalStorageKit.set("@library/token", result.token);
      setEmail(data.email);
      setLoggedIn(true);
    }

    console.log(result);
  };

  const handleLogout = () => {
    LocalStorageKit.remove("@library/token");
    setLoggedIn(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {LoggedIn ? `Inloggad som ${Email}` : 
          formType === "login"
          ? "Logga in"
          : formType === "register"
          ? "Registrera Property"
          : formType === "update"
          ? "Uppdatera Property"
          : formType === "booking"
          ? "Bokning"
          : formType === "deleteProperty"
          ? "Ta bort Property"
          : formType === "deleteBooking"
          ? "Ta bort Bokning"
          : "Uppdatera Bokning"}
      </h1>

      {LoggedIn && (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logga ut
        </button>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        {formType === "login" && (
          <>
            <div>
              <label htmlFor="email" className="block text-lg font-medium">E-post:</label>
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

        {formType === "deleteProperty" && (
          <>
            <div>
              <label htmlFor="id" className="block text-lg font-medium">Property ID:</label>
              <input type="text" id="id" name="id" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
          </>
        )}

        {formType === "deleteBooking" && (
          <>
            <div>
              <label htmlFor="bookingId" className="block text-lg font-medium">Booking ID:</label>
              <input type="text" id="bookingId" name="bookingId" required className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
          </>
        )}

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Skicka</button>
          <select
            value={formType}
            onChange={(e) => setFormType(e.target.value as any)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="login">Logga in</option>
            <option value="register">Registrera Property</option>
            <option value="update">Uppdatera Property</option>
            <option value="booking">Bokning</option>
            <option value="updateBooking">Uppdatera Bokning</option>
            <option value="deleteProperty">Ta bort Property</option>
            <option value="deleteBooking">Ta bort Bokning</option>
          </select>
        </div>
      </form>
    </div>
  );
}
