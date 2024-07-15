"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import acmeLogo from "../../assets/images/acme.png";
import quantumLogo from "../../assets/images/quantum.png";
import echoLogo from "../../assets/images/echo.png";
import celestialLogo from "../../assets/images/celestial.png";
import apexLogo from "../../assets/images/apex.png";

const images = [
  { src: acmeLogo, alt: "Acme Logo" },
  { src: quantumLogo, alt: "Quantum Logo" },
  { src: echoLogo, alt: "Echo Logo" },
  { src: celestialLogo, alt: "Celestial Logo" },
  { src: apexLogo, alt: "Apex Logo" },
];

const LogoTicker = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-xl text-center text-white/70 ">
          Trusted by the most innovative teams
        </h2>
        <div className="flex  overflow-hidden mt-9 before:content-[''] before:z-10 after:content-[''] before:absolute after:absolute before:h-full after:h-full before:w-5 after:w-5 relative after:right-0 before:left-0 after:top-0 before:top-0 before:bg-[linear-gradient(to_right,#000,rgb(0,0,0,0))] after:bg-[linear-gradient(to_right,#000,rgb(0,0,0,0))]">
          <motion.div
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            initial={{
              translateX: 0,
            }}
            animate={{
              translateX: "-50%",
            }}
            className="flex flex-none gap-16 pr-16"
          >
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                className="flex-none h-8 w-auto"
              />
            ))}
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                className="flex-none h-8 w-auto"
              />
            ))}
                 {images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                className="flex-none h-8 w-auto"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
