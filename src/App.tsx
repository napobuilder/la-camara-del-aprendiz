import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ModeSelectionScreen, ModuleSelectionScreen, StudySessionScreen } from './features/catechism/components';
import { useStudyStore } from './stores/studyStore'; // Import the store

import { useEffect } from 'react'; // Import useEffect

function App() {
  const navigate = useNavigate(); // Initialize useNavigate
  const questions = useStudyStore((state) => state.questions); // Access questions from the store

  // Cargar fuentes de Google
  useEffect(() => {
      const link = document.createElement('link');
      link.href = "https://fonts.googleapis.com/css2?family=Uncial+Antiqua&family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap";
      link.rel = 'stylesheet';
      document.head.appendChild(link);
  }, []);

  return (
    <div className="bg-black text-gray-300 min-h-screen flex items-center justify-center p-4 sm:p-6 antialiased">
      
      <Routes>
        <Route path="/" element={<ModeSelectionScreen />} />
        <Route path="/modules" element={<ModuleSelectionScreen />} />
        <Route path="/study" element={<StudySessionScreen questions={questions} onExit={() => navigate('/modules')} />} /> {/* Pass questions prop and onExit handler */}
      </Routes>
    </div>
  );
}

export default App;