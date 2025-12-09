import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

interface WidgetState {
  // Task management
  tasks: Task[]
  addTask: (title: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  // Widget configuration
  widgetOrder: string[]
  addWidget: (widgetId: string) => void
  removeWidget: (widgetId: string) => void
  reorderWidgets: (newOrder: string[]) => void
}

const DEFAULT_WIDGET_ORDER = ['weather', 'crypto', 'tasks']

export const useWidgetStore = create<WidgetState>()(
  persist(
    (set) => ({
      // Task management
      tasks: [],
      addTask: (title: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now().toString(),
              title,
              completed: false,
              createdAt: Date.now(),
            },
          ],
        })),
      updateTask: (id: string, updates: Partial<Task>) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      // Widget configuration
      widgetOrder: DEFAULT_WIDGET_ORDER,
      addWidget: (widgetId: string) =>
        set((state) => {
          if (state.widgetOrder.includes(widgetId)) {
            return state
          }
          return {
            widgetOrder: [...state.widgetOrder, widgetId],
          }
        }),
      removeWidget: (widgetId: string) =>
        set((state) => ({
          widgetOrder: state.widgetOrder.filter((id) => id !== widgetId),
        })),
      reorderWidgets: (newOrder: string[]) =>
        set(() => ({
          widgetOrder: newOrder,
        })),
    }),
    {
      name: 'widget-storage',
    },
  ),
)

