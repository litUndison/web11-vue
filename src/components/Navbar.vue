<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-amber-500/20 transition-colors duration-200">
    <div class="w-full px-3 sm:px-6 lg:px-8">
      <div class="h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        <!-- Логотип и бренд -->
        <a href="#" @click.prevent="$emit('select-tab', 'landing')" class="flex items-center gap-2 group shrink-0">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-zinc-950 shadow-gold transition-transform group-hover:scale-105">
            <svg class="w-5 h-5 text-zinc-950" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4c.5 1.5 1.5 2 2.5 2 1.5 0 2.5-.5 3.5-1.5 1 2 2.5 3 4.5 3.5-1 1-1.5 2.5-1.5 4 0 2.5 1.5 4.5 3 5-1.5.5-3 .5-4.5 0-1 1.5-2.5 2.5-4.5 3-1-.5-2-1-3-2-1 1-2 1.5-3 2-2-.5-3.5-1.5-4.5-3-1.5.5-3 .5-4.5 0 1.5-.5 3-2.5 3-5 0-1.5-.5-3-1.5-4 2-.5 3.5-1.5 4.5-3.5 1 1 2 1.5 3.5 1.5 1 0 2-.5 2.5-2z"/>
            </svg>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="heading-gothic font-extrabold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-zinc-100">
              Vampire <span class="text-amber-500 dark:text-amber-400">Survivors</span>
            </span>
            <span class="hidden xs:inline-block px-1.5 py-0.5 text-[9px] font-mono rounded bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400 border border-red-500/20 dark:border-red-500/30 font-bold">
              Mobile
            </span>
          </div>
        </a>

        <!-- Навигационные вкладки -->
        <nav class="hidden lg:flex items-center gap-0.5 xl:gap-1 overflow-x-auto no-scrollbar py-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="$emit('select-tab', tab.id)"
            class="px-2 xl:px-2.5 py-1.5 rounded-md text-[11px] xl:text-xs font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1 select-none"
            :class="activeTab === tab.id
              ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/40 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'"
          >
            <span>{{ tab.name }}</span>
          </button>
        </nav>

        <!-- Элементы управления -->
        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <!-- Кнопка поиска по каталогу и командам -->
          <button
            @click="openCommandPalette"
            class="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-500/40 text-xs transition-colors"
            title="Быстрый поиск команд (Ctrl+K)"
          >
            <svg class="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span class="font-medium">Поиск</span>
            <kbd class="px-1.5 py-0.2 text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded border border-zinc-300 dark:border-zinc-700">
              Ctrl K
            </kbd>
          </button>

          <!-- Кнопка сундука удачи -->
          <button
            @click="openChestModal"
            class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 hover:brightness-110 shadow-gold transition-all"
            title="Открыть сундук с наградами"
          >
            <svg class="w-4 h-4 text-zinc-950 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <span>Сундук</span>
          </button>

          <!-- Счётчик золота игрока -->
          <div
            class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-500/30 bg-amber-50/80 dark:bg-zinc-900/90 text-xs font-bold text-amber-800 dark:text-amber-300 shadow-2xs cursor-pointer hover:border-amber-400 transition-colors"
            @click="openChestModal"
            title="Казна Охотника: нажмите для открытия сундука"
          >
            <svg class="w-3.5 h-3.5 text-amber-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
              <text x="10" y="14" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle" fill="currentColor">G</text>
            </svg>
            <span class="font-mono text-amber-700 dark:text-amber-400 font-bold">{{ playerGold.toLocaleString() }} G</span>
          </div>

          <!-- Переключатель полноэкранного режима -->
          <button
            type="button"
            @click="toggleFullscreen"
            class="hidden sm:inline-flex p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
            title="Развернуть на весь экран (F11)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
            </svg>
          </button>

          <!-- Переключатель темы (Светлая / Тёмная) -->
          <button
            type="button"
            @click="toggleTheme"
            aria-label="Переключить тему оформления"
            class="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
            :title="isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'"
          >
            <svg v-if="isDark" class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg v-else class="w-4 h-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <!-- Кнопка мобильного меню -->
          <button
            @click="mobileOpen = !mobileOpen"
            class="lg:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Мобильное меню -->
      <div v-if="mobileOpen" class="lg:hidden py-3 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-1.5">
        <button
          v-for="tab in tabs"
          :key="'mob-' + tab.id"
          @click="$emit('select-tab', tab.id); mobileOpen = false"
          class="p-2.5 rounded-lg text-xs font-bold text-left transition-colors"
          :class="activeTab === tab.id
            ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40'
            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { playerGold, openChestModal, openCommandPalette, toggleFullscreen, pushToast } from '../utils/store.js'

defineProps({
  activeTab: {
    type: String,
    required: true
  },
  allCreative: {
    type: Boolean,
    default: true
  }
})

defineEmits(['select-tab', 'toggle-all-ads'])

const mobileOpen = ref(false)
const isDark = ref(true)

// Список разделов коммерческого сайта
const tabs = [
  { id: 'landing', name: 'Обзор' },
  { id: 'dashboard', name: 'Статистика' },
  { id: 'ecommerce', name: 'Арсенал & DLC' },
  { id: 'kanban', name: 'Roadmap' },
  { id: 'messenger', name: 'Чат гильдии' },
  { id: 'multistep', name: 'Орден Охотников' }
]

// Переключение темы оформления
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
  if (saved === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>
