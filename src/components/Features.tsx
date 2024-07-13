import EcosystemIcon from "../assets/icons/ecosystem.svg";

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
            <div
              key={index}
              className="border border-white/30 px-5 py-10 text-center rounded-xl sm:flex-1"
            >
              <div className="inline-flex h-14 w-14 bg-white text-black justify-center items-center rounded-lg">
                <EcosystemIcon />{" "}
              </div>
              <h3 className="mt-6 font-bold">{feature.title}</h3>
              <p className="mt-2 text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
