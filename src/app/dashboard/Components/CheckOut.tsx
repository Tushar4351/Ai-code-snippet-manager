"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits } from "@/app/actions/transaction.action";
import { Button } from "@/components/ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();

  React.useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, [toast]);

  const onCheckout = async () => {
    const transaction = { plan, amount, credits, buyerId };
    console.log("transaction", transaction);

    try {
      await checkoutCredits(transaction);
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description:
          "There was an error processing your order. Please try again.",
        duration: 5000,
        className: "error-toast",
      });
    }
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          className="w-full bg-[#9588e8] hover:bg-[#9e92f0]"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
