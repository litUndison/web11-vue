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
    <!-- Режим спонсорского баннера с реальной фотографией -->
    <div
      v-if="showCreativeMode"
      class="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-amber-500/30 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-all shadow-card flex flex-col justify-between"
      :class="creativeContainerClass"
      :style="customDimensions"
    >
      <!-- Формат боковой панели (300x250) -->
      <template v-if="format === 'sidebar'">
        <div class="flex flex-col h-full justify-between">
          <!-- Реальное изображение товара спонсора -->
          <div class="relative w-full h-24 bg-zinc-950 overflow-hidden shrink-0">
            <img
              :src="creativeData.image"
              :alt="creativeData.title"
              class="w-full h-full object-cover object-center brightness-95 hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute top-2 left-2 flex items-center gap-1.5">
              <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/80 text-amber-400 border border-amber-500/40">
                Реклама
              </span>
              <span class="font-mono text-[9px] text-zinc-300 bg-black/60 px-1 rounded">300×250</span>
            </div>
            <div class="absolute top-2 right-2 flex items-center gap-1.5">
              <button
                @click="toggleMode"
                class="px-1.5 py-0.5 rounded text-[9px] bg-black/70 text-zinc-300 hover:text-amber-400 transition-colors"
                title="Переключить в режим плейсхолдера"
              >
                Сетка
              </button>
              <button
                v-if="closable"
                @click="hideSlot"
                class="p-1 rounded text-zinc-300 hover:text-rose-400 bg-black/70 transition-colors"
                title="Скрыть блок"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Текстовое описание и кнопка -->
          <div class="p-3.5 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-bold text-amber-600 dark:text-amber-400 leading-tight truncate">
                  {{ creativeData.title }}
                </h4>
                <span class="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">{{ creativeData.badge }}</span>
              </div>
              <p class="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2 leading-snug">
                {{ creativeData.description }}
              </p>
            </div>

            <div class="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5 mt-auto">
              <a
                :href="creativeData.link"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 hover:brightness-110 transition-all shadow-gold"
              >
                <span>{{ creativeData.buttonText }}</span>
                <span class="text-[10px]">↗</span>
              </a>
              <div class="text-[9px] text-zinc-500 dark:text-zinc-400 truncate text-center">
                {{ creativeData.sponsor }}
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Формат горизонтального баннера Leaderboard (728x90) -->
      <template v-else-if="format === 'banner' || format === 'leaderboard'">
        <div class="px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-3 min-h-[90px] w-full bg-white dark:bg-zinc-950">
          <!-- Фото товара и текстовая информация -->
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div class="relative w-16 h-14 sm:w-20 sm:h-16 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-amber-500/20 bg-zinc-900">
              <img
                :src="creativeData.image"
                :alt="creativeData.title"
                class="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 shrink-0">
                  Спонсор
                </span>
                <h4 class="text-xs sm:text-sm font-bold text-zinc-900 dark:text-amber-400 truncate">
                  {{ creativeData.title }}
                </h4>
              </div>
              <p class="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 truncate mt-0.5 max-w-xl">
                {{ creativeData.description }}
              </p>
              <span class="text-[9px] text-zinc-400 hidden sm:inline-block font-mono mt-0.5">{{ creativeData.sponsor }}</span>
            </div>
          </div>

          <!-- Кнопка перехода и действия -->
          <div class="flex items-center gap-2 shrink-0">
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
              class="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 text-xs px-1 transition-colors"
              title="Переключить в режим сетки"
            >
              Сетка
            </button>
            <button
              v-if="closable"
              @click="hideSlot"
              class="text-zinc-400 hover:text-rose-500 p-1 transition-colors"
              title="Скрыть"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </template>

      <!-- Формат нативного блока в ленте -->
      <template v-else>
        <div class="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full bg-white dark:bg-zinc-950">
          <div class="flex items-center gap-3.5 min-w-0 flex-1">
            <div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-amber-500/20 bg-zinc-900">
              <img
                :src="creativeData.image"
                :alt="creativeData.title"
                class="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  Партнёр
                </span>
                <h4 class="text-sm font-bold text-zinc-900 dark:text-amber-400 truncate">
                  {{ creativeData.title }}
                </h4>
              </div>
              <p class="text-xs text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                {{ creativeData.description }}
              </p>
              <span class="text-[10px] text-zinc-400 font-mono block mt-1">{{ creativeData.sponsor }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <a
              :href="creativeData.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-amber-500 text-zinc-950 hover:brightness-110 shadow-gold transition-all"
            >
              <span>{{ creativeData.buttonText }}</span>
              <span class="text-[10px]">↗</span>
            </a>
            <button
              @click="toggleMode"
              class="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 text-xs px-1.5 py-1 transition-colors"
            >
              Сетка
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Режим технического плейсхолдера с разметкой IAB -->
    <div
      v-else
      class="relative overflow-hidden rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-900/60 p-4 transition-all flex flex-col justify-between select-none"
      :class="placeholderContainerClass"
      :style="customDimensions"
    >
      <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <div class="flex items-center gap-2">
          <span class="font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">{{ displayDimensions }}</span>
          <span class="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">IAB Standard</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="toggleMode"
            class="hover:text-amber-600 dark:hover:text-amber-400 text-[10px] font-bold text-zinc-600 dark:text-zinc-400 transition-colors"
          >
            Баннер
          </button>
          <button
            v-if="closable"
            @click="hideSlot"
            class="hover:text-rose-500 text-zinc-400 transition-colors p-1"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="my-auto py-2 text-center space-y-1">
        <div class="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">{{ label || 'Рекламный слот' }}</div>
        <div class="text-[11px] text-zinc-500 dark:text-zinc-400">{{ subDescription }}</div>
      </div>

      <div class="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
        <span>Статус: Готов к интеграции</span>
        <span>CLS: 0.00</span>
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
    validator: (v) => ['banner', 'sidebar', 'in-feed', 'leaderboard', 'custom'].includes(v)
  },
  label: {
    type: String,
    default: ''
  },
  slotTitle: {
    type: String,
    default: ''
  },
  closable: {
    type: Boolean,
    default: false
  },
  initialCreative: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['toggle-creative', 'close-slot'])

const showCreativeMode = ref(props.initialCreative)
const hidden = ref(false)
const slotId = 'ad-slot-' + Math.random().toString(36).substring(2, 9)

const toggleMode = () => {
  showCreativeMode.value = !showCreativeMode.value
  emit('toggle-creative', showCreativeMode.value)
}

const hideSlot = () => {
  hidden.value = true
  emit('close-slot')
}

const dimensionsMap = {
  banner: { width: 'w-full max-w-[728px]', minHeight: 'min-h-[90px]', label: '728 × 90' },
  leaderboard: { width: 'w-full max-w-[728px]', minHeight: 'min-h-[90px]', label: '728 × 90' },
  sidebar: { width: 'w-[300px]', minHeight: 'min-h-[250px]', label: '300 × 250' },
  'in-feed': { width: 'w-full', minHeight: 'min-h-[100px]', label: 'In-Feed Native' }
}

const containerClass = computed(() => {
  switch (props.format) {
    case 'sidebar':
      return 'w-[300px] mx-auto'
    case 'banner':
    case 'leaderboard':
      return 'w-full max-w-[728px] mx-auto'
    case 'in-feed':
      return 'w-full'
    default:
      return 'w-full'
  }
})

const creativeContainerClass = computed(() => {
  switch (props.format) {
    case 'sidebar':
      return 'w-[300px] h-[250px]'
    case 'banner':
    case 'leaderboard':
      return 'w-full min-h-[90px]'
    case 'in-feed':
      return 'w-full min-h-[100px]'
    default:
      return 'w-full min-h-[90px]'
  }
})

const placeholderContainerClass = computed(() => {
  switch (props.format) {
    case 'sidebar':
      return 'w-[300px] h-[250px]'
    case 'banner':
    case 'leaderboard':
      return 'w-full min-h-[90px]'
    case 'in-feed':
      return 'w-full min-h-[100px]'
    default:
      return 'w-full min-h-[90px]'
  }
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
      return 'Интеграция рекламных сетей'
  }
})

// Данные о спонсорах с реальными фотографиями продукции
const creativeData = computed(() => {
  if (props.format === 'sidebar') {
    return {
      title: 'Razer Kishi Ultra',
      badge: '9 990 ₽',
      description: 'Консольный мобильный контроллер для iPhone 15/16 и Android с тактильной отдачей Sensa HD.',
      buttonText: 'Купить со скидкой',
      link: 'https://www.razer.com/mobile-controllers/razer-kishi-ultra',
      sponsor: 'Razer Inc. • erid: 2Vtzqw7RzrK',
      image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80'
    }
  }

  if (props.format === 'in-feed') {
    return {
      title: 'Google Play Pass',
      badge: 'Бесплатно',
      description: 'Играйте в Vampire Survivors и сотни популярных хитов без рекламы и встроенных микроплатежей.',
      buttonText: '1 месяц бесплатно',
      link: 'https://play.google.com/about/play-pass/',
      sponsor: 'Google Ireland Ltd. • erid: 2Vtzqu9GgPl',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'
    }
  }

  return {
    title: 'SteelSeries Arctis Nova',
    badge: '14 490 ₽',
    description: 'Игровая беспроводная гарнитура с 360° пространственным звуком Spatial Audio для Vampire Survivors.',
    buttonText: 'Перейти в каталог',
    link: 'https://steelseries.com/gaming-headsets/arctis-nova-7',
    sponsor: 'SteelSeries ApS • erid: 2Vtzqv8StlS',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
  }
})
</script>

<style scoped>
.ad-slot-wrapper {
  contain: layout style;
}
</style>
