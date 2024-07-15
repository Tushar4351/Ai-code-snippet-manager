"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import appScreen from "../../assets/images/app-screen.png";
import { useRef } from "react";

const ProductShowcase = () => {
  const appImage = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <div className="bg-black text-white bg-gradient-to-b from-black to-[#5D2CA8] py-[72px] sm:py-24">
      <div className="container flex flex-col justify-center items-center">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
          Intuitive interface
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-xl text-white/70">
            Celebrate the joy of accomplishment with an app designed to track
            your progress, motivate your efforts, and celebrate your successes,
            one task at a time.
          </p>
        </div>
        <motion.div
          ref={appImage}
          style={{
            opacity: opacity,
            rotateX: rotateX,
            transformPerspective: "800px",
          }}
        >
          <Image src={appScreen} alt="DashBoard picture" className="mt-14" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductShowcase;