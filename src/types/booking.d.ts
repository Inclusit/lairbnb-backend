import { User } from "./user";
import { Booking, Property } from "@prisma/client";


type BookingData = Partial<Booking> & { user: User, checkInDate: Date, checkOutDate: Date };

type BookingUpdateData = Omit<BookingData, "userId" | "propertyId">;

type BookingWithProperty = Booking & { property: Property };