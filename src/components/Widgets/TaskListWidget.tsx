import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
} from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'
import { useState } from 'react'
import WidgetContainer from './WidgetContainer'
import { useWidgetStore, Task } from '../../store/widgetStore'

function TaskListWidget() {
  const { tasks, addTask, deleteTask, toggleTask, updateTask } = useWidgetStore()
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim())
      setNewTaskTitle('')
    }
  }

  const handleStartEdit = (task: Task) => {
    setEditingId(task.id)
    setEditTitle(task.title)
  }

  const handleSaveEdit = (id: string) => {
    if (editTitle.trim()) {
      updateTask(id, { title: editTitle.trim() })
      setEditingId(null)
      setEditTitle('')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
  }

  return (
    <WidgetContainer title="Task List">
      <Box>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            size="small"
            placeholder="Add new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTask()
              }
            }}
            sx={{ flexGrow: 1 }}
          />
          <Button variant="contained" startIcon={<Add />} onClick={handleAddTask}>
            Add
          </Button>
        </Box>
        {tasks.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
            No tasks yet. Add one above!
          </Typography>
        ) : (
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {tasks.map((task) => (
              <ListItem key={task.id} sx={{ px: 0 }}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  sx={{ color: 'primary.main' }}
                />
                {editingId === task.id ? (
                  <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
                    <TextField
                      size="small"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSaveEdit(task.id)
                        } else if (e.key === 'Escape') {
                          handleCancelEdit()
                        }
                      }}
                      sx={{ flexGrow: 1 }}
                      autoFocus
                    />
                    <Button size="small" onClick={() => handleSaveEdit(task.id)}>
                      Save
                    </Button>
                    <Button size="small" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <>
                    <ListItemText
                      primary={task.title}
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary',
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleStartEdit(task)} size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton edge="end" onClick={() => deleteTask(task.id)} size="small">
                        <Delete fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </WidgetContainer>
  )
}

export default TaskListWidget

