import type { ReactNode } from 'react';

interface MedievalButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const MedievalButton: React.FC<MedievalButtonProps> = ({ onClick, disabled = false, children, className }) => (
    <button onClick={onClick} disabled={disabled} className={`font-uncial tracking-wider text-base md:text-lg py-3 px-8 rounded-md transition-all duration-300 transform bg-gray-800 border border-gray-700 shadow-md enabled:hover:bg-gray-700 enabled:hover:scale-105 enabled:hover:text-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 shadow-black/30 enabled:active:shadow-inner enabled:active:shadow-black/50 ${className}`}>{children}</button>
);

export default MedievalButton;