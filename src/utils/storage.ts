import type { Todo } from '@/types/todo'

export function loadTodosFromStorage (): Todo[] {
  const saved = localStorage.getItem('todos')
  if (!saved) return []
  try {
    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed) && parsed.every(item => typeof item.text === 'string' && typeof item.done === 'boolean')) {
      return parsed as Todo[]
    }
  } catch (error) {
    console.error('Failed to parse todos from localStorage', error)
  }
  return []
}

export function saveTodosToStorage (todos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos))
}
