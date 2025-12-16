import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { WIDGET_REGISTRY } from '../../config/widgetRegistry'
import { useWidgetStore } from '../../store/widgetStore'

interface WidgetPickerProps {
  open: boolean
  onClose: () => void
}

function WidgetPicker({ open, onClose }: WidgetPickerProps) {
  const widgetOrder = useWidgetStore((state) => state.widgetOrder)
  const addWidget = useWidgetStore((state) => state.addWidget)

  const availableWidgets = WIDGET_REGISTRY.filter((widget) => !widgetOrder.includes(widget.id))

  const handleAddWidget = (widgetId: string) => {
    addWidget(widgetId)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Widget</DialogTitle>
      <DialogContent>
        {availableWidgets.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
            All widgets added
          </Typography>
        ) : (
          <List>
            {availableWidgets.map((widget) => (
              <ListItem key={widget.id} disablePadding>
                <ListItemButton onClick={() => handleAddWidget(widget.id)}>
                  <ListItemText primary={widget.name} />
                  <Add color="primary" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default WidgetPicker
