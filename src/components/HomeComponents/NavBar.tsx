import logoImage from "../../assets/images/logosaas.png";
import MenuIcon from "../../assets/icons/menu.svg";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { CSSProperties } from "react";

import { cn } from "@/lib/utils";
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
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white  lg:text-lg">
                  Dashboard
                </span>
              </ShimmerButton>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* spark before */}
            <div className="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={cn(
            "insert-0 absolute h-full w-full",

            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",

            // transition
            "transform-gpu transition-all duration-300 ease-in-out",

            // on hover
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",

            // on click
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
          )}
        />
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
