import { Box, IconButton } from '@mui/material'
import { DragIndicator, Close } from '@mui/icons-material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode } from 'react'

interface DraggableWidgetProps {
  id: string
  children: ReactNode
  onRemove: (id: string) => void
}

function DraggableWidget({ id, children, onRemove }: DraggableWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        position: 'relative',
        '&:hover .widget-controls': {
          opacity: 1,
        },
      }}
    >
      <Box
        className="widget-controls"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          gap: 0.5,
          opacity: 0,
          transition: 'opacity 0.2s',
          zIndex: 10,
        }}
      >
        <Box
          {...attributes}
          {...listeners}
          sx={{
            cursor: 'grab',
            backgroundColor: 'background.paper',
            borderRadius: 1,
            padding: 0.5,
            display: 'flex',
            alignItems: 'center',
            '&:active': {
              cursor: 'grabbing',
            },
          }}
        >
          <DragIndicator color="action" fontSize="small" />
        </Box>
        <IconButton
          onClick={() => onRemove(id)}
          sx={{
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'error.contrastText',
            },
          }}
          size="small"
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>
      {children}
    </Box>
  )
}

export default DraggableWidget
