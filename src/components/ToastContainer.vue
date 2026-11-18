<template>
  <div class="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none select-none">
    <transition-group name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto p-3.5 rounded-xl border shadow-xl backdrop-blur-md flex items-start gap-3 transition-all duration-200"
        :class="getToastClasses(t.type)"
      >
        <span class="shrink-0 mt-0.5">
          <!-- Золото -->
          <svg v-if="t.type === 'gold'" class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9 9.5h5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3h5" />
          </svg>
          <!-- Награда сундука -->
          <svg v-else-if="t.type === 'loot'" class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="8" width="18" height="13" rx="2" />
            <path d="M12 8v13M3 13h18M12 8a3 3 0 1 0-3-3c0 2 3 3 3 3zm0 0a3 3 0 1 1 3-3c0 2-3 3-3 3z" />
          </svg>
          <!-- Уровень -->
          <svg v-else-if="t.type === 'level'" class="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <!-- Ошибка -->
          <svg v-else-if="t.type === 'error'" class="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <!-- По умолчанию -->
          <svg v-else class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" />
          </svg>
        </span>
        <div class="min-w-0 flex-1">
          <h5 class="text-xs font-bold leading-tight truncate text-zinc-900 dark:text-zinc-100">{{ t.title }}</h5>
          <p class="text-[11px] text-zinc-600 dark:text-zinc-300 mt-0.5 leading-snug">{{ t.message }}</p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { toasts } from '../utils/store.js'

const getToastClasses = (type) => {
  switch (type) {
    case 'gold':
    case 'loot':
      return 'bg-white dark:bg-zinc-950/95 border-amber-500/50 text-amber-900 dark:text-amber-300 shadow-gold'
    case 'error':
      return 'bg-white dark:bg-zinc-950/95 border-red-500/50 text-red-900 dark:text-red-300 shadow-blood'
    case 'level':
      return 'bg-white dark:bg-zinc-950/95 border-purple-500/50 text-purple-900 dark:text-purple-300'
    default:
      return 'bg-white dark:bg-zinc-950/95 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
