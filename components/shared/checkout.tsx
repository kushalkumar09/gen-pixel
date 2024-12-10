"use client";

import { useEffect } from "react";
import { checkoutCredits } from "@/lib/actions/transactions";

import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
  email,
  name,
}: {
  name: string;
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
  email?: string;
}) => {
  const { toast } = useToast();
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    // Load Razorpay checkout script
    loadRazorpayScript().then((loaded) => {
      if (!loaded) {
        toast({
          title: "Failed to load Razorpay",
          description: "Please refresh the page and try again.",
          duration: 5000,
          className: "error-toast",
        });
      }
    });
  }, []);

  const onCheckout = async () => {
    try {
      // Call your backend to create a Razorpay order
      const order = await checkoutCredits({ plan, amount, credits, buyerId });
      console.log("checkout")

      if (!order.orderId) {
        throw new Error("Failed to create Razorpay order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: amount * 100, // Amount in smallest currency unit (e.g., paise)
        currency: "INR",
        name: "GenPixel",
        description: `Purchase ${plan}`,
        order_id: order.orderId, // Order ID from backend
        handler: async function (response: any) {
          // Process successful payment
          toast({
            title: "Payment Successful!",
            description: "Your credits have been purchased.",
            duration: 5000,
            className: "success-toast",
          });

          // Optionally, verify payment on your backend
        },
        prefill: {
          name: name,
          email: email,
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      console.log("checkout")
      console.table(options);

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong.",
        duration: 5000,
        className: "error-toast",
      });
    }
  };

  return (
    <section>
      <Button
        onClick={onCheckout}
        role="link"
        className="w-full rounded-full dark:text-white bg-purple-gradient bg-cover"
      >
        Buy Credit
      </Button>
    </section>
  );
};

export default Checkout;
