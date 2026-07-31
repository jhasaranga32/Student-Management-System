"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  // Do not render navbar on login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/students" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-lg text-white shadow-md group-hover:scale-105 transition-transform">
            SMS
          </div>
          <span className="font-semibold text-lg tracking-tight text-gray-800">
            Dashboard
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/students"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === "/students"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50"
              }`}
          >
            All Students
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border border-gray-200 ${pathname === "/login"
                  ? "bg-gray-100 text-gray-800"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
