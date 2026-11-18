<template>
  <div class="lg:hidden fixed bottom-3 left-3 right-3 z-40 select-none">
    <nav class="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200 dark:border-amber-500/30 rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl">
      <button
        v-for="item in dockItems"
        :key="item.id"
        @click="handleClick(item)"
        class="flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative"
        :class="activeTab === item.id ? 'text-amber-600 dark:text-amber-400 font-bold scale-105' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'"
      >
        <svg class="w-5 h-5 leading-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.svgPath" />
        </svg>
        <span class="text-[9px] mt-1 font-medium truncate max-w-[50px]">{{ item.name }}</span>
        <span
          v-if="activeTab === item.id"
          class="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-500 shadow-gold"
        ></span>
      </button>

      <!-- Кнопка открытия сундука -->
      <button
        @click="openChestModal"
        class="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-zinc-950 shadow-gold -translate-y-2 active:scale-95 transition-transform"
        title="Открыть сундук удачи"
      >
        <svg class="w-5 h-5 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <span class="text-[8px] font-bold mt-0.5">Сундук</span>
      </button>

      <!-- Быстрый вызов поиска -->
      <button
        @click="openCommandPalette"
        class="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
      >
        <svg class="w-5 h-5 leading-none text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span class="text-[9px] mt-1 font-medium">Поиск</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { openChestModal, openCommandPalette } from '../utils/store.js'

defineProps({
  activeTab: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['select-tab'])

// Элементы мобильной панели навигации
const dockItems = [
  { id: 'landing', name: 'Обзор', svgPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'dashboard', name: 'Статы', svgPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'ecommerce', name: 'Арсенал', svgPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'messenger', name: 'Гильдия', svgPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' }
]

const handleClick = (item) => {
  emit('select-tab', item.id)
}
</script>
