import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import { Cloud, WaterDrop, Air } from '@mui/icons-material'
import WidgetContainer from './WidgetContainer'
import { useWeather } from '../../hooks/useWeather'

function WeatherWidget() {
  const { data, isLoading, error } = useWeather()

  if (isLoading) {
    return (
      <WidgetContainer title="Weather">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 150 }}>
          <CircularProgress />
        </Box>
      </WidgetContainer>
    )
  }

  if (error) {
    return (
      <WidgetContainer title="Weather">
        <Alert severity="error">Failed to load weather data</Alert>
      </WidgetContainer>
    )
  }

  if (!data) {
    return null
  }

  return (
    <WidgetContainer title="Weather">
      <Box>
        <Typography variant="h4" sx={{ mb: 1, color: 'primary.main' }}>
          {data.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Cloud sx={{ fontSize: 40, color: 'primary.light' }} />
          <Typography variant="h3">{Math.round(data.main.temp)}°C</Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 1, textTransform: 'capitalize' }}>
          {data.weather[0]?.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <WaterDrop sx={{ fontSize: 20, color: 'info.main' }} />
            <Typography variant="body2">{data.main.humidity}%</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Air sx={{ fontSize: 20, color: 'info.main' }} />
            <Typography variant="body2">{data.wind.speed} m/s</Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          Feels like {Math.round(data.main.feels_like)}°C
        </Typography>
      </Box>
    </WidgetContainer>
  )
}

export default WeatherWidget

