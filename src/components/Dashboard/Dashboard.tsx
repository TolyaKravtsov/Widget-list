import { Suspense, lazy } from 'react'
import { Box, Grid, Typography, CircularProgress } from '@mui/material'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import DraggableWidget from '../Widgets/DraggableWidget'
import { useWidgetStore } from '../../store/widgetStore'

// Lazy load widgets
const WeatherWidget = lazy(() => import('../Widgets/WeatherWidget'))
const CryptoWidget = lazy(() => import('../Widgets/CryptoWidget'))
const TaskListWidget = lazy(() => import('../Widgets/TaskListWidget'))

const widgetComponents: Record<string, React.ComponentType> = {
  weather: WeatherWidget,
  crypto: CryptoWidget,
  tasks: TaskListWidget,
}

const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
    <CircularProgress />
  </Box>
)

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
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                gap: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No widgets added yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click "Add Widget" in the navbar to get started
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
                            <Suspense fallback={<LoadingFallback />}>
                              <WidgetComponent />
                            </Suspense>
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

