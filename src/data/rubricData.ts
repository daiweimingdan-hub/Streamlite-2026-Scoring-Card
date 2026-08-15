import { RubricCriterion, PerformanceTier } from '../types';

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'product_knowledge',
    title: 'Product Knowledge & Value Proposition',
    description: "Evaluate team's confidence and product knowledge. Looks at how clearly the team explain core features and frame a persuasive value proposition for the consumer.",
    weightage: 30,
    ratings: {
      5: {
        score: 5,
        summary: 'Flawless & Profound Knowledge',
        points: [
          'Flawless / High energy / Professional-grade charisma',
          'Absolute confidence',
          'Seamlessly blends profound product knowledge that entirely commands the broadcast'
        ]
      },
      4: {
        score: 4,
        summary: 'High Energy & Natural Charisma',
        points: [
          'Natural charisma and strong confidence',
          'Displays strong product familiarity',
          'Shows smooth on-camera movement and actively captivates the audience'
        ]
      },
      3: {
        score: 3,
        summary: 'Good Confidence & Knowledge',
        points: [
          'Maintains steady energy levels and an acceptable camera presence',
          'Clear product knowledge',
          'Keeps viewers baseline-interested'
        ]
      },
      2: {
        score: 2,
        summary: 'Low Confidence & Rigid Presence',
        points: [
          'Inconsistent energy levels',
          'Displays basic product knowledge but struggles with awkward pauses',
          'Camera presence is rigid and fails to captivate viewers'
        ]
      },
      1: {
        score: 1,
        summary: 'Extreme Hesitation & Script Reading',
        points: [
          'Extreme hesitation & lack of confidence',
          'Presenter reads entirely from a script with zero camera presence',
          'Unfamiliar with product, leading to flat, unengaging delivery'
        ]
      },
      0: {
        score: 0,
        summary: 'Unable to Showcase Product',
        points: [
          'Presenter unable to showcase products'
        ]
      }
    }
  },
  {
    id: 'structure_flow',
    title: 'Structure, Flow and Time Management',
    description: 'Assess creativity and storytelling, logical transition between products and smooth pacing within the time limit.',
    weightage: 20,
    ratings: {
      5: {
        score: 5,
        summary: 'Masterclass Storytelling',
        points: [
          'Masterclass in creative storytelling; concepts are original',
          'Seamlessly weaves highly engaging theme that feels premium and distinctly memorable'
        ]
      },
      4: {
        score: 4,
        summary: 'Distinctly Unique Approach',
        points: [
          'Integrates current trends and creative storytelling flawlessly',
          'Streams stand out visually and conceptually'
        ]
      },
      3: {
        score: 3,
        summary: 'Creative & Structured Presentation',
        points: [
          'Structured presentation',
          'Successfully incorporates a clear theme or storytelling element that supports product features naturally'
        ]
      },
      2: {
        score: 2,
        summary: 'Minimal Creative Styling',
        points: [
          'Minimal attempt at creative styling',
          'Flow is highly predictable, and themes or current trends are loosely tied to products'
        ]
      },
      1: {
        score: 1,
        summary: 'Highly Generic & Repetitive',
        points: [
          'Highly generic and repetitive presentation',
          'No recognizable storytelling or creative themes'
        ]
      },
      0: {
        score: 0,
        summary: 'No Content Presented',
        points: [
          'No content presented'
        ]
      }
    }
  },
  {
    id: 'communication',
    title: 'Communication & Presenter Persona',
    description: 'Evaluate camera presence, charisma and engaging energy throughout the pre-recorded broadcast.',
    weightage: 30,
    ratings: {
      5: {
        score: 5,
        summary: 'Flawless Eloquence & Articulation',
        points: [
          'Flawless eloquence and precise articulation',
          'Compellingly delivers complex ideas with professional-level verbal flow and persuasive vocal power'
        ]
      },
      4: {
        score: 4,
        summary: 'Highly Articulate & Expressive',
        points: [
          'Highly articulate and expressive',
          'Uses intonation, vocal variety and polished pacing to emphasize selling points smoothly and persuasively'
        ]
      },
      3: {
        score: 3,
        summary: 'Clear Speech & Steady Pacing',
        points: [
          'Clear speech and steady pacing with good articulation',
          'Ideas and product features are expressed effectively and easily understood by average consumer'
        ]
      },
      2: {
        score: 2,
        summary: 'Heavy Filler Reliance',
        points: [
          'Heavy reliance on fillers (e.g. "um", "ah")',
          'Pacing is uneven; product feature descriptions occasionally sound confused or unstructured'
        ]
      },
      1: {
        score: 1,
        summary: 'Highly Muffled & Disjointed',
        points: [
          'Highly muffled articulation, severe pacing issues (mumbling or speaking too fast/slow)',
          'Ideas are incredibly disjointed and difficult to follow'
        ]
      },
      0: {
        score: 0,
        summary: 'Inaudible Speech / Severe Barriers',
        points: [
          'Inaudible speech, severe language barriers preventing effective communication with audience'
        ]
      }
    }
  },
  {
    id: 'technical_execution',
    title: 'Technical Execution & Setup',
    description: 'Measures clarity and professionalism in production standards, focusing on areas like audio, lighting, framing and product visibility.',
    weightage: 20,
    ratings: {
      5: {
        score: 5,
        summary: 'Studio-Grade Broadcast Executive',
        points: [
          'Professional studio-grade broadcast executive',
          'Flawless audio dynamics',
          'Beautiful lighting depths, seamless multi-angle framing or visual overlays'
        ]
      },
      4: {
        score: 4,
        summary: 'Sharp & Polished Presentation',
        points: [
          'Sharp, polished visual presentation',
          'Uses deliberate camera angles, crisp audio levels',
          'Optimized lighting that accentuates the product\'s appeal'
        ]
      },
      3: {
        score: 3,
        summary: 'Good Production Standards',
        points: [
          'Good production standards',
          'Audio is consistently crisp, video framing is stable',
          'Lighting is balanced and products remain clearly visible within frame'
        ]
      },
      2: {
        score: 2,
        summary: 'Passable Quality with Distractions',
        points: [
          'Passable quality but minor distractions exist',
          'Occasional echo, shaky camera, unbalanced lighting, or clumsy product staging'
        ]
      },
      1: {
        score: 1,
        summary: 'Extremely Poor Audio / Lighting',
        points: [
          'Extremely poor audio or dark, blurry lighting',
          'The product is frequently out of frame'
        ]
      },
      0: {
        score: 0,
        summary: 'Broken Link / Silent Audio',
        points: [
          'Broken link, unwatchable video framing or completely silent audio'
        ]
      }
    }
  }
];

export const PERFORMANCE_TIERS: PerformanceTier[] = [
  {
    minScore: 4.5,
    label: 'Studio Masterclass',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    description: 'Exceptional, professional-grade broadcast with flawless execution across all dimensions.'
  },
  {
    minScore: 3.5,
    label: 'High Distinction',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    description: 'Polished and captivating presentation showing strong charisma and technical clarity.'
  },
  {
    minScore: 2.5,
    label: 'Proficient / Good',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    description: 'Solid effort meeting baseline criteria with minor areas for refinement.'
  },
  {
    minScore: 1.5,
    label: 'Developing',
    badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-300 dark:border-orange-800',
    description: 'Inconsistent energy, technical distractions, or disjointed presentation structure.'
  },
  {
    minScore: 0.0,
    label: 'Unsatisfactory',
    badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    description: 'Major technical barriers, severe hesitation, or missing content.'
  }
];

export function getPerformanceTier(scoreOutOfFive: number): PerformanceTier {
  return PERFORMANCE_TIERS.find(tier => scoreOutOfFive >= tier.minScore) || PERFORMANCE_TIERS[PERFORMANCE_TIERS.length - 1];
}

export function calculateWeightedScore(scores: Partial<Record<string, number>>): {
  scoreOutOfFive: number;
  percentage: number;
  isComplete: boolean;
  breakdown: Record<string, { raw: number | null; weighted: number }>;
} {
  let totalWeighted = 0;
  let completeCount = 0;
  const breakdown: Record<string, { raw: number | null; weighted: number }> = {};

  RUBRIC_CRITERIA.forEach(crit => {
    const score = scores[crit.id];
    if (score !== undefined && score !== null) {
      completeCount++;
      const weightedContrib = (score / 5) * (crit.weightage / 100) * 5; // out of 5
      totalWeighted += weightedContrib;
      breakdown[crit.id] = { raw: score, weighted: weightedContrib };
    } else {
      breakdown[crit.id] = { raw: null, weighted: 0 };
    }
  });

  const isComplete = completeCount === RUBRIC_CRITERIA.length;
  const percentage = (totalWeighted / 5) * 100;

  return {
    scoreOutOfFive: Math.round(totalWeighted * 100) / 100,
    percentage: Math.round(percentage * 10) / 10,
    isComplete,
    breakdown
  };
}
