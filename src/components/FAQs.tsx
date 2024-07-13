"use client";
import React from "react";
import PlusIcon from "../assets/icons/plus.svg";
import MinusIcon from "../assets/icons/minus.svg";
import clsx from "clsx";
const items = [
  {
    question: "What is an AI-powered code snippet application?",
    answer:
      "An AI-powered code snippet application uses artificial intelligence to provide smart and adaptive code suggestions. It helps developers write code more efficiently by offering relevant snippets based on the context and their coding style.",
  },
  {
    question: "How can this application improve my productivity?",
    answer:
      "Our application streamlines your workflow by offering precise and context-aware code snippets. This reduces the time spent on writing repetitive code and minimizes errors, allowing you to focus on more complex and creative tasks.",
  },
  {
    question: "Is the application easy to integrate with my existing tools?",
    answer:
      "Yes, our application is designed to seamlessly integrate with popular coding tools and development environments. You can easily incorporate it into your current workflow without any hassle.",
  },
  {
    question: "What kind of support is available if I encounter issues?",
    answer:
      "We offer comprehensive support through various channels, including documentation, FAQs, and a dedicated support team. You can reach out to us anytime for assistance, and we are committed to helping you resolve any issues promptly.",
  },
];

const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className="py-7 border-b border-white/30"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center">
        <span className="flex-1 text-lg font-bold">{question}</span>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      <div className={clsx("mt-4", { hidden: !isOpen, "": isOpen === true })}>
        {answer}
      </div>
    </div>
  );
};

const FAQs = () => {
  return (
    <div className="bg-black text-white bg-gradient-to-b from-[#5D2CA8] to-black py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl sm:max-w-[648px] mx-auto tracking-tighter">
          Frequently asked questions
        </h2>
        <div className="max-w-[648px] mx-auto mt-12">
          {items.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
