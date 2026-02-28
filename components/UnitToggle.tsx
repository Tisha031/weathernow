'use client';

interface UnitToggleProps {
    unit: 'C' | 'F';
    onToggle: (unit: 'C' | 'F') => void;
}

export default function UnitToggle({ unit, onToggle }: UnitToggleProps) {
    return (
        <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-lg">
            <button
                onClick={() => onToggle('C')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${unit === 'C'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-white hover:bg-white/10'
                    }`}
            >
                °C
            </button>
            <button
                onClick={() => onToggle('F')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${unit === 'F'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-white hover:bg-white/10'
                    }`}
            >
                °F
            </button>
        </div>
    );
}
