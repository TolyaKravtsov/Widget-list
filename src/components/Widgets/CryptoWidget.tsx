import { Box, Typography, CircularProgress, Alert, Avatar } from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'
import WidgetContainer from './WidgetContainer'
import { useCrypto } from '../../hooks/useCrypto'

function CryptoWidget() {
  const { data, isLoading, error } = useCrypto()

  if (isLoading) {
    return (
      <WidgetContainer title="Crypto Price">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 150 }}>
          <CircularProgress />
        </Box>
      </WidgetContainer>
    )
  }

  if (error) {
    return (
      <WidgetContainer title="Crypto Price">
        <Alert severity="error">Failed to load crypto data</Alert>
      </WidgetContainer>
    )
  }

  if (!data) {
    return null
  }

  const isPositive = data.price_change_percentage_24h >= 0

  return (
    <WidgetContainer title="Crypto Price">
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          {data.image && <Avatar src={data.image} alt={data.name} />}
          <Box>
            <Typography variant="h6">{data.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
              {data.symbol}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" sx={{ mb: 1, color: 'primary.main' }}>
          ${data.current_price.toLocaleString()}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isPositive ? (
            <TrendingUp sx={{ color: 'success.main' }} />
          ) : (
            <TrendingDown sx={{ color: 'error.main' }} />
          )}
          <Typography
            variant="body1"
            sx={{
              color: isPositive ? 'success.main' : 'error.main',
            }}
          >
            {isPositive ? '+' : ''}
            {data.price_change_percentage_24h.toFixed(2)}% (24h)
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Market Cap: ${(data.market_cap / 1e9).toFixed(2)}B
        </Typography>
      </Box>
    </WidgetContainer>
  )
}

export default CryptoWidget

