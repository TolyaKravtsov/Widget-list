import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { Notifications, AccountCircle } from '@mui/icons-material'

function Navbar() {
  return (
    <AppBar position="static" sx={{ boxShadow: 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Notifications sx={{ cursor: 'pointer' }} />
          <AccountCircle sx={{ cursor: 'pointer' }} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

