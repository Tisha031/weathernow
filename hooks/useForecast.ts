import { useState } from 'react';
import { ForecastData } from '../utils/types';

export const useForecast = () => {
    const [forecastData, setForecastData] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchForecast = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`);
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to fetch forecast');
            }
            const data: ForecastData = await res.json();
            setForecastData(data);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            setForecastData(null);
        } finally {
            setLoading(false);
        }
    };

    return { forecastData, loading, error, fetchForecast };
};
