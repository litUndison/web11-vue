<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-[#030712]/80 border-b border-slate-200/80 dark:border-[#1f293d]/80 transition-colors duration-300 shadow-sm">
    <div class="max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-8">
      <div class="h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        <!-- Logo & Brand -->
        <a href="#" @click.prevent="$emit('select-tab', 'landing')" class="flex items-center gap-3 group shrink-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-glow-indigo group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            TUI
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                Tailwind UI Studio
              </span>
              <span class="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-xs">
                PRO v2.5
              </span>
            </div>
            <p class="text-[11px] text-slate-400 font-medium hidden md:block">
              Next-Gen UI Engine & AdSlot Architecture
            </p>
          </div>
        </a>

        <!-- Desktop Navigation Tabs (Spacious Modern Floating Pills) -->
        <nav class="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 flex-1 justify-center max-w-full">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="$emit('select-tab', tab.id)"
            class="px-3 xl:px-3.5 py-1.5 xl:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 select-none relative"
            :class="activeTab === tab.id
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow-indigo'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.name }}</span>
            <span
              v-if="tab.badge"
              class="px-1.5 py-0.5 rounded-full text-[9px] font-black tracking-wide uppercase"
              :class="activeTab === tab.id ? 'bg-white text-indigo-700' : 'bg-emerald-500 text-white animate-pulse'"
            >
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
            class="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-[#1f293d] hover:border-indigo-500 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-[#0b1120]/70 hover:shadow-glow-indigo transition-all duration-200 whitespace-nowrap"
            :title="allCreative ? 'Показать сетку с пунктиром' : 'Показать симуляцию реальной рекламы'"
          >
            <span class="w-2 h-2 rounded-full ring-2" :class="allCreative ? 'bg-emerald-400 ring-emerald-500/30' : 'bg-indigo-400 ring-indigo-500/30'"></span>
            <span>{{ allCreative ? 'Креативы' : 'Плейсхолдеры' }}</span>
          </button>

          <!-- Theme Toggle -->
          <button
            type="button"
            @click="toggleTheme"
            aria-label="Переключить тему"
            class="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-slate-200 dark:hover:border-[#1f293d]"
          >
            <!-- Sun (when dark) -->
            <svg v-if="isDark" class="w-5 h-5 text-amber-400 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <!-- Moon (when light) -->
            <svg v-else class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <!-- Mobile Menu Trigger -->
          <button
            @click="mobileOpen = !mobileOpen"
            class="lg:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-[#1f293d]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-if="mobileOpen" class="lg:hidden py-3 border-t border-slate-200 dark:border-[#1f293d] grid grid-cols-2 gap-2">
        <button
          v-for="tab in tabs"
          :key="'mob-' + tab.id"
          @click="$emit('select-tab', tab.id); mobileOpen = false"
          class="p-2.5 rounded-xl text-xs font-bold text-left transition-colors flex items-center gap-2"
          :class="activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-[#0b1120] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1f293d]'"
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
  { id: 'hosting-analysis', name: 'Cloud & Инфраструктура', icon: '🌐', badge: 'Cloud' }
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
