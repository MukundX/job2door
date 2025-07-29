"use client";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/Button";
import { usePathname } from "next/navigation"; // <-- Add this import

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  // Hide Navbar on dashboard page
  if (pathname.startsWith("/dashboard")) {
    return null;
  };
  
  if (pathname.startsWith("/")) {
    return null;
  };

  if (pathname.startsWith("/company")) {
    return null;
  };

   if (pathname.startsWith("/search")) {
    return null;
  };

   if (pathname.startsWith("/job")) {
    return null;
  };

  if (pathname.startsWith("/admin")) {
    return null;
  };

  return (
    <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">JB</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Jobler
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link href="/" className="text-white/80 hover:text-white transition-colors font-medium">
              Home
            </Link> */}
            {user && (
              <>
                <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors font-medium">
                  Dashboard
                </Link>
                <Link href="/admin" className="text-white/80 hover:text-white transition-colors font-medium">
                  Admin
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  <img
                    src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-white/20 shadow-lg"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-white">
                      {user.user_metadata?.name || user.email}
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-2 z-50">
                    <Link
                      href={`/p?username=${user.user_metadata?.username || 'profile'}`}
                      className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <div className="border-t border-white/10 my-1"></div>
                    <button
                      onClick={() => {
                        // TODO: Implement logout
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button 
                onClick={() => router.push("/dashboard")} 
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 