"use client";
import Image from "next/image";
import cursorImage from "../../assets/images/cursor.png";
import messageImage from "../../assets/images/message.png";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <div className="bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-24 relative overflow-clip">
      <div className="absolute h-[375px] w-[750px] sm:h-[768px] sm:w-[1536px] lg:h-[1200px] lg:w-[2400px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>

      <div className="container relative">
        <div className="flex justify-center mt-8">
          <div className="inline-flex relative">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter text-center mt-8 inline-flex">
              Revolutionize
              <br />
              Your Coding
            </h1>
            <motion.div
              className="absolute right-[500px] top-[108px] hidden sm:inline"
              drag
              dragSnapToOrigin
            >
              <Image
                src={cursorImage}
                height="200"
                width="200"
                alt=""
                className="max-w-none"
                draggable="false"
              />
            </motion.div>
            <motion.div
              className="absolute top-[56px] left-[550px] hidden sm:inline"
              drag
              dragSnapToOrigin
            >
              <Image
                src={messageImage}
                height="200"
                width="200"
                alt=""
                className="max-w-none"
                draggable="false"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center">
          <p className="text-center text-xl mt-8 max-w-md">
            Discover the future of coding with our AI-driven code snippet SaaS
            application. Enhance your productivity, streamline your workflow,
            and unlock new possibilities with intelligent code suggestions.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button className="bg-white text-black font-medium py-3 px-5 rounded-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
