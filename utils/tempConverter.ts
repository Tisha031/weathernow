export function toFahrenheit(celsius: number): number {
    return Math.round((celsius * 9) / 5 + 32)
  }
  
  export function toCelsius(fahrenheit: number): number {
    return Math.round(((fahrenheit - 32) * 5) / 9)
  }
  
  export function displayTemp(celsius: number, unit: 'C' | 'F'): string {
    if (unit === 'F') {
      return `${toFahrenheit(celsius)}°F`
    }
    return `${Math.round(celsius)}°C`
  }