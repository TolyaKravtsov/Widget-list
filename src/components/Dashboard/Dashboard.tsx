import { Box, Grid } from '@mui/material'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import WeatherWidget from '../Widgets/WeatherWidget'
import CryptoWidget from '../Widgets/CryptoWidget'
import TaskListWidget from '../Widgets/TaskListWidget'

function Dashboard() {
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
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <WeatherWidget />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <CryptoWidget />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TaskListWidget />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard

