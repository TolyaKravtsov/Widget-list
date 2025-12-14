import { Paper, Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface WidgetContainerProps {
  title: string
  children: ReactNode
}

function WidgetContainer({ title, children }: WidgetContainerProps) {
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Paper>
  )
}

export default WidgetContainer

