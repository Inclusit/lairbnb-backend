//src/types/property.d.ts
import { Property } from "@prisma/client";

type PropertyData = Omit<Property, "id">;

type PropertyRegistrationData = Pick<Property, "name" | "description" | "location" | "pricePerNight">;