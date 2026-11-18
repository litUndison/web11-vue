<template>
  <div class="lg:hidden fixed bottom-3 left-3 right-3 z-40 select-none">
    <nav class="bg-zinc-950/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl">
      <button
        v-for="item in dockItems"
        :key="item.id"
        @click="handleClick(item)"
        class="flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative"
        :class="activeTab === item.id ? 'text-amber-400 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'"
      >
        <span class="text-base leading-none">{{ item.icon }}</span>
        <span class="text-[9px] mt-1 font-medium truncate max-w-[50px]">{{ item.name }}</span>
        <span
          v-if="activeTab === item.id"
          class="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-400 shadow-gold"
        ></span>
      </button>

      <!-- Center Floating Chest Action -->
      <button
        @click="openChestModal"
        class="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-zinc-950 shadow-gold -translate-y-2 active:scale-95 transition-transform"
        title="Открыть сундук удачи"
      >
        <span class="text-base leading-none">🎁</span>
        <span class="text-[8px] font-bold mt-0.5">Сундук</span>
      </button>

      <!-- Quick Command Search -->
      <button
        @click="openCommandPalette"
        class="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-zinc-400 hover:text-amber-300 transition-colors"
      >
        <span class="text-base leading-none">🔍</span>
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

const dockItems = [
  { id: 'landing', name: 'Обзор', icon: '🦇' },
  { id: 'dashboard', name: 'Статы', icon: '📊' },
  { id: 'ecommerce', name: 'Арсенал', icon: '🛒' },
  { id: 'messenger', name: 'Гильдия', icon: '💬' }
]

const handleClick = (item) => {
  emit('select-tab', item.id)
}
</script>
