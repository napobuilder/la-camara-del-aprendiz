import type { ReactNode } from 'react';
import CornerOrnament from './CornerOrnament';
import TopCrest from './TopCrest';

interface FramedPanelProps {
    children: ReactNode;
    className?: string;
}

const FramedPanel: React.FC<FramedPanelProps> = ({ children, className }) => (
    <div className={`relative w-full bg-gray-900 rounded-lg shadow-2xl shadow-black/50 p-2 ${className}`}>
        <div className="relative w-full h-full border border-yellow-800/60 rounded-md p-6 md:p-8">
            <CornerOrnament className="top-0 left-0" />
            <CornerOrnament className="top-0 right-0 transform rotate-90" />
            <CornerOrnament className="bottom-0 left-0 transform -rotate-90" />
            <CornerOrnament className="bottom-0 right-0 transform rotate-180" />
            <TopCrest className="top-0 left-1/2 -translate-x-1/2 -mt-4" />
            {children}
        </div>
    </div>
);

export default FramedPanel;