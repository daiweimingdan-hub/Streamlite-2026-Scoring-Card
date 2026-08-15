import React from 'react';
import { RubricCriterion, Team, TeamEvaluation } from '../types';
import { calculateWeightedScore, getPerformanceTier } from '../data/rubricData';
import { CheckCircle2, AlertCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';

interface ScoreSummaryCardProps {
  team: Team;
  evaluation: TeamEvaluation;
  criteria: RubricCriterion[];
  onResetEvaluation: () => void;
  onNextTeam?: () => void;
}

export const ScoreSummaryCard: React.FC<ScoreSummaryCardProps> = ({
  team,
  evaluation,
  criteria,
  onResetEvaluation,
  onNextTeam,
}) => {
  const result = calculateWeightedScore(evaluation.scores);
  const tier = getPerformanceTier(result.scoreOutOfFive);

  return (
    <div
      id="score-summary-card"
      className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sticky top-20"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Live Score Tally
          </span>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate max-w-[200px]">
            {team.name}
          </h3>
        </div>
        <div>
          {result.isComplete ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Complete
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
              <AlertCircle className="w-3.5 h-3.5" />
              In Progress
            </span>
          )}
        </div>
      </div>

      {/* Main Gold Gradient Score Box */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 rounded-2xl p-5 text-slate-950 shadow-xl shadow-amber-500/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-950/80 font-black uppercase tracking-wider">
            Composite Score
          </span>
          <span className="text-xs font-mono font-black bg-slate-950/15 px-2.5 py-0.5 rounded-lg text-slate-950">
            {tier.label}
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-black tracking-tight font-mono">
              {result.scoreOutOfFive.toFixed(2)}
            </span>
            <span className="text-sm font-bold text-slate-900/80">/ 5.00</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-black font-mono text-slate-950">
              {result.percentage.toFixed(1)}%
            </span>
            <span className="text-[10px] block text-slate-900/80 uppercase tracking-wider font-extrabold">
              Overall Weight
            </span>
          </div>
        </div>

        {/* Progress bar inside gold box */}
        <div className="w-full h-2 rounded-full bg-slate-950/20 overflow-hidden">
          <div
            className="h-full bg-slate-950 transition-all duration-300 rounded-full"
            style={{ width: `${result.percentage}%` }}
          />
        </div>
      </div>

      {/* Performance Tier Note */}
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
        <div className="flex items-center justify-between font-extrabold text-slate-100">
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Performance Tier
          </span>
          <span className="text-amber-400 font-mono font-bold">{tier.label}</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
          {tier.description}
        </p>
      </div>

      {/* Criteria Breakdown */}
      <div className="space-y-2.5">
        <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-400">
          Rubric Breakdown
        </h4>
        <div className="space-y-2">
          {criteria.map((crit) => {
            const rawScore = evaluation.scores[crit.id];
            const hasScore = rawScore !== undefined && rawScore !== null;
            const weightedContribution = hasScore
              ? ((rawScore / 5) * (crit.weightage / 100) * 5).toFixed(2)
              : '0.00';
            const progressPct = hasScore ? (rawScore / 5) * 100 : 0;

            return (
              <div key={crit.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-semibold truncate max-w-[160px]">
                    {crit.title}
                  </span>
                  <div className="font-mono text-xs font-bold text-slate-200">
                    {hasScore ? (
                      <span>
                        <span className="text-amber-300 font-extrabold">{rawScore}</span>/5{' '}
                        <span className="text-slate-400 font-normal">
                          (+{weightedContribution})
                        </span>
                      </span>
                    ) : (
                      <span className="text-slate-500 italic font-normal text-[11px]">Unrated</span>
                    )}
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      hasScore ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-transparent'
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
        {onNextTeam && (
          <button
            id="btn-next-team"
            onClick={onNextTeam}
            className="w-full py-3 px-4 rounded-2xl font-black text-xs bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Rate Next Finalist</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        <button
          id="btn-reset-current-scores"
          onClick={onResetEvaluation}
          className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Scores for {team.name}
        </button>
      </div>
    </div>
  );
};

