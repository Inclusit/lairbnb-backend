import Link from 'next/link';

export default function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <div className="container mx-auto flex max-w-full items-center justify-between p-6 lg:px-8">
                    <div>
                        LairBnB
                    </div>
                    <div className="flex justify-between items-center gap-10">
                        <div className="relative group">
                            <Link href="/">
                                <p className="navbar-brand relative z-10">Properties</p>
                            </Link>
                            {/* Det här elementet täcker en större yta än texten */}
                            <span className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-10 bg-orange-100 z-0 group-hover:block hidden"></span>
                        </div>
                        <div className="relative group">
                            <Link href="/">
                                <p className="navbar-brand relative z-10">Booking</p>
                            </Link>
                            <span className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-10 bg-orange-100 z-0 group-hover:block hidden"></span>
                        </div>
                        <div className="relative group">
                            <Link href="/">
                                <p className="navbar-brand relative z-10">Sign in</p>
                            </Link>
                            <span className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-10 bg-orange-100 z-0 group-hover:block hidden"></span>
                        </div>
                    </div>
                </div>
            </nav>
            <hr />
        </header>
    );
}
