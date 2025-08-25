import { FramedPanel, MedievalButton } from '../../../components/ui';
import { useNavigate } from 'react-router-dom';
import { useStudyStore } from '../../../stores/studyStore';
import MasonLogo from '/Mason-Logo-PNG5.png';
import { useAudio } from '../../../context/AudioContext';
import { useEffect } from 'react';

export function ModeSelectionScreen() {
  const navigate = useNavigate();
  const selectMode = useStudyStore((state) => state.selectMode);
  const { playAmbiance, isAudioEnabled, enableAudio, playSfx } = useAudio();

  useEffect(() => {
    if (isAudioEnabled) {
      playAmbiance('menu');
    }
  }, [isAudioEnabled, playAmbiance]);

  const handleModeSelect = (mode: 'ordered' | 'random') => {
    playSfx('select'); // <-- ORDEN CORRECTA: Reproducir SFX 'select'
    selectMode(mode);
    navigate('/modules');
  };
  
  const handleStartAudio = () => {
    enableAudio();
  };

  if (!isAudioEnabled) {
    return (
      <div className="text-center flex flex-col items-center justify-center animate-fade-in p-8 w-full max-w-3xl">
        <FramedPanel>
          <div className="p-4 sm:p-8 flex flex-col items-center">
            <img src={MasonLogo} alt="Mason Logo" style={{ width: '220px', height: '220px' }} className="-mb-8 object-contain" />
            <h1 className="text-4xl md:text-5xl font-uncial text-amber-300 drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] mb-4" style={{ textShadow: '0 0 10px rgba(252, 211, 77, 0.5)' }}>
              La Cámara del Aprendiz
            </h1>
            <p className="text-gray-300 font-garamond text-lg md:text-xl mb-10">
              Pulsa para iniciar la experiencia auditiva.
            </p>
            <MedievalButton onClick={handleStartAudio}>
              Entrar
            </MedievalButton>
          </div>
        </FramedPanel>
      </div>
    );
  }

  return (
    <div className="text-center flex flex-col items-center justify-center animate-fade-in p-8 w-full max-w-3xl">
      <FramedPanel>
        <div className="p-4 sm:p-8 flex flex-col items-center">
          <img src={MasonLogo} alt="Mason Logo" style={{ width: '220px', height: '220px' }} className="-mb-8 object-contain" />
          <h1 className="text-4xl md:text-5xl font-uncial text-amber-300 drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] mb-4" style={{ textShadow: '0 0 10px rgba(252, 211, 77, 0.5)' }}>
              La Cámara del Aprendiz
            </h1>
          <p className="text-gray-300 font-garamond text-lg md:text-xl mb-10">
            Seleccionad un modo de estudio para comenzar vuestra labor.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <MedievalButton onClick={() => handleModeSelect('ordered')}>
              Modo Ordenado
            </MedievalButton>
            <MedievalButton onClick={() => handleModeSelect('random')} className="bg-yellow-800/50 !text-amber-300 enabled:hover:!bg-yellow-700/60">
              Modo Aleatorio
            </MedievalButton>
          </div>
        </div>
      </FramedPanel>
    </div>
  );
}