import { classed } from "@tw-classed/react";

export const Button = classed(
  "button",
  "w-full rounded-md mt-4 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#cd9b3c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8860b]",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
      color: {
        primary: "bg-[#b8860b]",
        secondary: "bg-red-500",
      },
    },

    compoundVariants: [
      {
        size: "sm",
        color: "secondary",
        class: "px-2 py-1",
      },
      {
        size: "md",
        color: "secondary",
        class: "px-4 py-2",
      },
    ],

    defaultVariants: {
      size: "md",
      color: "primary",
    },
  },
);
