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

export const useWeather = (city: string = 'London,uk') => {
  const query = useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: async () => {
      const response = await weatherApi.get('/weather', {
        params: {
          q: city,
        },
      })
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })

  return query
}

