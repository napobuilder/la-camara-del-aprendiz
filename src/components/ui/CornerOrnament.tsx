import React from 'react';

const CornerOrnament = ({ className }) => (
    <svg className={`absolute w-24 h-24 text-yellow-800/60 ${className}`} viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 H25 L25 10 L10 10 L10 25 L0 25 Z M100 0 H75 L75 10 L90 10 L90 25 L100 25 Z M0 100 V75 L10 75 L10 90 L25 90 L25 100 Z M100 100 V75 L90 75 L90 90 L75 90 L75 100 Z" opacity="0.2"/><path d="M0 0 H30 C15 15 15 15 0 30 Z M10 0 H25 C15 10 15 10 10 25 Z" opacity="0.5"/><path d="M5 5 L20 5 C10 10 10 10 5 20 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7"/></svg>
);

export default CornerOrnament;