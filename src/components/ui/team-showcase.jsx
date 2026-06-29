import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';

const DEFAULT_MEMBERS = [
  {
    id: '1',
    name: 'Kacper Nowinka',
    role: 'CEO & Founder',
    image: '/zespol/kacper_nowinka.jpg',
    social: { linkedin: 'https://www.linkedin.com/company/scalova/' },
  },
  {
    id: '2',
    name: 'Krystian Gąska',
    role: 'Art Director',
    image: '/zespol/krystian_gaska.webp',
    social: { linkedin: 'https://www.linkedin.com/company/scalova/' },
  },
  {
    id: '3',
    name: 'Jędrzej Garczarek',
    role: 'Customer Success Manager',
    image: '/zespol/jedrzej_garczarek.webp',
    social: { linkedin: 'https://www.linkedin.com/company/scalova/' },
  },
  {
    id: '4',
    name: 'Antoni Skarbek',
    role: 'Marketing & Automation Specialist',
    image: '/zespol/antoni_skarbek.webp',
    social: { linkedin: 'https://www.linkedin.com/company/scalova/' },
  },
  {
    id: '5',
    name: 'Bartek Ryng',
    role: 'Closer',
    image: '/zespol/bartek_ryng.webp',
    social: { linkedin: 'https://www.linkedin.com/company/scalova/' },
  },
];

export default function TeamShowcase({ members = DEFAULT_MEMBERS }) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Grid of Team Members */}
      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 xl:gap-8 text-left">
        {members.map((member, idx) => (
          <div key={member.id} className="group/member flex flex-col justify-between">
            <div>
              {/* Individual Portrait Card */}
              <div className="group w-full relative overflow-hidden border border-white/5 group-hover/member:border-accent/40 bg-[#0c0c0c] transition-all duration-700 aspect-[3/4] select-none mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top contrast-[1.05] brightness-95 group-hover/member:brightness-100 group-hover/member:scale-[1.03] transition-all duration-1000 ease-out"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />
                
                {/* Accent corner detail */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover/member:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <img src="/ROG.png" alt="" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Thin line divider */}
              <div className="w-full h-px bg-white/10 group-hover/member:bg-accent/40 transition-colors duration-500 mb-4" />
              
              <div className="flex items-center justify-end">
                {member.social?.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/20 hover:text-accent transition-colors duration-300"
                    title="LinkedIn"
                  >
                    <FaLinkedinIn size={12} />
                  </a>
                )}
              </div>
              
              <h3 className="text-ivory font-heading font-normal text-base md:text-[17px] tracking-tight uppercase mt-3 group-hover/member:text-white transition-colors duration-300">
                {member.name}
              </h3>
              
              <span className="font-mono text-white/40 text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-1.5 block leading-snug">
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

