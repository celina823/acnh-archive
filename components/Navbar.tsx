"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [openCatalog, setOpenCatalog] = useState(false);

  const catalogItems = [
    { label: "곤충", href: "/catalog/insects" },
    { label: "물고기", href: "/catalog/fish" },
    { label: "해산물", href: "/catalog/seacreatures" },
    { label: "화석", href: "/catalog/fossils" },
    { label: "미술품", href: "/catalog/art" },
  ];

  return (
    <nav className="bg-gradient-to-b from-pink-300 to-purple-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-700">ACNH</h1>
          </Link>

          {/* 메뉴 */}
          <div className="flex items-center gap-8">
            <Link
              href="/villagers"
              className="text-purple-700 font-semibold hover:text-purple-900 transition"
            >
              주민
            </Link>

            <Link
              href="/furniture"
              className="text-purple-700 font-semibold hover:text-purple-900 transition"
            >
              가구
            </Link>

            <Link
              href="/clothing"
              className="text-purple-700 font-semibold hover:text-purple-900 transition"
            >
              의류
            </Link>

            {/* 도감 드롭다운 */}
            <div className="relative group">
              <button
                onClick={() => setOpenCatalog(!openCatalog)}
                className="text-purple-700 font-semibold hover:text-purple-900 transition flex items-center gap-1"
              >
                도감
                <span
                  className={`transform transition-transform ${openCatalog ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>

              {/* 드롭다운 메뉴 */}
              {openCatalog && (
                <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-pink-200 z-50">
                  {catalogItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-purple-700 hover:bg-pink-100 first:rounded-t-lg last:rounded-b-lg transition"
                      onClick={() => setOpenCatalog(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
