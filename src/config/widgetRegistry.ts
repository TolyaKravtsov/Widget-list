export interface WidgetConfig {
  id: string
  name: string
  icon?: string
}

export const WIDGET_REGISTRY: WidgetConfig[] = [
  {
    id: 'weather',
    name: 'Weather',
  },
  {
    id: 'crypto',
    name: 'Crypto Price',
  },
  {
    id: 'tasks',
    name: 'Task List',
  },
]

export const getWidgetConfig = (id: string): WidgetConfig | undefined => {
  return WIDGET_REGISTRY.find((widget) => widget.id === id)
}
