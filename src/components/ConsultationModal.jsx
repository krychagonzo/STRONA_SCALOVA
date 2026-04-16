import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function ConsultationModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', company: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Animate in / out
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(panelRef.current, { opacity: 0, y: 24, scale: 0.97, duration: 0.25, ease: 'power2.in' });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        delay: 0.1,
        onComplete: () => {
          if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' });
        }
      });
      // Reset after close animation
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', company: '', email: '', phone: '' });
        setErrors({});
      }, 400);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const validate = () => {
    const e = {};
    if (!formState.name.trim()) e.name = 'Podaj imię i nazwisko';
    if (!formState.email.trim() || !/\S+@\S+\.\S+/.test(formState.email)) e.email = 'Podaj poprawny adres e-mail';
    if (!formState.phone.trim()) e.phone = 'Podaj numer telefonu';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleChange = (field) => (ev) => {
    setFormState(prev => ({ ...prev, [field]: ev.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ display: 'none', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(14,14,14,0.75)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-lg"
        style={{
          background: 'linear-gradient(135deg, #141414 0%, #0E0E0E 40%, #111116 100%)',
          border: '1px solid rgba(212,255,0,0.15)',
          boxShadow: '0 0 80px rgba(212,255,0,0.07), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,255,0,0.08)'
        }}
      >
        {/* Accent top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.6) 50%, transparent)' }} />

        {/* Subtle corner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(212,255,0,0.06) 0%, transparent 70%)' }} />

        <div className="px-8 py-10 md:px-12 md:py-12">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-ivory/30 hover:text-ivory transition-colors duration-200 p-1"
            aria-label="Zamknij"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <span className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase opacity-80 block mb-3">
                  // BEZPŁATNA KONSULTACJA
                </span>
                <h2 className="font-heading font-light text-ivory text-2xl md:text-3xl leading-tight tracking-tight">
                  Porozmawiajmy o<br />Twoim biznesie
                </h2>
                <p className="mt-4 text-ivory/50 text-sm leading-relaxed font-sans">
                  Zostaw dane - skontaktujemy się w ciągu 24h i umówimy bezpłatną konsultację. Podczas rozmowy przeanalizujemy Twój biznes i pokażemy, co konkretnie można usprawnić.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-ivory/5 mb-8" />

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <Field
                  label="Imię i nazwisko"
                  required
                  value={formState.name}
                  onChange={handleChange('name')}
                  placeholder="Jan Kowalski"
                  error={errors.name}
                />
                <Field
                  label="Firma"
                  value={formState.company}
                  onChange={handleChange('company')}
                  placeholder="Nazwa firmy (opcjonalnie)"
                />
                <Field
                  label="Adres e-mail"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange('email')}
                  placeholder="jan@firma.pl"
                  error={errors.email}
                />
                <Field
                  label="Numer telefonu"
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={handleChange('phone')}
                  placeholder="+48 000 000 000"
                  error={errors.phone}
                />

                <button
                  type="submit"
                  className="group relative overflow-hidden mt-3 w-full font-heading font-bold uppercase tracking-wider text-sm py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(212,255,0,0.15)] hover:shadow-[0_0_50px_rgba(212,255,0,0.35)]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                >
                  <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 ease-in-out group-hover:left-[150%] pointer-events-none" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    UMAWIAM KONSULTACJĘ
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </button>

                <p className="text-center text-ivory/25 text-xs font-sans mt-1">
                  Bez zobowiązań. Zero spamu. Oddzwaniamy w&nbsp;24h.
                </p>
              </form>
            </>
          ) : (
            <SuccessState onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, value, onChange, placeholder, type = 'text', error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-ivory/50">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent font-sans text-sm text-ivory placeholder:text-ivory/20 px-4 py-3 outline-none transition-all duration-200"
        style={{
          border: error ? '1px solid rgba(255,80,80,0.6)' : '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)'
        }}
        onFocus={e => { if (!error) e.target.style.border = '1px solid rgba(212,255,0,0.4)'; e.target.style.background = 'rgba(212,255,0,0.02)'; }}
        onBlur={e => { if (!error) e.target.style.border = '1px solid rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.02)'; }}
      />
      {error && <span className="text-[11px] text-red-400/80 font-sans">{error}</span>}
    </div>
  );
}

function SuccessState({ onClose }) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ border: '1px solid rgba(212,255,0,0.3)', background: 'rgba(212,255,0,0.05)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4FF00" strokeWidth="2" strokeLinecap="square">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <span className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase opacity-80 block mb-3">// ODEBRANO</span>
      <h3 className="font-heading font-light text-ivory text-2xl leading-tight mb-4">
        Zgłoszenie przyjęte
      </h3>
      <p className="text-ivory/50 text-sm leading-relaxed font-sans max-w-xs">
        Skontaktujemy się z Tobą w ciągu 24 godzin, aby umówić termin bezpłatnej konsultacji.
      </p>
      <button
        onClick={onClose}
        className="mt-8 font-mono text-xs tracking-[0.2em] uppercase text-ivory/30 hover:text-ivory/60 transition-colors"
      >
        Zamknij
      </button>
    </div>
  );
}
