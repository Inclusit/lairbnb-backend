import Link from 'next/link';

export default function AdminMenu() {
    return (
        <aside>
            <nav className="navbar">
                <div className="container mx-auto flex max-w-full items-center justify-between p-6 lg:px-8" >
                    <div>
                        Admin
                    </div>
                    <div className='flex justify-between items-center gap-10'>
                        <Link href="/">
                            <p className="navbar-brand">Userlist</p>
                        </Link>
                        <Link href="/">
                            <p className="navbar-brand">Propertylist</p>
                        </Link>
                        <Link href="/">
                            <p className="navbar-brand">Bookinglist</p>
                        </Link>
                    </div>
                </div>
            </nav>
            <hr />


        </aside>
    )
}