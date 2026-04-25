import React from 'react';
import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";

const logos = [
  { src: "/logo%20partnerzy/ABDUCTCOSMETICS.png", alt: "ABDUCTCOSMETICS" },
  { src: "/logo%20partnerzy/AENAON-LOGO.png", alt: "AENAON" },
  { src: "/logo%20partnerzy/BLAURE.png", alt: "BLAURE" },
  { src: "/logo%20partnerzy/DEAG.png", alt: "DEAG" },
  { src: "/logo%20partnerzy/GWPA.png", alt: "GWPA" },
  { src: "/logo%20partnerzy/LOGO.png", alt: "LOGO" },
  { src: "/logo%20partnerzy/MASAROO.png", alt: "MASAROO" },
  { src: "/logo%20partnerzy/MICLAIR.png", alt: "MICLAIR" },
  { src: "/logo%20partnerzy/blyce.png", alt: "Blyce" },
  { src: "/logo%20partnerzy/cube27.png", alt: "Cube27" },
  { src: "/logo%20partnerzy/kwartz.png", alt: "Kwartz" },
  { src: "/logo%20partnerzy/lustremed.png", alt: "Lustremed" },
  { src: "/logo%20partnerzy/maf%20logo.png", alt: "MAF" },
  { src: "/logo%20partnerzy/mysmart%20black.png", alt: "MySmart" },
  { src: "/logo%20partnerzy/nove.png", alt: "Nove" },
  { src: "/logo%20partnerzy/replicate-prediction-0a8bhgkka1rmy0cxdmpascpd4w.png", alt: "Replicate" },
  { src: "/logo%20partnerzy/revolt.png", alt: "Revolt" },
  { src: "/logo%20partnerzy/tell.png", alt: "Tell" },
];

export function LogoCloud({ className, ...props }) {
  return (
    <section className="w-full bg-[#0E0E0E] pt-12 pb-4 border-b border-white/5 relative z-20">
      <div className="w-full max-w-7xl mx-auto px-6 mb-4">
        <p className="font-heading text-sm uppercase tracking-[0.2em] text-ivory/40 text-center font-semibold">
          Zaufali nam:
        </p>
      </div>
      <div
        {...props}
        className={cn(
          "w-full max-w-7xl mx-auto overflow-hidden py-0 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
          className
        )}
      >
        <InfiniteSlider gap={60} reverse={false} duration={45} durationOnHover={80}>
          {logos.map((logo) => (
            <img
              key={`logo-${logo.alt}`}
              src={logo.src}
              alt={logo.alt}
              className="h-16 md:h-24 w-auto object-contain flex-shrink-0 filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 self-center cursor-default shrink-0"
              lazy="loading"
            />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
