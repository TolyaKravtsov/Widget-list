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
