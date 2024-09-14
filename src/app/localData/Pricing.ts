export const plans = [
  {
    _id: 1,
    name: "Free",
    discretion: "Free for users to try and getting started.",
    credits: 10,
    price: 0,
    features: ["10 Snippets", "10 credits", "5 Ai Code Generation"],
  },
  {
    _id: 2,
    name: "Basic",
    discretion: "Better for growing businesses that want more customers.",
    credits: 100,
    price: 5,

    features: ["100 Snippets", "100 credits", "50 Ai Code Generation"],
  },
  {
    _id: 3,
    name: "Pro",
    discretion: "Advanced features for pros who need more customization.",
    credits: 500,
    price: 10,

    features: [
      "500 Snippets",
      "500 credits",
      "250 Ai Code Generation",
      "Chat support",
    ],
  },
];
export const creditFee = -1;
export const aiCreditFee = -1;