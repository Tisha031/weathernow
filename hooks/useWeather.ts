import { useState } from 'react';
import { WeatherData } from '../utils/types';

export const useWeather = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to fetch weather');
            }
            const data: WeatherData = await res.json();
            setWeatherData(data);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    return { weatherData, loading, error, fetchWeather };
};
