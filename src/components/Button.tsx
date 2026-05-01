import { classed } from "@tw-classed/react";

export const Button = classed("button", "w-full rounded-md mt-4 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", {
    variants: {
        size: {
          sm: "text-sm",
          md: "text-md",
          lg: "text-lg",
        },
        color: {
          primary: "bg-indigo-600",
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
})