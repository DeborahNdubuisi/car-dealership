import React from "react";
import HeroImg from "../assets/heroCar.avif";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col mt-15">
      {/* HERO */}
      <section id="home" className="relative flex-1 overflow-hidden">
        {/* Background image */}
        <img
          src={HeroImg}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover -z-20"
          onError={(e) => {
            // helpful for debugging in the browser console
            // will hide the broken image and keep the gradient overlay visible
            console.error("Hero image failed to load:", e);
            e.currentTarget.style.display = "none";
          }}
        />

        {/* gradient overlay above the image */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,12,20,0.45), rgba(5,12,20,0.55))",
          }}
        />

        {/* subtle parallax overlay for large screens */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#fade)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-28 md:py-36 lg:py-44 flex items-center justify-center">
          <div className="w-full text-center">
            <h1 className="text-[56px] md:text-[88px] lg:text-[110px] leading-tight font-extrabold text-white drop-shadow-lg transform transition-all duration-700 ease-out animate-hero-title">
              Car Dealership
            </h1>
            <p className="mt-4 text-sm md:text-base tracking-widest text-white/90 uppercase letter-spacing-[6px] opacity-90">
              Exclusively by Car Dealers
            </p>

            <div className="mt-10">
              <a
                href="/properties"
                className="inline-block px-8 py-4 bg-red-600 text-white font-semibold rounded shadow-lg hover:bg-red-700 transform hover:-translate-y-1 transition"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
