<template>
  <article class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
    <div>
      <!-- Header meta -->
      <div class="flex items-center justify-between gap-2 mb-3">
        <span
          class="px-2.5 py-0.5 rounded-full text-xs font-semibold"
          :class="categoryBadgeClass"
        >
          {{ article.category }}
        </span>
        <span class="text-xs text-slate-400 font-mono">
          {{ article.readTime }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
        {{ article.title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
        {{ article.excerpt }}
      </p>
    </div>

    <!-- Footer meta -->
    <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-[10px]">
          {{ article.author[0] }}
        </div>
        <span class="font-medium text-slate-700 dark:text-slate-300">{{ article.author }}</span>
        <span>•</span>
        <span>{{ article.date }}</span>
      </div>

      <!-- Like button (reactive state) -->
      <button
        type="button"
        @click="toggleLike"
        class="inline-flex items-center gap-1 px-2 py-1 rounded-md transition-colors"
        :class="liked ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 font-bold' : 'hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'"
      >
        <svg class="w-3.5 h-3.5" :fill="liked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        <span>{{ likesCount }}</span>
      </button>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const liked = ref(false)
const likesCount = ref(props.article.likes || 12)

const toggleLike = () => {
  liked.value = !liked.value
  likesCount.value += liked.value ? 1 : -1
}

const categoryBadgeClass = computed(() => {
  switch (props.article.category) {
    case 'Хостинг':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
    case 'Vue 3':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
    case 'Монетизация':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
    case 'Архитектура':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
  }
})
</script>
