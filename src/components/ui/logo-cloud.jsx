import React, { useState, useEffect } from 'react';
import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";

const logos = [
  { src: "/ZAUFALI_NAM/LOGO_0000_ABDUCTCOSMETICS.webp", alt: "ABDUCTCOSMETICS" },
  { src: "/ZAUFALI_NAM/LOGO_0001_tell.webp", alt: "Tell" },
  { src: "/ZAUFALI_NAM/LOGO_0002_revolt.webp", alt: "Revolt" },
  { src: "/ZAUFALI_NAM/LOGO_0003_replicate-prediction-0a8bhgkka1rmy0cxdmpascpd4w.webp", alt: "Replicate" },
  { src: "/ZAUFALI_NAM/LOGO_0004_nove.webp", alt: "Nove" },
  { src: "/ZAUFALI_NAM/LOGO_0005_mysmart-black.webp", alt: "MySmart" },
  { src: "/ZAUFALI_NAM/LOGO_0006_MICLAIR.webp", alt: "MICLAIR" },
  { src: "/ZAUFALI_NAM/LOGO_0007_MASAROO.webp", alt: "MASAROO", customClass: "h-6 md:h-9" },
  { src: "/ZAUFALI_NAM/LOGO_0008_maf-logo.webp", alt: "MAF" },
  { src: "/ZAUFALI_NAM/LOGO_0009_lustremed.webp", alt: "Lustremed" },
  { src: "/ZAUFALI_NAM/LOGO_0010_LOGO.webp", alt: "LOGO" },
  { src: "/ZAUFALI_NAM/LOGO_0011_kwartz.webp", alt: "Kwartz" },
  { src: "/ZAUFALI_NAM/LOGO_0012_GWPA.webp", alt: "GWPA" },
  { src: "/ZAUFALI_NAM/LOGO_0013_DEAG.webp", alt: "DEAG" },
  { src: "/ZAUFALI_NAM/LOGO_0014_cube27.webp", alt: "Cube27" },
  { src: "/ZAUFALI_NAM/LOGO_0015_blyce.webp", alt: "Blyce" },
  { src: "/ZAUFALI_NAM/LOGO_0016_BLAURE.webp", alt: "BLAURE" },
  { src: "/ZAUFALI_NAM/LOGO_0017_AENAON-LOGO.webp", alt: "AENAON", customClass: "h-6 md:h-9" },
];

export function LogoCloud({ className, ...props }) {
  const [sliderGap, setSliderGap] = useState(window.innerWidth < 640 ? 60 : 120);

  useEffect(() => {
    const update = () => setSliderGap(window.innerWidth < 640 ? 60 : 120);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className="w-full bg-[#0E0E0E] pt-6 pb-4 border-b border-white/5 relative z-20">
      <div className="w-full max-w-7xl mx-auto px-6 mb-10">
        <p className="font-heading text-sm uppercase tracking-[0.2em] text-ivory/40 text-center font-semibold">
          Zaufali nam:
        </p>
      </div>
      {/* Single compositing layer for all logos — filter on container, not per-image */}
      <div
        {...props}
        className={cn(
          "w-full max-w-7xl mx-auto overflow-hidden py-0 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
          className
        )}
      >
        <div className="filter grayscale brightness-0 invert">
          <InfiniteSlider gap={sliderGap} reverse={false} duration={45}>
            {logos.map((logo) => (
              <img
                key={`logo-${logo.alt}`}
                src={logo.src}
                alt={logo.alt}
                className={cn(
                  "w-auto object-contain flex-shrink-0 opacity-40 self-center cursor-default shrink-0",
                  logo.customClass || "h-10 md:h-14"
                )}
                loading="lazy"
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
