"use client";
import { motion } from "framer-motion";
import Feature from "./Feature";

const features = [
  {
    title: "Innovative AI-Powered Code Snippets",
    description:
      "Leverage the power of artificial intelligence to enhance your coding experience. Our platform provides smart code snippets that adapt to your coding style and needs.",
  },
  {
    title: "Boost Productivity and Efficiency",
    description:
      "Streamline your workflow with our AI-driven code suggestions. Save time and reduce errors by using snippets tailored to your specific projects and requirements.",
  },
  {
    title: "Seamless Integration and Easy to Use",
    description:
      "Our SaaS application seamlessly integrates with your existing tools and workflows. Enjoy a user-friendly interface that makes accessing and using code snippets a breeze.",
  },
];

const Features = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
          Everything you need
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-xl text-white/70">
            Enjoy customizable lists, team work tools, and smart tracking all in
            one place. Set tasks, get reminders, and see your progress simply
            and quickly.
          </p>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
