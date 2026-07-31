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
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/students" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            SMS
          </div>
          <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            School Manager
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/students"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === "/students"
              ? "bg-slate-800 text-white"
              : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
          >
            All Students
          </Link>



          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border border-slate-700/60 ${pathname === "/login"
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
            >

            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
