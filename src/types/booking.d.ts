type Booking = {
    id: string;
    createdAt: Date;
    checkInDate: Date;
    checkOutDate: Date;
    totalPrice: number;
    property: Property;
    user: User;
}

type BookingData = Omit<Booking, "id" | "createdAt">;