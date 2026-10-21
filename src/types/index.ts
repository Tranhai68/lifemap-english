export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type VocabularyStatus = 'new' | 'learning' | 'understood' | 'mastered' | 'review_due';

export type QuestionType = 
  | 'choice_meaning'     // Chọn nghĩa đúng
  | 'choice_word'        // Chọn từ đúng từ nghĩa tiếng Việt
  | 'fill_blank'          // Điền từ vào câu
  | 'audio_listen'        // Nghe và nhận biết từ
  | 'matching'            // Ghép từ và nghĩa
  | 'situational';        // Chọn cách dùng trong tình huống

export interface Category {
  id: string;
  nameEn: string;
  nameVi: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export interface Topic {
  id: string;
  categoryId: string;
  nameEn: string;
  nameVi: string;
  description: string;
  coverImage?: string;
  cefrRange: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number; // 0 - 100
  branchCount: number;
  wordCount: number;
  featured?: boolean;
}

export interface MindmapNode {
  id: string;
  topicId: string;
  parentId?: string;
  level: 0 | 1 | 2 | 3; // 0: Root Topic, 1: Subtopic/Branch, 2: Word/Phrase, 3: Collocation/Detail
  label: string;
  labelVi?: string;
  color?: string;
  icon?: string;
  vocabularyId?: string;
  isExpanded?: boolean;
  order: number;
  // Positioning helpers
  offsetX?: number;
  offsetY?: number;
}

export interface VocabularyContext {
  examples: {
    en: string;
    vi: string;
  }[];
  collocations: string[];
  synonyms?: string[];
  antonyms?: string[];
  commonMistake?: string;
}

export interface Vocabulary {
  id: string;
  topicId: string;
  branchId?: string;
  word: string;
  ipa: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase' | 'idiom';
  meaningVi: string;
  definitionEn: string;
  cefr: CEFRLevel;
  audioUrl?: string;
  context: VocabularyContext;
  status?: VocabularyStatus;
  isFavorite?: boolean;
  masteryScore?: number;
  nextReviewDate?: string;
}

export interface QuizQuestion {
  id: string;
  vocabularyId: string;
  topicId: string;
  branchId?: string;
  type: QuestionType;
  prompt: string;
  promptDetail?: string;
  targetWord?: string;
  audioText?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  pairs?: { word: string; meaning: string }[];
  difficulty: CEFRLevel;
}

export interface UserLearningRecord {
  vocabularyId: string;
  status: VocabularyStatus;
  firstLearnedDate: string;
  lastPracticedDate: string;
  correctCount: number;
  incorrectCount: number;
  masteryScore: number; // 0 - 100
  nextReviewDate: string;
  isFavorite: boolean;
  notes?: string;
}

export interface QuizAttempt {
  id: string;
  topicId: string;
  branchId?: string;
  quizType: 'quick' | 'branch' | 'topic' | 'daily_review' | 'difficult';
  date: string;
  score: number;
  total: number;
  timeSpentSeconds: number;
  incorrectVocabularyIds: string[];
}

export interface UserProfile {
  name: string;
  avatar?: string;
  currentLevel: CEFRLevel;
  targetGoal: string;
  dailyMinutes: number;
  favoriteCategoryIds: string[];
  streakDays: number;
  lastActiveDate: string;
  isOnboarded: boolean;
}
