import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { RubricCriterion, Team, TeamEvaluation } from '../types';
import { calculateWeightedScore, getPerformanceTier } from '../data/rubricData';
import { Trophy, Download, Search, Filter, CheckCircle2, Clock, Trash2, ExternalLink, FileSpreadsheet } from 'lucide-react';

interface LeaderboardViewProps {
  teams: Team[];
  evaluations: Record<string, TeamEvaluation>;
  criteria: RubricCriterion[];
  onSelectTeam: (teamId: string) => void;
  onClearAllEvaluations: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  teams,
  evaluations,
  criteria,
  onSelectTeam,
  onClearAllEvaluations,
}) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [search, setSearch] = useState('');

  // Calculate scores for all teams
  const rankedTeams = teams
    .map((team) => {
      const evaluation = evaluations[team.id];
      const scores = evaluation ? evaluation.scores : {};
      const result = calculateWeightedScore(scores);
      const tier = getPerformanceTier(result.scoreOutOfFive);

      return {
        team,
        evaluation,
        result,
        tier,
      };
    })
    .filter(({ team, result }) => {
      const matchesSearch =
        team.name.toLowerCase().includes(search.toLowerCase()) ||
        (team.projectTitle ? team.projectTitle.toLowerCase().includes(search.toLowerCase()) : false);

      if (filter === 'completed') return matchesSearch && result.isComplete;
      if (filter === 'pending') return matchesSearch && !result.isComplete;
      return matchesSearch;
    })
    .sort((a, b) => b.result.scoreOutOfFive - a.result.scoreOutOfFive);

  // Excel Export functionality
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    // 1. Leaderboard Sheet
    const leaderboardRows = rankedTeams.map((item, index) => {
      const { team, evaluation, result, tier } = item;
      const rowData: Record<string, string | number> = {
        'Rank': index + 1,
        'Company': team.name,
      };

      if (team.projectTitle) {
        rowData['Project Title'] = team.projectTitle;
      }
      if (team.category) {
        rowData['Category'] = team.category;
      }

      rowData['Composite Score (0-5)'] = Number(result.scoreOutOfFive.toFixed(2));
      rowData['Overall %'] = Number(result.percentage.toFixed(1));
      rowData['Performance Tier'] = tier.label;
      rowData['Status'] = result.isComplete ? 'Complete' : 'Pending';

      // Add each criterion column
      criteria.forEach((c) => {
        const val = evaluation?.scores[c.id];
        rowData[`${c.title} (${c.weightage}%)`] =
          val !== undefined && val !== null ? val : 'Unrated';
      });

      rowData['General Feedback'] = evaluation?.generalFeedback || '';
      return rowData;
    });

    const wsLeaderboard = XLSX.utils.json_to_sheet(leaderboardRows);
    wsLeaderboard['!cols'] = [
      { wch: 6 },  // Rank
      { wch: 24 }, // Company
      { wch: 22 }, // Composite Score
      { wch: 12 }, // Overall %
      { wch: 18 }, // Tier
      { wch: 12 }, // Status
      ...criteria.map(() => ({ wch: 24 })),
      { wch: 45 }, // Feedback
    ];
    XLSX.utils.book_append_sheet(wb, wsLeaderboard, 'Final Leaderboard');

    // 2. Detailed Criterion Breakdown Sheet
    const breakdownRows: Array<{
      'Rank': number;
      'Company': string;
      'Criterion': string;
      'Weightage (%)': number;
      'Assigned Score (0-5)': number | string;
      'Weighted Contribution (%)': number | string;
      'Criterion Remark': string;
    }> = [];

    rankedTeams.forEach((item, index) => {
      const { team, evaluation } = item;
      criteria.forEach((c) => {
        const scoreVal = evaluation?.scores[c.id];
        const hasScore = scoreVal !== undefined && scoreVal !== null;
        const weightedPct = hasScore
          ? ((scoreVal / 5) * c.weightage).toFixed(2)
          : 'N/A';
        const note = evaluation?.notes?.[c.id] || '';

        breakdownRows.push({
          'Rank': index + 1,
          'Company': team.name,
          'Criterion': c.title,
          'Weightage (%)': c.weightage,
          'Assigned Score (0-5)': hasScore ? scoreVal : 'Unrated',
          'Weighted Contribution (%)': hasScore ? Number(weightedPct) : 'N/A',
          'Criterion Remark': note,
        });
      });
    });

    const wsBreakdown = XLSX.utils.json_to_sheet(breakdownRows);
    wsBreakdown['!cols'] = [
      { wch: 6 },
      { wch: 22 },
      { wch: 26 },
      { wch: 15 },
      { wch: 20 },
      { wch: 25 },
      { wch: 40 },
    ];
    XLSX.utils.book_append_sheet(wb, wsBreakdown, 'Detailed Breakdown');

    // 3. Rubric Matrix Reference Sheet
    const rubricRows = criteria.map((c) => ({
      'Criterion': c.title,
      'Description': c.description,
      'Weightage (%)': c.weightage,
      '0 - None': c.ratings[0].summary + ': ' + c.ratings[0].points.join('; '),
      '1 - Extreme Weakness': c.ratings[1].summary + ': ' + c.ratings[1].points.join('; '),
      '2 - Low Quality': c.ratings[2].summary + ': ' + c.ratings[2].points.join('; '),
      '3 - Good Quality': c.ratings[3].summary + ': ' + c.ratings[3].points.join('; '),
      '4 - High Quality': c.ratings[4].summary + ': ' + c.ratings[4].points.join('; '),
      '5 - Flawless': c.ratings[5].summary + ': ' + c.ratings[5].points.join('; '),
    }));

    const wsRubric = XLSX.utils.json_to_sheet(rubricRows);
    wsRubric['!cols'] = [
      { wch: 24 },
      { wch: 35 },
      { wch: 15 },
      { wch: 35 },
      { wch: 35 },
      { wch: 35 },
      { wch: 35 },
      { wch: 35 },
      { wch: 35 },
    ];
    XLSX.utils.book_append_sheet(wb, wsRubric, 'Rubric Reference');

    // Write file
    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `StreamLITE_2026_Final_Results_${dateStr}.xlsx`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl border border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-white">StreamLITE Challenge Leaderboard</h2>
            <p className="text-xs text-slate-400">
              Rankings, weighted score totals, and criteria score breakdown across all finalists
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-export-excel"
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel (.xlsx)</span>
          </button>

          <button
            id="btn-clear-all-evals"
            onClick={() => {
              if (
                window.confirm('Are you sure you want to clear all judge evaluations? This cannot be undone.')
              ) {
                onClearAllEvaluations();
              }
            }}
            className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Evals</span>
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search entry by team or project title..."
            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              filter === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({teams.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              filter === 'completed'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              filter === 'pending'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            In Progress
          </button>
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4 w-16 text-center">Rank</th>
                <th className="p-4 min-w-[200px]">Company</th>
                <th className="p-4 w-28 text-center">Score / 5.0</th>
                <th className="p-4 w-24 text-center">Overall %</th>
                <th className="p-4 w-36 text-center">Tier</th>
                {criteria.map((c) => {
                  const isSales = c.id === 'sales';
                  return (
                    <th
                      key={c.id}
                      className={`p-4 w-24 text-center ${
                        isSales
                          ? 'bg-yellow-500/20 text-yellow-400 border-x border-yellow-500/30 font-black'
                          : ''
                      }`}
                    >
                      {c.title.split(' ')[0]} ({c.weightage}%)
                    </th>
                  );
                })}
                <th className="p-4 w-28 text-center">Status</th>
                <th className="p-4 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {rankedTeams.map((item, idx) => {
                const { team, evaluation, result, tier } = item;
                const rank = idx + 1;

                return (
                  <tr
                    key={team.id}
                    id={`leaderboard-row-${team.id}`}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Rank badge */}
                    <td className="p-4 text-center font-extrabold font-mono text-sm">
                      {rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 font-black">
                          🥇 1
                        </span>
                      ) : rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 font-black">
                          🥈 2
                        </span>
                      ) : rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-900/20 text-amber-900 dark:text-amber-400 border border-amber-800/30 font-black">
                          🥉 3
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold">#{rank}</span>
                      )}
                    </td>

                    {/* Team info */}
                    <td className="p-4">
                      <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                        {team.name}
                      </div>
                      {team.projectTitle && (
                        <div className="text-slate-500 dark:text-slate-400 font-medium text-xs">
                          {team.projectTitle}
                        </div>
                      )}
                      {team.category && (
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block mt-0.5">
                          {team.category}
                        </span>
                      )}
                    </td>

                    {/* Overall Score */}
                    <td className="p-4 text-center font-mono font-black text-base text-slate-900 dark:text-white">
                      {result.scoreOutOfFive.toFixed(2)}
                    </td>

                    {/* Percentage */}
                    <td className="p-4 text-center font-mono font-black text-blue-600 dark:text-blue-400">
                      {result.percentage.toFixed(1)}%
                    </td>

                    {/* Performance Tier */}
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${tier.badgeClass}`}>
                        {tier.label}
                      </span>
                    </td>

                    {/* Individual Criteria Ratings */}
                    {criteria.map((c) => {
                      const scoreVal = evaluation?.scores[c.id];
                      const isSales = c.id === 'sales';
                      return (
                        <td
                          key={c.id}
                          className={`p-4 text-center font-mono ${
                            isSales ? 'bg-yellow-500/10 border-x border-yellow-500/20' : ''
                          }`}
                        >
                          {scoreVal !== undefined && scoreVal !== null ? (
                            <span
                              className={`font-bold ${
                                isSales ? 'text-yellow-400 font-black' : 'text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              {scoreVal}/5
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-600 italic text-[11px]">-</span>
                          )}
                        </td>
                      );
                    })}

                    {/* Status */}
                    <td className="p-4 text-center">
                      {result.isComplete ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Complete
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => onSelectTeam(team.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 transition-colors text-slate-600 dark:text-slate-300"
                        title="Evaluate this team"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

