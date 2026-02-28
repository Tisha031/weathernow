'use client';

import { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastSection from '../components/ForecastSection';
import SearchHistory from '../components/SearchHistory';
import UnitToggle from '../components/UnitToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import { useWeather } from '../hooks/useWeather';
import { useForecast } from '../hooks/useForecast';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getWeatherBg } from '../utils/getWeatherBg';
import { FiCloudDrizzle } from 'react-icons/fi';

export default function Home() {
  const { weatherData, loading: weatherLoading, error: weatherError, fetchWeather } = useWeather();
  const { forecastData, loading: forecastLoading, error: forecastError, fetchForecast } = useForecast();

  const [history, setHistory, isMounted] = useLocalStorage<string[]>('weather_search_history', []);
  const [unit, setUnit] = useLocalStorage<'C' | 'F'>('weather_unit', 'C');

  useEffect(() => {
    if (isMounted) {
      if (history && history.length > 0) {
        handleSearch(history[0], false);
      } else {
        handleSearch('London', false); // Default city
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const handleSearch = async (city: string, addToHistory: boolean = true) => {
    await Promise.all([
      fetchWeather(city),
      fetchForecast(city)
    ]);

    if (addToHistory) {
      setHistory((prev) => {
        const prevHistory = prev || [];
        const newHistory = [city, ...prevHistory.filter((c) => c.toLowerCase() !== city.toLowerCase())];
        return newHistory.slice(0, 5); // Keep last 5 searches
      });
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const isLoading = weatherLoading || forecastLoading;
  const error = weatherError || forecastError;

  const bgClass = weatherData && weatherData.weather[0]
    ? getWeatherBg(weatherData.weather[0].main)
    : 'from-slate-800 via-slate-900 to-black';

  return (
    <main className={`min-h-screen bg-gradient-to-br transition-all duration-1000 p-4 md:p-8 ${bgClass}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mt-4 mb-12">
          <div className="flex items-center gap-3 text-white w-full md:w-auto justify-center md:justify-start">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md shadow-lg border border-white/20">
              <FiCloudDrizzle className="text-3xl text-blue-300" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight drop-shadow-md">WeatherNow</h1>
              <p className="text-white/60 text-xs font-medium uppercase tracking-widest">Dashboard</p>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl flex justify-center md:justify-end">
            <UnitToggle unit={unit} onToggle={setUnit} />
          </div>
        </header>

        {/* Search Bar */}
        <SearchBar onSearch={(city) => handleSearch(city)} loading={isLoading} />

        {/* Error Handling */}
        {error && (
          <div className="max-w-xl mx-auto p-4 bg-red-500/20 border border-red-500/50 rounded-2xl backdrop-blur-md text-white text-center shadow-lg animate-in fade-in slide-in-from-top-4">
            <p className="font-medium text-red-100">{error}</p>
          </div>
        )}

        {/* Loading and Data Presentation */}
        {isLoading && !weatherData ? (
          <LoadingSpinner />
        ) : (
          <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            {weatherData && (
              <WeatherCard data={weatherData} unit={unit} />
            )}

            {forecastData && (
              <ForecastSection data={forecastData} unit={unit} />
            )}
          </div>
        )}

        {/* Recent Searches */}
        {!isLoading && <SearchHistory history={history} onSelect={(city) => handleSearch(city, false)} onClear={clearHistory} />}
      </div>
    </main>
  );
}