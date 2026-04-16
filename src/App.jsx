import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingCTA from './components/FloatingCTA';
import FooterCTA from './components/FooterCTA';
import ConsultationModal from './components/ConsultationModal';

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Career from './pages/Career';

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
        </Routes>
      </div>

      {location.pathname !== '/do-lacz-do-nas' && (
        <FooterCTA onOpenModal={() => setModalOpen(true)} />
      )}
      {location.pathname === '/' && <FloatingCTA onOpenModal={() => setModalOpen(true)} />}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
