<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
      <div>
        <h1 class="heading-gothic text-2xl font-bold tracking-tight text-zinc-100">
          Игровая Статистика & Монетизация
        </h1>
        <p class="text-xs sm:text-sm text-zinc-400 mt-0.5">
          Глобальный трекинг уничтоженных орд нежити, золотого фонда и наград спонсорских сундуков
        </p>
      </div>

      <!-- Time period switcher -->
      <div class="flex items-center gap-1.5 p-1 rounded-lg border border-amber-500/30 bg-zinc-900/90 shadow-2xs">
        <button
          v-for="p in ['Сегодня', '7 дней', '30 дней']"
          :key="p"
          @click="selectedPeriod = p"
          class="px-3 py-1 text-xs rounded-md font-bold transition-all"
          :class="selectedPeriod === p
            ? 'bg-amber-500 text-zinc-950 font-bold shadow-gold'
            : 'text-zinc-400 hover:text-amber-300'"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in currentStats"
        :key="stat.title"
        class="card-base p-5 border-amber-500/20 hover:border-amber-500/40 transition-colors bg-zinc-900/80"
      >
        <div class="flex items-center justify-between text-xs text-zinc-400 mb-2">
          <span class="font-medium text-xs">{{ stat.title }}</span>
          <span class="text-amber-400 text-base">
            {{ stat.icon }}
          </span>
        </div>

        <div class="text-2xl font-bold heading-gothic text-amber-400">
          {{ stat.value }}
        </div>

        <div class="mt-2.5 flex items-center justify-between text-xs">
          <span
            class="inline-flex items-center gap-0.5 font-bold text-[11px]"
            :class="stat.isPositive ? 'text-emerald-400' : 'text-rose-400'"
          >
            <span>{{ stat.isPositive ? '↑' : '↓' }}</span>
            <span>{{ stat.trend }}</span>
          </span>
          <span class="text-zinc-500 text-[11px]">к прошл. периоду</span>
        </div>
      </div>
    </div>

    <!-- Main Content Layout (Chart + Sidebar AdSlot) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Left Column (8 cols): Interactive Chart & Transactions -->
      <div class="lg:col-span-8 space-y-6">
        
        <!-- Interactive SVG Chart Card -->
        <div class="card-base p-5 sm:p-6 space-y-4 border-amber-500/20 bg-zinc-900/80">
          <!-- Chart Header & Controls -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="heading-gothic font-bold text-sm sm:text-base text-zinc-100">
                  Динамика показателей
                </h3>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Live Sync
                </span>
              </div>
              <p class="text-xs text-zinc-400 mt-0.5">
                {{ selectedMetricName }}: детализация по сессиям за «{{ selectedPeriod }}»
              </p>
            </div>

            <!-- Controls: Metric Toggle & View Toggle -->
            <div class="flex items-center gap-2 flex-wrap">
              <div class="flex items-center p-0.5 rounded-lg border border-amber-500/30 bg-zinc-950 text-xs">
                <button
                  v-for="m in metrics"
                  :key="m.id"
                  @click="activeMetric = m.id"
                  class="px-2.5 py-1 rounded text-xs font-semibold transition-all"
                  :class="activeMetric === m.id
                    ? 'bg-amber-500 text-zinc-950 shadow-gold'
                    : 'text-zinc-400 hover:text-amber-300'"
                >
                  {{ m.label }}
                </button>
              </div>

              <button
                @click="chartType = chartType === 'line' ? 'bar' : 'line'"
                class="p-1.5 rounded-lg border border-amber-500/30 text-amber-400 hover:bg-zinc-800 transition-colors"
                :title="chartType === 'line' ? 'Столбчатая диаграмма' : 'Плавный график'"
              >
                <!-- Line icon -->
                <svg v-if="chartType === 'line'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <!-- Bar icon -->
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- The SVG Chart Container -->
          <div class="relative w-full h-60 select-none" @mouseleave="hoveredIndex = null">
            <!-- Tooltip -->
            <div
              v-if="hoveredIndex !== null && activeDataPoints[hoveredIndex]"
              class="absolute z-20 pointer-events-none p-2.5 rounded-lg bg-zinc-950 text-zinc-100 shadow-2xl border border-amber-500/40 text-xs transition-all duration-75"
              :style="tooltipStyle"
            >
              <div class="font-mono text-[10px] text-amber-400 mb-0.5">{{ activeDataPoints[hoveredIndex].label }}</div>
              <div class="font-bold text-sm text-zinc-100">
                {{ formatMetricValue(activeDataPoints[hoveredIndex].value, activeMetric) }}
              </div>
              <div class="text-[10px] text-zinc-400 mt-1 flex items-center gap-2">
                <span>Побед: {{ activeDataPoints[hoveredIndex].kills }}</span>
                <span>• Доля: {{ activeDataPoints[hoveredIndex].rate }}%</span>
              </div>
            </div>

            <svg class="w-full h-full overflow-visible" viewBox="0 0 680 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradientGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35" />
                  <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <!-- Horizontal Grid Lines -->
              <g stroke="#3f3f46" stroke-width="1" stroke-dasharray="3 3">
                <line x1="45" y1="20" x2="680" y2="20" />
                <line x1="45" y1="65" x2="680" y2="65" />
                <line x1="45" y1="110" x2="680" y2="110" />
                <line x1="45" y1="155" x2="680" y2="155" />
              </g>

              <!-- Y-axis Text Labels -->
              <g fill="#a1a1aa" font-size="10" font-family="monospace">
                <text x="36" y="24" text-anchor="end">{{ yAxisLabels[3] }}</text>
                <text x="36" y="69" text-anchor="end">{{ yAxisLabels[2] }}</text>
                <text x="36" y="114" text-anchor="end">{{ yAxisLabels[1] }}</text>
                <text x="36" y="159" text-anchor="end">{{ yAxisLabels[0] }}</text>
              </g>

              <!-- MODE: Smooth Line / Area Chart -->
              <template v-if="chartType === 'line'">
                <!-- Area Fill -->
                <path :d="areaPathString" fill="url(#areaGradientGold)" />

                <!-- Stroke Curve -->
                <path
                  :d="linePathString"
                  fill="none"
                  stroke="#f59e0b"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <!-- Data Points & Hover Targets -->
                <g v-for="(p, i) in plottedPoints" :key="'pt-' + i">
                  <!-- Hover vertical cursor line -->
                  <line
                    v-if="hoveredIndex === i"
                    :x1="p.x"
                    y1="20"
                    :x2="p.x"
                    y2="160"
                    stroke="#fbbf24"
                    stroke-width="1.5"
                    stroke-dasharray="2 2"
                  />

                  <!-- Point Circle -->
                  <circle
                    :cx="p.x"
                    :cy="p.y"
                    :r="hoveredIndex === i ? 6 : 4"
                    class="transition-all duration-150 cursor-pointer"
                    :fill="hoveredIndex === i ? '#dc2626' : '#f59e0b'"
                    stroke="#ffffff"
                    :stroke-width="hoveredIndex === i ? 2.5 : 1.5"
                  />

                  <!-- Invisible hit target for easy mouse hover -->
                  <rect
                    :x="p.x - 22"
                    y="0"
                    width="44"
                    height="180"
                    fill="transparent"
                    class="cursor-pointer"
                    @mouseenter="hoveredIndex = i"
                  />
                </g>
              </template>

              <!-- MODE: Bar Chart -->
              <template v-else>
                <g v-for="(p, i) in plottedPoints" :key="'bar-' + i">
                  <rect
                    :x="p.x - 14"
                    :y="p.y"
                    width="28"
                    :height="Math.max(2, 160 - p.y)"
                    rx="3"
                    class="transition-all duration-200 cursor-pointer"
                    :fill="hoveredIndex === i ? '#f59e0b' : '#b45309'"
                    @mouseenter="hoveredIndex = i"
                  />
                </g>
              </template>

              <!-- X-axis Text Labels -->
              <g fill="#a1a1aa" font-size="10" font-family="monospace">
                <text
                  v-for="(p, i) in plottedPoints"
                  :key="'lbl-' + i"
                  :x="p.x"
                  y="185"
                  text-anchor="middle"
                >
                  {{ activeDataPoints[i].label }}
                </text>
              </g>
            </svg>
          </div>

          <!-- Bottom Summary Strip -->
          <div class="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span>Всего за период: <strong class="text-amber-400 font-bold">{{ periodTotals[activeMetric] }}</strong></span>
            <span class="font-mono text-[11px] text-zinc-500">Движок: 60-120 FPS • Latency: 12ms</span>
          </div>
        </div>

        <!-- Transactions & Loot Log Table -->
        <div class="card-base p-5 sm:p-6 space-y-4 border-amber-500/20 bg-zinc-900/80">
          <div class="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 class="heading-gothic font-bold text-sm sm:text-base text-zinc-100">
                Журнал игровых наград и спонсорских сундуков
              </h3>
              <p class="text-xs text-zinc-400 mt-0.5">
                Автоматическое начисление золота, реликвий и бонусов партнеров
              </p>
            </div>
            <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
              5 событий
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full min-w-[540px] text-left text-xs">
              <thead class="text-zinc-500 uppercase font-semibold text-[10px] tracking-wider border-b border-zinc-800 pb-2">
                <tr>
                  <th class="pb-2.5">Событие / Партнёр</th>
                  <th class="pb-2.5">Формат слота</th>
                  <th class="pb-2.5">Показы / Уровень</th>
                  <th class="pb-2.5">Награда</th>
                  <th class="pb-2.5 text-right">Статус</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-800 text-zinc-300">
                <tr v-for="t in transactions" :key="t.id" class="hover:bg-zinc-800/40 transition-colors">
                  <td class="py-3 font-semibold text-zinc-100 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" :class="t.dotClass"></span>
                    <span>{{ t.sponsor }}</span>
                  </td>
                  <td class="py-3 font-mono text-zinc-400 text-[11px]">{{ t.slot }}</td>
                  <td class="py-3 font-mono">{{ t.impressions }}</td>
                  <td class="py-3 font-bold font-mono text-amber-400">{{ t.income }}</td>
                  <td class="py-3 text-right">
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-medium"
                      :class="t.status === 'Получено' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'"
                    >
                      {{ t.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Right Column (4 cols): Dedicated Sidebar AdSlot (Clean 300x250) -->
      <div class="lg:col-span-4 space-y-4">
        
        <!-- Sidebar AdSlot Wrapper -->
        <div class="card-base p-4 space-y-3 border-amber-500/20 bg-zinc-900/80">
          <div class="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span class="font-bold text-amber-400 text-xs">Игровой спонсор</span>
            <span class="font-mono text-[10px] text-zinc-400">IAB 300×250</span>
          </div>

          <div class="w-full flex justify-center">
            <AdSlot
              format="sidebar"
              label="Спонсорский блок"
              slotTitle="Сайдбар Medium Rectangle"
              :initialCreative="allCreative"
              :key="'dash-ad-' + allCreative"
            />
          </div>
        </div>

        <!-- Infrastructure Status Mini-Card -->
        <div class="card-base p-4 space-y-2.5 border-amber-500/20 bg-zinc-900/80">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-zinc-100">Глобальная сеть Cloud Sync</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              99.99% SLA
            </span>
          </div>
          <p class="text-xs text-zinc-400 leading-relaxed">
            Автоматическая репликация сохранений профиля на узлах Edge CDN. Нулевой сдвиг макета (CLS = 0) при интеграции рекламных блоков.
          </p>
          <div class="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Репликация: Мгновенная</span>
            <span class="font-mono text-amber-400">Vulkan / Metal</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdSlot from '../components/AdSlot.vue'

defineProps({
  allCreative: {
    type: Boolean,
    default: true
  }
})

const selectedPeriod = ref('7 дней')
const activeMetric = ref('monsters')
const chartType = ref('line')
const hoveredIndex = ref(null)

const metrics = [
  { id: 'monsters', label: 'Уничтожено монстров' },
  { id: 'gold', label: 'Золото (G)' },
  { id: 'chests', label: 'Сундуки с арканами' }
]

const selectedMetricName = computed(() => {
  return metrics.find(m => m.id === activeMetric.value)?.label || 'Уничтожено монстров'
})

// Dynamic Datasets for "Сегодня", "7 дней", "30 дней"
const datasets = {
  'Сегодня': [
    { label: '00:00', monsters: 12400, gold: 2400, chests: 12, kills: 12400, rate: 8.5 },
    { label: '04:00', monsters: 6200, gold: 1100, chests: 6, kills: 6200, rate: 4.2 },
    { label: '08:00', monsters: 28500, gold: 5900, chests: 24, kills: 28500, rate: 19.5 },
    { label: '12:00', monsters: 56700, gold: 11800, chests: 52, kills: 56700, rate: 38.8 },
    { label: '16:00', monsters: 72100, gold: 15400, chests: 68, kills: 72100, rate: 49.3 },
    { label: '20:00', monsters: 61400, gold: 13000, chests: 59, kills: 61400, rate: 42.0 },
    { label: '23:59', monsters: 34200, gold: 7200, chests: 31, kills: 34200, rate: 23.4 }
  ],
  '7 дней': [
    { label: 'Пн', monsters: 184000, gold: 36800, chests: 184, kills: 184000, rate: 14.1 },
    { label: 'Вт', monsters: 212000, gold: 42400, chests: 212, kills: 212000, rate: 16.2 },
    { label: 'Ср', monsters: 245000, gold: 51000, chests: 245, kills: 245000, rate: 18.7 },
    { label: 'Чт', monsters: 231000, gold: 48500, chests: 231, kills: 231000, rate: 17.6 },
    { label: 'Пт', monsters: 289000, gold: 61200, chests: 289, kills: 289000, rate: 22.1 },
    { label: 'Сб', monsters: 154000, gold: 30800, chests: 154, kills: 154000, rate: 11.8 },
    { label: 'Вс', monsters: 113500, gold: 22700, chests: 114, kills: 113500, rate: 8.7 }
  ],
  '30 дней': [
    { label: 'Нед 1', monsters: 980000, gold: 205000, chests: 980, kills: 980000, rate: 22.0 },
    { label: 'Нед 2', monsters: 1120000, gold: 246000, chests: 1120, kills: 1120000, rate: 25.1 },
    { label: 'Нед 3', monsters: 1350000, gold: 298000, chests: 1350, kills: 1350000, rate: 30.3 },
    { label: 'Нед 4', monsters: 1428500, gold: 314000, chests: 1428, kills: 1428500, rate: 32.1 }
  ]
}

const activeDataPoints = computed(() => {
  const current = datasets[selectedPeriod.value] || datasets['7 дней']
  return current.map(item => ({
    label: item.label,
    value: item[activeMetric.value],
    kills: item.kills,
    rate: item.rate
  }))
})

// Dynamic Y-axis labels
const yAxisLabels = computed(() => {
  const values = activeDataPoints.value.map(p => p.value)
  const max = Math.max(...values, 10)
  if (activeMetric.value === 'monsters') {
    return ['0', `${Math.round(max * 0.33 / 1000)}k`, `${Math.round(max * 0.66 / 1000)}k`, `${Math.round(max / 1000)}k`]
  }
  if (activeMetric.value === 'gold') {
    return ['0 G', `${Math.round(max * 0.33)} G`, `${Math.round(max * 0.66)} G`, `${Math.round(max)} G`]
  }
  return ['0', `${Math.round(max * 0.33)}`, `${Math.round(max * 0.66)}`, `${Math.round(max)}`]
})

const plottedPoints = computed(() => {
  const points = activeDataPoints.value
  const count = points.length
  const values = points.map(p => p.value)
  const max = Math.max(...values, 1)

  const chartLeft = 60
  const chartRight = 660
  const chartTop = 20
  const chartBottom = 160
  const usableWidth = chartRight - chartLeft
  const usableHeight = chartBottom - chartTop

  return points.map((p, i) => {
    const x = count === 1 ? chartLeft + usableWidth / 2 : chartLeft + (i / (count - 1)) * usableWidth
    const ratio = p.value / max
    const y = chartBottom - ratio * usableHeight
    return { x, y }
  })
})

const linePathString = computed(() => {
  const pts = plottedPoints.value
  if (!pts.length) return ''
  let path = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i]
    const p1 = pts[i + 1]
    const mx = (p0.x + p1.x) / 2
    path += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`
  }
  return path
})

const areaPathString = computed(() => {
  const pts = plottedPoints.value
  if (!pts.length) return ''
  const first = pts[0]
  const last = pts[pts.length - 1]
  return `${linePathString.value} L ${last.x} 160 L ${first.x} 160 Z`
})

const tooltipStyle = computed(() => {
  if (hoveredIndex.value === null) return {}
  const pt = plottedPoints.value[hoveredIndex.value]
  if (!pt) return {}
  const leftPercent = (pt.x / 680) * 100
  const topPercent = (pt.y / 200) * 100
  return {
    left: `calc(${leftPercent}% - 60px)`,
    top: `calc(${topPercent}% - 55px)`
  }
})

const formatMetricValue = (val, metric) => {
  if (metric === 'monsters') return val.toLocaleString() + ' монстров'
  if (metric === 'gold') return val.toLocaleString() + ' G'
  return val.toLocaleString() + ' сундуков'
}

const periodTotals = computed(() => {
  const current = datasets[selectedPeriod.value] || datasets['7 дней']
  const totalMonsters = current.reduce((sum, i) => sum + i.monsters, 0).toLocaleString() + ' монстров'
  const totalGold = current.reduce((sum, i) => sum + i.gold, 0).toLocaleString() + ' G'
  const totalChests = current.reduce((sum, i) => sum + i.chests, 0).toLocaleString() + ' шт'
  return {
    monsters: totalMonsters,
    gold: totalGold,
    chests: totalChests
  }
})

// Current period KPI cards
const currentStats = computed(() => {
  if (selectedPeriod.value === 'Сегодня') {
    return [
      { title: 'Монстров сегодня', value: '271 500', trend: '+18.4%', isPositive: true, icon: '☠️' },
      { title: 'Добыто золота', value: '56 700 G', trend: '+22.0%', isPositive: true, icon: '🪙' },
      { title: 'Сундуков открыто', value: '258 шт', trend: '+12.1%', isPositive: true, icon: '🎁' },
      { title: 'Среднее выживание', value: '28:15 мин', trend: '+5.4%', isPositive: true, icon: '⏱' }
    ]
  }
  return [
    { title: 'Всего повержено', value: '1 428 500', trend: '+14.2%', isPositive: true, icon: '☠️' },
    { title: 'Казна Охотников', value: '294 600 G', trend: '+21.5%', isPositive: true, icon: '🪙' },
    { title: 'Сундуков с арканами', value: '1 428 шт', trend: '+8.6%', isPositive: true, icon: '🎁' },
    { title: 'Среднее выживание', value: '26:45 мин', trend: '+7.8%', isPositive: true, icon: '⏱' }
  ]
})

const transactions = [
  { id: 1, sponsor: 'Razer Kishi Ultra Sponsored Chest', slot: 'Sidebar (300×250)', impressions: '54 300', income: '+10 000 G', status: 'Получено', dotClass: 'bg-emerald-500' },
  { id: 2, sponsor: 'Сундук 25-й минуты: Босс Красный Дракон', slot: 'Boss Drop (Grimoire)', impressions: 'Капелла Магна', income: 'Holy Wand Evolution', status: 'Получено', dotClass: 'bg-amber-500' },
  { id: 3, sponsor: 'Google Play Pass Bonus Pack', slot: 'In-Feed Native Card', impressions: '28 900', income: '+15 000 G', status: 'Получено', dotClass: 'bg-emerald-500' },
  { id: 4, sponsor: 'Лавка Торговца: 10 Золотых яиц', slot: 'Merchant Store', impressions: 'Покупка', income: '-10 000 G', status: 'Получено', dotClass: 'bg-indigo-500' },
  { id: 5, sponsor: 'SteelSeries Arctis Nova Sound Chest', slot: 'Leaderboard (728×90)', impressions: '17 550', income: '+7 500 G', status: 'В обработке', dotClass: 'bg-amber-500' }
]
</script>
