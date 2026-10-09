import React, { useState } from 'react';
import { Award, Table, Trophy, User, Check, Edit2, Radio } from 'lucide-react';
import logoImg from '../assets/images/streamlite_logo_1786611677942.jpg';

interface HeaderProps {
  activeTab: 'scoring' | 'leaderboard';
  setActiveTab: (tab: 'scoring' | 'leaderboard') => void;
  onOpenRubricMatrix: () => void;
  judgeName: string;
  onUpdateJudgeName: (name: string) => void;
  completedCount: number;
  totalTeams: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenRubricMatrix,
  judgeName,
  onUpdateJudgeName,
  completedCount,
  totalTeams,
}) => {
  const [isEditingJudge, setIsEditingJudge] = useState(false);
  const [tempName, setTempName] = useState(judgeName);

  const handleSaveJudge = () => {
    onUpdateJudgeName(tempName.trim() || 'Sarah Jenkins');
    setIsEditingJudge(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 transition-colors shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Logo & Session Title */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <img
              src={logoImg}
              alt="StreamLITE Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/20"
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                Stream<span className="text-cyan-400">LITE</span>
              </h1>
              <span className="text-amber-300 font-black text-[11px] px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/40 uppercase tracking-wide">
                Challenge 2026
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>STAGE</span> • <span>CAMERA</span> • <span className="text-amber-400">ACTION</span>
            </p>
          </div>
        </div>

        {/* Center: Session & Judge Info */}
        <div className="flex items-center gap-4 bg-slate-900/90 p-2 px-4 rounded-2xl border border-slate-800 self-start md:self-auto backdrop-blur-md">
          <div className="text-left">
            <p className="text-[10px] text-amber-400/90 uppercase font-black tracking-widest flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-red-400 animate-pulse" />
              Finals Progress
            </p>
            <p className="text-xs font-bold text-white font-mono">
              {completedCount} / {totalTeams} Finalists Rated
            </p>
          </div>

          <div className="w-px h-7 bg-slate-800" />

          {/* Judge Profile */}
          <div className="flex items-center gap-2.5">
            {isEditingJudge ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  autoFocus
                  className="px-2 py-1 text-xs rounded-lg border border-amber-500 bg-slate-950 text-white focus:outline-none"
                />
                <button
                  onClick={handleSaveJudge}
                  className="p-1 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingJudge(true)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                title="Click to edit judge name"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-amber-500/40 shadow-sm flex items-center justify-center text-amber-300 font-black text-xs">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-white flex items-center gap-1">
                    {judgeName}
                    <Edit2 className="w-2.5 h-2.5 text-slate-400" />
                  </p>
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">
                    Official Judge
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: View Switcher Tabs & Full Rubric Matrix Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              id="tab-btn-scoring"
              onClick={() => setActiveTab('scoring')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'scoring'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Scoring Sheet</span>
            </button>

            <button
              id="tab-btn-leaderboard"
              onClick={() => setActiveTab('leaderboard')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'leaderboard'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Leaderboard</span>
            </button>
          </div>

          <button
            id="btn-open-rubric-matrix"
            onClick={onOpenRubricMatrix}
            className="px-4 py-2 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold hover:bg-cyan-900/80 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-950/50 text-xs"
          >
            <Table className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Rubric Matrix</span>
          </button>
        </div>
      </div>
    </header>
  );
};


