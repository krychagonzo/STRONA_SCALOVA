import React from 'react';
import { Link } from 'react-router-dom';

export default function ServicePageNav() {
  return (
    <Link
      to="/#services"
      className="fixed bottom-8 left-8 z-50 group w-12 h-12 flex items-center justify-center border border-ivory/10 bg-obsidian/80 backdrop-blur-sm text-ivory/30 hover:text-accent hover:border-accent/40 transition-all duration-300"
      aria-label="Wróć do usług"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="m15 18-6-6 6-6" />
      </svg>
    </Link>
  );
}
