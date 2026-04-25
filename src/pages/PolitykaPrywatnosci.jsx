import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const sections = [
  {
    num: '01',
    title: 'Słowniczek (Definicje)',
    content: `Aby dokument był czytelny, używamy w nim następujących pojęć:

Administrator (My): SCALOVA, z siedzibą przy 11 Listopada 82, Luboń 62-030, NIP: 7831897634.

Usługi: Wszelkie rozwiązania, które Ci oferujemy – od audytów i konsultacji, przez produkty AI i automatyzacje, aż po tworzenie treści wizualnych.

Strona: Nasza witryna internetowa działająca pod adresem www.scalova.pl.

RODO: Główne europejskie prawo chroniące Twoje dane (Rozporządzenie UE 2016/679 z dnia 27 kwietnia 2016 r.).

Użytkownik (Ty): Każda osoba, która odwiedza naszą Stronę, kontaktuje się z nami lub korzysta z naszych Usług.`,
  },
  {
    num: '02',
    title: 'Kto i jak dba o Twoje dane?',
    content: `Jesteśmy Administratorem Twoich danych osobowych. Oznacza to, że to my decydujemy, w jakim celu i w jaki sposób będą one przetwarzane, oraz bierzemy za to pełną odpowiedzialność.

Jeśli masz jakiekolwiek pytania dotyczące swojej prywatności, chcesz zaktualizować dane lub zażądać ich usunięcia, napisz do nas bezpośrednio na: rodo@scalova.pl.

Pamiętaj: jeśli nasza Strona odsyła Cię (linkuje) do zewnętrznych platform (np. Calendly do rezerwacji spotkań, LinkedIn, systemy płatności), te podmioty posiadają własne polityki prywatności, z którymi warto się zapoznać.`,
  },
  {
    num: '03',
    title: 'Jakie dane zbieramy i w jaki sposób?',
    content: `Gromadzimy tylko te informacje, które są nam niezbędne do świadczenia usług na najwyższym poziomie lub do optymalizacji naszych działań marketingowych.

A. Dane, które przekazujesz nam bezpośrednio:
Gdy rezerwujesz sesję strategiczną, wysyłasz maila lub dzwonisz do nas, przekazujesz nam m.in.: imię, nazwisko, adres e-mail, numer telefonu oraz informacje o Twojej firmie. (Rozmowy telefoniczne nie są przez nas nagrywane, chyba że zostaniesz o tym wyraźnie i uprzednio poinformowany).

B. Dane zbierane automatycznie (Technologia i Analityka):
Gdy korzystasz z naszej Strony, nasze systemy automatycznie rejestrują dane techniczne urządzenia i logowania (Twój adres IP, rodzaj przeglądarki, system operacyjny czy strefa czasowa), dane o Twojej aktywności (które podstrony czytasz, ile czasu na nich spędzasz), a także pliki Cookies - używamy ich, aby strona działała poprawnie i abyśmy mogli mierzyć skuteczność naszych kampanii. Szczegóły znajdziesz w naszej Polityce Cookies.

C. Dane z innych źródeł:
Jako agencja B2B, czasami weryfikujemy publicznie dostępne dane o Twojej firmie (np. w CEIDG lub KRS), aby lepiej przygotować się do rozmowy strategicznej i dopasować nasze rozwiązania do skali Twojego biznesu.

Ważne: Nasze usługi kierujemy do przedsiębiorców i profesjonalistów. Świadomie nie zbieramy danych od osób poniżej 16. roku życia.`,
  },
  {
    num: '04',
    title: 'Dlaczego przetwarzamy Twoje dane? (Podstawa prawna)',
    content: `Każde działanie na Twoich danych musi mieć uzasadnienie w prawie. Przetwarzamy Twoje informacje, ponieważ:

— Jest to niezbędne do zawarcia i wykonania umowy (np. gdy rozpoczynamy współpracę, wdrażamy u Ciebie systemy lub świadczymy usługi doradcze).

— Mamy w tym prawnie uzasadniony interes (np. odpowiadanie na Twoje zapytania, badanie analityki ruchu na stronie, dbanie o cyberbezpieczeństwo systemów, czy budowanie społeczności na profilach SCALOVA na LinkedIn, Facebooku czy Instagramie).

— Wymaga tego od nas prawo (np. przepisy podatkowe i księgowe wymuszają na nas przechowywanie faktur).

— Wyraziłeś na to wyraźną zgodę (np. zapisując się na nasz newsletter, pobierając darmowe materiały branżowe lub zgadzając się na ciasteczka marketingowe).`,
  },
  {
    num: '05',
    title: 'Twoje prawa (Co możesz zrobić ze swoimi danymi?)',
    content: `RODO daje Ci pełną kontrolę nad Twoimi danymi. W każdej chwili masz prawo do:

— Dostępu: Zapytania nas, czy i jakie Twoje dane przetwarzamy, oraz otrzymania ich kopii.
— Sprostowania: Poprawienia danych, jeśli są z błędami lub stały się nieaktualne.
— Usunięcia ("Prawo do bycia zapomnianym"): Żądania wykasowania danych, jeśli nie są nam już niezbędne do celów, dla których zostały zebrane.
— Ograniczenia przetwarzania: "Zamrożenia" operacji na Twoich danych w określonych sytuacjach.
— Sprzeciwu: Powiedzenia "stop" przetwarzaniu danych w celach marketingowych lub wynikających z naszych prawnie uzasadnionych interesów.
— Przenoszenia danych: Otrzymania od nas swoich danych w czytelnym formacie cyfrowym.
— Cofnięcia zgody: Jeśli przetwarzamy dane na podstawie Twojej zgody, możesz ją cofnąć w ułamku sekundy.

W celu realizacji swoich praw napisz na: rodo@scalova.pl. Zareagujemy tak szybko, jak to możliwe (maksymalnie w ciągu miesiąca). Masz również prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (PUODO), choć zawsze zachęcamy do wcześniejszego kontaktu z nami.`,
  },
  {
    num: '06',
    title: 'Komu udostępniamy Twoje dane?',
    content: `Aby dostarczać Ci usługi premium, współpracujemy z najlepszymi dostawcami technologii. Twoje dane mogą być przekazywane podmiotom, które nam pomagają:

— Dostawcom infrastruktury i oprogramowania: Firmom hostingowym, dostawcom przestrzeni chmurowej (np. Google Workspace, AWS), systemom CRM.
— Partnerom analitycznym i marketingowym: Platformom takim jak Meta (Facebook/Instagram), Google czy LinkedIn, które pomagają nam mierzyć skuteczność reklam i docierać do odpowiednich odbiorców B2B.
— Podmiotom wspierającym nasz biznes: Zaufanym biurom księgowym czy kancelariom prawnym.

Nie sprzedajemy Twoich danych handlarzom baz danych. Dzielimy się nimi tylko w niezbędnym zakresie, chroniąc je odpowiednimi umowami powierzenia.`,
  },
  {
    num: '07',
    title: 'Przekazywanie danych poza Europejski Obszar Gospodarczy (EOG)',
    content: `Z uwagi na to, że korzystamy z systemów wiodących globalnych gigantów technologicznych (np. Google, Meta), Twoje dane mogą trafiać poza EOG (np. do USA).

Dbamy o to, by taki transfer był maksymalnie bezpieczny i opierał się na rygorystycznych mechanizmach prawnych, takich jak Standardowe Klauzule Umowne (SCC) zatwierdzone przez Komisję Europejską, lub ramy Data Privacy Framework, które narzucają firmom z USA unijne standardy prywatności.`,
  },
  {
    num: '08',
    title: 'Jak długo przechowujemy Twoje dane?',
    content: `Nie trzymamy danych w nieskończoność. Przechowujemy je tylko tak długo, jak wymaga tego dany cel:

— Dane umowne i rozliczeniowe: Przez czas trwania współpracy, a następnie przez okres wymagany przez prawo podatkowe (standardowo 5 lat).
— Dane z formularzy i korespondencji: Do czasu zakończenia komunikacji i ewentualnego przedawnienia roszczeń.
— Dane z newslettera/marketingu: Do momentu, w którym cofniesz swoją zgodę lub zgłosisz sprzeciw.
— Pliki cookies: Zgodnie z cyklem życia danego ciasteczka lub do momentu ich wyczyszczenia w Twojej przeglądarce.`,
  },
  {
    num: '09',
    title: 'Bezpieczeństwo (Jak chronimy Twój biznes?)',
    content: `Jako agencja wdrażająca nowoczesne rozwiązania IT i AI, bezpieczeństwo traktujemy priorytetowo. Stosujemy wysokiej klasy certyfikaty SSL, szyfrowanie, restrykcyjne polityki dostępu do haseł (korzystamy z menedżerów haseł i uwierzytelniania dwuskładnikowego 2FA) oraz współpracujemy wyłącznie ze sprawdzonymi dostawcami serwerów.

Nasz zespół ma dostęp do Twoich danych tylko w zakresie niezbędnym do wykonania swojej pracy.`,
  },
  {
    num: '10',
    title: 'Profilowanie i zautomatyzowane podejmowanie decyzji',
    content: `Podobnie jak większość nowoczesnych firm w cyfrowym świecie, korzystamy z analityki i algorytmów (np. systemów reklamowych Google czy Meta), aby badać ruch na Stronie i dopasowywać nasze komunikaty do Twoich zainteresowań biznesowych.

Proces ten opiera się na spseudonimizowanych danych (nie wiemy konkretnie, kim jesteś, widzimy jedynie "ruch"). Te działania pomagają nam wyświetlać Ci trafniejsze reklamy, ale w żaden sposób nie wpływają istotnie na Twoją sytuację prawną, ani nie generują automatycznych decyzji ze skutkiem prawnym.`,
  },
  {
    num: '11',
    title: 'Zmiany w Polityce Prywatności',
    content: `Technologia się zmienia, prawo się zmienia, my rośniemy – dlatego ta Polityka Prywatności również może podlegać aktualizacjom. O istotnych zmianach będziemy informować bezpośrednio lub poprzez wyraźny komunikat na naszej Stronie.

Ostatnia aktualizacja: 01.01.2026`,
  },
];

export default function PolitykaPrywatnosci() {
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
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30">Polityka Prywatności</span>
          </div>

          <span className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 block opacity-80">
            DOKUMENT PRAWNY
          </span>
          <h1 className="font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase mb-10">
            Polityka<br />Prywatności
          </h1>

          {/* Lead text */}
          <div className="max-w-3xl border-l-2 border-accent/40 pl-8 mt-10">
            <p className="font-sans text-ivory/60 text-lg leading-relaxed">
              Szacunek do Twojego biznesu zaczyna się od szacunku do Twoich danych. W SCALOVA projektujemy systemy opierające się na danych i automatyzacji, dlatego doskonale wiemy, jak ważna jest ich ochrona.
            </p>
            <p className="font-sans text-ivory/60 text-lg leading-relaxed mt-4">
              Niniejsza Polityka Prywatności to dokument, z którego dowiesz się, jak zbieramy, przetwarzamy i chronimy Twoje dane osobowe. Zależało nam, aby napisać ją możliwie najprostszym językiem – bez zbędnego, prawniczego żargonu, za to z pełną transparentnością.
            </p>
            <p className="font-sans text-ivory/50 text-base leading-relaxed mt-4">
              Prosimy o zapoznanie się z poniższymi zasadami przed rozpoczęciem korzystania z naszych usług i strony internetowej.
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
          <p className="font-mono text-[10px] text-ivory/20 tracking-widest uppercase">Ostatnia aktualizacja: 01.01.2026</p>
        </div>
      </div>
    </div>
  );
}
