import { WeatherData } from '../utils/types';
import { displayTemp } from '../utils/tempConverter';
import { formatTime } from '../utils/formatDate';
import { FiDroplet, FiWind, FiEye, FiSun, FiSunset } from 'react-icons/fi';
import { WiBarometer } from 'react-icons/wi';

interface WeatherCardProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

export default function WeatherCard({ data, unit }: WeatherCardProps) {
  const { name, sys, weather, main, wind, visibility, timezone } = data;
  const condition = weather[0];

  return (
    <div className="w-full max-w-xl mx-auto mt-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">{name}{sys?.country ? `, ${sys.country}` : ''}</h2>
          <p className="text-white/80 mt-1 capitalize text-lg flex items-center gap-2">
            {condition.description}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${condition.icon}@4x.png`}
          alt={condition.description}
          className="w-24 h-24 object-contain -mt-6 -mr-4 drop-shadow-lg"
        />
      </div>

      <div className="mt-6 flex flex-col justify-center items-center py-6 border-y border-white/10">
        <div className="text-8xl font-black tracking-tighter drop-shadow-md">
          {displayTemp(main.temp, unit)}
        </div>
        <p className="text-white/80 text-lg mt-2 font-medium">
          Feels like {displayTemp(main.feels_like, unit)}
        </p>
        <p className="text-white/70 text-sm mt-1">
          H: {displayTemp(main.temp_max, unit)} / L: {displayTemp(main.temp_min, unit)}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 shadow-sm">
          <FiDroplet className="text-2xl text-blue-300 mb-2" />
          <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">Humidity</span>
          <span className="text-lg font-medium">{main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 shadow-sm">
          <FiWind className="text-2xl text-gray-300 mb-2" />
          <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">Wind</span>
          <span className="text-lg font-medium">{(wind.speed * 3.6).toFixed(1)} km/h</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 shadow-sm">
          <FiEye className="text-2xl text-gray-300 mb-2" />
          <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">Visibility</span>
          <span className="text-lg font-medium">{(visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 shadow-sm">
          <WiBarometer className="text-3xl text-gray-300 mb-1" />
          <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">Pressure</span>
          <span className="text-lg font-medium">{main.pressure} hPa</span>
        </div>
      </div>

      {(sys?.sunrise && sys?.sunset) && (
        <div className="mt-6 flex justify-around text-sm text-white/90 pt-4 border-t border-white/10 bg-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <FiSun className="text-yellow-400 text-xl" />
            <span className="font-medium">{formatTime(sys.sunrise, timezone)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiSunset className="text-orange-400 text-xl" />
            <span className="font-medium">{formatTime(sys.sunset, timezone)}</span>
          </div>
        </div>
      )}
    </div>
  );
}