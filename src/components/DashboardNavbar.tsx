"use client";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import { Button } from "./ui/Button";

export default function DashboardNavbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    // TODO: Implement actual logout logic
    router.push('/');
    setShowMenu(false);
  };

  return (
    <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 dark:bg-gray-900/90 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">J2D</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Job2Door
            </span>
          </Link>

          {/* Avatar and Menu Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/50 transition-all duration-200"
            >
              {user ? (
                <img
                  src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-white/20 shadow-lg"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
              )}
              <svg className="w-4 h-4 text-white/60 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Menu Dropdown */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:bg-gray-800/90 dark:border-gray-700/50 py-2 z-50">
                {!showSettings ? (
                  // Main Menu
                  <>
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-white/10 dark:border-gray-700/50">
                          <div className="text-sm font-medium text-white dark:text-gray-200">
                            {user.user_metadata?.name || user.email}
                          </div>
                          <div className="text-xs text-white/60 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                        <Link
                          href={`/p?username=${user.user_metadata?.username || 'profile'}`}
                          className="block px-4 py-3 text-sm text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() => setShowMenu(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-3 text-sm text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() => setShowMenu(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => setShowSettings(true)}
                          className="block w-full text-left px-4 py-3 text-sm text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          Settings
                        </button>
                        <button
                          onClick={() => {
                            // TODO: Add help functionality
                            setShowMenu(false);
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          Help
                        </button>
                        <div className="border-t border-white/10 dark:border-gray-700/50 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/onboard"
                          className="block px-4 py-3 text-sm text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() => setShowMenu(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href="/onboard"
                          className="block px-4 py-3 text-sm text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() => setShowMenu(false)}
                        >
                          Sign Up
                        </Link>
                        <button
                          onClick={() => setShowSettings(true)}
                          className="block w-full text-left px-4 py-3 text-sm text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          Settings
                        </button>
                        <button
                          onClick={() => {
                            // TODO: Add help functionality
                            setShowMenu(false);
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          Help
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  // Settings Submenu
                  <>
                    <div className="flex items-center px-4 py-3 border-b border-white/10 dark:border-gray-700/50">
                      <button
                        onClick={() => setShowSettings(false)}
                        className="mr-3 text-white/60 dark:text-gray-400 hover:text-white dark:hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span className="text-sm font-medium text-white dark:text-gray-200">Settings</span>
                    </div>
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80 dark:text-gray-300">Dark Mode</span>
                        <button
                          onClick={toggleDarkMode}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            darkMode ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              darkMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
