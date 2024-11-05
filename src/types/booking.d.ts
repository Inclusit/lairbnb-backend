import { Property } from "./property";
import { User } from "./user";
import { Booking } from "@prisma/client";


type BookingData = Partial<Booking> & { property: Property; user: User, checkInDate: Date, checkOutDate: Date };

type BookingUpdateData = Omit<BookingData, "userId" | "propertyId">;