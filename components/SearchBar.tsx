'use client';

import { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';

interface SearchBarProps {
    onSearch: (city: string) => void;
    loading?: boolean;
}

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            // Keep query to show what we searched for, or clear it. Let's keep it.
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMapPin className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
                type="text"
                className="block w-full pl-12 pr-16 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all shadow-lg text-lg"
                placeholder="Search for a city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
                <button
                    type="submit"
                    disabled={!query.trim() || loading}
                    className="p-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500/50 text-white rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <FiSearch className="text-xl" />
                    )}
                </button>
            </div>
        </form>
    );
}