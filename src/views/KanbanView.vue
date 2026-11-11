<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1f293d]">
      <div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
          Управление задачами
        </div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Канбан-доска спринта</span>
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Интерактивное перемещение карточек между этапами разработки и релиза
        </p>
      </div>

      <button @click="showNewTaskModal = true" class="btn-primary btn-sm px-4 py-2">
        + Создать задачу
      </button>
    </div>

    <!-- 3 Columns Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      
      <!-- Column: To Do -->
      <div class="card-base p-5 bg-white/70 dark:bg-[#070b14]/70 border-slate-200 dark:border-[#1f293d]">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-slate-400"></span>
            <h3 class="font-black text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">К выполнению</h3>
          </div>
          <span class="px-2.5 py-0.5 text-xs rounded-full bg-slate-200 dark:bg-[#1f293d] text-slate-700 dark:text-slate-300 font-black">
            {{ todoTasks.length }}
          </span>
        </div>

        <div class="space-y-3.5">
          <div v-for="task in todoTasks" :key="task.id" class="card-base card-hover p-4 bg-white dark:bg-[#0b1120] shadow-sm border border-slate-200 dark:border-[#1f293d] border-l-4 border-l-slate-400">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-slate-400 font-mono">{{ task.estimate }}</span>
            </div>
            <h4 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#1f293d]/80 flex items-center justify-between text-xs">
              <span class="text-slate-400 text-[11px] font-medium">{{ task.assignee }}</span>
              <button @click="moveTask(task.id, 'inProgress')" class="text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-[11px] flex items-center gap-1">
                <span>В работу</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: In Progress -->
      <div class="card-base p-5 bg-white/70 dark:bg-[#070b14]/70 border-slate-200 dark:border-[#1f293d]">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
            <h3 class="font-black text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">В разработке</h3>
          </div>
          <span class="px-2.5 py-0.5 text-xs rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-black">
            {{ inProgressTasks.length }}
          </span>
        </div>

        <div class="space-y-3.5">
          <div v-for="task in inProgressTasks" :key="task.id" class="card-base card-hover p-4 bg-white dark:bg-[#0b1120] shadow-sm border border-slate-200 dark:border-[#1f293d] border-l-4 border-l-amber-500">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-slate-400 font-mono">{{ task.estimate }}</span>
            </div>
            <h4 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#1f293d]/80 flex items-center justify-between text-xs">
              <button @click="moveTask(task.id, 'todo')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[11px] font-semibold">
                ← Назад
              </button>
              <button @click="moveTask(task.id, 'done')" class="text-emerald-600 dark:text-emerald-400 hover:underline font-bold text-[11px] flex items-center gap-1">
                <span>Готово</span>
                <span>✓</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Column: Done -->
      <div class="card-base p-5 bg-white/70 dark:bg-[#070b14]/70 border-slate-200 dark:border-[#1f293d]">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
            <h3 class="font-black text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">Выполнено</h3>
          </div>
          <span class="px-2.5 py-0.5 text-xs rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-black">
            {{ doneTasks.length }}
          </span>
        </div>

        <div class="space-y-3.5">
          <div v-for="task in doneTasks" :key="task.id" class="card-base p-4 bg-white dark:bg-[#0b1120] shadow-sm border border-slate-200 dark:border-[#1f293d] border-l-4 border-l-emerald-500 opacity-90">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold" :class="task.tagClass">{{ task.tag }}</span>
              <span class="text-[11px] text-emerald-500 font-black">Завершено</span>
            </div>
            <h4 class="font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-300 line-through leading-snug">{{ task.title }}</h4>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#1f293d]/80 flex items-center justify-between text-xs">
              <span class="text-slate-400 text-[11px]">{{ task.assignee }}</span>
              <button @click="moveTask(task.id, 'inProgress')" class="text-slate-400 hover:underline text-[11px] font-semibold">
                Вернуть
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Quick Add Modal -->
    <div v-if="showNewTaskModal" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div class="card-base max-w-md w-full p-6 space-y-4 border border-indigo-500/30 shadow-2xl">
        <h3 class="text-lg font-black text-slate-900 dark:text-white">Новая задача спринта</h3>
        <input v-model="newTaskTitle" type="text" placeholder="Введите название задачи..." class="input-base" />
        <div class="flex justify-end gap-2 pt-2">
          <button @click="showNewTaskModal = false" class="btn-secondary btn-sm">Отмена</button>
          <button @click="addNewTask" class="btn-primary btn-sm">Добавить</button>
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
  { id: 1, title: 'Реализовать компонент AdSlot с поддержкой IAB', status: 'done', tag: 'Frontend', tagClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300', estimate: '3ч', assignee: 'Eugene' },
  { id: 2, title: 'Провести сравнительный анализ облачных платформ', status: 'done', tag: 'Архитектура', tagClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300', estimate: '4ч', assignee: 'Eugene' },
  { id: 3, title: 'Настроить CI/CD пайплайн в GitHub Actions', status: 'done', tag: 'DevOps', tagClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300', estimate: '2ч', assignee: 'Eugene' },
  { id: 4, title: 'Проверить CLS и плавность загрузки баннеров', status: 'inProgress', tag: 'QA', tagClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300', estimate: '1.5ч', assignee: 'Eugene' },
  { id: 5, title: 'Оптимизировать скорость отклика Edge CDN', status: 'todo', tag: 'Cloud', tagClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300', estimate: '1ч', assignee: 'Eugene' }
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
    tagClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
    estimate: '2ч',
    assignee: 'Eugene'
  })
  newTaskTitle.value = ''
  showNewTaskModal.value = false
}
</script>
