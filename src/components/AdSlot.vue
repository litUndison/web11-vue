<template>
  <aside
    :id="slotId"
    role="complementary"
    aria-label="Спонсорский блок"
    class="ad-slot-wrapper relative my-4 transition-all duration-200 select-none"
    :class="[
      containerClass,
      hidden ? 'hidden' : ''
    ]"
  >
    <!-- 1. Real Creative Mode (Active by default) -->
    <div
      v-if="showCreativeMode"
      class="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121217] transition-all shadow-xs flex flex-col justify-between"
      :class="creativeContainerClass"
      :style="customDimensions"
    >
      <!-- Format: Sidebar (300x250) -->
      <template v-if="format === 'sidebar'">
        <div class="p-4 flex flex-col justify-between h-full">
          <!-- Top meta bar -->
          <div class="flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 mb-2">
            <div class="flex items-center gap-1.5">
              <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                Реклама
              </span>
              <span class="font-mono text-[10px]">300×250</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="toggleMode"
                class="hover:text-zinc-700 dark:hover:text-zinc-300 text-[10px]"
                title="Переключить в режим сетки"
              >
                Сетка
              </button>
              <button
                v-if="closable"
                @click="hideSlot"
                class="hover:text-rose-500 transition-colors"
                title="Скрыть"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Middle Brand & Headline -->
          <div class="space-y-2 my-auto">
            <div class="flex items-center gap-2.5">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 text-white shadow-2xs"
                :class="creativeData.logoBg"
              >
                {{ creativeData.logoText }}
              </div>
              <div class="min-w-0">
                <h4 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                  {{ creativeData.title }}
                </h4>
                <p class="text-[11px] text-zinc-500 truncate mt-0.5">{{ creativeData.subtitle }}</p>
              </div>
            </div>
            <p class="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {{ creativeData.description }}
            </p>
          </div>

          <!-- CTA and Legal Footer -->
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2 mt-auto">
            <a
              :href="creativeData.link"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-medium rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
            >
              <span>{{ creativeData.buttonText }}</span>
              <span class="text-[10px]">↗</span>
            </a>
            <div class="text-[10px] text-zinc-400 dark:text-zinc-500 truncate text-center">
              {{ creativeData.sponsor }}
            </div>
          </div>
        </div>
      </template>

      <!-- Format: Horizontal Banner / Leaderboard (728x90) -->
      <template v-else-if="format === 'banner' || format === 'leaderboard'">
        <div class="px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-h-[90px]">
          <!-- Left: Logo + Info -->
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 text-white shadow-2xs"
              :class="creativeData.logoBg"
            >
              {{ creativeData.logoText }}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0">
                  Реклама
                </span>
                <h4 class="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {{ creativeData.title }}
                </h4>
              </div>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5 max-w-xl">
                {{ creativeData.description }}
              </p>
            </div>
          </div>

          <!-- Right: Action & Controls -->
          <div class="flex items-center gap-3 shrink-0 self-end sm:self-center">
            <div class="text-right hidden xl:block">
              <span class="text-[10px] text-zinc-400 block truncate max-w-[150px]">{{ creativeData.sponsor }}</span>
            </div>
            <a
              :href="creativeData.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-xs"
            >
              <span>{{ creativeData.buttonText }}</span>
              <span class="text-[10px]">↗</span>
            </a>
            <button
              @click="toggleMode"
              class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-xs px-1"
              title="Переключить в режим сетки"
            >
              Сетка
            </button>
            <button
              v-if="closable"
              @click="hideSlot"
              class="text-zinc-400 hover:text-rose-500 p-1"
              title="Скрыть"
            >
              ✕
            </button>
          </div>
        </div>
      </template>

      <!-- Format: In-Feed / Fluid -->
      <template v-else>
        <div class="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 text-white shadow-2xs"
              :class="creativeData.logoBg"
            >
              {{ creativeData.logoText }}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Партнёр
                </span>
                <h4 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {{ creativeData.title }}
                </h4>
              </div>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                {{ creativeData.description }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <a
              :href="creativeData.link"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary btn-sm"
            >
              <span>{{ creativeData.buttonText }}</span>
              <span class="text-[10px]">↗</span>
            </a>
            <button
              @click="toggleMode"
              class="text-zinc-400 hover:text-zinc-600 text-xs"
              title="Сетка"
            >
              Сетка
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- 2. Technical Placeholder Mode (Accessible via toggle) -->
    <div
      v-else
      class="flex flex-col items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-900/50 rounded-xl p-4 text-center transition-colors select-none"
      :class="creativeContainerClass"
      :style="customDimensions"
    >
      <div class="flex items-center gap-2 mb-1.5">
        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          {{ label }}
        </span>
        <span class="text-[11px] font-mono text-zinc-400">
          {{ displayDimensions }}
        </span>
      </div>

      <div class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {{ slotTitle }}
      </div>

      <p class="text-[11px] text-zinc-400 mt-1 max-w-xs line-clamp-1">
        {{ subDescription }}
      </p>

      <button
        type="button"
        @click="toggleMode"
        class="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-colors shadow-2xs"
      >
        <span>Показать баннер</span>
        <span>→</span>
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
  banner: { width: '100%', minHeight: '90px', maxW: 'max-w-4xl', label: '728 × 90 px (Leaderboard)' },
  leaderboard: { width: '100%', minHeight: '90px', maxW: 'max-w-5xl', label: '970 × 90 px (Leaderboard)' },
  sidebar: { width: '100%', minHeight: '250px', maxW: 'max-w-[300px]', label: '300 × 250 px (Medium Rectangle)' },
  'in-feed': { width: '100%', minHeight: '100px', maxW: 'w-full', label: 'Adaptive Fluid In-Feed' },
  mobile: { width: '100%', minHeight: '90px', maxW: 'max-w-[320px]', label: '320 × 100 px' },
  custom: { width: '100%', minHeight: '90px', maxW: 'w-full', label: 'Пользовательский' }
}

const containerClass = computed(() => {
  const current = dimensionsMap[props.format] || dimensionsMap.banner
  return `mx-auto ${current.maxW}`
})

const creativeContainerClass = computed(() => {
  if (props.format === 'sidebar') return 'h-[250px]'
  return 'min-h-[90px]'
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
  return style
})

const subDescription = computed(() => {
  switch (props.format) {
    case 'sidebar':
      return 'Слот IAB Medium Rectangle (300×250 px)'
    case 'in-feed':
      return 'Нативный блок в контентном потоке'
    case 'banner':
    case 'leaderboard':
      return 'Медийный баннер Leaderboard (728×90 px)'
    default:
      return 'Интеграция рекламных сетей (AdSense / РСЯ)'
  }
})

const creativeData = computed(() => {
  if (props.format === 'sidebar') {
    return {
      title: 'JetBrains WebStorm',
      subtitle: 'IDE для Vue 3 & TypeScript',
      description: 'Умное автодополнение Tailwind CSS, встроенный рефакторинг и мгновенный отклик.',
      buttonText: 'Попробовать бесплатно',
      link: 'https://www.jetbrains.com/webstorm/',
      sponsor: 'ООО ДжетБрейнс • erid: 2Vtzqw7JetB',
      logoText: 'WS',
      logoBg: 'bg-zinc-900 dark:bg-zinc-800'
    }
  }

  if (props.format === 'in-feed') {
    return {
      title: 'Яндекс Рекламная Сеть',
      subtitle: 'Монетизация e-Commerce',
      description: 'Умные нативные рекомендации товаров. Высокий доход за 1000 показов без задержек.',
      buttonText: 'Подключить',
      link: 'https://partner.yandex.ru/',
      sponsor: 'ООО «Яндекс» • erid: 2Vtzqu9Yndx',
      logoText: 'Я',
      logoBg: 'bg-red-600'
    }
  }

  return {
    title: 'Cloudflare Pages',
    subtitle: 'Edge CDN & Hosting',
    description: 'Мгновенный деплой статических сайтов на Vue 3, SSL и безлимитная полоса пропускания.',
    buttonText: 'Подключить',
    link: 'https://pages.cloudflare.com',
    sponsor: 'Cloudflare Inc. • erid: 2Vtzqv8Cldf',
    logoText: 'CF',
    logoBg: 'bg-amber-600'
  }
})
</script>

<style scoped>
.ad-slot-wrapper {
  contain: layout style;
}
</style>
