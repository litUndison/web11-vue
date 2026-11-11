<template>
  <aside
    :id="slotId"
    role="complementary"
    aria-label="Рекламный блок"
    class="ad-slot-wrapper relative my-4 transition-all duration-300 group"
    :class="[
      containerClass,
      hidden ? 'hidden' : ''
    ]"
  >
    <!-- Placeholder mode (default according to assignment specs) -->
    <div
      v-if="!showCreativeMode"
      class="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/90 dark:bg-slate-900/60 hover:bg-slate-100/90 dark:hover:bg-slate-900/90 rounded-xl p-4 text-center transition-colors duration-200 select-none shadow-sm"
      :style="customDimensions"
    >
      <!-- Top meta pill -->
      <div class="flex items-center gap-2 mb-2">
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700">
          <svg class="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          {{ label }}
        </span>
        <span class="text-[11px] font-mono text-slate-400 dark:text-slate-500">
          {{ displayDimensions }}
        </span>
      </div>

      <!-- Icon & Label -->
      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" stroke-dasharray="3 3"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9h18M9 21V9"/>
        </svg>
        <span class="text-sm font-semibold tracking-wide uppercase">{{ slotTitle }}</span>
      </div>

      <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
        {{ subDescription }}
      </p>

      <!-- Toggle Creative Demo Button -->
      <button
        type="button"
        @click="toggleMode"
        class="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors border border-indigo-200 dark:border-indigo-800"
        title="Переключить в режим симуляции реального рекламного креатива"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <span>Показать демо-креатив</span>
      </button>
    </div>

    <!-- Simulated Real Creative (When toggled) -->
    <div
      v-else
      class="relative overflow-hidden rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 p-4 shadow-sm hover:shadow-md transition-all duration-200"
      :style="customDimensions"
    >
      <!-- Ad Badge and Close/Info -->
      <div class="flex items-center justify-between mb-2">
        <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-300/60">
          Реклама
        </span>
        <div class="flex items-center gap-1.5 text-xs">
          <button
            @click="toggleMode"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[11px] underline"
            title="Вернуться к плейсхолдеру"
          >
            Режим сетки
          </button>
          <button
            v-if="closable"
            @click="hideSlot"
            class="text-slate-400 hover:text-rose-500 p-0.5 rounded"
            title="Скрыть объявление"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Creative Content according to format -->
      <div
        :class="[
          format === 'sidebar' ? 'flex flex-col text-left' : 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
        ]"
      >
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
            CF
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-800 dark:text-white leading-snug">
              {{ creativeData.title }}
            </h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
              {{ creativeData.description }}
            </p>
          </div>
        </div>

        <div class="mt-2 sm:mt-0 flex items-center gap-2 self-end sm:self-center shrink-0">
          <a
            :href="creativeData.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{{ creativeData.buttonText }}</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="mt-2 text-[10px] text-slate-400 dark:text-slate-500 text-right">
        Спонсор: {{ creativeData.sponsor }} • Подробнее на сайте рекламодателя
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Preset format: 'banner' (728x90), 'sidebar' (300x250), 'in-feed' (fluid 100%), 'mobile' (320x100), 'custom'
  format: {
    type: String,
    default: 'banner',
    validator: (v) => ['banner', 'leaderboard', 'sidebar', 'in-feed', 'mobile', 'custom'].includes(v)
  },
  // Custom overrides
  width: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  },
  // Text label identifier (as required by task)
  label: {
    type: String,
    default: 'Рекламное место'
  },
  slotTitle: {
    type: String,
    default: 'AdSlot Placeholder'
  },
  slotId: {
    type: String,
    default: () => 'ad-slot-' + Math.random().toString(36).substring(2, 9)
  },
  closable: {
    type: Boolean,
    default: true
  },
  // Force creative mode initially
  initialCreative: {
    type: Boolean,
    default: false
  }
})

const showCreativeMode = ref(props.initialCreative)
const hidden = ref(false)

const toggleMode = () => {
  showCreativeMode.value = !showCreativeMode.value
}

const hideSlot = () => {
  hidden.value = true
}

// Preset dimensions mapping
const dimensionsMap = {
  banner: { width: '100%', minHeight: '90px', maxW: 'max-w-[728px]', label: '728 × 90 px (Leaderboard)' },
  leaderboard: { width: '100%', minHeight: '90px', maxW: 'max-w-[970px]', label: '970 × 90 px (Super Leaderboard)' },
  sidebar: { width: '100%', minHeight: '250px', maxW: 'max-w-[336px]', label: '300 × 250 px (Medium Rectangle)' },
  'in-feed': { width: '100%', minHeight: '110px', maxW: 'w-full', label: 'Adaptive Fluid In-Feed' },
  mobile: { width: '100%', minHeight: '100px', maxW: 'max-w-[320px]', label: '320 × 100 px (Large Mobile Banner)' },
  custom: { width: '100%', minHeight: '90px', maxW: 'w-full', label: 'Пользовательский размер' }
}

const containerClass = computed(() => {
  const current = dimensionsMap[props.format] || dimensionsMap.banner
  return `mx-auto ${current.maxW}`
})

const displayDimensions = computed(() => {
  if (props.width && props.height) {
    return `${props.width} × ${props.height}`
  }
  return (dimensionsMap[props.format] || dimensionsMap.banner).label
})

const customDimensions = computed(() => {
  const style = {}
  if (props.width) style.width = props.width
  if (props.height) style.height = props.height
  if (!props.height) {
    style.minHeight = (dimensionsMap[props.format] || dimensionsMap.banner).minHeight
  }
  return style
})

const subDescription = computed(() => {
  switch (props.format) {
    case 'sidebar':
      return 'Слот оптимизирован под сайдбар (IAB Medium Rectangle / Half-page)'
    case 'in-feed':
      return 'Нативный рекламный блок между статьями и контентными секциями'
    case 'banner':
    case 'leaderboard':
      return 'Горизонтальный полноразмерный медийный баннер в шапке/футере'
    default:
      return 'Готов к интеграции Google AdSense / Яндекс РСЯ / прямых рекламодателей'
  }
})

// Simulated sponsor data for realistic demonstration
const creativeData = computed(() => {
  if (props.format === 'sidebar') {
    return {
      title: 'Cloudflare Pages: Безлимитный трафик',
      description: 'Идеальный хостинг для Vue 3 + Vite. 500 бесплатных сборок в месяц без риска блокировки за рекламу!',
      buttonText: 'Попробовать',
      link: 'https://pages.cloudflare.com',
      sponsor: 'Cloudflare Inc.'
    }
  }
  return {
    title: 'Быстрый старт на Vue 3 + Tailwind CSS',
    description: 'Развертывайте статические сайты за 60 секунд. Допустимо размещение AdSense и сторонней рекламы.',
    buttonText: 'Узнать больше',
    link: 'https://vitejs.dev',
    sponsor: 'TechNova Partners'
  }
})
</script>

<style scoped>
.ad-slot-wrapper {
  contain: content;
}
</style>

