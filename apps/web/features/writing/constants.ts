export const TYPING_STATUS = {
  PENDING: "pending",
  CORRECT: "correct",
  INCORRECT: "incorrect",
} as const;

export type TypingStatus = typeof TYPING_STATUS[keyof typeof TYPING_STATUS];

export const DIFFICULTY_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[keyof typeof DIFFICULTY_LEVELS];

export const PRACTICE_TEXTS: Record<DifficultyLevel, string[]> = {
  [DIFFICULTY_LEVELS.BEGINNER]: [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect when you type every day.",
    "A journey of a thousand miles begins with a single step.",
    "Time flies when you are having fun with typing.",
    "Every expert was once a beginner who never gave up.",
  ],
  [DIFFICULTY_LEVELS.INTERMEDIATE]: [
    "In the realm of digital communication, the ability to type efficiently has become an indispensable skill that can significantly enhance productivity.",
    "The art of touch typing requires patience, practice, and persistence, but the rewards of increased speed and accuracy are well worth the effort.",
    "Modern technology has transformed the way we interact with computers, making keyboard proficiency essential for professional and personal success.",
    "Developing muscle memory through consistent practice allows typists to focus on their thoughts rather than the mechanics of typing itself.",
  ],
  [DIFFICULTY_LEVELS.ADVANCED]: [
    "The paradigm shift in computational linguistics has necessitated a comprehensive reevaluation of traditional methodologies, compelling researchers to integrate interdisciplinary approaches that synthesize cognitive science, artificial intelligence, and pragmatic discourse analysis.",
    "Quantum entanglement represents one of the most counterintuitive phenomena in physics, where particles become intrinsically connected regardless of spatial separation, challenging our fundamental understanding of locality and causality in the universe.",
    "The philosophical implications of consciousness remain among the most perplexing questions in both neuroscience and metaphysics, as researchers grapple with the hard problem of explaining how subjective experiences emerge from objective neural processes.",
  ],
};

