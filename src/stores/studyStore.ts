import { create } from 'zustand';
import { catechismData } from '../catechismData';
import { shuffleArray, chunkArray } from '../catechismUtils';
import type { Question } from '../types';

type StudyMode = 'ordered' | 'random';

interface StudyState {
  studyMode: StudyMode;
  modules: Question[][];
  selectedModule: Question[];
  questions: Question[];
  
  // Actions
  selectMode: (mode: StudyMode) => void;
  selectModule: (module: Question[]) => void;
}

export const useStudyStore = create<StudyState>((set, get) => ({
  studyMode: 'ordered',
  modules: [],
  selectedModule: [],
  questions: [],

  // --- ACTIONS ---
  selectMode: (mode) => {
    const chunkedModules = chunkArray(catechismData, 5);
    set({ studyMode: mode, modules: chunkedModules });
  },

  selectModule: (module) => {
    const { studyMode } = get();
    const questions = studyMode === 'random' ? shuffleArray(module) : module;
    set({ selectedModule: module, questions });
  },
}));