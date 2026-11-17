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
    <!-- Simulated Real Creative (Displayed by default for 100% commercial feel) -->
    <div
      v-if="showCreativeMode"
      class="relative overflow-hidden rounded-2xl border border-emerald-300/40 dark:border-emerald-500/40 bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/90 dark:from-[#081612] dark:via-[#0e221c] dark:to-[#081612] p-4 sm:p-5 shadow-lg hover:shadow-glow-emerald transition-all duration-300"
      :style="customDimensions"
    >
      <!-- Background accent glow -->
      <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Ad Meta Bar -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
            ★ Реклама
          </span>
          <span class="text-[10px] text-slate-500 dark:text-emerald-300/70 font-mono font-bold">{{ displayDimensions }}</span>
          <span class="hidden sm:inline-block px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Официальный партнёр
          </span>
        </div>

        <div class="flex items-center gap-2 text-xs">
          <button
            @click="toggleMode"
            class="text-emerald-700 dark:text-emerald-400 hover:underline text-[11px] font-semibold"
            title="Переключить в режим сетки (плайсхолдер)"
          >
            Сетка слота
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
          format === 'sidebar' ? 'flex flex-col text-left gap-3' : 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
        ]"
      >
        <div class="flex items-start gap-3.5">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-md text-white"
            :class="creativeData.logoBg"
          >
            {{ creativeData.logoText }}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                {{ creativeData.title }}
              </h4>
              <span v-if="creativeData.badge" class="px-1.5 py-0.2 rounded text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white">
                {{ creativeData.badge }}
              </span>
            </div>
            <p class="text-xs text-slate-600 dark:text-emerald-100/80 mt-1 line-clamp-2 leading-relaxed">
              {{ creativeData.description }}
            </p>
          </div>
        </div>

        <div class="mt-2 sm:mt-0 flex items-center gap-2 self-end sm:self-center shrink-0">
          <a
            :href="creativeData.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <span>{{ creativeData.buttonText }}</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="mt-3 pt-2 border-t border-slate-100 dark:border-[#17342b] text-[10px] text-slate-400 dark:text-emerald-300/60 flex items-center justify-between">
        <span>Рекламодатель: <strong class="text-slate-700 dark:text-emerald-200">{{ creativeData.sponsor }}</strong></span>
        <span class="font-mono">Проверено AdGuard • 0 ms CLS</span>
      </div>
    </div>

    <!-- Technical Placeholder mode (accessible via toggle) -->
    <div
      v-else
      class="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-emerald-500/35 bg-white/60 dark:bg-[#081612]/70 hover:bg-slate-50 dark:hover:bg-[#0e221c]/90 hover:border-emerald-500/60 rounded-2xl p-5 text-center transition-all duration-300 select-none shadow-sm hover:shadow-glow-emerald backdrop-blur-md relative overflow-hidden"
      :style="customDimensions"
    >
      <!-- Top meta pill -->
      <div class="flex items-center gap-2 mb-2 z-10">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-[#0e221c] text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-700/60 shadow-xs">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {{ label }}
        </span>
        <span class="text-[11px] font-mono text-slate-400 dark:text-emerald-300/60 font-semibold">
          {{ displayDimensions }}
        </span>
      </div>

      <!-- Icon & Label -->
      <div class="flex items-center gap-2 text-slate-600 dark:text-emerald-100 z-10">
        <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" stroke-dasharray="3 3"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9h18M9 21V9"/>
        </svg>
        <span class="text-xs sm:text-sm font-extrabold tracking-wider uppercase">{{ slotTitle }}</span>
      </div>

      <p class="text-[11px] text-slate-400 dark:text-emerald-200/60 mt-1 max-w-sm z-10">
        {{ subDescription }}
      </p>

      <!-- Toggle Creative Demo Button -->
      <button
        type="button"
        @click="toggleMode"
        class="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all hover:scale-105 active:scale-95 shadow-md z-10"
        title="Показать коммерческую рекламу"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <span>Показать рекламный баннер</span>
      </button>
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
    default: true
  }
})

const showCreativeMode = ref(props.initialCreative !== false)
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
      title: 'JetBrains WebStorm: Умная IDE для Vue 3',
      description: 'Идеальная среда разработки с умным автодополнением Tailwind CSS, встроенным линтером и мгновенным HMR.',
      buttonText: 'Скачать триал 30 дней',
      link: 'https://www.jetbrains.com/webstorm/',
      sponsor: 'ООО ДжетБрейнс • erid: 2Vtzqw7JetB',
      logoText: 'JB',
      logoBg: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600',
      badge: 'PRO'
    }
  }

  if (props.format === 'in-feed') {
    return {
      title: 'Рекламная Сеть Яндекса (РСЯ) для e-Commerce',
      description: 'Умная нативная монетизация каталогов товаров и медиа-ресурсов. Оплата за клики и целевые действия без задержек.',
      buttonText: 'Подключить РСЯ',
      link: 'https://partner.yandex.ru/',
      sponsor: 'ООО «Яндекс» • erid: 2Vtzqu9Yndx',
      logoText: 'Я',
      logoBg: 'bg-gradient-to-tr from-red-500 via-red-600 to-amber-500',
      badge: 'ХИТ'
    }
  }

  return {
    title: 'Cloudflare Pages: Глобальный Edge CDN & Серверы',
    description: 'Мгновенный деплой статических сайтов на Vue 3, бесплатный SSL-сертификат и абсолютно неограниченная полоса пропускания.',
    buttonText: 'Подключить бесплатно',
    link: 'https://pages.cloudflare.com',
    sponsor: 'Cloudflare Inc. • erid: 2Vtzqv8Cldf',
    logoText: 'CF',
    logoBg: 'bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500',
    badge: 'ТОП'
  }
})
</script>

<style scoped>
.ad-slot-wrapper {
  contain: content;
}
</style>
