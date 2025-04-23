<script setup lang="ts">
  import { ref } from 'vue'

  // Define a type for a Todo item
  type Todo = {
    text: string
    done: boolean
  }

  // Reactive state
  const todos = ref<Todo[]>([])
  const newTodo = ref<string>('')

  // Add a new todo
  const addTodo = (): void => {
    if (newTodo.value.trim() === '') return

    todos.value.push({
      text: newTodo.value,
      done: false,
    })

    newTodo.value = ''
  }

  // Remove a todo
  const removeTodo = (index: number): void => {
    todos.value.splice(index, 1)
  }
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
          <v-btn class="mt-2" color="primary" @click="addTodo">Add</v-btn>
        </v-form>

        <v-divider class="my-4" />

        <v-list>
          <v-list-item
            v-for="(todo, index) in todos"
            :key="index"
            class="d-flex align-center justify-space-between"
            slim
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
                    <span :class="{'text-decoration-line-through': todo.done}">{{ todo.text }}</span>
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
