import React, { useState, useEffect } from 'react';
import { Team, TeamEvaluation, ScoreRating } from './types';
import { RUBRIC_CRITERIA, calculateWeightedScore } from './data/rubricData';
import { INITIAL_TEAMS } from './data/sampleTeams';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TeamSelector } from './components/TeamSelector';
import { ScoringSheet } from './components/ScoringSheet';
import { ScoreSummaryCard } from './components/ScoreSummaryCard';
import { LeaderboardView } from './components/LeaderboardView';
import { RubricMatrixModal } from './components/RubricMatrixModal';

const TEAMS_STORAGE_KEY = 'rubric_judging_teams_v3';
const EVALUATIONS_STORAGE_KEY = 'rubric_judging_evaluations_v3';
const JUDGE_NAME_STORAGE_KEY = 'rubric_judging_judge_name_v1';

export default function App() {
  // Load saved teams or default
  const [teams, setTeams] = useState<Team[]>(() => {
    try {
      const saved = localStorage.getItem(TEAMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If previous teams had old sample names or old descriptions, reset to INITIAL_TEAMS
          const hasOldData = parsed.some(
            (t: Team) =>
              t.name === 'Team Horizon' ||
              t.name === 'BioPulse Tech' ||
              Boolean(t.projectTitle && t.projectTitle.includes('Mindful Wellness'))
          );
          if (!hasOldData) {
            return parsed;
          }
        }
      }
      return INITIAL_TEAMS;
    } catch (e) {
      return INITIAL_TEAMS;
    }
  });

  const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || '');

  // Load saved evaluations or empty object
  const [evaluations, setEvaluations] = useState<Record<string, TeamEvaluation>>(() => {
    try {
      const saved = localStorage.getItem(EVALUATIONS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Load saved judge name
  const [judgeName, setJudgeName] = useState<string>(() => {
    try {
      return localStorage.getItem(JUDGE_NAME_STORAGE_KEY) || 'Official Judge';
    } catch (e) {
      return 'Official Judge';
    }
  });

  const [activeTab, setActiveTab] = useState<'scoring' | 'leaderboard'>('scoring');
  const [isRubricModalOpen, setIsRubricModalOpen] = useState<boolean>(false);

  // Persist teams
  useEffect(() => {
    try {
      localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
    } catch (e) {
      console.error('Failed to save teams', e);
    }
  }, [teams]);

  // Persist evaluations
  useEffect(() => {
    try {
      localStorage.setItem(EVALUATIONS_STORAGE_KEY, JSON.stringify(evaluations));
    } catch (e) {
      console.error('Failed to save evaluations', e);
    }
  }, [evaluations]);

  // Persist judge name
  useEffect(() => {
    try {
      localStorage.setItem(JUDGE_NAME_STORAGE_KEY, judgeName);
    } catch (e) {
      console.error('Failed to save judge name', e);
    }
  }, [judgeName]);

  const currentTeam = teams.find((t) => t.id === selectedTeamId) || teams[0];

  const currentEvaluation: TeamEvaluation = evaluations[currentTeam?.id] || {
    teamId: currentTeam?.id || '',
    judgeName: judgeName,
    scores: {},
    notes: {},
    generalFeedback: '',
    lastUpdated: new Date().toISOString(),
    isComplete: false,
  };

  // Update Score
  const handleUpdateScore = (criterionId: string, score: ScoreRating) => {
    if (!currentTeam) return;

    setEvaluations((prev) => {
      const existing = prev[currentTeam.id] || {
        teamId: currentTeam.id,
        judgeName: judgeName,
        scores: {},
        notes: {},
        generalFeedback: '',
        lastUpdated: new Date().toISOString(),
        isComplete: false,
      };

      const updatedScores = { ...existing.scores, [criterionId]: score };
      const calcResult = calculateWeightedScore(updatedScores);

      return {
        ...prev,
        [currentTeam.id]: {
          ...existing,
          scores: updatedScores,
          isComplete: calcResult.isComplete,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  // Update Note
  const handleUpdateNote = (criterionId: string, note: string) => {
    if (!currentTeam) return;

    setEvaluations((prev) => {
      const existing = prev[currentTeam.id] || {
        teamId: currentTeam.id,
        judgeName: judgeName,
        scores: {},
        notes: {},
        generalFeedback: '',
        lastUpdated: new Date().toISOString(),
        isComplete: false,
      };

      return {
        ...prev,
        [currentTeam.id]: {
          ...existing,
          notes: { ...existing.notes, [criterionId]: note },
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  // Update General Feedback
  const handleUpdateGeneralFeedback = (feedback: string) => {
    if (!currentTeam) return;

    setEvaluations((prev) => {
      const existing = prev[currentTeam.id] || {
        teamId: currentTeam.id,
        judgeName: judgeName,
        scores: {},
        notes: {},
        generalFeedback: '',
        lastUpdated: new Date().toISOString(),
        isComplete: false,
      };

      return {
        ...prev,
        [currentTeam.id]: {
          ...existing,
          generalFeedback: feedback,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  // Add Team
  const handleAddTeam = (newTeamData: Omit<Team, 'id'>) => {
    const newId = `team-${Date.now()}`;
    const newTeam: Team = { ...newTeamData, id: newId };
    setTeams((prev) => [...prev, newTeam]);
    setSelectedTeamId(newId);
  };

  // Reset to default 6 official competition teams
  const handleResetToDefaultTeams = () => {
    setTeams(INITIAL_TEAMS);
    setSelectedTeamId(INITIAL_TEAMS[0].id);
  };

  // Reset Evaluation for current team
  const handleResetEvaluation = () => {
    if (!currentTeam) return;
    setEvaluations((prev) => {
      const copy = { ...prev };
      delete copy[currentTeam.id];
      return copy;
    });
  };

  // Clear all evaluations
  const handleClearAllEvaluations = () => {
    setEvaluations({});
  };

  // Next team helper
  const handleNextTeam = () => {
    const currentIndex = teams.findIndex((t) => t.id === selectedTeamId);
    if (currentIndex >= 0 && currentIndex < teams.length - 1) {
      setSelectedTeamId(teams[currentIndex + 1].id);
    } else if (teams.length > 0) {
      setSelectedTeamId(teams[0].id);
    }
  };

  const completedCount = (Object.values(evaluations) as TeamEvaluation[]).filter(
    (e) => calculateWeightedScore(e.scores).isComplete
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors pb-12">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRubricMatrix={() => setIsRubricModalOpen(true)}
        judgeName={judgeName}
        onUpdateJudgeName={setJudgeName}
        completedCount={completedCount}
        totalTeams={teams.length}
      />

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <HeroBanner />

        {activeTab === 'scoring' ? (
          <div className="space-y-6">
            {/* Team Navigation Selector */}
            <TeamSelector
              teams={teams}
              selectedTeamId={selectedTeamId}
              evaluations={evaluations}
              onSelectTeam={setSelectedTeamId}
              onAddTeam={handleAddTeam}
              onResetToDefaultTeams={handleResetToDefaultTeams}
            />

            {/* Main Scoring Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Column (2 cols): Interactive Rubric Criteria Scoring */}
              <div className="lg:col-span-2">
                {currentTeam ? (
                  <ScoringSheet
                    team={currentTeam}
                    criteria={RUBRIC_CRITERIA}
                    evaluation={currentEvaluation}
                    onUpdateScore={handleUpdateScore}
                    onUpdateNote={handleUpdateNote}
                    onUpdateGeneralFeedback={handleUpdateGeneralFeedback}
                  />
                ) : (
                  <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <p className="text-slate-500">No team selected. Please add or select a team above.</p>
                  </div>
                )}
              </div>

              {/* Right Column (1 col): Real-time Score Tally Card */}
              <div className="lg:col-span-1">
                {currentTeam && (
                  <ScoreSummaryCard
                    team={currentTeam}
                    evaluation={currentEvaluation}
                    criteria={RUBRIC_CRITERIA}
                    onResetEvaluation={handleResetEvaluation}
                    onNextTeam={teams.length > 1 ? handleNextTeam : undefined}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Leaderboard & Summary View */
          <LeaderboardView
            teams={teams}
            evaluations={evaluations}
            criteria={RUBRIC_CRITERIA}
            onSelectTeam={(id) => {
              setSelectedTeamId(id);
              setActiveTab('scoring');
            }}
            onClearAllEvaluations={handleClearAllEvaluations}
          />
        )}
      </main>

      {/* Full Rubric Reference Modal */}
      <RubricMatrixModal
        isOpen={isRubricModalOpen}
        onClose={() => setIsRubricModalOpen(false)}
        criteria={RUBRIC_CRITERIA}
      />
    </div>
  );
}
