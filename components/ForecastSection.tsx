import { ForecastData } from '../utils/types';
import ForecastCard from './ForecastCard';
import { formatDate } from '../utils/formatDate';

interface ForecastSectionProps {
    data: ForecastData;
    unit: 'C' | 'F';
}

export default function ForecastSection({ data, unit }: ForecastSectionProps) {
    // Aggregate 3-hour forecast data to daily min/max
    const dailyForecasts = new Map<string, any>();

    data.list.forEach((item) => {
        // dt_txt is typically "YYYY-MM-DD HH:mm:ss"
        const dateKey = item.dt_txt.split(' ')[0];

        if (!dailyForecasts.has(dateKey)) {
            dailyForecasts.set(dateKey, {
                date: formatDate(item.dt, data.city.timezone),
                tempDay: item.main.temp_max,
                tempNight: item.main.temp_min,
                icon: item.weather[0].icon,
                description: item.weather[0].description,
                dt: item.dt
            });
        } else {
            const existing = dailyForecasts.get(dateKey);
            if (item.main.temp_max > existing.tempDay) {
                existing.tempDay = item.main.temp_max;
            }
            if (item.main.temp_min < existing.tempNight) {
                existing.tempNight = item.main.temp_min;
            }

            // Update icon/desc to a daytime reading if possible (12:00 or 15:00)
            if (item.dt_txt.includes('12:00:00') || item.dt_txt.includes('15:00:00')) {
                existing.icon = item.weather[0].icon;
                existing.description = item.weather[0].description;
            }
        }
    });

    // Extract up to 5 days, skip today if we have 6 days total (often the case with OWM returning remaining of today + 5 days)
    const forecastsArray = Array.from(dailyForecasts.values()).slice(0, 5);

    return (
        <div className="w-full max-w-xl mx-auto mt-8">
            <h3 className="text-white/90 text-lg font-bold mb-4 px-2 tracking-wide uppercase text-sm">5-Day Forecast</h3>
            <div className="flex overflow-x-auto gap-4 pb-6 snap-x hide-scrollbar px-1">
                {forecastsArray.map((day) => (
                    <ForecastCard
                        key={day.dt}
                        date={day.date}
                        tempDay={day.tempDay}
                        tempNight={day.tempNight}
                        icon={day.icon.replace('n', 'd')} // prefer day icons for general daily display
                        description={day.description}
                        unit={unit}
                    />
                ))}
            </div>
        </div>
    );
}
