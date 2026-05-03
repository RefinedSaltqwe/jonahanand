import { Cookie } from "next/font/google";
import Image from "next/image";
import React from "react";
const AB = Cookie({
  subsets: ["latin"],
  weight: "400",
});
const HeroSectionTwo: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/hero-3.jpg"
        alt="Wedding Couple"
        fill
        priority
        className="
          object-cover
          object-[34%_62%]     /* mobile = couple directly under text */
          sm:object-[38%_60%]
          md:object-[58%_center]
          lg:object-center
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/15 md:bg-black/10" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-start justify-center px-6 pt-14 md:items-center md:justify-end md:px-14 lg:px-20">
        <div className="max-w-xl text-center md:text-right">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#b8860b]">
            Save The Date
          </p>

          <h1 className="text-xl font-normal leading-tight text-gray-900 sm:text-4xl">
            We hope you can be part of our
            <span
              className={`mt-2 text-5xl sm:text-7xl block font-semibold text-[#b8860b] ${AB.className}`}
            >
              Wedding Celebration
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionTwo;
