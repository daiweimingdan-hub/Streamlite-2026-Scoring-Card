import React, { useState } from 'react';
import { RubricCriterion, ScoreRating } from '../types';
import { CriteriaHoverTooltip } from './CriteriaHoverTooltip';
import { Info, Sparkles, Lock } from 'lucide-react';

interface ScoreButtonKeypadProps {
  criterion: RubricCriterion;
  selectedScore: ScoreRating | null;
  onSelectScore: (score: ScoreRating) => void;
  isLocked?: boolean;
  onAttemptLockedClick?: () => void;
  passwordSlot?: React.ReactNode;
}

export const ScoreButtonKeypad: React.FC<ScoreButtonKeypadProps> = ({
  criterion,
  selectedScore,
  onSelectScore,
  isLocked = false,
  onAttemptLockedClick,
  passwordSlot,
}) => {
  const [hoveredScore, setHoveredScore] = useState<ScoreRating | null>(null);

  const ratingsList: ScoreRating[] = [0, 1, 2, 3, 4, 5];

  const getScoreStyle = (score: ScoreRating, isSelected: boolean) => {
    if (isSelected) {
      return 'border-2 border-amber-400 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-105';
    }

    if (isLocked) {
      return 'border-2 border-slate-800 bg-slate-900/60 text-slate-400 font-bold hover:border-yellow-500/40 hover:bg-slate-800/80';
    }

    return 'border-2 border-slate-700 bg-slate-900 text-slate-300 font-bold hover:border-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:shadow-sm';
  };

  const activeDescriptorScore = hoveredScore !== null ? hoveredScore : selectedScore;

  return (
    <div className="space-y-3">
      {/* Score Buttons Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
            Score:
          </span>
          {ratingsList.map((scoreVal) => {
            const isSelected = selectedScore === scoreVal;
            const isHovered = hoveredScore === scoreVal;
            const descriptor = criterion.ratings[scoreVal];

            return (
              <div
                key={scoreVal}
                className="relative inline-block"
                onMouseEnter={() => setHoveredScore(scoreVal)}
                onMouseLeave={() => setHoveredScore(null)}
              >
                <button
                  id={`btn-score-${criterion.id}-${scoreVal}`}
                  type="button"
                  onClick={() => {
                    if (isLocked) {
                      onAttemptLockedClick?.();
                      return;
                    }
                    onSelectScore(scoreVal);
                  }}
                  aria-label={`Assign score ${scoreVal} out of 5 for ${criterion.title}`}
                  aria-pressed={isSelected}
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl transition-all duration-150 flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95 ${
                    isLocked ? 'cursor-pointer hover:ring-1 hover:ring-yellow-400' : ''
                  } ${getScoreStyle(scoreVal, isSelected)}`}
                >
                  <span className="text-base">{scoreVal}</span>
                  {isLocked && !isSelected && (
                    <Lock className="w-2.5 h-2.5 text-yellow-500/80 absolute top-1 right-1" />
                  )}
                  {scoreVal === 5 && isSelected && (
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                  )}
                </button>

                {/* Hover Tooltip - always works to see marking criteria */}
                <CriteriaHoverTooltip
                  score={scoreVal}
                  weightage={criterion.weightage}
                  descriptor={descriptor}
                  criterionTitle={criterion.title}
                  isVisible={isHovered}
                />
              </div>
            );
          })}

          {/* Password Slot Beside Buttons (for official Sales use) */}
          {passwordSlot && (
            <div className="inline-flex items-center my-1 sm:my-0">
              {passwordSlot}
            </div>
          )}
        </div>

        {/* Selected Score Indicator Badge */}
        <div className="flex items-center gap-2 self-start xl:self-auto">
          {selectedScore !== null ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-semibold">
              <span className="uppercase text-[10px] font-black text-amber-400">Selected:</span>
              <span className="text-sm font-black">{selectedScore} / 5</span>
              <span className="text-slate-400 text-[11px]">
                ({((selectedScore / 5) * criterion.weightage).toFixed(1)}%)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{isLocked ? 'Official use' : 'Press or click 0–5'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Active Rating Criteria Descriptor Preview Panel */}
      {activeDescriptorScore !== null && (
        <div
          id={`active-descriptor-${criterion.id}`}
          className="p-4 rounded-2xl bg-slate-950 border border-slate-800 transition-all duration-200 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm">
                Rating {activeDescriptorScore}
              </span>
              <span className="text-xs font-extrabold text-amber-300">
                {criterion.ratings[activeDescriptorScore].summary}
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
              {hoveredScore !== null ? 'Hover Preview' : 'Active Score'}
            </span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
            {criterion.ratings[activeDescriptorScore].points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                <span className="text-cyan-400 font-black mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

