<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Канбан-доска задач</span>
          <span class="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">Kanban</span>
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Интерактивное управление спринтом с перемещением задач между статусами
        </p>
      </div>

      <button @click="showNewTaskModal = true" class="btn-primary btn-sm">
        + Новая задача
      </button>
    </div>

    <!-- 3 Columns Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      
      <!-- Column: To Do -->
      <div class="card-base p-4 bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">К выполнению</h3>
          </div>
          <span class="px-2 py-0.5 text-xs rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
            {{ todoTasks.length }}
          </span>
        </div>

        <div class="space-y-3">
          <div v-for="task in todoTasks" :key="task.id" class="card-base p-4 bg-white dark:bg-slate-800 shadow-sm border border-slate-200/70 dark:border-slate-700/70">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-slate-400 font-mono">{{ task.estimate }}</span>
            </div>
            <h4 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <span class="text-slate-400 text-[11px]">{{ task.assignee }}</span>
              <button @click="moveTask(task.id, 'inProgress')" class="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-[11px]">
                В работу →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: In Progress -->
      <div class="card-base p-4 bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">В работе</h3>
          </div>
          <span class="px-2 py-0.5 text-xs rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
            {{ inProgressTasks.length }}
          </span>
        </div>

        <div class="space-y-3">
          <div v-for="task in inProgressTasks" :key="task.id" class="card-base p-4 bg-white dark:bg-slate-800 shadow-sm border border-slate-200/70 dark:border-slate-700/70">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-slate-400 font-mono">{{ task.estimate }}</span>
            </div>
            <h4 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <button @click="moveTask(task.id, 'todo')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[11px]">
                ← Назад
              </button>
              <button @click="moveTask(task.id, 'done')" class="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold text-[11px]">
                Готово ✓
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: Done -->
      <div class="card-base p-4 bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">Завершено</h3>
          </div>
          <span class="px-2 py-0.5 text-xs rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
            {{ doneTasks.length }}
          </span>
        </div>

        <div class="space-y-3">
          <div v-for="task in doneTasks" :key="task.id" class="card-base p-4 bg-white dark:bg-slate-800 shadow-sm border border-slate-200/70 dark:border-slate-700/70 opacity-90">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-emerald-500 font-bold">Выполнено</span>
            </div>
            <h4 class="font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-300 line-through leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <span class="text-slate-400 text-[11px]">{{ task.assignee }}</span>
              <button @click="moveTask(task.id, 'inProgress')" class="text-slate-400 hover:underline text-[11px]">
                Вернуть
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Quick Add Modal -->
    <div v-if="showNewTaskModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="card-base max-w-md w-full p-6 space-y-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Добавить задачу</h3>
        <input v-model="newTaskTitle" type="text" placeholder="Название задачи..." class="input-base" />
        <div class="flex justify-end gap-2">
          <button @click="showNewTaskModal = false" class="btn-secondary btn-sm">Отмена</button>
          <button @click="addNewTask" class="btn-primary btn-sm">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showNewTaskModal = ref(false)
const newTaskTitle = ref('')

const tasks = ref([
  { id: 1, title: 'Реализовать компонент AdSlot.vue', status: 'done', tag: 'Frontend', tagClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300', estimate: '3ч', assignee: 'Eugene' },
  { id: 2, title: 'Провести сравнительный анализ 5 хостингов', status: 'done', tag: 'Аналитика', tagClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300', estimate: '4ч', assignee: 'Eugene' },
  { id: 3, title: 'Настроить CI/CD пайплайн в GitHub Actions', status: 'inProgress', tag: 'DevOps', tagClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300', estimate: '2ч', assignee: 'Eugene' },
  { id: 4, title: 'Проверить CLS и плавность загрузки баннеров', status: 'todo', tag: 'QA', tagClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300', estimate: '1.5ч', assignee: 'Eugene' },
  { id: 5, title: 'Запустить демо-версию на Cloudflare Pages', status: 'todo', tag: 'Хостинг', tagClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300', estimate: '1ч', assignee: 'Eugene' }
])

const todoTasks = computed(() => tasks.value.filter(t => t.status === 'todo'))
const inProgressTasks = computed(() => tasks.value.filter(t => t.status === 'inProgress'))
const doneTasks = computed(() => tasks.value.filter(t => t.status === 'done'))

const moveTask = (id, newStatus) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.status = newStatus
}

const addNewTask = () => {
  if (!newTaskTitle.value.trim()) return
  tasks.value.push({
    id: Date.now(),
    title: newTaskTitle.value.trim(),
    status: 'todo',
    tag: 'Новое',
    tagClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
    estimate: '2ч',
    assignee: 'Eugene'
  })
  newTaskTitle.value = ''
  showNewTaskModal.value = false
}
</script>
