"use client";
import { motion, useMotionValue } from "framer-motion";
import EcosystemIcon from "../assets/icons/ecosystem.svg";
import { useEffect, useRef, useState } from "react";

const Feature = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const [maskImage, setMaskImage] = useState("");
  const border = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!border.current) return;
      const BorderRect = border.current.getBoundingClientRect();
      offsetX.set(e.clientX - BorderRect.x);
      offsetY.set(e.clientY - BorderRect.y);
    };

    const updateMaskImage = () => {
      setMaskImage(
        `radial-gradient(100px 100px at ${offsetX.get()}px ${offsetY.get()}px, black, transparent)`
      );
    };

    // Subscribe to motion value changes and update the mask image
    const unsubscribeX = offsetX.on("change", updateMaskImage);
    const unsubscribeY = offsetY.on("change", updateMaskImage);

    // Add the event listener
    window.addEventListener("mousemove", updateMousePosition);

    // Clean up on component unmount
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      unsubscribeX();
      unsubscribeY();
    };
  }, [offsetX, offsetY]);

  return (
    <div className="border border-white/30 px-5 py-10 text-center rounded-xl sm:flex-1 relative">
      <motion.div
        className="absolute inset-0 border-2 border-purple-400 rounded-xl"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
        ref={border}
      ></motion.div>
      <div className="inline-flex h-14 w-14 bg-white text-black justify-center items-center rounded-lg">
        <EcosystemIcon />
      </div>
      <h3 className="mt-6 font-bold">{title}</h3>
      <p className="mt-2 text-white/70">{description}</p>
    </div>
  );
};

export default Feature;
