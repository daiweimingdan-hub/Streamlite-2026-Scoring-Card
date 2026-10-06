import React, { useState } from 'react';
import bannerImg from '../assets/images/streamlite_banner_1786611663861.jpg';
import logoImg from '../assets/images/streamlite_logo_1786611677942.jpg';
import { Radio, Sparkles, ChevronDown, ChevronUp, Tv } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative mb-6 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950 transition-all duration-300">
      {/* Background Image with Dark Vignette and Gold Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImg}
          alt="StreamLITE Digital Engagement Challenge 2026 Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Hero Banner Content */}
      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 max-w-3xl">
            {/* Live Broadcast Badge & StreamLITE Logo */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-black shadow-lg backdrop-blur-md">
                <img
                  src={logoImg}
                  alt="StreamLITE Logo"
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-cyan-400"
                />
                <span className="tracking-wide">StreamLITE</span>
                <span className="text-cyan-400 font-mono text-[10px] border-l border-amber-500/30 pl-2">
                  STAGE • CAMERA • ACTION
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 text-xs font-bold animate-pulse shadow-md">
                <Radio className="w-3.5 h-3.5" />
                <span>LIVE FINALS EVALUATION</span>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold">
                <Tv className="w-3 h-3 text-cyan-400" />
                <span>Broadcast Showdown</span>
              </div>
            </div>

            {/* Main Glowing Golden Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                DIGITAL ENGAGEMENT CHALLENGE 2026
              </h1>
              {!isCollapsed && (
                <p className="mt-2 text-sm sm:text-base font-medium text-slate-200 leading-relaxed max-w-2xl text-shadow">
                  The ultimate digital showdown where finalists go live to captivate the crowd, master the chat, and own the screen.
                </p>
              )}
            </div>
          </div>

          {/* Toggle Banner Size Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-amber-400/50 transition-all backdrop-blur-md shrink-0"
            title={isCollapsed ? 'Expand Header Banner' : 'Collapse Header Banner'}
          >
            {isCollapsed ? <ChevronDown className="w-5 h-5 text-amber-400" /> : <ChevronUp className="w-5 h-5 text-amber-400" />}
          </button>
        </div>

        {/* Feature Highlights Bar when expanded */}
        {!isCollapsed && (
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
            <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                15%
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-slate-100 truncate text-[11px]">Delivery</p>
                <p className="text-[9px] text-slate-400 truncate">Showmanship</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                10%
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-slate-100 truncate text-[11px]">Creativity</p>
                <p className="text-[9px] text-slate-400 truncate">Storytelling</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
                20%
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-slate-100 truncate text-[11px]">Engagement</p>
                <p className="text-[9px] text-slate-400 truncate">Live Chat & Crowd</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                10%
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-slate-100 truncate text-[11px]">Communication</p>
                <p className="text-[9px] text-slate-400 truncate">Articulation</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                10%
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-slate-100 truncate text-[11px]">Technical</p>
                <p className="text-[9px] text-slate-400 truncate">Audio & Visuals</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">
                10%
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-slate-100 truncate text-[11px]">Citizenship</p>
                <p className="text-[9px] text-slate-400 truncate">Professionalism</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-yellow-950/70 border border-yellow-500/60 backdrop-blur-md flex items-center gap-2 ring-1 ring-yellow-500/30">
              <div className="w-7 h-7 rounded-lg bg-yellow-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                25%
              </div>
              <div className="min-w-0">
                <p className="font-black text-yellow-300 truncate text-[11px]">Sales (Units)</p>
                <p className="text-[9px] text-yellow-400/80 truncate font-semibold">Official Use Only</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
