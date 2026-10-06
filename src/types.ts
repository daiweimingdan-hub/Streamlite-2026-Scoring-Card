export type CriterionId = 
  | 'delivery_showmanship' 
  | 'content_creativity' 
  | 'audience_engagement' 
  | 'communication_skills' 
  | 'technical_execution' 
  | 'digital_citizenship' 
  | 'sales';

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
  weightage: number; // percentage, e.g., 25 for 25%
  ratings: Record<ScoreRating, RatingDescriptor>;
  isOfficialOnly?: boolean;
}

export interface Team {
  id: string;
  name: string;
  projectTitle?: string;
  presenterName?: string;
  category?: string;
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
