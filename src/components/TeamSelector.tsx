import React, { useState } from 'react';
import { Team, TeamEvaluation } from '../types';
import { calculateWeightedScore } from '../data/rubricData';
import { Search, CheckCircle2, Clock } from 'lucide-react';

interface TeamSelectorProps {
  teams: Team[];
  selectedTeamId: string;
  evaluations: Record<string, TeamEvaluation>;
  onSelectTeam: (teamId: string) => void;
  onAddTeam?: (newTeam: Omit<Team, 'id'>) => void;
  onResetToDefaultTeams?: () => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({
  teams,
  selectedTeamId,
  evaluations,
  onSelectTeam,
}) => {
  const [search, setSearch] = useState('');

  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Finalist Selection Header & Search */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-300">
            Finalist Selection
          </span>
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-slate-900 text-amber-400 border border-slate-800">
            {teams.length} Companies
          </span>
        </div>

        <div className="relative w-64 max-w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search finalist..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-800 bg-slate-900/90 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/30 transition-all"
          />
        </div>
      </div>

      {/* Horizontal Team Selector Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
        {filteredTeams.map((team) => {
          const isSelected = team.id === selectedTeamId;
          const evaluation = evaluations[team.id];
          const result = evaluation
            ? calculateWeightedScore(evaluation.scores)
            : { isComplete: false, scoreOutOfFive: 0 };

          return (
            <button
              key={team.id}
              id={`team-tab-${team.id}`}
              onClick={() => onSelectTeam(team.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left border transition-all shrink-0 min-w-[210px] ${
                isSelected
                  ? 'bg-slate-900 text-white border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-cyan-400 border border-slate-700'
                }`}
              >
                {team.name.substring(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className={`font-extrabold text-xs truncate ${isSelected ? 'text-amber-300' : 'text-slate-100'}`}>
                    {team.name}
                  </span>
                  {result.isComplete ? (
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-emerald-400'}`} />
                  ) : (
                    <Clock className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  )}
                </div>
                <div className={`text-[11px] font-medium truncate ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {result.isComplete
                    ? `Score: ${result.scoreOutOfFive.toFixed(2)} / 5`
                    : 'In Evaluation'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
