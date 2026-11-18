<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
      <div>
        <h1 class="heading-gothic text-2xl font-bold tracking-tight text-zinc-100">
          Roadmap разработки Vampire Survivors Mobile
        </h1>
        <p class="text-xs sm:text-sm text-zinc-400 mt-0.5">
          Публичный трекер обновлений, оптимизации движка и кроссплатформенных фич Poncle
        </p>
      </div>

      <button @click="showNewTaskModal = true" class="btn-gold btn-sm px-3.5 py-2">
        + Предложить фичу
      </button>
    </div>

    <!-- 3 Columns Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
      
      <!-- Column: To Do -->
      <div class="rounded-xl border border-amber-500/20 bg-zinc-900/60 p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
            <h3 class="font-bold text-xs uppercase tracking-wider text-zinc-300">В планах</h3>
          </div>
          <span class="px-2 py-0.5 text-xs rounded-full bg-zinc-800 text-zinc-300 font-mono text-[11px]">
            {{ todoTasks.length }}
          </span>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="task in todoTasks"
            :key="task.id"
            class="card-base p-3.5 border-zinc-800 hover:border-amber-500/40 transition-colors shadow-2xs bg-zinc-900/90"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="px-1.5 py-0.5 rounded text-[10px] font-mono" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-zinc-400 font-mono">{{ task.estimate }}</span>
            </div>
            <h4 class="font-bold text-xs sm:text-sm text-zinc-100 leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <span class="text-xs">👤</span>
                <span class="text-zinc-400 text-[11px]">{{ task.assignee }}</span>
              </div>
              <button @click="moveTask(task.id, 'inProgress')" class="text-amber-400 hover:underline font-bold text-[11px] flex items-center gap-0.5">
                <span>В работу</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: In Progress -->
      <div class="rounded-xl border border-amber-500/30 bg-zinc-900/60 p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            <h3 class="font-bold text-xs uppercase tracking-wider text-amber-400">В разработке</h3>
          </div>
          <span class="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] border border-amber-500/30">
            {{ inProgressTasks.length }}
          </span>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="task in inProgressTasks"
            :key="task.id"
            class="card-base p-3.5 border-amber-500/30 hover:border-amber-400 transition-colors shadow-2xs bg-zinc-900/90"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="px-1.5 py-0.5 rounded text-[10px] font-mono" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-zinc-400 font-mono">{{ task.estimate }}</span>
            </div>
            <h4 class="font-bold text-xs sm:text-sm text-zinc-100 leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs">
              <button @click="moveTask(task.id, 'todo')" class="text-zinc-400 hover:text-zinc-200 text-[11px]">
                ← Назад
              </button>
              <div class="flex items-center gap-1.5">
                <span class="text-xs">👤</span>
                <span class="text-zinc-400 text-[11px]">{{ task.assignee }}</span>
              </div>
              <button @click="moveTask(task.id, 'done')" class="text-emerald-400 hover:underline font-bold text-[11px] flex items-center gap-0.5">
                <span>Готово</span>
                <span>✓</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: Done -->
      <div class="rounded-xl border border-emerald-500/30 bg-zinc-900/60 p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <h3 class="font-bold text-xs uppercase tracking-wider text-emerald-400">Выполнено</h3>
          </div>
          <span class="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] border border-emerald-500/30">
            {{ doneTasks.length }}
          </span>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="task in doneTasks"
            :key="task.id"
            class="card-base p-3.5 border-zinc-800 opacity-80 hover:opacity-100 transition-opacity shadow-2xs bg-zinc-900/90"
          >
            <div class="flex items-center justify-between mb-1.5">
              <span class="px-1.5 py-0.5 rounded text-[10px] font-mono" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-emerald-400 font-bold">Готово</span>
            </div>
            <h4 class="font-medium text-xs sm:text-sm text-zinc-400 line-through leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <span class="text-xs">👤</span>
                <span class="text-zinc-500 text-[11px]">{{ task.assignee }}</span>
              </div>
              <span class="text-emerald-400 text-xs">✓ Релиз</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { pushToast } from '../utils/store.js'

const showNewTaskModal = ref(false)

const tasks = ref([
  {
    id: 1,
    title: 'Поддержка частоты 120 FPS для экранов iPad Pro и Galaxy S24 Ultra',
    column: 'todo',
    tag: 'Core Engine',
    tagClass: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    estimate: '3 SP',
    assignee: 'Luca Galante'
  },
  {
    id: 2,
    title: 'Локальный мультиплеер на 4 игроков через Bluetooth и Wi-Fi сеть',
    column: 'todo',
    tag: 'Co-op',
    tagClass: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    estimate: '8 SP',
    assignee: 'Netcode Team'
  },
  {
    id: 3,
    title: 'Новый тайный выживший из обновления Ode to Castlevania',
    column: 'todo',
    tag: 'Content',
    tagClass: 'bg-red-500/20 text-red-300 border border-red-500/30',
    estimate: '5 SP',
    assignee: 'Content Team'
  },
  {
    id: 4,
    title: 'Оптимизация расчетных коллизий при 100 000+ снарядов на экране',
    column: 'inProgress',
    tag: 'Vulkan API',
    tagClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    estimate: '5 SP',
    assignee: 'Engine Lead'
  },
  {
    id: 5,
    title: 'Двусторонняя синхронизация сохранений: Steam Cloud <-> iOS iCloud',
    column: 'inProgress',
    tag: 'Cloud Sync',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    estimate: '3 SP',
    assignee: 'Backend Team'
  },
  {
    id: 6,
    title: 'Релиз мобильной версии 1.10 на iOS и Android',
    column: 'done',
    tag: 'Milestone',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    estimate: '13 SP',
    assignee: 'Poncle Release'
  },
  {
    id: 7,
    title: 'Интерактивный Гримуар эволюций в меню паузы боя',
    column: 'done',
    tag: 'UI/UX',
    tagClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    estimate: '3 SP',
    assignee: 'Design Lead'
  }
])

const todoTasks = computed(() => tasks.value.filter(t => t.column === 'todo'))
const inProgressTasks = computed(() => tasks.value.filter(t => t.column === 'inProgress'))
const doneTasks = computed(() => tasks.value.filter(t => t.column === 'done'))

const moveTask = (taskId, targetColumn) => {
  const t = tasks.value.find(item => item.id === taskId)
  if (t) {
    t.column = targetColumn
    const colNames = { todo: 'В планах', inProgress: 'В разработке', done: 'Выполнено' }
    pushToast({
      title: 'Roadmap обновлён',
      message: `«${t.title.substring(0, 35)}...» перенесена в «${colNames[targetColumn]}»`,
      type: 'info'
    })
  }
}
</script>
