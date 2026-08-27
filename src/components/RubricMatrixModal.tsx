import React from 'react';
import { RubricCriterion, ScoreRating } from '../types';
import { X, Table, Printer } from 'lucide-react';

interface RubricMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  criteria: RubricCriterion[];
}

export const RubricMatrixModal: React.FC<RubricMatrixModalProps> = ({
  isOpen,
  onClose,
  criteria,
}) => {
  if (!isOpen) return null;

  const scoreRatings: ScoreRating[] = [0, 1, 2, 3, 4, 5];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-6xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                StreamLITE Presentation Rubric Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Official marking criteria & numeric rating descriptions (0–5)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Matrix Table */}
        <div className="p-4 sm:p-6 overflow-auto flex-1 scrollbar-thin">
          <div className="min-w-[900px] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-900 text-white divide-x divide-slate-800">
                  <th className="p-3.5 w-36 font-bold uppercase tracking-wider">Criteria</th>
                  <th className="p-3.5 w-48 font-bold uppercase tracking-wider">Description</th>
                  <th className="p-3.5 w-32 text-center font-bold bg-slate-900 text-slate-400">
                    0<br />
                    <span className="text-[10px] font-normal text-slate-400">None</span>
                  </th>
                  <th className="p-3.5 w-36 text-center font-bold bg-slate-850 text-slate-300">
                    1<br />
                    <span className="text-[10px] font-normal text-slate-400">Extreme</span>
                  </th>
                  <th className="p-3.5 w-36 text-center font-bold bg-slate-800 text-slate-300">
                    2<br />
                    <span className="text-[10px] font-normal text-slate-400">Low</span>
                  </th>
                  <th className="p-3.5 w-36 text-center font-bold bg-slate-800 text-slate-200">
                    3<br />
                    <span className="text-[10px] font-normal text-slate-300">Good</span>
                  </th>
                  <th className="p-3.5 w-36 text-center font-bold bg-amber-950 text-amber-200">
                    4<br />
                    <span className="text-[10px] font-normal text-amber-300">High</span>
                  </th>
                  <th className="p-3.5 w-36 text-center font-bold bg-amber-900 text-amber-100">
                    5<br />
                    <span className="text-[10px] font-normal text-amber-200">Flawless</span>
                  </th>
                  <th className="p-3.5 w-24 text-center font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950">
                    Weightage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {criteria.map((crit) => (
                  <tr
                    key={crit.id}
                    className="divide-x divide-slate-200 dark:divide-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Title */}
                    <td className="p-3.5 font-extrabold bg-slate-50/80 dark:bg-slate-900/80">
                      {crit.title}
                    </td>

                    {/* Description */}
                    <td className="p-3.5 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {crit.description}
                    </td>

                    {/* Score Ratings 5 down to 0 */}
                    {scoreRatings.map((ratingVal) => {
                      const desc = crit.ratings[ratingVal];
                      return (
                        <td
                          key={ratingVal}
                          className={`p-3.5 align-top leading-relaxed text-[11px] ${
                            ratingVal === 5
                              ? 'bg-blue-50/60 dark:bg-blue-950/20'
                              : ratingVal === 4
                              ? 'bg-blue-50/30 dark:bg-blue-950/10'
                              : 'bg-white dark:bg-slate-900'
                          }`}
                        >
                          <div className="font-bold mb-1 text-slate-900 dark:text-white">
                            {desc.summary}
                          </div>
                          <ul className="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300">
                            {desc.points.map((pt, i) => (
                              <li key={i} className="leading-tight">
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </td>
                      );
                    })}

                    {/* Weightage */}
                    <td className="p-3.5 text-center font-mono font-black text-base text-blue-600 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/20">
                      {crit.weightage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div>Total Evaluation Scale: 100% Weightage Across 4 Criteria</div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

