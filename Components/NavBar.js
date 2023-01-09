"use client";
import { Fragment } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { ImLinkedin } from "react-icons/im";
import { BsChatSquareDotsFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";

const navigation = [
  // { name: "Home", href: "/", current: true },
  { name: "Our Services", href: "/services", current: false },
  { name: "About Us", href: "/about", current: false },
  { name: "Contact Us", href: "/contacts", current: false },
  { name: "Appointments", href: "/appointments", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathName = usePathname();
  if (pathName.includes("/admin")) {
    return null;
  } else {
    return (
      <>
        <Popover className="relative bg-white z-10">
          <div className="mx-auto  px-2 sm:px-6 lg:px-8 max-w-[1300px]">
            <div className="relative flex h-20 items-center justify-between ">
              <div className="flex flex-1 items-center justify-center  sm:items-stretch sm:justify-start">
                <div className="flex  items-center ml-5">
                  <Link href="/">
                    <img
                      className="md:ml-5"
                      alt="logo"
                      src="images/Nav-Logo.png"
                      width="200"
                    />
                  </Link>
                </div>
                <div className="hidden lg:ml-10 lg:flex items-center">
                  <div className="flex  space-x-4 items-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "text-blue  hover:text-blue-500",
                          "px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex grow"></div>
                <div className="w-max hidden lg:flex items-center mr-5">
                  <Link className="m-2" href={"/contacts"}>
                    <BsChatSquareDotsFill className="text-3v lg:text-2v md:max-w-[26px] md:mr-2" />
                  </Link>
                  <Link
                    className="m-2"
                    href="https://www.instagram.com/kidsgalaxy.co.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GrInstagram className="text-3v lg:text-2v md:max-w-[26px] md:mr-2" />
                  </Link>
                  <Link
                    className="m-2"
                    href="https://www.facebook.com/kidsgalaxy.co.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebookSquare className="text-3v lg:text-2v md:max-w-[26px] md:mr-2" />
                  </Link>
                  <Link
                    className="m-2"
                    href="https://www.linkedin.com/company/kids-galaxy/about/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ImLinkedin className="text-3v lg:text-2v md:max-w-[26px] md:mr-2" />
                  </Link>
                </div>
                <div className="-my-2 mt-2 lg:hidden">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-7 w-7" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden"
            >
              <div className="divide-y-2 z-10 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <Link href="/">
                      <img
                        className="md:ml-5"
                        alt="logo"
                        src="images/Nav-Logo.png"
                        width="200"
                      />
                    </Link>
                    <div className="-mr-2 ">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-7 w-7" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex font-courier border-b items-center rounded-md p-3 hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </>
    );
  }
}
