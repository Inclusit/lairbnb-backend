import { Booking } from "@prisma/client";

type BookingModalProps = {
    booking: Booking ;
    open: boolean;
    onClose: () => void;
};

export default function BookingModal({ booking, open, onClose }: BookingModalProps) {
    return (
        <div>
            <div>
                <h2>{booking.id}</h2>
                <label>Guest:</label>
                <p>{booking.firstName} {booking.lastName}</p>
            </div>
        </div>
    );
}