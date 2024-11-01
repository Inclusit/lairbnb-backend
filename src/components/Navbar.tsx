"use client"

import Link from 'next/link';
import {  useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
}

export default function Navbar() {

    const [user, setUser] = useState<User | null>(null);
    const [dropDown, setDropDown] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                if (token) {
                    const response = await fetch('http://localhost:3000/api/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user');
                    }
                    const data: User = await response.json();
                    setUser(data);
                }
            } catch (error: any) {
                console.warn('Error: Failed to fetch user', error.message);
            }
        };

        fetchUser();
    }, []);

    const handleDropDown = () => {
        setDropDown(!dropDown);
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
        console.log('User signed out');
    };
    

    return (
        <header>
            <nav className="navbar">
                <div className="container mx-auto flex max-w-full items-center justify-between p-6 lg:px-8">
                    <div>
                        <Link href="/">
                        LairBnB
                        </Link>
                    </div>
                    <div className="flex justify-between items-center gap-10">
                        <div className="relative group">
                            <Link href="/property-list">
                                <p className="navbar-brand relative z-10">Properties</p>
                            </Link>
                            
                        </div>

                        <div className="relative group">
                            {user ? (
                                <div>
                                    <button onClick={handleDropDown} className="navbar-brand relative z-10">
                                        {user.name}
                                    </button>
                                    {dropDown && (
                                        <div className="absolute top-12 right-0 bg-white p-4 shadow-lg rounded-md">
                                            <button onClick={handleSignOut}>Sign out</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/sign-in">
                                    <p className="navbar-brand relative z-10">Sign in</p>
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
