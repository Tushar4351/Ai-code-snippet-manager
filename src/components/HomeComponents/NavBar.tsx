import logoImage from "../../assets/images/logosaas.png";
import MenuIcon from "../../assets/icons/menu.svg";
import Image from "next/image";

const NavBar = () => {
  return (
    <div className="bg-black"> 
      <div className="px-4 bg-black">
        <div className="py-4 flex items-center justify-between">
          <div className="relative">
            <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,rgb(252,214,255),rgb(41,216,255),rgb(255,253,128),rgb(252,214,255))] blur-md"></div>
            <Image
              src={logoImage}
              alt="Saas Logo"
              className="h-12 w-12 relative"
            />
          </div>

          <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
            <MenuIcon className="text-white" />
          </div>../
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

            <button className="bg-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600">
              Sign Up
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
