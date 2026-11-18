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
      class="relative overflow-hidden rounded-xl border border-amber-500/20 dark:border-amber-500/30 bg-zinc-900/90 dark:bg-[#121218] transition-all shadow-card flex flex-col justify-between"
      :class="creativeContainerClass"
      :style="customDimensions"
    >
      <!-- Format: Sidebar (300x250) -->
      <template v-if="format === 'sidebar'">
        <div class="p-4 flex flex-col justify-between h-full bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-100">
          <!-- Top meta bar -->
          <div class="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
            <div class="flex items-center gap-1.5">
              <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Спонсор
              </span>
              <span class="font-mono text-[10px] text-zinc-400">300×250</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="toggleMode"
                class="hover:text-amber-300 text-[10px] text-zinc-400 transition-colors"
                title="Переключить в режим сетки"
              >
                Сетка
              </button>
              <button
                v-if="closable"
                @click="hideSlot"
                class="hover:text-rose-400 text-zinc-400 transition-colors"
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
                <h4 class="text-xs font-bold text-amber-400 leading-tight truncate">
                  {{ creativeData.title }}
                </h4>
                <p class="text-[11px] text-zinc-400 truncate mt-0.5">{{ creativeData.subtitle }}</p>
              </div>
            </div>
            <p class="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
              {{ creativeData.description }}
            </p>
          </div>

          <!-- CTA and Legal Footer -->
          <div class="pt-3 border-t border-zinc-800 space-y-2 mt-auto">
            <a
              :href="creativeData.link"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 hover:brightness-110 transition-all shadow-gold"
            >
              <span>{{ creativeData.buttonText }}</span>
              <span class="text-[10px]">↗</span>
            </a>
            <div class="text-[10px] text-zinc-400 truncate text-center">
              {{ creativeData.sponsor }}
            </div>
          </div>
        </div>
      </template>

      <!-- Format: Horizontal Banner / Leaderboard (728x90) -->
      <template v-else-if="format === 'banner' || format === 'leaderboard'">
        <div class="px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-h-[90px] bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-950 text-zinc-100">
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
                <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                  Партнёр
                </span>
                <h4 class="text-xs sm:text-sm font-bold text-amber-400 truncate">
                  {{ creativeData.title }}
                </h4>
              </div>
              <p class="text-xs text-zinc-300 truncate mt-0.5 max-w-xl">
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
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 hover:brightness-110 transition-all shadow-gold"
            >
              <span>{{ creativeData.buttonText }}</span>
              <span class="text-[10px]">↗</span>
            </a>
            <button
              @click="toggleMode"
              class="text-zinc-400 hover:text-amber-300 text-xs px-1 transition-colors"
              title="Переключить в режим сетки"
            >
              Сетка
            </button>
            <button
              v-if="closable"
              @click="hideSlot"
              class="text-zinc-400 hover:text-rose-400 p-1 transition-colors"
              title="Скрыть"
            >
              ✕
            </button>
          </div>
        </div>
      </template>

      <!-- Format: In-Feed / Fluid -->
      <template v-else>
        <div class="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-zinc-900 to-zinc-950 text-zinc-100">
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 text-white shadow-2xs"
              :class="creativeData.logoBg"
            >
              {{ creativeData.logoText }}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Рекомендация
                </span>
                <h4 class="text-sm font-bold text-amber-400 truncate">
                  {{ creativeData.title }}
                </h4>
              </div>
              <p class="text-xs text-zinc-300 mt-1 line-clamp-2">
                {{ creativeData.description }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <a
              :href="creativeData.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-zinc-800 text-amber-400 hover:bg-zinc-700 border border-amber-500/30 transition-all shadow-xs"
            >
              <span>{{ creativeData.buttonText }}</span>
              <span class="text-[10px]">↗</span>
            </a>
            <button
              @click="toggleMode"
              class="text-zinc-400 hover:text-amber-300 text-xs transition-colors"
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
      class="flex flex-col items-center justify-center border border-dashed border-amber-500/40 dark:border-amber-500/30 bg-zinc-900/60 dark:bg-zinc-950/70 rounded-xl p-4 text-center transition-colors select-none"
      :class="creativeContainerClass"
      :style="customDimensions"
    >
      <div class="flex items-center gap-2 mb-1.5">
        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
          {{ label }}
        </span>
        <span class="text-[11px] font-mono text-zinc-400">
          {{ displayDimensions }}
        </span>
      </div>

      <div class="text-xs font-semibold uppercase tracking-wider text-zinc-300">
        {{ slotTitle }}
      </div>

      <p class="text-[11px] text-zinc-400 mt-1 max-w-xs line-clamp-1">
        {{ subDescription }}
      </p>

      <button
        type="button"
        @click="toggleMode"
        class="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-800 text-amber-400 border border-amber-500/30 hover:bg-zinc-700 transition-colors shadow-2xs"
      >
        <span>Показать спонсора</span>
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
    default: 'Спонсорский блок'
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
      title: 'Razer Kishi Ultra',
      subtitle: 'Мобильный контроллер Pro',
      description: 'Консольный хват, аналоговые триггеры Hall Effect и USB-C подключение с нулевой задержкой.',
      buttonText: 'Купить со скидкой',
      link: 'https://www.razer.com/mobile-controllers/razer-kishi-ultra',
      sponsor: 'Razer Inc. • erid: 2Vtzqw7RzrK',
      logoText: 'RZ',
      logoBg: 'bg-emerald-600'
    }
  }

  if (props.format === 'in-feed') {
    return {
      title: 'Google Play Pass',
      subtitle: 'Подписка на 1000+ игр',
      description: 'Играйте в Vampire Survivors и популярные хиты без рекламы и встроенных микроплатежей.',
      buttonText: '1 месяц бесплатно',
      link: 'https://play.google.com/about/play-pass/',
      sponsor: 'Google Ireland Ltd. • erid: 2Vtzqu9GgPl',
      logoText: 'GP',
      logoBg: 'bg-indigo-600'
    }
  }

  return {
    title: 'SteelSeries Arctis Nova',
    subtitle: 'Игровая гарнитура с 360° Spatial Audio',
    description: 'Услышь приближение каждой волны вампиров и летучих мышей с акустической системой Nova Pro.',
    buttonText: 'Перейти в каталог',
    link: 'https://steelseries.com/gaming-headsets/arctis-nova-7',
    sponsor: 'SteelSeries ApS • erid: 2Vtzqv8StlS',
    logoText: 'SS',
    logoBg: 'bg-amber-600'
  }
})
</script>

<style scoped>
.ad-slot-wrapper {
  contain: layout style;
}
</style>
