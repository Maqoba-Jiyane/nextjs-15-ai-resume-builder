import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const plans = [
  {
    title: "Single Resume",
    price: "R60",
    description: "Perfect for one-time applications",
    features: [
      "1 Professional Resume",
      "ATS-Friendly Format",
      "AI-Powered Customization",
      " ATS-Friendly Resume Structure"
    ],
    buttonText: "Buy Now",
  },
  // {
  //   title: "24 Hours Access",
  //   price: "R150",
  //   description: "Create up to 3 resumes in 24 hours",
  //   features: ["3 Resume Downloads", "All Templates", "AI-Powered Tailoring"],
  //   buttonText: "Get 24hr Access",
  // },
  // {
  //   title: "7 Days Access",
  //   price: "R300",
  //   description: "Build up to 10 resumes in 7 days",
  //   features: [
  //     "10 Resume Downloads",
  //     "All Features Included",
  //     "Smart Suggestions",
  //   ],
  //   buttonText: "Get 7-Day Access",
  // },
];

export default function Pricing() {
  return (
    <div className=" bg-white/40 py-12 px-4 sm:px-6 lg:px-8 shadow-lg rounded-lg max-sm:shadow-none max-sm:bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 mb-12">
          Affordable pricing tailored for job seekers. No subscriptions. Pay
          only for what you need.
        </p>
        <div className="grid gap-6 md:grid-cols-1">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-600/90">
                  {plan.title}
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {plan.price}
                </p>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  {plan.description}
                </p>
                <ul className="text-gray-700 text-sm space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✔</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild size="lg" variant="premium">
                <Link href="/resumes">{plan.buttonText}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
