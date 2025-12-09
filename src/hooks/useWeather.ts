import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
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

interface GeolocationPosition {
  coords: {
    latitude: number
    longitude: number
  }
}

export const useWeather = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [geoError, setGeoError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
        setGeoError(null)
      },
      (error) => {
        setGeoError('Unable to retrieve your location')
        console.error('Geolocation error:', error)
      }
    )
  }, [])

  const query = useQuery<WeatherData>({
    queryKey: ['weather', location?.lat, location?.lon],
    queryFn: async () => {
      if (!location) {
        throw new Error('Location not available')
      }
      const response = await weatherApi.get('/weather', {
        params: {
          lat: location.lat,
          lon: location.lon,
        },
      })
      return response.data
    },
    enabled: !!location && !geoError,
    staleTime: 5 * 60 * 1000,
  })

  return {
    ...query,
    geoError,
  }
}

