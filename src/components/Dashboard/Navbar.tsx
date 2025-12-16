import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material'
import { Notifications, AccountCircle, Add, Logout } from '@mui/icons-material'
import { useAuthStore } from '../../store/authStore'
import WidgetPicker from './WidgetPicker'

function Navbar() {
  const [widgetPickerOpen, setWidgetPickerOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <AppBar position="static" sx={{ boxShadow: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 600 }}>
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setWidgetPickerOpen(true)}
              sx={{ 
                color: 'text.primary', 
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover',
                }
              }}
            >
              Add Widget
            </Button>
            {user && (
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.primary' }}>
                {user.username}
              </Typography>
            )}
            <IconButton sx={{ color: 'text.primary' }} title="Notifications">
              <Notifications />
            </IconButton>
            <IconButton sx={{ color: 'text.primary' }} title="Account">
              <AccountCircle />
            </IconButton>
            <IconButton sx={{ color: 'text.primary' }} onClick={handleLogout} title="Logout">
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <WidgetPicker open={widgetPickerOpen} onClose={() => setWidgetPickerOpen(false)} />
    </>
  )
}

export default Navbar

