import { useQuery } from '@tanstack/react-query'
import { weatherApi } from '../config/api'

interface WeatherData {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
}

interface UseWeatherOptions {
  city?: string
  lat?: number
  lon?: number
}

export const useWeather = ({ city, lat, lon }: UseWeatherOptions = {}) => {
  return useQuery<WeatherData>({
    queryKey: ['weather', city, lat, lon],
    queryFn: async () => {
      const params: Record<string, string | number> = {}
      if (city) {
        params.q = city
      } else if (lat !== undefined && lon !== undefined) {
        params.lat = lat
        params.lon = lon
      } else {
        params.q = 'London'
      }

      const response = await weatherApi.get('/weather', { params })
      return response.data
    },
    enabled: !!city || (lat !== undefined && lon !== undefined),
    staleTime: 5 * 60 * 1000,
  })
}

