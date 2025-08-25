// src/features/catechism/components/StudyCard.tsx

import { useRef, useEffect } from 'react';
import FramedPanel from '../../../components/ui/FramedPanel';


interface StudyCardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  evaluationResult: 'correct' | 'incorrect' | null;
  isTransitioning: boolean;
}

const StudyCard: React.FC<StudyCardProps> = ({
  question,
  answer,
  isFlipped,
  userAnswer,
  setUserAnswer,
  evaluationResult,
  isTransitioning
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userAnswer]);

  // Lógica de clase final: Desvanecimiento instantáneo, aparición suave.
  const cardContentClass = isTransitioning ? 'opacity-0' : 'opacity-100 transition-opacity duration-500';

  return (
    <div className="w-full min-h-[520px] [perspective:1200px]">
      <div className={`relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* CARA FRONTAL: Se oculta por completo si la tarjeta está volteada */}
        <div className={`absolute w-full h-full [backface-visibility:hidden] ${isFlipped ? 'hidden' : ''}`}>
          <FramedPanel>
            <div className={`flex flex-col justify-between h-full ${cardContentClass}`}>
              <div className="flex-grow flex flex-col justify-center items-center mb-6 text-center">
                <p className="font-uncial text-lg text-amber-300 mb-4 tracking-wider" style={{textShadow: '0 0 5px rgba(252, 211, 77, 0.3)'}}>PREGUNTA</p>
                <p className="text-2xl md:text-3xl font-garamond text-gray-300 leading-relaxed">{question}</p>
              </div>
              <div className="h-32 flex items-center justify-center">
                <textarea
                  ref={textareaRef}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Escribid vuestra respuesta..."
                  className="w-full p-4 bg-gray-900/80 border-2 border-gray-700 rounded-md text-gray-300 font-garamond focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all resize-none overflow-hidden placeholder:text-gray-500"
                  rows={4}
                  disabled={isFlipped}
                />
              </div>
            </div>
          </FramedPanel>
        </div>

        {/* CARA TRASERA: Se oculta por completo si la tarjeta NO está volteada */}
        <div className={`absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] ${!isFlipped ? 'hidden' : ''}`}>
          <FramedPanel>
            <div className={`flex flex-col justify-center items-center h-full text-center ${cardContentClass}`}>
              <p className="font-uncial text-lg text-amber-300 mb-4 tracking-wider" style={{textShadow: '0 0 5px rgba(252, 211, 77, 0.3)'}}>RESPUESTA CORRECTA</p>
              <p className={`text-xl md:text-2xl font-garamond leading-relaxed transition-colors duration-500 ${evaluationResult === 'correct' ? 'text-green-400' : evaluationResult === 'incorrect' ? 'text-red-400' : 'text-gray-300'}`}>{answer}</p>
            </div>
          </FramedPanel>
        </div>

      </div>
    </div>
  );
};

export default StudyCard;