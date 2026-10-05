import React, { useState } from 'react';
import { Team, TeamEvaluation } from '../types';
import { calculateWeightedScore } from '../data/rubricData';
import { Plus, Search, CheckCircle2, Clock, Users, X, RotateCcw } from 'lucide-react';

interface TeamSelectorProps {
  teams: Team[];
  selectedTeamId: string;
  evaluations: Record<string, TeamEvaluation>;
  onSelectTeam: (teamId: string) => void;
  onAddTeam: (newTeam: Omit<Team, 'id'>) => void;
  onResetToDefaultTeams?: () => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({
  teams,
  selectedTeamId,
  evaluations,
  onSelectTeam,
  onAddTeam,
  onResetToDefaultTeams,
}) => {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newPresenterName, setNewPresenterName] = useState('');
  const [newCategory, setNewCategory] = useState('Product Showcase');

  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.projectTitle && t.projectTitle.toLowerCase().includes(search.toLowerCase())) ||
      (t.category && t.category.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    onAddTeam({
      name: newTeamName.trim(),
      projectTitle: newProjectTitle.trim() || undefined,
      presenterName: newPresenterName.trim() || undefined,
      category: newCategory.trim() || undefined,
      avatarColor: 'from-blue-600 to-indigo-700',
    });

    setNewTeamName('');
    setNewProjectTitle('');
    setNewPresenterName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-3">
      {/* Search & Add Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team or product title..."
            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {onResetToDefaultTeams && (
          <button
            onClick={onResetToDefaultTeams}
            title="Reset to the 6 official competition teams"
            className="px-3 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-400 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Reset to 6 Teams</span>
          </button>
        )}

        <button
          id="btn-add-team-trigger"
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Finalist</span>
        </button>
      </div>

      {/* Horizontal / Grid Team Selector Pills */}
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
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left border transition-all shrink-0 min-w-[220px] ${
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
                    : (team.projectTitle || 'In Evaluation')}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Add Team Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Add New Entry
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Team / Contestant Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g. Nexus Dynamics"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Project / Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="e.g. AI-Powered Smart Solar Grid"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Presenter(s)
                  </label>
                  <input
                    type="text"
                    value={newPresenterName}
                    onChange={(e) => setNewPresenterName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. CleanTech"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

