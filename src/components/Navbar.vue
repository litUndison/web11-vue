<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 dark:bg-[#09090b]/85 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-16 flex items-center justify-between gap-4">
        
        <!-- Logo & Brand -->
        <a href="#" @click.prevent="$emit('select-tab', 'landing')" class="flex items-center gap-2.5 group shrink-0">
          <div class="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
              Tailwind UI Studio
            </span>
            <span class="px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60">
              v2.5
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Tabs -->
        <nav class="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="$emit('select-tab', tab.id)"
            class="px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors duration-150 flex items-center gap-1.5 select-none"
            :class="activeTab === tab.id
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'"
          >
            <span>{{ tab.name }}</span>
            <span
              v-if="tab.badge"
              class="px-1.5 py-0.2 rounded text-[9px] font-mono"
              :class="activeTab === tab.id
                ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'"
            >
              {{ tab.badge }}
            </span>
          </button>
        </nav>

        <!-- Right Controls -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- Toggle Ad Mode Switch -->
          <button
            type="button"
            @click="$emit('toggle-all-ads')"
            class="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            :title="allCreative ? 'Показать техническую разметку' : 'Показать симуляцию рекламных креативов'"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="allCreative ? 'bg-indigo-500' : 'bg-zinc-400'"></span>
            <span>{{ allCreative ? 'Реклама: Активна' : 'Реклама: Сетка' }}</span>
          </button>

          <!-- Theme Toggle -->
          <button
            type="button"
            @click="toggleTheme"
            aria-label="Переключить тему"
            class="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <!-- Sun (when dark) -->
            <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <!-- Moon (when light) -->
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <!-- GitHub Link -->
          <a
            href="https://github.com/litUndison/web11-vue"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="GitHub Repository"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>

          <!-- Mobile Menu Trigger -->
          <button
            @click="mobileOpen = !mobileOpen"
            class="lg:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-if="mobileOpen" class="lg:hidden py-3 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-1.5">
        <button
          v-for="tab in tabs"
          :key="'mob-' + tab.id"
          @click="$emit('select-tab', tab.id); mobileOpen = false"
          class="p-2.5 rounded-lg text-xs font-medium text-left transition-colors"
          :class="activeTab === tab.id
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'"
        >
          {{ tab.name }}
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
  { id: 'landing', name: 'Обзор' },
  { id: 'dashboard', name: 'Дашборд' },
  { id: 'ecommerce', name: 'Каталог' },
  { id: 'kanban', name: 'Задачи' },
  { id: 'messenger', name: 'Чат' },
  { id: 'multistep', name: 'Онбординг' },
  { id: 'design-system', name: 'UI Kit' },
  { id: 'hosting-analysis', name: 'Инфраструктура', badge: 'SLA' }
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
