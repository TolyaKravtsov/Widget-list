import axios from 'axios'

const API_BASE_URL = {
  weather: 'https://api.openweathermap.org/data/2.5',
  crypto: 'https://api.coingecko.com/api/v3',
}

export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || ''
export const CRYPTO_API_KEY = import.meta.env.VITE_CRYPTO_API_KEY || ''

export const weatherApi = axios.create({
  baseURL: API_BASE_URL.weather,
  params: {
    appid: WEATHER_API_KEY,
    units: 'metric',
  },
})

export const cryptoApi = axios.create({
  baseURL: API_BASE_URL.crypto,
})

export default {
  weatherApi,
  cryptoApi,
}

