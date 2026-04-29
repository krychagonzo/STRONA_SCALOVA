import React from 'react';
import Hero from '../components/Hero';
import { LogoCloud } from '../components/ui/logo-cloud';
import Features from '../components/Features';
import ScalingDefinition from '../components/ScalingDefinition';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import Services from '../components/Services';
import Team from '../components/Team';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <div className="h-16 md:h-24 w-full" />
      <Features />
      <ScalingDefinition />
      <div className="h-10 md:h-16 w-full" />
      <Philosophy />
      <Services />
      <Protocol />
      <Team />
    </>
  );
}
