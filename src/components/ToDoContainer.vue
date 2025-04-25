<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'

  // Define a type for a Todo item
  type Todo = {
    text: string
    done: boolean
  }

  // Reactive state
  const todos = ref<Todo[]>([])
  const newTodo = ref('')
  const filter = ref<'all' | 'active' | 'completed'>('all')

  // Save todos to localStorage whenever they change
  watch(todos, (newTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }, { deep: true })

  // Load todos from localStorage when the component mounts
  onMounted(() => {
    const saved = localStorage.getItem('todos')
    if(saved) {
      // Check if what we're retrieving is a valid list of Todos
      try {
        const parsed = JSON.parse(saved)
        if(Array.isArray(parsed) && parsed.every(item => typeof item.text === 'string' && typeof item.done === 'boolean')) {
          todos.value = JSON.parse(saved) as Todo[]
        } else {
          console.warn('Invalid todos format in localStorage, ignoring it')
        }
      } catch (error) {
        console.error('Failed to parse todos from localStorage:', error)
      }
    }
  })

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
</script>

<template>
  <v-container class="pa-4" max-width="600px">
    <v-card elevation="3">
      <v-card-title>
        <h2 class="text-h5">To-Do List</h2>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="addTodo">
          <v-text-field
            v-model="newTodo"
            clearable
            hide-details
            label="Add a task..."
          />
          <v-btn class="mt-2 mr-2" color="primary" @click="addTodo">Add</v-btn>
          <v-btn class="mt-2" color="error" :disabled="!todos.length" @click="clearTodos">Clear all</v-btn>
        </v-form>

        <v-divider class="my-4" />

        <!-- Filter buttons -->
        <v-btn-toggle v-model="filter" class="mb-4" mandatory>
          <v-btn value="all">All</v-btn>
          <v-btn value="active">Active</v-btn>
          <v-btn value="completed">Completed</v-btn>
        </v-btn-toggle>

        <v-list>
          <v-list-item
            v-for="(todo, index) in filteredTodos"
            :key="index"
            class="d-flex align-center justify-space-between"
          >
            <template #prepend>
              <v-list-item-action start>
                <v-checkbox
                  v-model="todo.done"
                  class="flex-grow-1"
                  density="compact"
                  hide-details
                >
                  <template #label>
                    <span :class="{'text-decoration-line-through': todo.done}">
                      {{ todo.text }}
                    </span>
                  </template>
                </v-checkbox>
              </v-list-item-action>
            </template>

            <template #append>
              <v-btn color="error" icon @click="removeTodo(index)">
                <v-icon icon="mdi-delete" />
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>
