<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Канбан-доска спринта
        </h1>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Интерактивное управление этапами разработки, тестирования и релиза
        </p>
      </div>

      <button @click="showNewTaskModal = true" class="btn-primary btn-sm px-3.5 py-2">
        + Создать задачу
      </button>
    </div>

    <!-- 3 Columns Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
      
      <!-- Column: To Do -->
      <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
            <h3 class="font-semibold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">К выполнению</h3>
          </div>
          <span class="px-2 py-0.5 text-xs rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">
            {{ todoTasks.length }}
          </span>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="task in todoTasks"
            :key="task.id"
            class="card-base p-3.5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="px-1.5 py-0.5 rounded text-[10px] font-mono" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-zinc-400 font-mono">{{ task.estimate }}</span>
            </div>
            <h4 class="font-medium text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <img :src="task.avatar" class="w-4 h-4 rounded-full object-cover" />
                <span class="text-zinc-500 text-[11px]">{{ task.assignee }}</span>
              </div>
              <button @click="moveTask(task.id, 'inProgress')" class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-[11px] flex items-center gap-0.5">
                <span>В работу</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: In Progress -->
      <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <h3 class="font-semibold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">В разработке</h3>
          </div>
          <span class="px-2 py-0.5 text-xs rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-mono text-[11px]">
            {{ inProgressTasks.length }}
          </span>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="task in inProgressTasks"
            :key="task.id"
            class="card-base p-3.5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="px-1.5 py-0.5 rounded text-[10px] font-mono" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-zinc-400 font-mono">{{ task.estimate }}</span>
            </div>
            <h4 class="font-medium text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <button @click="moveTask(task.id, 'todo')" class="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-[11px]">
                ← Назад
              </button>
              <div class="flex items-center gap-1.5">
                <img :src="task.avatar" class="w-4 h-4 rounded-full object-cover" />
                <span class="text-zinc-500 text-[11px]">{{ task.assignee }}</span>
              </div>
              <button @click="moveTask(task.id, 'done')" class="text-emerald-600 dark:text-emerald-400 hover:underline font-medium text-[11px] flex items-center gap-0.5">
                <span>Готово</span>
                <span>✓</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: Done -->
      <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h3 class="font-semibold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Выполнено</h3>
          </div>
          <span class="px-2 py-0.5 text-xs rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-[11px]">
            {{ doneTasks.length }}
          </span>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="task in doneTasks"
            :key="task.id"
            class="card-base p-3.5 opacity-80 hover:opacity-100 transition-opacity shadow-2xs"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="px-1.5 py-0.5 rounded text-[10px] font-mono" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Завершено</span>
            </div>
            <h4 class="font-medium text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-through leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <img :src="task.avatar" class="w-4 h-4 rounded-full object-cover" />
                <span class="text-zinc-400 text-[11px]">{{ task.assignee }}</span>
              </div>
              <button @click="moveTask(task.id, 'inProgress')" class="text-zinc-400 hover:underline text-[11px]">
                Вернуть
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Quick Add Modal -->
    <div v-if="showNewTaskModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="card-base max-w-md w-full p-5 space-y-4 shadow-dropdown">
        <h3 class="text-base font-bold text-zinc-900 dark:text-zinc-100">Новая задача спринта</h3>
        <input v-model="newTaskTitle" type="text" placeholder="Введите название задачи..." class="input-base" />
        <div class="flex justify-end gap-2 pt-2">
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
  {
    id: 1,
    title: 'Реализовать компонент AdSlot с поддержкой спецификаций IAB',
    status: 'done',
    tag: 'Frontend',
    tagClass: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
    estimate: '3ч',
    assignee: 'Алексей Соколов',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Архитектурный аудит и бенчмаркинг Cloudflare Pages vs GitHub Pages',
    status: 'done',
    tag: 'DevOps',
    tagClass: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
    estimate: '4ч',
    assignee: 'Михаил Смирнов',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Настроить автоматический CI/CD релизный пайплайн в GitHub Actions',
    status: 'done',
    tag: 'Инфраструктура',
    tagClass: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
    estimate: '2ч',
    assignee: 'Елена Васильева',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Стресс-тестирование Cumulative Layout Shift (CLS) рекламных креативов',
    status: 'inProgress',
    tag: 'QA / Performance',
    tagClass: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300',
    estimate: '1.5ч',
    assignee: 'Екатерина Романова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    title: 'Оптимизация кэширования статических ассетов на Edge CDN',
    status: 'todo',
    tag: 'Edge CDN',
    tagClass: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
    estimate: '2.5ч',
    assignee: 'Дмитрий Морозов',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'
  }
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
    tag: 'Спринт',
    tagClass: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
    estimate: '2ч',
    assignee: 'Алексей Соколов',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  })
  newTaskTitle.value = ''
  showNewTaskModal.value = false
}
</script>
