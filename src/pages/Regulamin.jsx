import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const sections = [
  {
    num: '01',
    title: 'Postanowienia ogólne',
    content: `Niniejszy Regulamin określa ogólne warunki, zasady oraz sposób świadczenia usług drogą elektroniczną za pośrednictwem strony internetowej www.scalova.pl (zwanej dalej "Stroną").

Operatorem Strony oraz Usługodawcą jest:
SCALOVA, z siedzibą przy ul. 11 Listopada 82, 62-030 Luboń, NIP: 7831897634 (zwanym dalej "Usługodawcą").

Kontakt z Usługodawcą możliwy jest pod adresem e-mail: contact@scalova.com lub telefonicznie pod numerem 61 830 00 00.

Regulamin jest stale i nieodpłatnie udostępniony na Stronie, w sposób umożliwiający jego pozyskanie, odtwarzanie i utrwalanie jego treści poprzez wydrukowanie lub zapisanie na nośniku.`,
  },
  {
    num: '02',
    title: 'Definicje',
    content: `Użytkownik – pełnoletnia osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, która korzysta ze Strony i Usług.

Usługi – usługi świadczone drogą elektroniczną przez Usługodawcę na rzecz Użytkownika. Jako agencja wdrażająca nowoczesne rozwiązania IT i AI, oferujemy m.in. bezpłatne konsultacje wstępne, przesyłanie materiałów marketingowych, a także usługi deweloperskie i audytowe.

Umowa – umowa o świadczenie usług drogą elektroniczną zawarta pomiędzy Użytkownikiem a Usługodawcą.`,
  },
  {
    num: '03',
    title: 'Rodzaj i zakres usług elektronicznych',
    content: `Usługodawca umożliwia za pośrednictwem Strony korzystanie z następujących Usług:
— Przeglądanie treści i informacji, w tym oferty i portfolio agencji SCALOVA.
— Przesyłanie zapytań za pomocą interaktywnych formularzy kontaktowych.
— Umówienie bezpłatnej konsultacji doradczej (np. poprzez rozwiązania typu Calendly).

Korzystanie ze Strony i wymienionych Usług wstępnych jest bezpłatne. Jeśli klient zdecyduje się na odpłatną współpracę wdrożeniową, warunki tej współpracy reguluje odrębna umowa B2B zawarta w formie dokumentowej lub pisemnej.`,
  },
  {
    num: '04',
    title: 'Warunki techniczne i zasady korzystania ze strony',
    content: `Aby prawidłowo korzystać ze Strony, Użytkownik powinien dysponować sprzętem komputerowym (lub urządzeniem mobilnym) z dostępem do Internetu oraz aktualną przeglądarką internetową z włączoną obsługą JavaScript oraz plików cookies.

Zakazane jest dostarczanie przez Użytkownika treści o charakterze bezprawnym, obraźliwym, wprowadzającym w błąd, a także podejmowanie działań, które mogą wywołać zakłócenia lub uszkodzenia systemów informatycznych Usługodawcy.
Usługodawca dokłada wszelkich starań, by zapewnić nieprzerwane działanie Strony, jednakże zastrzega sobie prawo do przerw technicznych wynikających z konieczności aktualizacji czy konserwacji systemów.`,
  },
  {
    num: '05',
    title: 'Zawieranie i rozwiązywanie umów',
    content: `Zawarcie umowy o świadczenie usług drogą elektroniczną w zakresie bezpłatnych funkcji Strony (np. dostęp do treści, wysłanie zapytania) następuje w momencie wyświetlenia Strony lub wysłania formularza.

Użytkownik ma prawo w każdej chwili zakończyć korzystanie ze Strony poprzez opuszczenie jej i zamknięcie okna przeglądarki. W przypadku Usług wymagających podania danych (rezerwacje, formularze kontaktowe), zasady przetwarzania danych określa Polityka Prywatności.`,
  },
  {
    num: '06',
    title: 'Tryb postępowania reklamacyjnego',
    content: `Jeżeli Usługi świadczone przez Stronę funkcjonują nieprawidłowo, Użytkownik ma prawo złożyć reklamację.

Reklamacje można zgłaszać na adres e-mail: contact@scalova.com, z dopiskiem "Reklamacja".
Zgłoszenie powinno zawierać: dane zgłaszającego, krótki opis zaistniałego problemu i okoliczności jego wystąpienia.

Usługodawca rozpatrzy reklamację powiadamiając Użytkownika o swoim stanowisku drogą mailową w terminie nie dłuższym niż 14 dni od jej otrzymania.`,
  },
  {
    num: '07',
    title: 'Własność intelektualna',
    content: `Wszelkie treści umieszczone na Stronie, w tym teksty, grafiki, logo, kod witryny, zdjęcia i animowane komponenty, stanowią przedmiot praw autorskich Usługodawcy (lub podmiotów współpracujących) i podlegają ochronie prawnej.

Kopiowanie, powielanie lub udostępnianie tych materiałów w celach komercyjnych bez pisemnej zgody SCALOVA jest surowo zabronione. Wdrożona szata graficzna w tym m.in. estetyka "Midnight Luxe" i "Organic Tech" to unikalne wytwory chronione prawem.`,
  },
  {
    num: '08',
    title: 'Postanowienia końcowe',
    content: `Usługodawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie z ważnych przyczyn (np. zmiana przepisów prawa, zmiana modelu świadczenia usług). O zmianach Użytkownicy zostaną poinformowani bezpośrednio na Stronie z odpowiednim wyprzedzeniem.

W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają powszechnie obowiązujące przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz Ustawy o świadczeniu usług drogą elektroniczną.
Wszelkie spory będą rozwiązywane w pierwszej kolejności polubownie, a jeśli to się nie powiedzie – przed polarym sądem właściwym ustalonym zgodnie z odpowiednimi przepisami.`,
  },
];

export default function Regulamin() {
  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full pt-48 pb-20 px-6 md:px-16 xl:px-32 border-b border-ivory/5">
        <div className="max-w-[1100px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30">Regulamin</span>
          </div>

          <span className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 block opacity-80">
            DOKUMENT PRAWNY
          </span>
          <h1 className="font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase mb-10">
            Regulamin<br />Serwisu
          </h1>

          {/* Lead text */}
          <div className="max-w-3xl border-l-2 border-accent/40 pl-8 mt-10">
            <p className="font-sans text-ivory/60 text-lg leading-relaxed">
              Transparentność i budowanie zaufania to fundamenty naszej agencji. Niniejszy regulamin jasno określa zasady korzystania ze strony www.scalova.pl.
            </p>
            <p className="font-sans text-ivory/60 text-lg leading-relaxed mt-4">
              Został on stworzony tak, by odpowiadał literze prawa, spełniał minimum prawne wynikające z przepisów i w sposób jasny określał relację między Tobą (Użytkownikiem) a powierzonymi Ci treściami.
            </p>
            <p className="font-sans text-ivory/50 text-base leading-relaxed mt-4">
              Dokument jest zgodny z Ustawą z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="w-full px-6 md:px-16 xl:px-32 py-20">
        <div className="max-w-[1100px] mx-auto flex flex-col">
          {sections.map((section, idx) => (
            <div
              key={section.num}
              className="flex flex-col md:flex-row gap-8 md:gap-16 border-b border-ivory/5 py-14 md:py-16 last:border-b-0"
            >
              {/* Number + Title */}
              <div className="md:w-[340px] flex-shrink-0">
                <span className="font-mono text-accent/50 text-xs tracking-[0.25em] block mb-3">{section.num}</span>
                <h2 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight leading-tight">
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              <div className="flex-1">
                {section.content.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-ivory/60 text-base md:text-[17px] leading-relaxed mb-5 last:mb-0 whitespace-pre-line"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM NAV */}
      <div className="w-full px-6 md:px-16 xl:px-32 py-10 border-t border-ivory/5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
            Powrót do strony głównej
          </Link>
          <p className="font-mono text-[10px] text-ivory/20 tracking-widest uppercase">Obowiązuje od: 01.01.2026</p>
        </div>
      </div>
    </div>
  );
}
