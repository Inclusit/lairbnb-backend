"use client"

import { useUser } from '@/context/user';
import { User } from '@prisma/client';
import Link from 'next/link';
import {  useEffect, useState } from 'react';


export default function Navbar() {

    const { user } = useUser();

    const [dropDown, setDropDown] = useState<boolean>(false);

    const handleDropDown = () => {
        setDropDown(!dropDown);
    };

    const handleSignOut = () => {
        localStorage.removeItem('@library/token');
        window.location.reload();
    console.log('User signed out');
};
    return (
      <header>
        <nav className="navbar">
          <div className="container mx-auto flex max-w-full items-center justify-between p-6 lg:px-8">
            <div>
              <Link href="/">LairBnB</Link>
            </div>
            <div className="flex justify-evenly items-center gap-16 mr-16">
              <div className="relative group">
                <Link href="/property-list">
                  <p className="navbar-brand relative z-10">Properties</p>
                </Link>
              </div>

              <div className="relative group">
                {user ? (
                  <div>
                    <button
                      onClick={handleDropDown}
                      className="navbar-brand relative z-20"
                    >
                      {user.firstName}
                    </button>
                    {dropDown && (
                      <div className="absolute top-12 right-0 bg-white p-4 shadow-lg rounded-md m-auto">
                        <button onClick={handleSignOut}>Logga ut</button>
                        <Link href="/me/properties">
                          <button>Mina properties</button>
                        </Link>
                        <Link href="me/bookings">
                          <button>Mina bokningar</button>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login">
                    <p className="navbar-brand relative z-20">Logga in</p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        <hr />
      </header>
    );
}
