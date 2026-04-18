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
import Career from './pages/Career';
import FAQ from './pages/FAQ';
import PolitykaPrywatnosci from './pages/PolitykaPrywatnosci';
import Regulamin from './pages/Regulamin';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  return (
    <main className="relative w-full min-h-screen font-sans bg-obsidian selection:bg-accent selection:text-obsidian flex flex-col items-center">
      <ScrollToTop />
      <Navbar />
      
      <div className="flex-1 w-full flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
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
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}

export default function App() {
  return <AppContent />;
}
