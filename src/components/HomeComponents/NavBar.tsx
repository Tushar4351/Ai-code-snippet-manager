import logoImage from "../../assets/images/logosaas.png";
import MenuIcon from "../../assets/icons/menu.svg";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className="bg-black">
      <div className="px-4 bg-black">
        <div className="py-4 flex items-center justify-between">
          <div className="flex flex-row items-center">
            <div className="relative">
              <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,rgb(252,214,255),rgb(41,216,255),rgb(255,253,128),rgb(252,214,255))] blur-md"></div>
              <Image
                src={logoImage}
                alt="Saas Logo"
                className="h-12 w-12 relative"
              />
            </div>
            <h1 className="text-white absolute font-bold text-lg left-20">
              SnippetGenius
            </h1>
          </div>
          <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
            <MenuIcon className="text-white" />
          </div>
          <SignedOut>
            <nav className="hidden sm:flex gap-6 items-center">
              <a
                href="#home"
                className="text-opacity-60 text-white font-medium hover:text-opacity-100 transition"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-opacity-60 text-white font-medium hover:text-opacity-100 transition"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-opacity-60 text-white font-medium hover:text-opacity-100 transition"
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="text-opacity-60 text-white font-medium hover:text-opacity-100 transition"
              >
                Contact
              </a>

              <Link href="/sign-up">
                <button className="bg-white font-medium py-2 px-4 rounded-lg">
                  Sign Up
                </button>
              </Link>
            </nav>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button
                type="button"
                className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
              >
                <div className="bg-[#9588e8] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#000000"
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    ></path>
                    <path
                      fill="#000000"
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    ></path>
                  </svg>
                </div>
                <p className="translate-x-2">Dashboard</p>
              </button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
