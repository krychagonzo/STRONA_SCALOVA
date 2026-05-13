import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingCTA from './components/FloatingCTA';
import FooterCTA from './components/FooterCTA';
import ConsultationModal from './components/ConsultationModal';

import StronaAI from './pages/StronaAI';
import Kampanie from './pages/Kampanie';
import StatyczneTresci from './pages/StatyczneTresci';
import Automatyzacje from './pages/Automatyzacje';
import SprzedazOferta from './pages/SprzedazOferta';
import AIwFirmie from './pages/AIwFirmie';
import RuchomeTresci from './pages/RuchomeTresci';
import ZlotyNumer from './pages/ZlotyNumer';

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import PortfolioItem from './pages/PortfolioItem';
import Career from './pages/Career';
import FAQ from './pages/FAQ';
import PolitykaPrywatnosci from './pages/PolitykaPrywatnosci';
import Regulamin from './pages/Regulamin';


const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const ROUTE_SOURCES = {
  '/': 'Strona główna',
  '/uslugi/strona-ai': 'Usługa: Strona & AI-asystent',
  '/uslugi/kampanie': 'Usługa: Kampanie & Organic',
  '/uslugi/statyczne-tresci': 'Usługa: Statyczne treści wizualne',
  '/uslugi/automatyzacje': 'Usługa: Automatyzacje',
  '/uslugi/sprzedaz': 'Usługa: Sprzedaż & Oferta',
  '/uslugi/ai-w-firmie': 'Usługa: AI w firmie',
  '/uslugi/ruchome-tresci': 'Usługa: Ruchome treści wizualne',
  '/uslugi/zloty-numer': 'Usługa: Złoty numer',
};

function AppContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const modalSource = ROUTE_SOURCES[location.pathname] || location.pathname;

  useEffect(() => {
    // Generate lightweight static noise background once to replace heavy SVG filter
    if (typeof document !== 'undefined' && !document.documentElement.style.getPropertyValue('--noise-bg')) {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d', { alpha: true });
      const imgData = ctx.createImageData(128, 128);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 10; // Bardzo niska przezroczystość (ok 4%)
      }
      ctx.putImageData(imgData, 0, 0);
      document.documentElement.style.setProperty('--noise-bg', `url(${canvas.toDataURL('image/png')})`);
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen font-sans bg-obsidian selection:bg-accent selection:text-obsidian flex flex-col items-center">
      <ScrollToTop />
      <Navbar />
      
      <div className="flex-1 w-full flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioItem />} />
          <Route path="/do-lacz-do-nas" element={<Career />} />
          <Route path="/faq" element={<FAQ />} />
          
          <Route path="/uslugi/strona-ai" element={<StronaAI onOpenModal={() => setModalOpen(true)} />} />
          <Route path="/uslugi/kampanie" element={<Kampanie onOpenModal={() => setModalOpen(true)} />} />
          <Route path="/uslugi/statyczne-tresci" element={<StatyczneTresci onOpenModal={() => setModalOpen(true)} />} />
          <Route path="/uslugi/automatyzacje" element={<Automatyzacje onOpenModal={() => setModalOpen(true)} />} />
          <Route path="/uslugi/sprzedaz" element={<SprzedazOferta onOpenModal={() => setModalOpen(true)} />} />
          <Route path="/uslugi/ai-w-firmie" element={<AIwFirmie onOpenModal={() => setModalOpen(true)} />} />
          <Route path="/uslugi/ruchome-tresci" element={<RuchomeTresci onOpenModal={() => setModalOpen(true)} />} />
          <Route path="/uslugi/zloty-numer" element={<ZlotyNumer onOpenModal={() => setModalOpen(true)} />} />
          <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosci />} />
          <Route path="/regulamin" element={<Regulamin />} />

        </Routes>
      </div>

      {location.pathname !== '/do-lacz-do-nas' && (() => {
        const hideCtaRoutes = location.pathname === '/polityka-prywatnosci' || location.pathname === '/regulamin' || location.pathname.startsWith('/uslugi/');
        return <FooterCTA onOpenModal={() => setModalOpen(true)} hideCta={hideCtaRoutes} />;
      })()}

      {location.pathname === '/' && <FloatingCTA onOpenModal={() => setModalOpen(true)} />}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source={modalSource} />
    </main>
  );
}

export default function App() {
  return <AppContent />;
}
