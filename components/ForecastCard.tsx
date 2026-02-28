import { displayTemp } from '../utils/tempConverter';

interface ForecastCardProps {
    date: string;
    tempDay: number;
    tempNight: number;
    icon: string;
    description: string;
    unit: 'C' | 'F';
}

export default function ForecastCard({ date, tempDay, tempNight, icon, description, unit }: ForecastCardProps) {
    return (
        <div className="flex flex-col items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg shrink-0 w-[140px] snap-center transition-all hover:scale-105 hover:bg-white/20">
            <span className="text-white/90 text-sm font-semibold tracking-wide">{date}</span>
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                className="w-16 h-16 object-contain my-1 drop-shadow-md"
            />
            <span className="text-white/80 text-xs capitalize text-center mb-4 line-clamp-1 h-4">{description}</span>
            <div className="flex items-center gap-3 text-sm font-bold">
                <span className="text-white">{displayTemp(tempDay, unit)}</span>
                <span className="text-white/50">{displayTemp(tempNight, unit)}</span>
            </div>
        </div>
    );
}
