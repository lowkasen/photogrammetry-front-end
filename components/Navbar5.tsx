import React, { useState } from "react";
import { useRouter } from "next/router";
// import { Transition } from "@headlessui/react";
// import { Link } from "react-scroll";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { Dropdownbutton } from "./Dropdownbutton";
// import Logo from "../public/streamlineLogo.png";

//  md:items-center sm:items-start md:justify-between sm:justify-start

export function Navbar5() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="shadow-sm fixed w-full z-10 bg-white">
        <div className="w-full">
          <div className="flex items-center justify-center h-20 w-full">
            <div className="flex mx-10 md:mx-20 justify-between w-5/6 max-w-6xl">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <button
                  onClick={() => router.push("/")}
                  className="cursor-pointer"
                >
                  <p className="font-bold text-xl cursor-pointer">
                    AWS<span className="text-blue-500">RealityStation</span>
                  </p>
                </button>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() => router.push("/")}
                    className="cursor-pointer hover:bg-gray-50 text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => router.push("/getstarted")}
                    className="cursor-pointer hover:bg-gray-50 text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Getting started
                  </button>
                  {/* <button className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-black">
                    Upload
                  </button> */}
                  <Dropdownbutton />
                </div>
              </div>
            </div>
            <div className="mr-10 flex md:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
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
          {() => (
            <div className="md:hidden" id="mobile-menu">
              <div className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button
                  onClick={() => router.push("/")}
                  className="block cursor-pointer text-black px-3 py-2 rounded-md text-base font-medium hover:underline"
                >
                  Home
                </button>
                <button
                  onClick={() => router.push("/getstarted")}
                  className="block cursor-pointer text-black px-3 py-2 rounded-md text-base font-medium hover:underline"
                >
                  Getting started
                </button>
                <button
                  onClick={() => router.push("/upload/images")}
                  className="block cursor-pointer text-black px-3 py-2 rounded-md text-base font-medium hover:underline"
                >
                  Upload images
                </button>
                <button
                  onClick={() => router.push("/upload/video")}
                  className="block cursor-pointer text-black px-3 py-2 rounded-md text-base font-medium hover:underline"
                >
                  Upload video
                </button>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}
