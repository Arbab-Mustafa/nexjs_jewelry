"use client";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const data = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
  {
    name: "Jewelry",
    link: "/jewelry",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "About",
    link: "/about",
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Large Screen Navbar */}
        <div className="hidden md:flex h-14 items-center justify-between mt-2">
          {/* Logo */}
          <div className=" flex items-center justify-center ">
            <Link href="/" className=" ">
              <Image
                src="https://media.licdn.com/dms/image/v2/D4E22AQFvXDq4GnEFag/feedshare-shrink_800/feedshare-shrink_800/0/1723937461156?e=1735171200&v=beta&t=gOjMFYZkNsF1NrbOjN5rYDFpajseF7FQFVgF4oAdqWQ"
                alt="logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 text-sm">
            {data.map((item) => (
              <a
                key={item.name}
                className="text-gray-500 transition hover:text-gray-700"
                href={item.link}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Small Screen Navbar */}
        <div className="flex items-center justify-between md:hidden h-16">
          {/* Logo */}
          <Link href="/" className=" flex justify-center items-center ">
            <Image
              src="https://media.licdn.com/dms/image/v2/D4E22AQFvXDq4GnEFag/feedshare-shrink_800/feedshare-shrink_800/0/1723937461156?e=1735171200&v=beta&t=gOjMFYZkNsF1NrbOjN5rYDFpajseF7FQFVgF4oAdqWQ"
              alt="logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-gray-500 transition hover:text-gray-700 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <nav
          className={`absolute top-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? " top-16" : "-translate-y-full"
          } md:hidden`}
        >
          <ul className="flex flex-col gap-4 p-4">
            {data.map((item) => (
              <li key={item.name}>
                <a
                  className="block text-gray-500 transition hover:text-gray-700"
                  href={item.link}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
