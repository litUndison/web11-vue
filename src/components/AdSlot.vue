<template>
  <aside
    :id="slotId"
    role="complementary"
    aria-label="Спонсорский блок"
    class="ad-slot-wrapper relative my-5 transition-all duration-300 group"
    :class="[
      containerClass,
      hidden ? 'hidden' : ''
    ]"
  >
    <!-- Placeholder mode (according to task requirements, with high-end 2026 styling) -->
    <div
      v-if="!showCreativeMode"
      class="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-indigo-500/30 bg-white/60 dark:bg-[#0b1120]/70 hover:bg-slate-50 dark:hover:bg-[#0f172a]/90 hover:border-indigo-500/60 rounded-2xl p-5 text-center transition-all duration-300 select-none shadow-sm hover:shadow-glow-indigo backdrop-blur-md relative overflow-hidden"
      :style="customDimensions"
    >
      <!-- Top meta pill -->
      <div class="flex items-center gap-2 mb-2 z-10">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-xs">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          {{ label }}
        </span>
        <span class="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
          {{ displayDimensions }}
        </span>
      </div>

      <!-- Icon & Label -->
      <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 z-10">
        <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" stroke-dasharray="3 3"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9h18M9 21V9"/>
        </svg>
        <span class="text-xs sm:text-sm font-extrabold tracking-wider uppercase">{{ slotTitle }}</span>
      </div>

      <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-1 max-w-sm z-10">
        {{ subDescription }}
      </p>

      <!-- Toggle Creative Demo Button -->
      <button
        type="button"
        @click="toggleMode"
        class="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all border border-indigo-200 dark:border-indigo-800/80 hover:scale-105 active:scale-95 shadow-xs z-10"
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
      class="relative overflow-hidden rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-gradient-to-r from-indigo-50/90 via-white to-purple-50/90 dark:from-[#0b1120] dark:via-[#111827] dark:to-[#0b1120] p-5 shadow-lg hover:shadow-glow-indigo transition-all duration-300"
      :style="customDimensions"
    >
      <!-- Background accent glow -->
      <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <!-- Ad Badge and Close/Info -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 shadow-xs">
            ★ Реклама
          </span>
          <span class="text-[10px] text-slate-400 font-mono">{{ displayDimensions }}</span>
        </div>

        <div class="flex items-center gap-2 text-xs">
          <button
            @click="toggleMode"
            class="text-indigo-600 dark:text-indigo-400 hover:underline text-[11px] font-semibold"
            title="Вернуться к плейсхолдеру"
          >
            Режим сетки
          </button>
          <button
            v-if="closable"
            @click="hideSlot"
            class="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
        <div class="flex items-start gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md">
            CF
          </div>
          <div>
            <h4 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
              {{ creativeData.title }}
            </h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
              {{ creativeData.description }}
            </p>
          </div>
        </div>

        <div class="mt-3 sm:mt-0 flex items-center gap-2 self-end sm:self-center shrink-0">
          <a
            :href="creativeData.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <span>{{ creativeData.buttonText }}</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
        <span>Спонсор: <strong class="text-slate-600 dark:text-slate-300">{{ creativeData.sponsor }}</strong></span>
        <span>Проверено CDN</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  format: {
    type: String,
    default: 'banner',
    validator: (v) => ['banner', 'leaderboard', 'sidebar', 'in-feed', 'mobile', 'custom'].includes(v)
  },
  width: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  },
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

const dimensionsMap = {
  banner: { width: '100%', minHeight: '90px', maxW: 'max-w-[760px]', label: '728 × 90 px (Leaderboard)' },
  leaderboard: { width: '100%', minHeight: '90px', maxW: 'max-w-[970px]', label: '970 × 90 px (Super Leaderboard)' },
  sidebar: { width: '100%', minHeight: '250px', maxW: 'max-w-[340px]', label: '300 × 250 px (Medium Rectangle)' },
  'in-feed': { width: '100%', minHeight: '110px', maxW: 'w-full', label: 'Adaptive Fluid In-Feed' },
  mobile: { width: '100%', minHeight: '100px', maxW: 'max-w-[320px]', label: '320 × 100 px (Mobile Banner)' },
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
      return 'Нативный рекламный блок между карточками каталога и секциями'
    case 'banner':
    case 'leaderboard':
      return 'Горизонтальный медийный баннер в шапке лендинга и контентных секциях'
    default:
      return 'Готов к интеграции Google AdSense, РСЯ или прямых рекламодателей'
  }
})

const creativeData = computed(() => {
  if (props.format === 'sidebar') {
    return {
      title: 'Cloudflare Pages: Безлимитный трафик',
      description: 'Идеальная облачная платформа для Vue 3 + Vite. 500 сборок в месяц без риска блокировок.',
      buttonText: 'Попробовать',
      link: 'https://pages.cloudflare.com',
      sponsor: 'Cloudflare Inc.'
    }
  }
  return {
    title: 'Быстрый старт на Vue 3 + Tailwind CSS',
    description: 'Развертывайте статические сайты за 60 секунд. Допустимо размещение AdSense и баннеров.',
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
