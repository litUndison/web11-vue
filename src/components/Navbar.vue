<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/90 border-b border-amber-500/20 transition-colors duration-200">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-16 flex items-center justify-between gap-3">
        
        <!-- Left: Logo & Brand -->
        <a href="#" @click.prevent="$emit('select-tab', 'landing')" class="flex items-center gap-2.5 group shrink-0">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-zinc-950 font-bold text-sm shadow-gold transition-transform group-hover:scale-105">
            🦇
          </div>
          <div class="flex items-center gap-2">
            <span class="heading-gothic font-extrabold text-sm sm:text-base tracking-tight text-zinc-100">
              Vampire <span class="text-amber-400">Survivors</span>
            </span>
            <span class="px-1.5 py-0.5 text-[10px] font-mono rounded bg-red-600/20 text-red-400 border border-red-500/30">
              Mobile App
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Tabs -->
        <nav class="hidden xl:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="$emit('select-tab', tab.id)"
            class="px-2.5 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1 select-none"
            :class="activeTab === tab.id
              ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-gold'
              : 'text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/60'"
          >
            <span>{{ tab.name }}</span>
            <span
              v-if="tab.badge"
              class="px-1.5 py-0.2 rounded text-[9px] font-mono"
              :class="activeTab === tab.id
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'bg-zinc-800 text-zinc-400'"
            >
              {{ tab.badge }}
            </span>
          </button>
        </nav>

        <!-- Right: App Controls & Live State -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- Command Palette Search Button (Ctrl+K) -->
          <button
            @click="openCommandPalette"
            class="hidden md:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-amber-300 hover:border-amber-500/40 text-xs transition-colors"
            title="Быстрый поиск команд (Ctrl+K)"
          >
            <span>🔍 Поиск</span>
            <kbd class="px-1.5 py-0.2 text-[10px] font-mono bg-zinc-800 text-zinc-400 rounded border border-zinc-700">
              Ctrl K
            </kbd>
          </button>

          <!-- Interactive Chest Mini-Game Button -->
          <button
            @click="openChestModal"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 hover:brightness-110 shadow-gold transition-all"
            title="Открыть сундук с наградами"
          >
            <span>🎁</span>
            <span class="hidden sm:inline">Сундук</span>
          </button>

          <!-- Live Reactive Player Gold Counter -->
          <div
            class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-500/30 bg-zinc-900/90 text-xs font-bold text-amber-300 shadow-2xs cursor-pointer hover:border-amber-400 transition-colors"
            @click="openChestModal"
            title="Казна Охотника: нажмите для открытия сундука"
          >
            <span>🪙</span>
            <span class="font-mono text-amber-400">{{ playerGold.toLocaleString() }} G</span>
          </div>

          <!-- Sound Effects 8-bit Toggle -->
          <button
            type="button"
            @click="handleToggleSound"
            class="p-2 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-zinc-800 transition-colors border border-zinc-800"
            :title="soundOn ? 'Звуковые эффекты включены' : 'Звук отключен'"
          >
            <span v-if="soundOn">🔊</span>
            <span v-else>🔇</span>
          </button>

          <!-- Fullscreen Toggle Button -->
          <button
            type="button"
            @click="toggleFullscreen"
            class="hidden sm:inline-flex p-2 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-zinc-800 transition-colors border border-zinc-800"
            title="Развернуть на весь экран (F11)"
          >
            <span>⛶</span>
          </button>

          <!-- Theme Toggle -->
          <button
            type="button"
            @click="toggleTheme"
            aria-label="Переключить тему"
            class="p-2 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <svg v-if="isDark" class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <!-- Mobile Dropdown Toggle -->
          <button
            @click="mobileOpen = !mobileOpen"
            class="xl:hidden p-2 rounded-lg text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-if="mobileOpen" class="xl:hidden py-3 border-t border-zinc-800 grid grid-cols-2 gap-1.5">
        <button
          v-for="tab in tabs"
          :key="'mob-' + tab.id"
          @click="$emit('select-tab', tab.id); mobileOpen = false"
          class="p-2.5 rounded-lg text-xs font-bold text-left transition-colors"
          :class="activeTab === tab.id
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            : 'text-zinc-300 hover:bg-zinc-800'"
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
import { toggleSound, isSoundEnabled, initSoundState } from '../utils/audio.js'

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
const soundOn = ref(true)

const tabs = [
  { id: 'landing', name: 'Обзор' },
  { id: 'dashboard', name: 'Статистика' },
  { id: 'ecommerce', name: 'Арсенал & DLC' },
  { id: 'kanban', name: 'Roadmap' },
  { id: 'messenger', name: 'Чат гильдии' },
  { id: 'multistep', name: 'Орден Охотников' },
  { id: 'design-system', name: 'Гримуар UI' },
  { id: 'hosting-analysis', name: 'Сеть & Cloud', badge: 'SLA' }
]

const handleToggleSound = () => {
  soundOn.value = toggleSound()
  pushToast({
    title: soundOn.value ? 'Звук включен' : 'Звук выключен',
    message: soundOn.value ? 'Воспроизведение ретро 8-bit аудио активно' : 'Аудиоэффекты отключены',
    type: 'info'
  })
}

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
  initSoundState()
  soundOn.value = isSoundEnabled()

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
