import { RubricCriterion, PerformanceTier } from '../types';

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'delivery_showmanship',
    title: 'Delivery & Showmanship',
    description: 'Evaluates confidence and product knowledge through factors such as camera presence, charisma and energy level used to showcase items and captivate viewers throughout the livestream',
    weightage: 15,
    ratings: {
      5: {
        score: 5,
        summary: 'Flawless & High Energy',
        points: [
          'Flawless / Professional-grade charisma, Absolute confidence.',
          'Seamlessly blends profound product knowledge that entirely commands the broadcast'
        ]
      },
      4: {
        score: 4,
        summary: 'High Energy & Natural Charisma',
        points: [
          'High energy / Natural charisma / Strong confidence',
          'Displays strong product familiarity, shows smooth on-camera movement and actively captivates the audience'
        ]
      },
      3: {
        score: 3,
        summary: 'Good Confidence & Clear Knowledge',
        points: [
          'Good confidence / Clear product knowledge',
          'Maintains steady energy levels and an acceptable camera presence to keep viewers baseline-interested.'
        ]
      },
      2: {
        score: 2,
        summary: 'Low Confidence & Inconsistent Energy',
        points: [
          'Low confidence / Inconsistent energy levels.',
          'Displays basic product knowledge but struggles with awkward pauses. Camera presence is rigid. Presentation fails to captivate viewers'
        ]
      },
      1: {
        score: 1,
        summary: 'Extreme Hesitation & Flat Delivery',
        points: [
          'Extreme hesitation / Lack of confidence',
          'Presenter reads entirely from a script with zero camera presence. Presenter is unfamiliar to product, leading to flat, unengaging delivery'
        ]
      },
      0: {
        score: 0,
        summary: 'Unable to Showcase',
        points: [
          'Presenter unable to showcase products'
        ]
      }
    }
  },
  {
    id: 'content_creativity',
    title: 'Content Creativity & Originality',
    description: 'Focuses on creativity and storytelling through factors like the uniqueness of ideas, presentation style and use of engaging themes or current trends',
    weightage: 10,
    ratings: {
      5: {
        score: 5,
        summary: 'Masterclass in Creative Storytelling',
        points: [
          'Masterclass in creative storytelling concepts are original.',
          'Seamlessly weaves highly engaging theme that feels premium and distinctly memorable'
        ]
      },
      4: {
        score: 4,
        summary: 'Distinctly Unique Approach',
        points: [
          'Distinctly unique approach',
          'Integrates current trends and creative storytelling flawlessly, stream stand out visually and conceptually'
        ]
      },
      3: {
        score: 3,
        summary: 'Creative & Structured Presentation',
        points: [
          'Creative / Structured presentation',
          'Successfully incorporates a clear theme or storytelling element that supports the product features naturally'
        ]
      },
      2: {
        score: 2,
        summary: 'Minimal Creative Styling',
        points: [
          'Minimal attempt at creative styling',
          'The flow is highly predictable, and themes or current trends is loosely tied to the products'
        ]
      },
      1: {
        score: 1,
        summary: 'Highly Generic & Repetitive',
        points: [
          'Highly generic, Repetitive presentation',
          'no recognizable storytelling or creative themes'
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
    id: 'audience_engagement',
    title: 'Audience Engagement & Interaction',
    description: 'Measures engagement and interaction with the audience through factors like responsiveness to live comments, ability to drive participation and strategies to sustain viewer interest',
    weightage: 20,
    ratings: {
      5: {
        score: 5,
        summary: 'Mastery of Live Crowd Control',
        points: [
          'Mastery of live crowd control.',
          'Dynamically drives massive participation, addresses the audience with superb charm, sustains peak viewer interest effortlessly'
        ]
      },
      4: {
        score: 4,
        summary: 'Highly Responsive & Conversational',
        points: [
          'Highly responsive, conversational.',
          'Spontaneously turns live comments into interactive highlights, creating an energetic call-and-response environment that grips viewer interest'
        ]
      },
      3: {
        score: 3,
        summary: 'Consistent & Strong Interaction',
        points: [
          'Consistent engagement / Strong interaction with audience.',
          'Responds to comments in a timely manner and uses effective strategies to encourage viewer participation'
        ]
      },
      2: {
        score: 2,
        summary: 'Slow & Mechanical Response',
        points: [
          'Slow / Mechanical response to comments.',
          'Attempts basic audience prompts but struggles to sustain viewer interest or build a community dynamic'
        ]
      },
      1: {
        score: 1,
        summary: 'One-Way Broadcast',
        points: [
          'One-way broadcast.',
          'Acknowledges comments exceptionally late or in a dismissive manner, severely breaking the interactive flow'
        ]
      },
      0: {
        score: 0,
        summary: 'Completely Ignores Audience',
        points: [
          'Completely ignores audience, chat and/or comments'
        ]
      }
    }
  },
  {
    id: 'communication_skills',
    title: 'Communication Skills',
    description: 'Evaluates clarity of speech, articulation, pacing and the ability to express ideas and features effectively',
    weightage: 10,
    ratings: {
      5: {
        score: 5,
        summary: 'Flawless Eloquence & Articulation',
        points: [
          'Flawless eloquence / Precise articulation.',
          'Compellingly delivers complex ideas with professional-level verbal flow and persuasive vocal power'
        ]
      },
      4: {
        score: 4,
        summary: 'Highly Articulate & Expressive',
        points: [
          'Highly articulate and expressive.',
          'Uses intentional vocal variety and polished pacing to emphasize selling points smoothly and persuasively'
        ]
      },
      3: {
        score: 3,
        summary: 'Clear Speech & Good Articulation',
        points: [
          'Clear speech, steady pacing / Good articulation.',
          'Ideas and product features are expressed effectively and can be easily understood by the average consumer'
        ]
      },
      2: {
        score: 2,
        summary: 'Heavy Reliance on Fillers',
        points: [
          'Heavy reliance on fillers (eg: "um", "ah").',
          'Pacing is uneven and description of product feature occasionally sound confused or unstructured'
        ]
      },
      1: {
        score: 1,
        summary: 'Highly Muffled / Severe Pacing Issues',
        points: [
          'Highly muffled articulation or severe pacing issues (mumbling, speaking too fast/slow).',
          'Ideas are incredibly disjointed and difficult to follow'
        ]
      },
      0: {
        score: 0,
        summary: 'Inaudible / Severe Barriers',
        points: [
          'Inaudible speech, severe language barriers preventing effective communication with audience'
        ]
      }
    }
  },
  {
    id: 'technical_execution',
    title: 'Technical Execution & Visuals',
    description: 'Focuses on production standards through factors like audio, framing, lighting and a smooth overall visual presentation',
    weightage: 10,
    ratings: {
      5: {
        score: 5,
        summary: 'Professional Studio-Grade Broadcast',
        points: [
          'Professional studio-grade broadcast executive.',
          'Flawless audio dynamics, beautiful lighting depths, seamless multi-angle framing or visual overlays'
        ]
      },
      4: {
        score: 4,
        summary: 'Sharp & Polished Presentation',
        points: [
          'Sharp, polished visual presentation.',
          'Uses desirable camera angles, crisp audio levels, optimized lighting that accentuates the products appeal'
        ]
      },
      3: {
        score: 3,
        summary: 'Good Production Standards',
        points: [
          'Good production standards.',
          'Audio is consistently crisp, video framing is stable, lighting is balanced and products remain clearly visible within the frame'
        ]
      },
      2: {
        score: 2,
        summary: 'Passable with Minor Distractions',
        points: [
          'Passable quality but minor distractions exist.',
          '(eg: occasional echo, shaky camera, unbalance lighting, or clumsily product staging)'
        ]
      },
      1: {
        score: 1,
        summary: 'Extremely Poor Audio / Blurry',
        points: [
          'Extremely poor audio or dark, blurry lighting.',
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
  },
  {
    id: 'digital_citizenship',
    title: 'Digital Citizenship & Professionalism',
    description: 'Evaluates clarity and professionalism in online behaviour through factors like respectful language, positive brand attitude, and strict adherence to competition guidelines',
    weightage: 10,
    ratings: {
      5: {
        score: 5,
        summary: 'Exemplary Professionalism',
        points: [
          'Demonstrates exemplary professionalism with respectful language,',
          'positive brand attitude, and full compliance with all competition guidelines'
        ]
      },
      4: {
        score: 4,
        summary: 'Strong Professionalism',
        points: [
          'Demonstrates strong professionalism with respectful language,',
          'positive brand attitude, and minor lapses in guideline compliance'
        ]
      },
      3: {
        score: 3,
        summary: 'Acceptable Professionalism',
        points: [
          'Demonstrates acceptable professionalism with generally respectful language,',
          'an appropriate brand attitude, and complies with most competition guidelines'
        ]
      },
      2: {
        score: 2,
        summary: 'Inconsistent Professionalism',
        points: [
          'Demonstrates inconsistent professionalism,',
          'occasional inappropriate language, weak brand representation, partial compliance with competition guidelines'
        ]
      },
      1: {
        score: 1,
        summary: 'Poor Professionalism',
        points: [
          'Demonstrates poor professionalism,',
          'inappropriate language, negative brand representation, frequent breaches of competition guidelines'
        ]
      },
      0: {
        score: 0,
        summary: 'Unprofessional Conduct',
        points: [
          'Demonstrates unprofessional behaviour with inappropriate conduct,',
          'poor brand representation, failure to comply with competition guidelines'
        ]
      }
    }
  },
  {
    id: 'sales',
    title: 'Sales',
    description: 'Measures sales conversion by tracking cumulative unit sales achieved across all 3 streaming sessions',
    weightage: 25,
    isOfficialOnly: true,
    ratings: {
      5: {
        score: 5,
        summary: '> 40 Units Sold',
        points: [
          'Sales of more than 40 units'
        ]
      },
      4: {
        score: 4,
        summary: '31 – 40 Units Sold',
        points: [
          'Sales of 31 to 40 units'
        ]
      },
      3: {
        score: 3,
        summary: '21 – 30 Units Sold',
        points: [
          'Sales of 21 - 30 units'
        ]
      },
      2: {
        score: 2,
        summary: '11 – 20 Units Sold',
        points: [
          'Sales of 11-20 units'
        ]
      },
      1: {
        score: 1,
        summary: '1 – 10 Units Sold',
        points: [
          'Sales of 1-10 units'
        ]
      },
      0: {
        score: 0,
        summary: 'No Sales',
        points: [
          'No sales'
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
