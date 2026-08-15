export type CriterionId = 
  | 'product_knowledge' 
  | 'structure_flow' 
  | 'communication' 
  | 'technical_execution';

export type ScoreRating = 0 | 1 | 2 | 3 | 4 | 5;

export interface RatingDescriptor {
  score: ScoreRating;
  summary: string;
  points: string[];
}

export interface RubricCriterion {
  id: CriterionId;
  title: string;
  description: string;
  weightage: number; // percentage, e.g., 30 for 30%
  ratings: Record<ScoreRating, RatingDescriptor>;
}

export interface Team {
  id: string;
  name: string;
  projectTitle: string;
  presenterName: string;
  category: string;
  avatarColor: string;
}

export interface TeamEvaluation {
  teamId: string;
  judgeName: string;
  scores: Partial<Record<CriterionId, ScoreRating>>;
  notes: Partial<Record<CriterionId, string>>;
  generalFeedback: string;
  lastUpdated: string;
  isCompleted: boolean;
}

export interface PerformanceTier {
  minScore: number;
  label: string;
  badgeClass: string;
  description: string;
}
