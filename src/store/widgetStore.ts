import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

interface WidgetState {
  tasks: Task[]
  addTask: (title: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
}

export const useWidgetStore = create<WidgetState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'widget-storage',
    },
  ),
)

