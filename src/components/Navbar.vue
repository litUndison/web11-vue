<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo & Brand -->
      <div class="flex items-center gap-3">
        <a href="#" class="flex items-center gap-2 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
            TN
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">TechNova</span>
              <span class="px-1.5 py-0.5 text-[10px] font-bold rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">День 11</span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Vue 3 • Tailwind CSS • AdSlot Integration
            </p>
          </div>
        </a>
      </div>

      <!-- Center navigation links -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
        <a href="#articles" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Статьи</a>
        <a href="#ad-demo" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
          <span>Слоты AdSlot</span>
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        </a>
        <a href="#hosting-analysis" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Анализ хостингов</a>
        <a href="#advisor" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Выбор платформы</a>
      </nav>

      <!-- Action buttons & Theme toggle -->
      <div class="flex items-center gap-2.5">
        <!-- Ad Mode switch -->
        <button
          type="button"
          @click="$emit('toggle-all-ads')"
          class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 transition-all hover:shadow-sm"
          :title="allCreative ? 'Показать плейсхолдеры с пунктиром' : 'Показать симулированные креативы'"
        >
          <span class="w-2 h-2 rounded-full" :class="allCreative ? 'bg-indigo-500' : 'bg-slate-400'"></span>
          <span>{{ allCreative ? 'Режим: Креативы' : 'Режим: Плейсхолдеры' }}</span>
        </button>

        <!-- Dark/Light Mode Switch -->
        <button
          type="button"
          @click="toggleTheme"
          aria-label="Переключить тему"
          class="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
        >
          <!-- Sun Icon (when dark) -->
          <svg v-if="isDark" class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <!-- Moon Icon (when light) -->
          <svg v-else class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>

        <!-- Deploy Info Button / Modal Trigger -->
        <a
          href="#submission-report"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all hover:scale-105"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span>Отчёт</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  allCreative: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-all-ads'])

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>
