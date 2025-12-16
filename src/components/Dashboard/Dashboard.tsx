import { Box, Grid, Typography } from '@mui/material'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import DraggableWidget from '../Widgets/DraggableWidget'
import WeatherWidget from '../Widgets/WeatherWidget'
import CryptoWidget from '../Widgets/CryptoWidget'
import TaskListWidget from '../Widgets/TaskListWidget'
import { useWidgetStore } from '../../store/widgetStore'

const widgetComponents: Record<string, React.ComponentType> = {
  weather: WeatherWidget,
  crypto: CryptoWidget,
  tasks: TaskListWidget,
}

function Dashboard() {
  const widgetOrder = useWidgetStore((state) => state.widgetOrder)
  const removeWidget = useWidgetStore((state) => state.removeWidget)
  const reorderWidgets = useWidgetStore((state) => state.reorderWidgets)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = widgetOrder.indexOf(active.id as string)
      const newIndex = widgetOrder.indexOf(over.id as string)
      const newOrder = arrayMove(widgetOrder, oldIndex, newIndex)
      reorderWidgets(newOrder)
    }
  }

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
          {widgetOrder.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No widgets added yet
              </Typography>
            </Box>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={widgetOrder} strategy={rectSortingStrategy}>
                <Grid container spacing={3}>
                  {widgetOrder.map((widgetId) => {
                    const WidgetComponent = widgetComponents[widgetId]
                    return (
                      <Grid item xs={12} md={6} lg={4} key={widgetId}>
                        <DraggableWidget id={widgetId} onRemove={removeWidget}>
                          {WidgetComponent ? (
                            <WidgetComponent />
                          ) : (
                            <Box sx={{ p: 2 }}>
                              <Typography color="error">Widget not found: {widgetId}</Typography>
                            </Box>
                          )}
                        </DraggableWidget>
                      </Grid>
                    )
                  })}
                </Grid>
              </SortableContext>
            </DndContext>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard

