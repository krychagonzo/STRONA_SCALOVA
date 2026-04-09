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
        <div className="text-center mb-20 uppercase tracking-widest font-heading flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block"
          >
            Bariery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase"
          >
            TWÓJ BIZNES <span className="text-accent ml-1">TRACI KAŻDEGO DNIA.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-ivory/50 mt-6 text-sm max-w-2xl mx-auto normal-case tracking-normal"
          >
            Każda firma osiąga moment, w którym samo dokładanie ludzi i godzin przestaje przynosić efekty. To właśnie wtedy ukryte luki operacyjne i wizerunkowe zaczynają kosztować najwięcej.
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="relative z-10 flex flex-col gap-6 max-w-4xl mx-auto"
          >
            {/* ITEM 1: PRZEPALANE BUDŻETY */}
            <motion.div variants={item} className="flex items-start gap-6 border-b border-white/10 pb-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-slate/50 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                <TrendingDown className="size-5 text-accent opacity-90" strokeWidth={1.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-heading font-light tracking-tight uppercase text-ivory group-hover:text-accent transition-colors">PRZEPALONY BUDŻET</h3>
                <p className="text-sm text-ivory/60 font-light mt-3 leading-relaxed">Twoje kampanie działają — ale nikt nie sprawdza czy zarabiają. Co miesiąc dziesiątki tysięcy złotych idą w reklamy, które nie zwracają ani złotówki.</p>
              </div>
            </motion.div>

            {/* ITEM 2: DZIURAWA SPRZEDAŻ */}
            <motion.div variants={item} className="flex items-start gap-6 border-b border-white/10 pb-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-slate/50 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                <Filter className="size-5 text-accent opacity-90" strokeWidth={1.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-heading font-light tracking-tight uppercase text-ivory group-hover:text-accent transition-colors">LEADY, KTÓRE UCIEKAJĄ</h3>
                <p className="text-sm text-ivory/60 font-light mt-3 leading-relaxed">Ktoś się zainteresował, wypełnił formularz, napisał. I zniknął. Nie do konkurencji — Ty go po prostu zgubiłeś. Zła oferta, za wolna odpowiedź, brak follow-upu.</p>
              </div>
            </motion.div>

            {/* ITEM 3: DEFICYT AUTORYTETU */}
            <motion.div variants={item} className="flex items-start gap-6 border-b border-white/10 pb-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-slate/50 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                <EyeOff className="size-5 text-accent opacity-90" strokeWidth={1.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-heading font-light tracking-tight uppercase text-ivory group-hover:text-accent transition-colors">MARKA, KTÓREJ NIE WIDAĆ</h3>
                <p className="text-sm text-ivory/60 font-light mt-3 leading-relaxed">Klienci szukają tego co sprzedajesz — i trafiają do konkurencji. Nie dlatego, że są lepsi. Dlatego, że ich widać, a Ciebie nie.</p>
              </div>
            </motion.div>

            {/* ITEM 4: NIEWIDZIALNA MARKA */}
            <motion.div variants={item} className="flex items-start gap-6 border-b border-white/10 pb-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-slate/50 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                <Globe className="size-5 text-accent opacity-90" strokeWidth={1.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-heading font-light tracking-tight uppercase text-ivory group-hover:text-accent transition-colors">WYGLĄD, KTÓRY KOSZTUJE</h3>
                <p className="text-sm text-ivory/60 font-light mt-3 leading-relaxed">Zanim powiesz słowo, klient już ocenił Twoją markę. Amatorskie logo, przestarzała strona, brak spójności — i zaczyna negocjować cenę zamiast kupować.</p>
              </div>
            </motion.div>

            {/* ITEM 5: RĘCZNE PROCESY */}
            <motion.div variants={item} className="flex items-start gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-slate/50 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                <Hourglass className="size-5 text-accent opacity-90" strokeWidth={1.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-heading font-light tracking-tight uppercase text-ivory group-hover:text-accent transition-colors">RĘCZNE PROCESY</h3>
                <p className="text-sm text-ivory/60 font-light mt-3 leading-relaxed">Twoi ludzie robią ręcznie to, co można zautomatyzować. Kopiują, przeklejają, przypominają, raportują. Płacisz za czas, który nie tworzy żadnej wartości.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
