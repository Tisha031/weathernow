export function getWeatherBg(condition: string): string {
    const c = condition?.toLowerCase()
  
    if (c?.includes('clear'))
      return 'from-sky-400 via-blue-400 to-blue-600'
    if (c?.includes('cloud'))
      return 'from-gray-400 via-slate-500 to-slate-600'
    if (c?.includes('rain') || c?.includes('drizzle'))
      return 'from-slate-600 via-blue-800 to-blue-900'
    if (c?.includes('snow'))
      return 'from-blue-100 via-slate-200 to-slate-300'
    if (c?.includes('thunder') || c?.includes('storm'))
      return 'from-gray-700 via-gray-800 to-gray-900'
    if (c?.includes('mist') || c?.includes('fog') || c?.includes('haze'))
      return 'from-gray-300 via-gray-400 to-slate-500'
  
    return 'from-sky-400 via-blue-400 to-blue-600' // default
  }