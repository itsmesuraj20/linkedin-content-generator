'use client';

import { useUser, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { LogOut, PenTool, History, User } from 'lucide-react';

const Navbar = () => {
    const { user, isSignedIn } = useUser();

    if (!isSignedIn) {
        return null;
    }

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <PenTool className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">
                                LinkedIn Content Generator
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/dashboard"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/history"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                        >
                            <History className="h-4 w-4" />
                            <span>History</span>
                        </Link>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-gray-500" />
                                <span className="text-sm text-gray-700">
                                    {user?.firstName} {user?.lastName}
                                </span>
                            </div>
                            <SignOutButton>
                                <button className="text-gray-500 hover:text-red-600 p-2 rounded-md transition-colors">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </SignOutButton>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
