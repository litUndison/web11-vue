<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-16 flex items-center justify-between gap-4">
        
        <!-- Logo & Brand -->
        <a href="#" @click.prevent="$emit('select-tab', 'landing')" class="flex items-center gap-2.5 group shrink-0">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            UI
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">Tailwind UI</span>
              <span class="px-1.5 py-0.5 text-[10px] font-bold rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">День 11</span>
            </div>
            <p class="text-[10px] text-slate-400 font-medium hidden sm:block">
              Vue 3 • Redesign 2026 • AdSlot
            </p>
          </div>
        </a>

        <!-- Desktop Navigation Tabs (Horizontal Scrollable Pills) -->
        <nav class="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="$emit('select-tab', tab.id)"
            class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5"
            :class="activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.name }}</span>
            <span v-if="tab.badge" class="px-1.5 py-0.2 rounded-full text-[9px] font-black" :class="activeTab === tab.id ? 'bg-white text-indigo-700' : 'bg-emerald-500 text-white animate-pulse'">
              {{ tab.badge }}
            </span>
          </button>
        </nav>

        <!-- Right Controls -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- Toggle Ad Mode (Placeholder vs Real Creative) -->
          <button
            type="button"
            @click="$emit('toggle-all-ads')"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 transition-all shadow-2xs"
            :title="allCreative ? 'Показать сетку с пунктиром' : 'Показать симуляцию реальной рекламы'"
          >
            <span class="w-2 h-2 rounded-full" :class="allCreative ? 'bg-emerald-500' : 'bg-indigo-500'"></span>
            <span>{{ allCreative ? 'Креативы' : 'Плейсхолдеры' }}</span>
          </button>

          <!-- Theme Toggle -->
          <button
            type="button"
            @click="toggleTheme"
            aria-label="Переключить тему"
            class="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <!-- Sun (when dark) -->
            <svg v-if="isDark" class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <!-- Moon (when light) -->
            <svg v-else class="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <!-- Mobile Menu Trigger -->
          <button
            @click="mobileOpen = !mobileOpen"
            class="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-if="mobileOpen" class="lg:hidden py-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
        <button
          v-for="tab in tabs"
          :key="'mob-' + tab.id"
          @click="$emit('select-tab', tab.id); mobileOpen = false"
          class="p-2 rounded-xl text-xs font-semibold text-left transition-colors flex items-center gap-2"
          :class="activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200'"
        >
          <span>{{ tab.icon }}</span>
          <span>{{ tab.name }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  activeTab: {
    type: String,
    required: true
  },
  allCreative: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select-tab', 'toggle-all-ads'])

const mobileOpen = ref(false)
const isDark = ref(false)

const tabs = [
  { id: 'landing', name: 'Лендинг', icon: '🚀' },
  { id: 'dashboard', name: 'Дашборд', icon: '📊' },
  { id: 'ecommerce', name: 'Каталог', icon: '🛍️' },
  { id: 'kanban', name: 'Канбан', icon: '📋' },
  { id: 'messenger', name: 'Мессенджер', icon: '💬' },
  { id: 'multistep', name: 'Степпер', icon: '📝' },
  { id: 'design-system', name: 'UI Kit', icon: '🎨' },
  { id: 'hosting-analysis', name: 'Хостинг & Отчёт', icon: '🌐', badge: 'День 11' }
]

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
