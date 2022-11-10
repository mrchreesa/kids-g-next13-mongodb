import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { ImLinkedin } from "react-icons/im";
import { BsChatSquareDotsFill } from "react-icons/bs";
import Link from "next/link";

const navigation = [
  // { name: "Home", href: "/", current: true },
  { name: "Our Services", href: "/services", current: false },
  { name: "About Us", href: "/about", current: false },
  { name: "Contact Us", href: "/contacts", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-transparent  ">
      {({ open }) => (
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8 container">
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
                  {/* <img
                    className="hidden h-10 w-auto lg:block"
                    src="logo.png"
                    alt="Kids Galaxy"
                  /> */}
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
                <div className="w-max flex items-center mr-5">
                  <Link className="m-2" href={"/contact"}>
                    <BsChatSquareDotsFill className="text-3v lg:text-2v md:max-w-[26px] md:mr-2" />
                  </Link>
                  <a
                    className="m-2"
                    href="https://www.instagram.com/kidsgalaxy.co.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GrInstagram className="text-3v lg:text-2v md:max-w-[26px] md:mr-2" />
                  </a>
                  <a
                    className="m-2"
                    href="https://www.facebook.com/kidsgalaxy.co.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebookSquare className="text-3v lg:text-2v md:max-w-[26px] md:mr-2" />
                  </a>
                  <a
                    className="m-2"
                    href="https://www.linkedin.com/company/kids-galaxy/about/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ImLinkedin className="text-3v lg:text-2v md:max-w-[26px] md:mr-2" />
                  </a>
                </div>
                <div className=" inset-y-0 right-0 flex items-center lg:hidden ">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-transparent text-blue"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
