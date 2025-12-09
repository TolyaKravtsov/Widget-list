import { Box, Typography } from '@mui/material'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

function Analytics() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" color="text.secondary">
            Analytics
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Analytics
