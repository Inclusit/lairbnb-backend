import Link from "next/link";

export default function AdminNav() {
    return (
        <div className="w-full border-b border-black">
            <div className="container mx-auto flex max-w-full items-center justify-between p-6 lg:px-8">
                <div className="flex justify-center w-full">
                    <Link href="/admin">
                        <p className="navbar-brand mx-4">View Users</p>
                    </Link>
                    <Link href="/admin/properties">
                        <p className="navbar-brand mx-4">View Properties</p>
                    </Link>
                    <Link href="/admin/booking">
                        <p className="navbar-brand mx-4">View Booking</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
