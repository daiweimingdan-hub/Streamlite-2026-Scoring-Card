import React, { useEffect, useState } from 'react';
import { RubricCriterion, ScoreRating, Team, TeamEvaluation } from '../types';
import { ScoreButtonKeypad } from './ScoreButtonKeypad';
import { MessageSquare, Keyboard, CheckCircle, Lightbulb } from 'lucide-react';

interface ScoringSheetProps {
  team: Team;
  criteria: RubricCriterion[];
  evaluation: TeamEvaluation;
  onUpdateScore: (criterionId: string, score: ScoreRating) => void;
  onUpdateNote: (criterionId: string, note: string) => void;
  onUpdateGeneralFeedback: (feedback: string) => void;
}

export const ScoringSheet: React.FC<ScoringSheetProps> = ({
  team,
  criteria,
  evaluation,
  onUpdateScore,
  onUpdateNote,
  onUpdateGeneralFeedback,
}) => {
  const [activeCriterionId, setActiveCriterionId] = useState<string>(criteria[0]?.id || '');

  // Keyboard shortcut listener to key in 0, 1, 2, 3, 4, 5 directly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when user is typing in text inputs or textareas
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (['0', '1', '2', '3', '4', '5'].includes(e.key)) {
        const numVal = parseInt(e.key, 10) as ScoreRating;
        if (activeCriterionId) {
          onUpdateScore(activeCriterionId, numVal);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCriterionId, onUpdateScore]);

  return (
    <div className="space-y-6">
      {/* Active Team Presentation Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <div className="w-56 h-56 rounded-full bg-amber-500 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm">
                {team.category}
              </span>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Live Stream Evaluation</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{team.name}</span>
            </h2>
            <p className="text-sm font-medium text-slate-300">
              Project: <span className="text-amber-300 font-bold">{team.projectTitle}</span>
            </p>
            {team.presenterName && (
              <p className="text-xs text-slate-400">
                Presenter(s): {team.presenterName}
              </p>
            )}
          </div>

          {/* Keying shortcut hint */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs text-slate-300 self-start md:self-auto backdrop-blur-sm shadow-inner">
            <Keyboard className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Keypad Shortcut: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-amber-300 font-mono font-bold">0</kbd> to <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-amber-300 font-mono font-bold">5</kbd>
            </span>
          </div>
        </div>
      </div>

      {/* Criteria Scoring Cards List */}
      <div className="space-y-5">
        {criteria.map((crit, index) => {
          const currentScore = evaluation.scores[crit.id] ?? null;
          const currentNote = evaluation.notes[crit.id] || '';
          const isActive = activeCriterionId === crit.id;

          return (
            <div
              key={crit.id}
              id={`criterion-card-${crit.id}`}
              onClick={() => setActiveCriterionId(crit.id)}
              className={`p-6 rounded-3xl bg-slate-900 border transition-all duration-200 space-y-4 ${
                isActive
                  ? 'border-amber-500/80 ring-2 ring-amber-500/20 shadow-xl shadow-amber-500/5'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Criterion Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      {crit.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                    {crit.description}
                  </p>
                </div>

                {/* Weightage Tag */}
                <div className="shrink-0 flex items-center gap-2 self-start">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                    Weightage: {crit.weightage}%
                  </span>
                  {currentScore !== null && (
                    <span className="p-1 rounded-full text-amber-400">
                      <CheckCircle className="w-5 h-5" />
                    </span>
                  )}
                </div>
              </div>

              {/* Score Keypad & Hover Criteria Descriptions */}
              <ScoreButtonKeypad
                criterion={crit}
                selectedScore={currentScore}
                onSelectScore={(score) => {
                  setActiveCriterionId(crit.id);
                  onUpdateScore(crit.id, score);
                }}
              />

              {/* Criterion Specific Comments/Notes */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-amber-400">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Juror Remarks for {crit.title}:</span>
                </div>
                <textarea
                  id={`note-input-${crit.id}`}
                  value={currentNote}
                  onChange={(e) => onUpdateNote(crit.id, e.target.value)}
                  placeholder={`Optional constructive remarks regarding ${crit.title.toLowerCase()}...`}
                  rows={2}
                  className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-y"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* General Feedback Text Area */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-extrabold text-white">
            Overall Presentation Feedback & Suggestions
          </h3>
        </div>
        <textarea
          id="general-feedback-input"
          value={evaluation.generalFeedback || ''}
          onChange={(e) => onUpdateGeneralFeedback(e.target.value)}
          placeholder="Key strengths, overall highlights, or actionable recommendations for the team..."
          rows={3}
          className="w-full p-3.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-y"
        />
      </div>
    </div>
  );
};

