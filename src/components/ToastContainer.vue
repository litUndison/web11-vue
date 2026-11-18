<template>
  <div class="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none select-none">
    <transition-group name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto p-3.5 rounded-xl border shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all duration-200"
        :class="getToastClasses(t.type)"
      >
        <span class="text-lg shrink-0 mt-0.5">{{ getToastIcon(t.type) }}</span>
        <div class="min-w-0 flex-1">
          <h5 class="text-xs font-bold leading-tight truncate text-zinc-100">{{ t.title }}</h5>
          <p class="text-[11px] text-zinc-300 mt-0.5 leading-snug">{{ t.message }}</p>
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
      return 'bg-zinc-950/95 border-amber-500/50 text-amber-300 shadow-gold'
    case 'error':
      return 'bg-zinc-950/95 border-red-500/50 text-red-300 shadow-blood'
    case 'level':
      return 'bg-zinc-950/95 border-purple-500/50 text-purple-300'
    default:
      return 'bg-zinc-950/95 border-zinc-700 text-zinc-200'
  }
}

const getToastIcon = (type) => {
  switch (type) {
    case 'gold':
      return '🪙'
    case 'loot':
      return '🎁'
    case 'level':
      return '⭐'
    case 'error':
      return '⚠️'
    default:
      return '⚔️'
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
  transform: translateX(20px);
}
</style>
