import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function ConsultationModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', company: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(panelRef.current, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 });
    } else {
      document.body.style.overflow = '';
      gsap.to(panelRef.current, { opacity: 0, y: 24, scale: 0.97, duration: 0.25, ease: 'power2.in' });
      gsap.to(overlayRef.current, {
        opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.1,
        onComplete: () => { if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' }); }
      });
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', company: '', email: '', phone: '' });
        setErrors({});
      }, 400);
    }
  }, [isOpen]);

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

  const formatPhone = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  };

  const handleChange = (field) => (ev) => {
    const value = field === 'phone' ? formatPhone(ev.target.value) : ev.target.value;
    setFormState(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ display: 'none', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(14,14,14,0.8)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-[920px]"
        style={{
          background: 'linear-gradient(135deg, #141414 0%, #0E0E0E 40%, #111116 100%)',
          border: '1px solid rgba(212,255,0,0.15)',
          boxShadow: '0 0 80px rgba(212,255,0,0.07), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,255,0,0.08)'
        }}
      >
        {/* Accent top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.6) 50%, transparent)' }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-ivory/30 hover:text-ivory transition-colors duration-200 p-1"
          aria-label="Zamknij"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <div className="flex flex-col md:flex-row">

            {/* LEFT - value prop */}
            <div
              className="md:w-[42%] p-10 md:p-12 flex flex-col gap-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: 'none' }}
            >
              <div className="block md:hidden w-full h-[1px]" />

              <div className="flex flex-col gap-5">
                <span className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase opacity-80">
                  // BEZPŁATNA KONSULTACJA
                </span>
                <h2 className="font-heading font-light text-ivory text-3xl md:text-4xl leading-tight tracking-tight">
                  Porozmawiajmy<br />o Twoim<br />biznesie.
                </h2>
                <p className="text-ivory/50 text-sm leading-relaxed font-sans max-w-xs">
                  Przeanalizujemy Twoją sytuację i pokażemy co konkretnie zmienić, żeby firma rosła szybciej.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase">Co dostajesz</p>
                {[
                  'Analizę Twojej obecnej sytuacji',
                  'Konkretne rekomendacje, nie ogólniki',
                  'Bez zobowiązań i bez spamu',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-[3px] h-[3px] rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-ivory/55 text-sm font-sans leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <p className="font-mono text-ivory/25 text-[10px] tracking-[0.15em] uppercase">
                Oddzwaniamy w 24h
              </p>
            </div>

            {/* Vertical divider - desktop only */}
            <div className="hidden md:block w-[1px] self-stretch" style={{ background: 'rgba(255,255,255,0.05)' }} />

            {/* RIGHT - form */}
            <div className="md:w-[58%] p-10 md:p-12 flex flex-col gap-6">
              <div className="flex flex-col gap-5">
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
                  placeholder="Opcjonalnie"
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
                  placeholder="000 000 000"
                  error={errors.phone}
                  prefix="+48"
                />
              </div>

              <div className="w-full h-[1px] bg-ivory/5" />

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="group relative overflow-hidden w-full font-heading font-bold uppercase tracking-wider text-sm py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(212,255,0,0.15)] hover:shadow-[0_0_50px_rgba(212,255,0,0.35)]"
                >
                  <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 ease-in-out group-hover:left-[150%] pointer-events-none" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    UMAWIAM KONSULTACJĘ
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </button>
                <p className="text-center text-ivory/25 text-xs font-sans">
                  Bez zobowiązań. Zero spamu. Oddzwaniamy w&nbsp;24h.
                </p>
              </div>
            </div>

          </div>
        ) : (
          <SuccessState onClose={onClose} />
        )}
      </div>
    </div>
  );
}

function Field({ label, required, value, onChange, placeholder, type = 'text', error, prefix }) {
  const [focused, setFocused] = useState(false);
  const border = error
    ? '1px solid rgba(255,80,80,0.6)'
    : focused
    ? '1px solid rgba(212,255,0,0.4)'
    : '1px solid rgba(255,255,255,0.08)';
  const bg = focused ? 'rgba(212,255,0,0.02)' : 'rgba(255,255,255,0.02)';

  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-ivory/50">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      <div className="flex w-full font-sans text-sm transition-all duration-200" style={{ border, background: bg }}>
        {prefix && (
          <span
            className="px-4 py-3.5 text-ivory/40 shrink-0 select-none"
            style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-ivory placeholder:text-ivory/20 px-4 py-3.5 outline-none min-w-0"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      {error && <span className="text-[11px] text-red-400/80 font-sans">{error}</span>}
    </div>
  );
}

function SuccessState({ onClose }) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-8">
      <div className="w-14 h-14 flex items-center justify-center mb-6" style={{ border: '1px solid rgba(212,255,0,0.3)', background: 'rgba(212,255,0,0.05)' }}>
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
