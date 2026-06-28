# Kontekst Projektu: SCALOVA

Ten dokument służy jako kontekst wejściowy dla modeli AI, pomagając im zrozumieć charakter, wygląd oraz stack technologiczny projektu **SCALOVA**, nad którym obecnie pracujemy.

---

## 1. O Firmie i Naszym Celu
- **Nazwa marki:** SCALOVA
- **Główny przekaz:** "Skaluj biznes, odzyskaj czas."
- **Profil działalności:** Jesteśmy agencją AI i automatyzacji z Poznania. Działamy jako "Agencja skalowania biznesu".
- **Misja:** "Przeprowadzamy audyt, usprawniamy firmy od środka, budujemy ich pozycję na zewnątrz."
- **Co dowozimy:** Wdrażamy konkretne, mierzalne narzędzia, które od pierwszego dnia pracują na wynik klienta.
- **Główne usługi (posiadają dedykowane podstrony):**
  - Strona & AI-asystent (`/uslugi/strona-ai`)
  - Kampanie & Organic (`/uslugi/kampanie`)
  - Statyczne treści wizualne (`/uslugi/statyczne-tresci`)
  - Ruchome treści wizualne (`/uslugi/ruchome-tresci`)
  - Automatyzacje (`/uslugi/automatyzacje`)
  - Sprzedaż & Oferta (`/uslugi/sprzedaz`)
  - AI w firmie (`/uslugi/ai-w-firmie`)
  - Złoty numer (`/uslugi/zloty-numer`)

## 2. Design System & Doświadczenie Wizualne (Aesthetic)
Strona ma przypominać "cyfrowy instrument" i oferować doświadczenie klasy premium, kinowe i dopracowane co do piksela. Styl opiera się na koncepcie **"Midnight Luxe"** (Dark Editorial).

- **Kolorystyka:** Motyw ciemny (Dark Mode). Tło to głęboka czerń/obsydian (`bg-obsidian`, np. `#0D0D12`), tekst w kolorze kości słoniowej (`text-ivory`, `#FAF8F5`). Do tego dochodzą świecące akcenty (`accent`).
- **Typografia:** Główny font to **Satoshi**. Zastosowanie mają też fonty *DM Serif Display* i *JetBrains Mono* (dla wstawek kodowych/technicznych i dramatycznych akcentów).
- **Efekty specjalne (Cinematic UI):**
  - Globalny szum (Noise overlay) nakładany przez Canvas (zamiast obciążającego filtra SVG), dający organiczną teksturę i usuwający "płaskość" tła.
  - Subtelne "oddechy" i poświaty świetlne (glow effect) pod elementami i interakcjami (np. rozbłyski pod przyciskami).
  - Brak ostrych krawędzi – elementy używają znacznych zaokrągleń (np. `rounded-2xl`, `rounded-[2rem]`).
  - Animacje kursora i przycisków mają charakter "magnetyczny".

## 3. Stack Technologiczny
- **Core:** React 19, Vite.
- **Styling:** Tailwind CSS (v3.4.17) – używamy klas narzędziowych, w tym niestandardowych (np. `.gpu-accelerated`, `.noise-overlay`).
- **Routing:** React Router v7 (SPA, obsługa hashy dla scrollowania, przewijanie do góry przy zmianie strony).
- **Animacje & Interakcje:** GSAP 3 (z modułem ScrollTrigger) – używane do potężnych animacji na wejściu, efektów parallax i przypinania sekcji. Framer Motion (opcjonalnie).
- **3D / Grafika:** Odtwarzanie zoptymalizowanego wideo w tle (np. logo w formacie `.webm`) oraz renderowanie wysokowydajnych scen w Three.js / React Three Fiber, połączone z niestandardowym ditheringiem na Canvasie w celu zapobiegania bandingowi ciemnych gradientów (Bayer 4x4).
- **Ikony:** Lucide React oraz React Icons.

## 4. Wytyczne Techniczne dla AI (Zasady Rozwoju)
Gdy generujesz kod dla tego projektu, musisz bezwzględnie stosować się do następujących zasad:
1. **Wysoka Wydajność:** Używaj akceleracji GPU (klasa `.gpu-accelerated`: `will-change: transform, opacity; transform: translateZ(0);`). Elementy ciężkie dla mobilnych urządzeń (np. duże wideo tła) powinny być renderowane tylko na desktopie.
2. **GSAP Best Practices:** Wszystkie animacje GSAP w komponentach Reacta muszą być zamknięte w `gsap.context()` i poprawnie usuwane w funkcji czyszczącej hooka `useEffect` (`return () => ctx.revert();`). Easing zazwyczaj to `power3.out` lub `power2.inOut`.
3. **Podejście "Cinematic":** Nie twórz standardowych, nudnych komponentów. Każda nowa sekcja musi być wyposażona w intencjonalne animacje fade-up na scroll (ScrollTrigger), mieć dobre zarządzanie "światłem" (np. promienny hover state) i dawać poczucie obcowania z produktem luksusowym.
4. **Brak "Placeholders":** Projekt jest dopracowany (Pixel Perfect). Używaj docelowych klas, odpowiadających koncepcji wizualnej. Pamiętaj o obsłudze braku pasków przewijania (`.no-scrollbar`).
5. **Responsywność (Mobile-first):** Zawsze sprawdzaj układ w flex/grid pod kątem małych ekranów, gdzie animacje i efekty wielkoekranowe są zastępowane odpowiednikami dopasowanymi pod dotyk i wydajność telefonów.
