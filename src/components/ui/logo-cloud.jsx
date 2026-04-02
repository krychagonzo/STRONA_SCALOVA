import React from 'react';
import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";

const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk Logo",
  },
];

export function LogoCloud({ className, ...props }) {
  return (
    <section className="w-full bg-[#0E0E0E] pt-16 pb-8 border-b border-white/5 relative z-20">
      <div className="w-full max-w-7xl mx-auto px-6 mb-6">
        <p className="font-heading text-sm uppercase tracking-[0.2em] text-ivory/40 text-center font-semibold">
          Zaufali nam:
        </p>
      </div>
      <div
        {...props}
        className={cn(
          "w-full max-w-7xl mx-auto overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
          className
        )}
      >
        <InfiniteSlider gap={60} reverse={false} duration={25} durationOnHover={50}>
          {logos.map((logo) => (
            <img
              key={`logo-${logo.alt}`}
              src={logo.src}
              alt={logo.alt}
              className="h-6 md:h-8 w-auto object-contain flex-shrink-0 filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 self-center cursor-default shrink-0"
              lazy="loading"
            />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
