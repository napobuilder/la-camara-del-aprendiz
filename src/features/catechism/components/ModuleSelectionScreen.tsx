import { FramedPanel } from '../../../components/ui';
import { useNavigate } from 'react-router-dom';
import { useStudyStore } from '../../../stores/studyStore';
import type { Question } from '../../../types';
import { useEffect } from 'react';
import { useAudio } from '../../../context/AudioContext';

export const ModuleSelectionScreen = () => {
    const navigate = useNavigate();
    const { modules, selectModule } = useStudyStore();
    
    // CORRECCIÓN: Usar 'playAmbiance' en lugar de 'playAudioByStyle'
    const { playAmbiance, playSfx } = useAudio();

    useEffect(() => {
      playAmbiance('modules');
    }, [playAmbiance]);

    const handleModuleSelect = (module: Question[]) => {
        selectModule(module);
        navigate('/study');
    };

    const handleGoToModeSelection = () => {
        navigate('/');
    };

    return (
        <div className="w-full max-w-5xl flex flex-col items-center animate-fade-in">
            <h2 className="text-4xl font-uncial text-amber-300 mb-8" style={{ textShadow: '0 0 10px rgba(252, 211, 77, 0.5)' }}>Selecciona un Módulo</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                {modules.map((module, index) => (
                    <button key={index} onClick={() => handleModuleSelect(module)} className="transition-transform duration-300 hover:scale-105">
                        <FramedPanel className="h-full">
                            <div className="flex flex-col items-center justify-center text-center p-2 h-full">
                                <p className="font-uncial text-amber-300">Módulo {index + 1}</p>
                                <p className="font-garamond text-gray-400 text-sm">Preguntas</p>
                                <p className="font-garamond text-gray-300">{module[0].id} - {module[module.length - 1].id}</p>
                            </div>
                        </FramedPanel>
                    </button>
                ))}
            </div>
            <button onClick={handleGoToModeSelection} className="font-garamond text-gray-400 hover:text-white transition-colors mt-8">
                &larr; Volver a seleccionar modo
            </button>
        </div>
    );
};