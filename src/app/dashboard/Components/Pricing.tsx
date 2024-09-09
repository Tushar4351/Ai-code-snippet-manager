import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { plans } from "../../localData/Pricing";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { getUserById } from "@/app/actions/user.actions";
import { Button } from "@/components/ui/button";
import Checkout from "./CheckOut";

const Pricing = ({ darkMode }: { darkMode: boolean }) => {
  const { userId } = useAuth();
  const [user, setUser] = React.useState<any | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userData = await getUserById(userId);
        setUser(userData);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div
      className={`rounded-lg mx-auto ${
        darkMode ? "bg-[#151419] text-white" : "bg-white text-gray-900"
      }`}
    >
      <main className="p-5">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-normal md:text-3xl lg:text-4xl">
            Our <span className="font-semibold">plans</span> for your{" "}
            <span className="font-semibold">productivity</span>
          </h1>
          <p className="text-sm font-normal text-gray-400">
            See below our main three plans for your uses, for your daily uses.
          </p>
          <p className="text-sm font-normal text-gray-400">
            It starts from here! You can teach yourself what you really like.
          </p>
        </div>

        <div
          className={`flex flex-col items-center justify-center mt-10 space-y-8 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0`}
        >
          {plans.map((plan, index) => (
            <section
              key={index}
              className={`flex flex-col w-full max-w-sm p-10 space-y-6 ${
                darkMode
                  ? "bg-[#1f1e25] border-neutral-700"
                  : "bg-gray-100 border-neutral-200"
              } rounded-lg shadow-md`}
            >
              <div className="flex-shrink-0">
                <span
                  className={`text-4xl font-medium tracking-tight ${
                    plan.name === "Free" ? "" : "text-[#9588e8]"
                  }`}
                >
                  {plan.price}
                </span>
                <span className="text-gray-400 text-sm ml-1">/month</span>
              </div>

              <div className="flex-shrink-0 pb-6 space-y-2 border-b-2">
                <h2 className="text-2xl font-normal">{plan.name}</h2>
                <p className="text-sm text-gray-400">{plan.discretion}</p>
              </div>

              <ul className="flex-1 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheckCircle className="w-6 h-6 text-[#9588e8]" />
                    <span className="ml-3 text-base font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex-shrink-0 pt-4">
                {plan.name === "Free" ? (
                  <Button variant="outline" className="w-full">
                    Free Consumable
                  </Button>
                ) : (
                  <SignedIn>
                    {user && (
                      <Checkout
                        plan={plan.name}
                        amount={plan.price}
                        credits={plan.credits}
                        buyerId={user._id}
                      />
                    )}
                  </SignedIn>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pricing;
