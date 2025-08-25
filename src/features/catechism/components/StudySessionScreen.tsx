// src/features/catechism/components/StudySessionScreen.tsx

import React, { useState, useEffect } from 'react';
import CompletionScreen from './CompletionScreen';
import StudyCard from './StudyCard';
import MedievalButton from '../../../components/ui/MedievalButton';
import { evaluateAnswer } from '../../../catechismUtils';
import type { Question } from '../../../types';
import { useAudio } from '../../../context/AudioContext';
import { useStudyStore } from '../../../stores/studyStore';

interface StudySessionScreenProps {
  questions: Question[];
  onExit: () => void;
}

const StudySessionScreen: React.FC<StudySessionScreenProps> = ({ questions, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<'correct' | 'incorrect' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false); // <-- NUEVO ESTADO

  const currentQuestion = questions[currentIndex];

const { playAmbiance, playTrack, stopAmbiance } = useAudio();
// Optimización: leemos el estado del store una sola vez de forma no-reactiva para evitar re-renders.
const { modules, selectedModule } = useStudyStore.getState(); 

useEffect(() => {
    // Esta lógica ahora se ejecutará UNA SOLA VEZ al entrar en la pantalla.
    const moduleIndex = modules.findIndex(module => module[0]?.id === selectedModule[0]?.id);
    const moduleNumber = moduleIndex !== -1 ? moduleIndex + 1 : -1;

    // Lógica de pista específica
    if (moduleNumber === 1) {
        console.log("Invocando pista para Módulo 1...");
        playTrack('/audio/music/medieval/1.ogg');
    } else if (moduleNumber === 2) {
        console.log("Invocando pista para Módulo 2...");
        playTrack('/audio/music/medieval/2.ogg');
    } else if (moduleNumber === 3) {
        console.log("Invocando pista para Módulo 3...");
        playTrack('/audio/music/medieval/3.ogg');
    } else if (moduleNumber === 4) {
        console.log("Invocando pista para Módulo 4...");
        playTrack('/audio/music/medieval/4.ogg');
    } else if (moduleNumber === 5) {
        console.log("Invocando pista para Módulo 5...");
        playTrack('/audio/music/medieval/5.ogg');
    } else {
        // Lógica de ambiente general por defecto para módulos fuera del 1-5
        console.log(`Invocando ambiente general para Módulo ${moduleNumber}...`);
        playAmbiance('medieval');
    }

    // Función de limpieza: se ejecuta al salir de la pantalla para detener la música.
    return () => {
      stopAmbiance();
    };
    
// LA CLAVE: Un array de dependencias vacío asegura que el efecto se ejecute solo una vez.
}, []); 

  const handleEvaluation = () => {
    if (userAnswer.trim() === '') return;
    const similarity = evaluateAnswer(userAnswer, currentQuestion.answer);
    setEvaluationResult(similarity >= 75 ? 'correct' : 'incorrect');
    setIsFlipped(true);
  };

  // --- FUNCIÓN 'handleNext' MODIFICADA ---
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setIsTransitioning(true); // 1. Hacemos el contenido invisible
      setIsFlipped(false);      // 2. Empezamos a voltear la tarjeta

      // 3. Esperamos a que la animación de volteo termine
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setUserAnswer('');
        setEvaluationResult(null);
        setIsTransitioning(false); // 4. Hacemos el nuevo contenido visible
      }, 700); // Duración debe coincidir con la animación de la tarjeta
    } else {
      setIsSessionComplete(true);
    }
  };

  if (isSessionComplete) {
    return (
      <div className="w-full max-w-3xl">
        <CompletionScreen onRestart={onExit} />
      </div>
    );
  }
  
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in">
      <header className="text-center mb-6 w-full">
        <div className="flex justify-between items-center mb-2 font-garamond">
          <p className="text-amber-300">Pregunta {currentIndex + 1} de {questions.length}</p>
          <button onClick={onExit} className="text-sm text-gray-400 hover:text-white transition-colors">Salir al menú</button>
        </div>
        <div className="w-full bg-gray-900/50 rounded-full h-3 border border-yellow-800/60">
          <div className="bg-gradient-to-r from-yellow-700 to-amber-300 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </header>

      <main className="w-full mx-auto flex-grow flex items-center justify-center">
        <StudyCard
          question={currentQuestion.question}
          answer={currentQuestion.answer}
          isFlipped={isFlipped}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          evaluationResult={evaluationResult}
          isTransitioning={isTransitioning} // <-- PASAMOS EL NUEVO ESTADO
        />
      </main>

      <footer className="mt-8 text-center">
        <div className="flex items-center space-x-6">
          <MedievalButton onClick={handleEvaluation} disabled={isFlipped || userAnswer.trim() === '' || isTransitioning}>
            Ver Respuesta
          </MedievalButton>
          <MedievalButton onClick={handleNext} disabled={!isFlipped || isTransitioning} className="bg-yellow-800/50 !text-amber-300 enabled:hover:!bg-yellow-700/60">
            Siguiente
          </MedievalButton>
        </div>
        <p className="text-xs text-gray-500 mt-8 font-garamond italic">
          Creado para la instrucción y el progreso en la Masonería.
        </p>
      </footer>
    </div>
  );
};

export default StudySessionScreen;