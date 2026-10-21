import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Category,
  Topic,
  MindmapNode,
  Vocabulary,
  QuizQuestion,
  UserProfile,
  QuizAttempt,
  VocabularyStatus,
} from '../types';
import {
  initialCategories,
  initialTopics,
  initialMindmapNodes,
  initialVocabularies,
  initialQuizQuestions,
  initialUserProfile,
} from '../data/initialData';

export type ActiveScreen = 
  | 'dashboard' 
  | 'explorer' 
  | 'mindmap' 
  | 'quiz' 
  | 'quiz_results' 
  | 'vocabulary' 
  | 'progress' 
  | 'admin';

interface QuizState {
  topicId: string;
  branchId?: string;
  type: 'quick' | 'branch' | 'topic' | 'daily_review' | 'difficult';
  questions: QuizQuestion[];
  lastResult?: QuizAttempt;
}

interface AppContextType {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  categories: Category[];
  topics: Topic[];
  mindmapNodes: MindmapNode[];
  vocabularies: Vocabulary[];
  quizQuestions: QuizQuestion[];
  userProfile: UserProfile;
  quizHistory: QuizAttempt[];
  
  // Navigation & selection
  selectedTopicId: string;
  setSelectedTopicId: (id: string) => void;
  selectedVocabularyId: string | null;
  setSelectedVocabularyId: (id: string | null) => void;
  selectedBranchId: string | null;
  setSelectedBranchId: (id: string | null) => void;

  // Mindmap actions
  toggleNodeExpansion: (nodeId: string) => void;
  collapseAllBranches: () => void;
  expandAllBranches: () => void;

  // Vocabulary learning actions
  markVocabularyStatus: (vocabId: string, status: VocabularyStatus) => void;
  toggleFavorite: (vocabId: string) => void;

  // Quiz actions
  quizState: QuizState | null;
  startQuiz: (topicId: string, type: QuizState['type'], branchId?: string) => void;
  completeQuiz: (attempt: Omit<QuizAttempt, 'id'>) => void;
  retryQuiz: () => void;

  // User & Onboarding
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;

  // Admin CMS actions
  addTopic: (topic: Topic) => void;
  addMindmapNode: (node: MindmapNode) => void;
  addVocabulary: (vocab: Vocabulary) => void;
  addQuizQuestion: (question: QuizQuestion) => void;
  deleteTopic: (topicId: string) => void;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CATEGORIES: 'lifemap_categories_v3',
  TOPICS: 'lifemap_topics_v3',
  NODES: 'lifemap_nodes_v3',
  VOCABS: 'lifemap_vocabs_v3',
  QUESTIONS: 'lifemap_questions_v3',
  PROFILE: 'lifemap_profile_v3',
  HISTORY: 'lifemap_quiz_history_v3',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-business-strategy');
  const [selectedVocabularyId, setSelectedVocabularyId] = useState<string | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Loaded from LocalStorage or defaults
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [topics, setTopics] = useState<Topic[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TOPICS);
    return saved ? JSON.parse(saved) : initialTopics;
  });

  const [mindmapNodes, setMindmapNodes] = useState<MindmapNode[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NODES);
    return saved ? JSON.parse(saved) : initialMindmapNodes;
  });

  const [vocabularies, setVocabularies] = useState<Vocabulary[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VOCABS);
    return saved ? JSON.parse(saved) : initialVocabularies;
  });

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    return saved ? JSON.parse(saved) : initialQuizQuestions;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return saved ? JSON.parse(saved) : [];
  });

  const [quizState, setQuizState] = useState<QuizState | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(mindmapNodes));
  }, [mindmapNodes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOCABS, JSON.stringify(vocabularies));
  }, [vocabularies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(quizQuestions));
  }, [quizQuestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(quizHistory));
  }, [quizHistory]);

  // Mindmap Node Expansion toggle
  const toggleNodeExpansion = (nodeId: string) => {
    setMindmapNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, isExpanded: !n.isExpanded } : n))
    );
  };

  const collapseAllBranches = () => {
    setMindmapNodes((prev) =>
      prev.map((n) => (n.level >= 1 ? { ...n, isExpanded: false } : n))
    );
  };

  const expandAllBranches = () => {
    setMindmapNodes((prev) =>
      prev.map((n) => (n.level >= 1 ? { ...n, isExpanded: true } : n))
    );
  };

  // Vocabulary interactions
  const markVocabularyStatus = (vocabId: string, status: VocabularyStatus) => {
    setVocabularies((prev) =>
      prev.map((v) => {
        if (v.id === vocabId) {
          const score = status === 'mastered' ? 100 : status === 'understood' ? 80 : status === 'learning' ? 50 : 20;
          return { ...v, status, masteryScore: score };
        }
        return v;
      })
    );
  };

  const toggleFavorite = (vocabId: string) => {
    setVocabularies((prev) =>
      prev.map((v) => (v.id === vocabId ? { ...v, isFavorite: !v.isFavorite } : v))
    );
  };

  // Start quiz logic
  const startQuiz = (topicId: string, type: QuizState['type'], branchId?: string) => {
    let questions = quizQuestions.filter((q) => q.topicId === topicId);

    if (branchId) {
      const branchQs = questions.filter((q) => q.branchId === branchId);
      if (branchQs.length > 0) questions = branchQs;
    }

    if (type === 'difficult') {
      const difficultVocabIds = vocabularies.filter((v) => v.status === 'learning' || (v.masteryScore || 0) < 60).map((v) => v.id);
      questions = quizQuestions.filter((q) => difficultVocabIds.includes(q.vocabularyId));
      if (questions.length === 0) questions = quizQuestions.slice(0, 5);
    } else if (type === 'quick') {
      questions = questions.slice(0, 5);
    } else if (type === 'branch') {
      questions = questions.slice(0, 8);
    }

    // Shuffle
    const shuffled = [...questions].sort(() => Math.random() - 0.5);

    setQuizState({
      topicId,
      branchId,
      type,
      questions: shuffled.length > 0 ? shuffled : quizQuestions.slice(0, 4),
    });
    setActiveScreen('quiz');
  };

  const completeQuiz = (attempt: Omit<QuizAttempt, 'id'>) => {
    const fullAttempt: QuizAttempt = {
      ...attempt,
      id: `attempt-${Date.now()}`,
    };

    setQuizHistory((prev) => [fullAttempt, ...prev]);

    // Update vocabulary statuses based on mistakes
    setVocabularies((prev) =>
      prev.map((v) => {
        if (attempt.incorrectVocabularyIds.includes(v.id)) {
          return {
            ...v,
            status: 'learning',
            masteryScore: Math.max(20, (v.masteryScore || 50) - 25),
            nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
          };
        } else if (quizState?.questions.some((q) => q.vocabularyId === v.id)) {
          return {
            ...v,
            status: 'mastered',
            masteryScore: Math.min(100, (v.masteryScore || 60) + 20),
            nextReviewDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days
          };
        }
        return v;
      })
    );

    // Update topic progress
    const pct = Math.round((attempt.score / attempt.total) * 100);
    setTopics((prev) =>
      prev.map((t) =>
        t.id === attempt.topicId
          ? {
              ...t,
              progress: Math.max(t.progress, pct),
              status: pct >= 80 ? 'Completed' : 'In Progress',
            }
          : t
      )
    );

    if (quizState) {
      setQuizState({
        ...quizState,
        lastResult: fullAttempt,
      });
    }

    setActiveScreen('quiz_results');
  };

  const retryQuiz = () => {
    if (quizState) {
      startQuiz(quizState.topicId, quizState.type, quizState.branchId);
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  // CMS functions
  const addTopic = (newTopic: Topic) => {
    setTopics((prev) => [newTopic, ...prev]);
  };

  const addMindmapNode = (newNode: MindmapNode) => {
    setMindmapNodes((prev) => [...prev, newNode]);
  };

  const addVocabulary = (newVocab: Vocabulary) => {
    setVocabularies((prev) => [newVocab, ...prev]);
  };

  const addQuizQuestion = (newQuestion: QuizQuestion) => {
    setQuizQuestions((prev) => [...prev, newQuestion]);
  };

  const deleteTopic = (topicId: string) => {
    setTopics((prev) => prev.filter((t) => t.id !== topicId));
    setMindmapNodes((prev) => prev.filter((n) => n.topicId !== topicId));
    setVocabularies((prev) => prev.filter((v) => v.topicId !== topicId));
  };

  const resetToDefaultData = () => {
    setCategories(initialCategories);
    setTopics(initialTopics);
    setMindmapNodes(initialMindmapNodes);
    setVocabularies(initialVocabularies);
    setQuizQuestions(initialQuizQuestions);
    setUserProfile(initialUserProfile);
    setQuizHistory([]);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        categories,
        topics,
        mindmapNodes,
        vocabularies,
        quizQuestions,
        userProfile,
        quizHistory,
        selectedTopicId,
        setSelectedTopicId,
        selectedVocabularyId,
        setSelectedVocabularyId,
        selectedBranchId,
        setSelectedBranchId,
        toggleNodeExpansion,
        collapseAllBranches,
        expandAllBranches,
        markVocabularyStatus,
        toggleFavorite,
        quizState,
        startQuiz,
        completeQuiz,
        retryQuiz,
        updateUserProfile,
        showOnboarding,
        setShowOnboarding,
        addTopic,
        addMindmapNode,
        addVocabulary,
        addQuizQuestion,
        deleteTopic,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
