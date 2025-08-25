import React, { createContext, useContext, useRef, useState, useCallback, ReactNode } from 'react';

// --- Definición de Pistas ---

type AmbianceStyle = 'menu' | 'modules' | 'medieval' | 'greek' | 'egypt';
const ambianceTracks: Record<AmbianceStyle, string[]> = {
  menu: ['/audio/ambience/menu.ogg'],
  modules: ['/audio/ambience/modules.ogg'],
  medieval: ['/audio/music/medieval/1.ogg', '/audio/music/medieval/2.ogg', '/audio/music/medieval/3.ogg', '/audio/music/medieval/4.ogg', '/audio/music/medieval/5.ogg'],
  greek: [],
  egypt: [],
};

type SfxName = 'select';
const sfxTracks: Record<SfxName, string> = {
  select: '/sfx/select-menu.ogg', // Verificado contra vuestra estructura de archivos
};

// --- Definición del Contexto ---

interface AudioContextType {
  isAudioEnabled: boolean;
  enableAudio: () => void;
  playAmbiance: (style: AmbianceStyle) => void;
  playTrack: (trackUrl: string) => void;
  stopAmbiance: () => void;
  playSfx: (sfx: SfxName) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ambianceRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  
  // Ref para rastrear la URL de la pista actual y evitar recargas innecesarias
  const currentTrackRef = useRef<string | null>(null);

  const enableAudio = useCallback(() => {
    if (!isAudioEnabled) {
      setIsAudioEnabled(true);
    }
  }, [isAudioEnabled]);

  // --- LÓGICA DE REPRODUCCIÓN FORTIFICADA ---
  const playTrack = useCallback(async (trackUrl: string) => {
    if (!isAudioEnabled) return;
    
    // Si la pista solicitada ya es la que está sonando, no hacemos nada.
    if (currentTrackRef.current === trackUrl) return;

    if (!ambianceRef.current) {
      ambianceRef.current = new Audio();
      ambianceRef.current.loop = true;
      ambianceRef.current.volume = 0.4;
    }
    
    // Actualizamos la referencia inmediatamente para bloquear llamadas duplicadas
    currentTrackRef.current = trackUrl;
    ambianceRef.current.src = trackUrl;

    try {
      // Usamos async/await para gestionar la promesa que devuelve .play()
      // Esto le da tiempo al navegador de cargar el recurso antes de continuar.
      await ambianceRef.current.play();
    } catch (error) {
      // El error de "abort" puede seguir apareciendo si el usuario navega MUY rápido,
      // pero ahora lo capturamos y no romperá la aplicación. Lo ignoramos de forma segura.
      if ((error as DOMException).name !== 'AbortError') {
        console.error(`Error al reproducir ${trackUrl}:`, error);
      }
    }
  }, [isAudioEnabled]);

  const playAmbiance = useCallback((style: AmbianceStyle) => {
    const tracks = ambianceTracks[style];
    if (tracks && tracks.length > 0) {
      const trackToPlay = tracks[Math.floor(Math.random() * tracks.length)];
      playTrack(trackToPlay);
    }
  }, [playTrack]);

  const stopAmbiance = useCallback(() => {
    if (ambianceRef.current) {
      ambianceRef.current.pause();
      // Reseteamos la referencia para que la próxima pista pueda sonar.
      currentTrackRef.current = null;
    }
  }, []);

  const playSfx = useCallback((sfx: SfxName) => {
    if (!isAudioEnabled) return;
    const trackUrl = sfxTracks[sfx];
    if (trackUrl) {
      const sfxAudio = new Audio(trackUrl);
      sfxAudio.volume = 0.3; // Volumen ajustado
      sfxAudio.play().catch(e => console.error("SFX play failed:", e));
    }
  }, [isAudioEnabled]);

  const value = { isAudioEnabled, enableAudio, playAmbiance, playTrack, stopAmbiance, playSfx };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio debe ser usado dentro de un AudioProvider');
  }
  return context;
};