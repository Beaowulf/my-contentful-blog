"use client";
import React, { useState, useEffect } from "react";
import { Logo, MobileMenuLogo } from "@/components/logo";
import { NavBarButton } from "@/components/buttons";
import { Transition } from "@headlessui/react";
import "./navbar.css";
import Link from "next/link";
import Image from "next/image";
import hamburgerIconWhite from "@/public/assets/hamburgerIconWhite.svg";
import closeIconWhite from "@/public/assets/closeIconWhite.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <div className="pagePaddingLarge">
      <nav className="md:mb-40 mb-10 mt-4">
        <div className="">
          <div className="flex items-center justify-center h-16">
            <div className="flex justify-center items-center gap-8">
              <Logo />
            </div>
            <div className="hidden md:block">
              <div className="ml-8 flex items-baseline space-x-4">
                <div className="text-center">
                  <Link
                    href="/blogs"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-md md:text-[16px] text-[14px] font-medium"
                  >
                    Burd Log
                  </Link>
                </div>

                <div className="text-center">
                  <Link
                    href="/ourStory"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-md md:text-[16px] text-[14px] font-medium"
                  >
                    Our Story
                  </Link>
                </div>

                <div className="text-center">
                  <Link
                    href="/strategies"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-md md:text-[16px] text-[14px] font-medium"
                  >
                    Strategies
                  </Link>
                </div>

                <div className="text-center">
                  <Link
                    href="/contactUs"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-md md:text-[16px] text-[14px] font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <Link href="?modal=true">
                <NavBarButton label={"Launch app"} />
              </Link>
            </div>

            <div className="-mr-2 flex md:hidden items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`bg-transparent inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white menu-icon ${
                  isOpen ? "open" : ""
                }`}
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <Image
                  src={hamburgerIconWhite}
                  alt="menu_icon"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={`fullscreen-menu ${
              isOpen
                ? "show absolute top-0 left-0 w-full dark:bg-gradient-to-45-dark-BG bg-gradient-to-r from-[#F4F4FF] from-10% via-[#F4F4FF] via-60% to-[#E8E8F2] to-80% z-[1000] h-screen flex justify-center rounded-[20px]"
                : ""
            }`}
            id="mobile-menu"
          >
            <div className="w-full flex flex-col relative">
              <div className="p-4 flex justify-between items-center">
                <div className="flex justify-center items-center gap-8">
                  <MobileMenuLogo />
                </div>
                <div className="flex">
                  <button onClick={() => setIsOpen(false)}>
                    <Image
                      src={closeIconWhite}
                      alt="close_menu_icon"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-10 h-full">
                <Link
                  href="/academy/blogs"
                  className="text-gray-800 dark:text-white dark:hover:text-gray-400 md:text-white hover:text-gray-300 block px-3 py-2 rounded-md text-2xl font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Burd Log
                </Link>

                <Link
                  href="/ourStory"
                  className="text-gray-800 dark:text-white dark:hover:text-gray-400 md:text-white hover:text-gray-300 block px-3 py-2 rounded-md text-2xl font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Our Story
                </Link>

                <Link
                  href="/strategies"
                  className="text-gray-800 dark:text-white dark:hover:text-gray-400 md:text-white hover:text-gray-300 block px-3 py-2 rounded-md text-2xl font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Strategies
                </Link>

                <Link
                  href="/contactUs"
                  className="text-gray-800 dark:text-white dark:hover:text-gray-400 md:text-white hover:text-gray-300 block px-3 py-2 rounded-md text-2xl font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
};

export default Navbar;
