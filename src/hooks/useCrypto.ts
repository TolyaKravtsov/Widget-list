import { useQuery } from '@tanstack/react-query'
import { cryptoApi } from '../config/api'

interface CryptoData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  image: string
}

export const useCrypto = () => {
  return useQuery<CryptoData>({
    queryKey: ['crypto'],
    queryFn: async () => {
      const response = await cryptoApi.get('/coins/bitcoin', {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
        },
      })
      return {
        id: response.data.id,
        symbol: response.data.symbol,
        name: response.data.name,
        current_price: response.data.market_data.current_price.usd,
        price_change_percentage_24h: response.data.market_data.price_change_percentage_24h,
        market_cap: response.data.market_data.market_cap.usd,
        image: response.data.image.small,
      }
    },
    staleTime: 1 * 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  })
}

