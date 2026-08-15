import React from 'react';
import { RatingDescriptor, ScoreRating } from '../types';
import { Award, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface CriteriaHoverTooltipProps {
  score: ScoreRating;
  weightage: number;
  descriptor: RatingDescriptor;
  criterionTitle: string;
  isVisible: boolean;
}

export const CriteriaHoverTooltip: React.FC<CriteriaHoverTooltipProps> = ({
  score,
  weightage,
  descriptor,
  criterionTitle,
  isVisible,
}) => {
  if (!isVisible) return null;

  const getScoreBadgeColor = (val: ScoreRating) => {
    switch (val) {
      case 5:
        return 'bg-emerald-600 text-white dark:bg-emerald-500';
      case 4:
        return 'bg-blue-600 text-white dark:bg-blue-500';
      case 3:
        return 'bg-amber-500 text-white dark:bg-amber-500';
      case 2:
        return 'bg-orange-500 text-white dark:bg-orange-500';
      case 1:
        return 'bg-rose-600 text-white dark:bg-rose-500';
      case 0:
        return 'bg-slate-700 text-white dark:bg-slate-600';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const getHeaderIcon = (val: ScoreRating) => {
    if (val >= 4) return <Sparkles className="w-4 h-4 text-emerald-400" />;
    if (val >= 2) return <Award className="w-4 h-4 text-amber-400" />;
    return <ShieldAlert className="w-4 h-4 text-rose-400" />;
  };

  const calculatedPoints = ((score / 5) * weightage).toFixed(1);

  return (
    <div
      id={`tooltip-score-${score}`}
      className="absolute z-50 bottom-full mb-3 left-1/2 -translate-x-1/2 w-80 max-w-[calc(100vw-2rem)] p-4 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-700/80 pointer-events-none animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
    >
      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-slate-900" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center text-sm shadow-sm ${getScoreBadgeColor(
              score
            )}`}
          >
            {score}
          </span>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Rating Level {score}/5
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              {getHeaderIcon(score)}
              {descriptor.summary}
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Contrib.</span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            +{calculatedPoints}% / {weightage}%
          </span>
        </div>
      </div>

      {/* Context info */}
      <div className="text-[11px] text-slate-400 mb-2 font-medium italic">
        Criteria: {criterionTitle}
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5 text-xs text-slate-200">
        {descriptor.points.map((pt, idx) => (
          <li key={idx} className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
