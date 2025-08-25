import FramedPanel from '../../../components/ui/FramedPanel';
import SkullIcon from '../../../components/ui/SkullIcon';
import MedievalButton from '../../../components/ui/MedievalButton';

interface CompletionScreenProps {
  onRestart: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onRestart }) => (
    <div className="w-full min-h-[520px] animate-fade-in">
        <FramedPanel>
            <div className="text-center flex flex-col items-center justify-center h-full">
                <SkullIcon className="w-16 h-16 mb-4 text-amber-300 opacity-80 drop-shadow-[0_0_8px_rgba(252,211,77,0.3)]"/>
                <h2 className="text-4xl font-uncial text-amber-300 mb-4" style={{textShadow: '0 0 10px rgba(252, 211, 77, 0.5)'}}>Módulo Completado</h2>
                <p className="text-gray-300 font-garamond text-xl mb-8">Has repasado todas las preguntas de este módulo.</p>
                <MedievalButton onClick={onRestart} className="bg-yellow-800/50 !text-amber-300 enabled:hover:!bg-yellow-700/60">Volver a Módulos</MedievalButton>
            </div>
        </FramedPanel>
    </div>
);

export default CompletionScreen;