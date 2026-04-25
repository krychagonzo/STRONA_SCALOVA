import React from 'react';
import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";

const logos = [
  { src: "/ZAUFALI_NAM/LOGO_0000_ABDUCTCOSMETICS.png", alt: "ABDUCTCOSMETICS" },
  { src: "/ZAUFALI_NAM/LOGO_0001_tell.png", alt: "Tell" },
  { src: "/ZAUFALI_NAM/LOGO_0002_revolt.png", alt: "Revolt" },
  { src: "/ZAUFALI_NAM/LOGO_0003_replicate-prediction-0a8bhgkka1rmy0cxdmpascpd4w.png", alt: "Replicate" },
  { src: "/ZAUFALI_NAM/LOGO_0004_nove.png", alt: "Nove" },
  { src: "/ZAUFALI_NAM/LOGO_0005_mysmart-black.png", alt: "MySmart" },
  { src: "/ZAUFALI_NAM/LOGO_0006_MICLAIR.png", alt: "MICLAIR" },
  { src: "/ZAUFALI_NAM/LOGO_0007_MASAROO.png", alt: "MASAROO", customClass: "h-6 md:h-9" },
  { src: "/ZAUFALI_NAM/LOGO_0008_maf-logo.png", alt: "MAF" },
  { src: "/ZAUFALI_NAM/LOGO_0009_lustremed.png", alt: "Lustremed" },
  { src: "/ZAUFALI_NAM/LOGO_0010_LOGO.png", alt: "LOGO" },
  { src: "/ZAUFALI_NAM/LOGO_0011_kwartz.png", alt: "Kwartz" },
  { src: "/ZAUFALI_NAM/LOGO_0012_GWPA.png", alt: "GWPA" },
  { src: "/ZAUFALI_NAM/LOGO_0013_DEAG.png", alt: "DEAG" },
  { src: "/ZAUFALI_NAM/LOGO_0014_cube27.png", alt: "Cube27" },
  { src: "/ZAUFALI_NAM/LOGO_0015_blyce.png", alt: "Blyce" },
  { src: "/ZAUFALI_NAM/LOGO_0016_BLAURE.png", alt: "BLAURE" },
  { src: "/ZAUFALI_NAM/LOGO_0017_AENAON-LOGO.png", alt: "AENAON", customClass: "h-6 md:h-9" },
];

export function LogoCloud({ className, ...props }) {
  return (
    <section className="w-full bg-[#0E0E0E] pt-6 pb-4 border-b border-white/5 relative z-20">
      <div className="w-full max-w-7xl mx-auto px-6 mb-10">
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
        <InfiniteSlider gap={120} reverse={false} duration={45} durationOnHover={80}>
          {logos.map((logo) => (
            <img
              key={`logo-${logo.alt}`}
              src={logo.src}
              alt={logo.alt}
              className={cn(
                "w-auto object-contain flex-shrink-0 filter grayscale brightness-0 invert opacity-40 hover:opacity-70 transition-opacity duration-300 self-center cursor-default shrink-0",
                logo.customClass || "h-10 md:h-14"
              )}
              lazy="loading"
            />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
