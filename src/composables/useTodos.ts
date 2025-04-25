import { computed, ref, watch } from 'vue'
import { loadTodosFromStorage, saveTodosToStorage } from '@/utils/storage'
import type { Todo } from '@/types/todo'
import type { FilterType } from '@/types/filters'

export function useTodos () {
  // Reactive state
  const todos = ref<Todo[]>([])
  const newTodo = ref('')
  const filter = ref<FilterType>('all')

  // Load todos from localStorage
  todos.value = loadTodosFromStorage()

  watch(todos, saveTodosToStorage, { deep: true })

  // Add a new todo
  const addTodo = () => {
    if (!newTodo.value.trim()) return
    todos.value.push({ text: newTodo.value.trim(), done: false })
    newTodo.value = ''
  }

  const clearTodos = () => {
    if (confirm('Are you sure you want to clear all todos?')) {
      todos.value = []
    }
  }

  // Remove a todo
  const removeTodo = (index: number) => {
    todos.value.splice(index, 1)
  }

  const filteredTodos = computed(() => {
    if (filter.value === 'active') return todos.value.filter(t => !t.done)
    if (filter.value === 'completed') return todos.value.filter(t => t.done)
    return todos.value
  })

  return {
    todos,
    newTodo,
    filter,
    filteredTodos,
    addTodo,
    clearTodos,
    removeTodo,
  }
}
