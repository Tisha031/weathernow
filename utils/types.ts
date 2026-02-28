export interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  weather: [{ main: string; description: string; icon: string }];
  main: { temp: number; feels_like: number; humidity: number; temp_min: number; temp_max: number; pressure: number };
  wind: { speed: number };
  visibility: number;
  clouds: { all: number };
  timezone: number;
  dt: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: { temp: number; temp_min: number; temp_max: number; humidity: number; feels_like: number; pressure: number };
    weather: [{ main: string; description: string; icon: string }];
    wind: { speed: number };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
