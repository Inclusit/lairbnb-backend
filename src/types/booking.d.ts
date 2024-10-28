import { Property } from "./property";
import { User } from "./user";
import { Booking } from "@prisma/client";


type BookingData = Omit<Booking, "id" | "createdAt" >;

type BookingUpdateData = Omit<BookingData, >;