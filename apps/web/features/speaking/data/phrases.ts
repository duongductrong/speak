import { SpeakingPhrase } from "../types";

export const SPEAKING_PHRASES: SpeakingPhrase[] = [
  // Beginner - Greetings
  {
    id: "begin-greet-1",
    text: "Hello, how are you today?",
    words: ["Hello,", "how", "are", "you", "today?"],
    difficulty: "beginner",
    category: "greetings",
    phoneticHints: [
      { word: "Hello", phonetic: "hə-ˈlō" },
      { word: "how", phonetic: "haʊ" },
      { word: "today", phonetic: "tə-ˈdeɪ" }
    ]
  },
  {
    id: "begin-greet-2",
    text: "Good morning, nice to meet you.",
    words: ["Good", "morning,", "nice", "to", "meet", "you."],
    difficulty: "beginner",
    category: "greetings",
    phoneticHints: [
      { word: "morning", phonetic: "ˈmɔr-nɪŋ" },
      { word: "nice", phonetic: "naɪs" },
      { word: "meet", phonetic: "miːt" }
    ]
  },
  {
    id: "begin-greet-3",
    text: "Have a great day!",
    words: ["Have", "a", "great", "day!"],
    difficulty: "beginner",
    category: "greetings",
    phoneticHints: [
      { word: "great", phonetic: "ɡreɪt" },
      { word: "day", phonetic: "deɪ" }
    ]
  },

  // Beginner - Daily
  {
    id: "begin-daily-1",
    text: "I need a cup of coffee.",
    words: ["I", "need", "a", "cup", "of", "coffee."],
    difficulty: "beginner",
    category: "daily",
    phoneticHints: [
      { word: "need", phonetic: "niːd" },
      { word: "coffee", phonetic: "ˈkɔ-fi" }
    ]
  },
  {
    id: "begin-daily-2",
    text: "What time is it?",
    words: ["What", "time", "is", "it?"],
    difficulty: "beginner",
    category: "daily",
    phoneticHints: [
      { word: "what", phonetic: "wʌt" },
      { word: "time", phonetic: "taɪm" }
    ]
  },

  // Intermediate - Business
  {
    id: "inter-business-1",
    text: "I'm sorry, I thought you said this Thursday.",
    words: ["I'm", "sorry,", "I", "thought", "you", "said", "this", "Thursday."],
    difficulty: "intermediate",
    category: "business",
    phoneticHints: [
      { word: "sorry", phonetic: "ˈsɑr-i" },
      { word: "thought", phonetic: "θɔt", tip: "Voiceless 'th' sound" },
      { word: "Thursday", phonetic: "ˈθɜrz-deɪ" }
    ]
  },
  {
    id: "inter-business-2",
    text: "Could we schedule a meeting for next week?",
    words: ["Could", "we", "schedule", "a", "meeting", "for", "next", "week?"],
    difficulty: "intermediate",
    category: "business",
    phoneticHints: [
      { word: "schedule", phonetic: "ˈske-dʒuːl" },
      { word: "meeting", phonetic: "ˈmiː-tɪŋ" }
    ]
  },
  {
    id: "inter-business-3",
    text: "Let me follow up with the team about that.",
    words: ["Let", "me", "follow", "up", "with", "the", "team", "about", "that."],
    difficulty: "intermediate",
    category: "business",
    phoneticHints: [
      { word: "follow", phonetic: "ˈfɑ-loʊ" },
      { word: "team", phonetic: "tiːm" }
    ]
  },

  // Intermediate - Casual
  {
    id: "inter-casual-1",
    text: "Would you like to grab lunch together?",
    words: ["Would", "you", "like", "to", "grab", "lunch", "together?"],
    difficulty: "intermediate",
    category: "casual",
    phoneticHints: [
      { word: "would", phonetic: "wʊd" },
      { word: "grab", phonetic: "ɡræb" },
      { word: "together", phonetic: "tə-ˈɡe-ðər" }
    ]
  },
  {
    id: "inter-casual-2",
    text: "That movie was absolutely incredible!",
    words: ["That", "movie", "was", "absolutely", "incredible!"],
    difficulty: "intermediate",
    category: "casual",
    phoneticHints: [
      { word: "absolutely", phonetic: "ˈæb-sə-luːt-li" },
      { word: "incredible", phonetic: "ɪn-ˈkre-də-bəl" }
    ]
  },

  // Intermediate - Travel
  {
    id: "inter-travel-1",
    text: "Excuse me, where is the nearest subway station?",
    words: ["Excuse", "me,", "where", "is", "the", "nearest", "subway", "station?"],
    difficulty: "intermediate",
    category: "travel",
    phoneticHints: [
      { word: "excuse", phonetic: "ɪk-ˈskjuːz" },
      { word: "nearest", phonetic: "ˈnɪr-əst" },
      { word: "subway", phonetic: "ˈsʌb-weɪ" }
    ]
  },
  {
    id: "inter-travel-2",
    text: "How much does a ticket to downtown cost?",
    words: ["How", "much", "does", "a", "ticket", "to", "downtown", "cost?"],
    difficulty: "intermediate",
    category: "travel",
    phoneticHints: [
      { word: "ticket", phonetic: "ˈtɪ-kət" },
      { word: "downtown", phonetic: "ˈdaʊn-taʊn" }
    ]
  },

  // Advanced - Questions
  {
    id: "adv-questions-1",
    text: "What are your thoughts on the environmental implications?",
    words: ["What", "are", "your", "thoughts", "on", "the", "environmental", "implications?"],
    difficulty: "advanced",
    category: "questions",
    phoneticHints: [
      { word: "thoughts", phonetic: "θɔts" },
      { word: "environmental", phonetic: "ɪn-ˌvaɪ-rən-ˈmen-təl" },
      { word: "implications", phonetic: "ˌɪm-plə-ˈkeɪ-ʃənz" }
    ]
  },
  {
    id: "adv-questions-2",
    text: "Could you elaborate on the methodology you used?",
    words: ["Could", "you", "elaborate", "on", "the", "methodology", "you", "used?"],
    difficulty: "advanced",
    category: "questions",
    phoneticHints: [
      { word: "elaborate", phonetic: "ɪ-ˈlæ-bə-reɪt" },
      { word: "methodology", phonetic: "ˌme-θə-ˈdɑ-lə-dʒi" }
    ]
  },

  // Advanced - Business
  {
    id: "adv-business-1",
    text: "We need to prioritize scalability and maintainability.",
    words: ["We", "need", "to", "prioritize", "scalability", "and", "maintainability."],
    difficulty: "advanced",
    category: "business",
    phoneticHints: [
      { word: "prioritize", phonetic: "praɪ-ˈɔr-ə-taɪz" },
      { word: "scalability", phonetic: "ˌskeɪ-lə-ˈbɪ-lə-ti" },
      { word: "maintainability", phonetic: "meɪn-ˌteɪ-nə-ˈbɪ-lə-ti" }
    ]
  },
  {
    id: "adv-business-2",
    text: "The quarterly projections indicate significant growth potential.",
    words: ["The", "quarterly", "projections", "indicate", "significant", "growth", "potential."],
    difficulty: "advanced",
    category: "business",
    phoneticHints: [
      { word: "quarterly", phonetic: "ˈkwɔr-tər-li" },
      { word: "projections", phonetic: "prə-ˈdʒek-ʃənz" },
      { word: "significant", phonetic: "sɪɡ-ˈnɪ-fɪ-kənt" }
    ]
  },

  // Advanced - Casual
  {
    id: "adv-casual-1",
    text: "I've been contemplating whether to pursue that opportunity.",
    words: ["I've", "been", "contemplating", "whether", "to", "pursue", "that", "opportunity."],
    difficulty: "advanced",
    category: "casual",
    phoneticHints: [
      { word: "contemplating", phonetic: "ˈkɑn-təm-pleɪ-tɪŋ" },
      { word: "whether", phonetic: "ˈwe-ðər" },
      { word: "pursue", phonetic: "pər-ˈsuː" },
      { word: "opportunity", phonetic: "ˌɑ-pər-ˈtuː-nə-ti" }
    ]
  }
];

export const getPhrasesByDifficulty = (difficulty: SpeakingPhrase["difficulty"]) => {
  return SPEAKING_PHRASES.filter(phrase => phrase.difficulty === difficulty);
};

export const getPhrasesByCategory = (category: SpeakingPhrase["category"]) => {
  return SPEAKING_PHRASES.filter(phrase => phrase.category === category);
};

export const getFilteredPhrases = (
  difficulty?: SpeakingPhrase["difficulty"],
  category?: SpeakingPhrase["category"]
) => {
  return SPEAKING_PHRASES.filter(phrase => {
    const matchesDifficulty = !difficulty || phrase.difficulty === difficulty;
    const matchesCategory = !category || phrase.category === category;
    return matchesDifficulty && matchesCategory;
  });
};

