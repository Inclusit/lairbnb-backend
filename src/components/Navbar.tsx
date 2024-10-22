import Link from 'next/link';


export default function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <div className="container mx-auto flex max-w-full items-center justify-between p-6 lg:px-8" >
                    <div>
                        LairBnB
                    </div>
                    <div className='flex justify-between items-center gap-10'>
                        <Link href="/">
                            <p className="navbar-brand">Properties</p>
                        </Link>
                        <Link href="/">
                            <p className="navbar-brand">Booking</p>
                        </Link>
                        <Link href="/">
                            <p className="navbar-brand">Sign in</p>
                        </Link>
                    </div>
                </div>

            </nav>
            <hr />
        </header>
    );
}