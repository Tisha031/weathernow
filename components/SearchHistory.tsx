'use client';

import { FiClock, FiX } from 'react-icons/fi';

interface SearchHistoryProps {
    history: string[];
    onSelect: (city: string) => void;
    onClear: () => void;
}

export default function SearchHistory({ history, onSelect, onClear }: SearchHistoryProps) {
    if (!history || history.length === 0) return null;

    return (
        <div className="w-full max-w-xl mx-auto mt-6">
            <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-white/80 text-sm font-medium flex items-center gap-2">
                    <FiClock /> Recent Searches
                </h3>
                <button
                    onClick={onClear}
                    className="text-white/60 hover:text-white text-xs transition-colors flex items-center gap-1"
                >
                    <FiX /> Clear
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {history.map((city) => (
                    <button
                        key={city}
                        onClick={() => onSelect(city)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-sm rounded-xl text-white text-sm transition-all shadow-sm flex items-center gap-2"
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
}
