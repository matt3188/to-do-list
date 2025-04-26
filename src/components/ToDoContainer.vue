<script setup lang="ts">
  import { useTodos } from '@/composables/useTodos'

  const { todos, newTodo, filter, filteredTodos, addTodo, clearTodos, removeTodo } = useTodos()
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

        <transition-group mode="out-in" name="list" tag="ul">
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="todo-item d-flex align-center justify-space-between"
          >
            <v-checkbox
              v-model="todo.done"
              class="flex-grow-1"
              density="compact"
              hide-details
            >
              <template #label>
                <span :class="{ 'text-decoration-line-through': todo.done }">
                  {{ todo.text }}
                </span>
              </template>
            </v-checkbox>

            <v-btn color="error" icon @click="removeTodo(todo.id)">
              <v-icon icon="mdi-delete" />
            </v-btn>
          </li>
        </transition-group>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.todo-list-container {
  position: relative;
}

.todo-item {
  width: 100%;
  padding: 16px;
  margin-bottom: 8px;
  background-color: var(--v-surface);
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: var(--v-shadow-2);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
