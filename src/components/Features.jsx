import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, Filter, Hourglass, Globe, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Features() {
  return (
    <section id="features" className="relative w-full py-32 px-6 bg-obsidian text-ivory flex justify-center z-10">
      <div className="max-w-3xl lg:max-w-5xl w-full">
        <div className="text-center mb-20 uppercase tracking-widest font-heading">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase"
          >
            TWÓJ BIZNES <span className="text-accent ml-1">ZWALNIA?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-ivory/50 mt-6 text-sm max-w-2xl mx-auto normal-case tracking-normal"
          >
            Skalowanie operacji biznesowych przy użyciu wyłącznie zasobów ludzkich i analogowych procesów ma swoje granice. Zidentyfikuj kluczowe luki operacyjne i wizerunkowe, które każdego dnia hamują ekspansję i pochłaniają kapitał.
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="relative z-10 grid grid-cols-1 sm:grid-cols-6 gap-6"
          >
            {/* CARD 1: PRZEPALANE BUDŻETY */}
            <motion.div variants={item} className="relative col-span-full sm:col-span-3 lg:col-span-2">
              <Card className="h-full w-full overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgb(212,255,0,0.1)] shadow-2xl relative">
                <CardContent className="pt-6 h-full flex flex-col items-center justify-start px-6 pb-8">
                  <div className="relative mx-auto mt-6 flex aspect-square size-24 rounded-full border border-slate/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-slate/10 group-hover:border-accent/50 transition-colors mb-6">
                    <TrendingDown className="m-auto size-10 text-accent opacity-90" strokeWidth={1} />
                  </div>
                  <div className="relative z-10 space-y-3 text-center pt-6">
                    <h2 className="text-lg font-heading font-light tracking-tight uppercase text-ivory group-hover:text-accent transition">PRZEPALANE BUDŻETY</h2>
                    <p className="text-sm text-ivory/50 font-light">Słabe kampanie Ads i brak optymalizacji to dziesiątki tysięcy złotych wyrzucane w błoto każdego miesiąca.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 2: DZIURAWA SPRZEDAŻ */}
            <motion.div variants={item} className="relative col-span-full sm:col-span-3 lg:col-span-2">
              <Card className="h-full w-full overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgb(212,255,0,0.1)] shadow-2xl relative">
                <CardContent className="pt-6 h-full flex flex-col items-center justify-start px-6 pb-8">
                  <div className="relative mx-auto mt-6 flex aspect-square size-24 rounded-full border border-slate/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-slate/10 group-hover:border-accent/50 transition-colors mb-6">
                    <Filter className="m-auto size-10 text-accent opacity-90" strokeWidth={1} />
                  </div>
                  <div className="relative z-10 space-y-3 text-center pt-6">
                    <h2 className="text-lg font-heading font-light tracking-tight uppercase text-ivory group-hover:text-accent transition">DZIURAWA SPRZEDAŻ</h2>
                    <p className="text-sm text-ivory/50 font-light">Gorące leady uciekają do konkurencji, bo Twoje oferty i skrypty nie potrafią bezwzględnie domknąć transakcji.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 3: DEFICYT AUTORYTETU */}
            <motion.div variants={item} className="relative col-span-full sm:col-span-3 lg:col-span-2">
              <Card className="h-full w-full overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgb(212,255,0,0.1)] shadow-2xl relative">
                <CardContent className="pt-6 h-full flex flex-col items-center justify-start px-6 pb-8">
                  <div className="relative mx-auto mt-6 flex aspect-square size-24 rounded-full border border-slate/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-slate/10 group-hover:border-accent/50 transition-colors mb-6">
                    <EyeOff className="m-auto size-10 text-accent opacity-90" strokeWidth={1} />
                  </div>
                  <div className="relative z-10 space-y-3 text-center pt-6">
                    <h2 className="text-lg font-heading font-light tracking-tight uppercase text-ivory group-hover:text-accent transition">DEFICYT AUTORYTETU</h2>
                    <p className="text-sm text-ivory/50 font-light">Tracisz zlecenia premium, bo Twojej marce brakuje unikalnej identyfikacji, profesjonalnego logo, nowoczesnego wideo czy wizualizacji 3D. Klienci z góry negocjują cenę, zamiast docenić Waszą jakość.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 4: NIEWIDZIALNA MARKA */}
            <motion.div variants={item} className="relative col-span-full sm:col-span-3 lg:col-span-3">
              <Card className="h-full w-full overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgb(212,255,0,0.1)] shadow-2xl relative">
                <CardContent className="pt-6 h-full flex flex-col items-center justify-start px-6 pb-8">
                  <div className="relative mx-auto mt-6 flex aspect-square size-24 rounded-full border border-slate/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-slate/10 group-hover:border-accent/50 transition-colors mb-6">
                    <Globe className="m-auto size-10 text-accent opacity-90" strokeWidth={1} />
                  </div>
                  <div className="relative z-10 space-y-3 text-center pt-6">
                    <h2 className="text-lg font-heading font-light tracking-tight uppercase text-ivory group-hover:text-accent transition">NIEWIDZIALNA MARKA</h2>
                    <p className="text-sm text-ivory/50 font-light max-w-sm mx-auto">Klienci szukają Twoich usług w sieci, ale znajdują wyłącznie konkurencję. Brak nowoczesnej strony i strategii cyfrowej to dobrowolna rezygnacja z części rynku.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 5: RĘCZNE PROCESY */}
            <motion.div variants={item} className="relative col-span-full sm:col-span-3 lg:col-span-3">
              <Card className="h-full w-full overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_8px_30px_rgb(212,255,0,0.1)] shadow-2xl relative">
                <CardContent className="pt-6 h-full flex flex-col items-center justify-start px-6 pb-8">
                  <div className="relative mx-auto mt-6 flex aspect-square size-24 rounded-full border border-slate/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-slate/10 group-hover:border-accent/50 transition-colors mb-6">
                    <Hourglass className="m-auto size-10 text-accent opacity-90" strokeWidth={1} />
                  </div>
                  <div className="relative z-10 space-y-3 text-center pt-6">
                    <h2 className="text-lg font-heading font-light tracking-tight uppercase text-ivory transition">RĘCZNE PROCESY</h2>
                    <p className="text-sm text-ivory/50 font-light max-w-sm mx-auto">Twój zespół spala się na powtarzalnych zadaniach.<br />Brak integracji systemów brutalnie hamuje skalowanie.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
