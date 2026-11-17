<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Аналитика и монетизация
        </h1>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Статистика показов рекламных блоков AdSlot, кликабельности и доходов в реальном времени
        </p>
      </div>

      <!-- Time period switcher -->
      <div class="flex items-center gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
        <button
          v-for="p in ['Сегодня', '7 дней', '30 дней']"
          :key="p"
          @click="selectedPeriod = p"
          class="px-2.5 py-1 text-xs rounded-md font-medium transition-colors"
          :class="selectedPeriod === p
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
            : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'"
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
        class="card-base p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
      >
        <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
          <span class="font-medium text-xs">{{ stat.title }}</span>
          <span class="text-zinc-400 dark:text-zinc-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.iconD"/>
            </svg>
          </span>
        </div>

        <div class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {{ stat.value }}
        </div>

        <div class="mt-2.5 flex items-center justify-between text-xs">
          <span
            class="inline-flex items-center gap-0.5 font-medium text-[11px]"
            :class="stat.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'"
          >
            <span>{{ stat.isPositive ? '↑' : '↓' }}</span>
            <span>{{ stat.trend }}</span>
          </span>
          <span class="text-zinc-400 text-[11px]">к прошл. периоду</span>
        </div>
      </div>
    </div>

    <!-- Main Content Layout (Chart + Sidebar AdSlot) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Left Column (8 cols): Interactive Chart & Transactions -->
      <div class="lg:col-span-8 space-y-6">
        
        <!-- Interactive SVG Chart Card -->
        <div class="card-base p-5 sm:p-6 space-y-4">
          <!-- Chart Header & Controls -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                  Динамика показателей
                </h3>
                <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Sync
                </span>
              </div>
              <p class="text-xs text-zinc-400 mt-0.5">
                {{ selectedMetricName }}: детализация по дням за период «{{ selectedPeriod }}»
              </p>
            </div>

            <!-- Controls: Metric Toggle & View Toggle -->
            <div class="flex items-center gap-2">
              <div class="flex items-center p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs">
                <button
                  v-for="m in metrics"
                  :key="m.id"
                  @click="activeMetric = m.id"
                  class="px-2 py-1 rounded text-xs transition-colors"
                  :class="activeMetric === m.id
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'"
                >
                  {{ m.label }}
                </button>
              </div>

              <button
                @click="chartType = chartType === 'line' ? 'bar' : 'line'"
                class="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                :title="chartType === 'line' ? 'Переключить на столбчатую диаграмму' : 'Переключить на плавный график'"
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
          <div class="relative w-full h-56 sm:h-64 select-none" @mouseleave="hoveredIndex = null">
            <!-- Tooltip -->
            <div
              v-if="hoveredIndex !== null && activeDataPoints[hoveredIndex]"
              class="absolute z-20 pointer-events-none p-2.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-dropdown border border-zinc-700/50 dark:border-zinc-200 text-xs transition-all duration-75"
              :style="tooltipStyle"
            >
              <div class="font-mono text-[10px] opacity-70 mb-0.5">{{ activeDataPoints[hoveredIndex].label }}</div>
              <div class="font-bold text-sm">
                {{ formatMetricValue(activeDataPoints[hoveredIndex].value, activeMetric) }}
              </div>
              <div class="text-[10px] opacity-80 mt-1 flex items-center gap-2">
                <span>Клики: {{ activeDataPoints[hoveredIndex].clicks }}</span>
                <span>• CTR: {{ activeDataPoints[hoveredIndex].ctr }}%</span>
              </div>
            </div>

            <svg class="w-full h-full overflow-visible" viewBox="0 0 680 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25" />
                  <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <!-- Horizontal Grid Lines & Y-axis Labels -->
              <g class="stroke-zinc-200 dark:stroke-zinc-800/80 stroke-dasharray-[3,3]">
                <line x1="40" y1="20" x2="680" y2="20" stroke-width="1" />
                <line x1="40" y1="65" x2="680" y2="65" stroke-width="1" />
                <line x1="40" y1="110" x2="680" y2="110" stroke-width="1" />
                <line x1="40" y1="155" x2="680" y2="155" stroke-width="1" />
              </g>

              <!-- Y-axis Text Labels -->
              <g class="fill-zinc-400 text-[10px] font-mono">
                <text x="32" y="24" text-anchor="end">{{ yAxisLabels[3] }}</text>
                <text x="32" y="69" text-anchor="end">{{ yAxisLabels[2] }}</text>
                <text x="32" y="114" text-anchor="end">{{ yAxisLabels[1] }}</text>
                <text x="32" y="159" text-anchor="end">{{ yAxisLabels[0] }}</text>
              </g>

              <!-- MODE: Smooth Line / Area Chart -->
              <template v-if="chartType === 'line'">
                <!-- Area Fill -->
                <path :d="areaPathString" fill="url(#areaGradient)" />

                <!-- Stroke Curve -->
                <path
                  :d="linePathString"
                  fill="none"
                  stroke="#6366f1"
                  stroke-width="2.5"
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
                    stroke="#818cf8"
                    stroke-width="1.5"
                    stroke-dasharray="2 2"
                  />

                  <!-- Point Circle -->
                  <circle
                    :cx="p.x"
                    :cy="p.y"
                    :r="hoveredIndex === i ? 5.5 : 3.5"
                    class="transition-all duration-150 cursor-pointer"
                    :fill="hoveredIndex === i ? '#4f46e5' : '#ffffff'"
                    stroke="#6366f1"
                    :stroke-width="hoveredIndex === i ? 2.5 : 2"
                  />

                  <!-- Invisible hit target for easy mouse hover -->
                  <rect
                    :x="p.x - 20"
                    y="0"
                    width="40"
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
                    :x="p.x - 12"
                    :y="p.y"
                    width="24"
                    :height="160 - p.y"
                    rx="3"
                    class="transition-all duration-200 cursor-pointer"
                    :class="hoveredIndex === i ? 'fill-indigo-600' : 'fill-indigo-500/70 hover:fill-indigo-500'"
                    @mouseenter="hoveredIndex = i"
                  />
                </g>
              </template>

              <!-- X-axis Text Labels -->
              <g class="fill-zinc-400 text-[10px] font-mono">
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
          <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
            <span>Всего за период: <strong class="text-zinc-900 dark:text-zinc-100 font-semibold">{{ periodTotals[activeMetric] }}</strong></span>
            <span class="font-mono text-[11px]">SLA 99.99% • Edge Latency 14ms</span>
          </div>
        </div>

        <!-- Transactions Table -->
        <div class="card-base p-5 sm:p-6 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <div>
              <h3 class="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                Транзакции и начисления AdSlot
              </h3>
              <p class="text-xs text-zinc-400 mt-0.5">
                Автоматический клиринг по прямым договорам и рекламным сетям
              </p>
            </div>
            <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              5 транзакций
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full min-w-[540px] text-left text-xs">
              <thead class="text-zinc-400 uppercase font-semibold text-[10px] tracking-wider border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <tr>
                  <th class="pb-2.5">Рекламодатель</th>
                  <th class="pb-2.5">Формат слота</th>
                  <th class="pb-2.5">Показы</th>
                  <th class="pb-2.5">Доход</th>
                  <th class="pb-2.5 text-right">Статус</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-zinc-600 dark:text-zinc-300">
                <tr v-for="t in transactions" :key="t.id" class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td class="py-3 font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" :class="t.dotClass"></span>
                    <span>{{ t.sponsor }}</span>
                  </td>
                  <td class="py-3 font-mono text-zinc-500 text-[11px]">{{ t.slot }}</td>
                  <td class="py-3 font-mono">{{ t.impressions }}</td>
                  <td class="py-3 font-semibold font-mono text-zinc-900 dark:text-zinc-100">{{ t.income }}</td>
                  <td class="py-3 text-right">
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-medium"
                      :class="t.status === 'Выплачено' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'"
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
        <div class="card-base p-4 space-y-3">
          <div class="flex items-center justify-between text-xs pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <span class="font-medium text-zinc-500 dark:text-zinc-400 text-xs">Спонсорский блок</span>
            <span class="font-mono text-[10px] text-zinc-400">IAB 300×250</span>
          </div>

          <AdSlot
            format="sidebar"
            label="Спонсорский блок"
            slotTitle="Сайдбар Medium Rectangle"
            :initialCreative="allCreative"
            :key="'dash-ad-' + allCreative"
          />
        </div>

        <!-- Infrastructure Status Mini-Card -->
        <div class="card-base p-4 space-y-2.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium text-zinc-900 dark:text-zinc-100">Глобальная сеть CDN</span>
            <span class="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              99.99% SLA
            </span>
          </div>
          <p class="text-xs text-zinc-500 leading-relaxed">
            Автоматическое кэширование на узлах Edge CDN. Нулевой Cumulative Layout Shift при рендеринге блоков AdSlot.
          </p>
          <div class="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
            <span>PoP-узлы: 310+</span>
            <span class="font-mono">HTTP/3 QUIC</span>
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
const activeMetric = ref('views')
const chartType = ref('line')
const hoveredIndex = ref(null)

const metrics = [
  { id: 'views', label: 'Показы' },
  { id: 'income', label: 'Доход (₽)' },
  { id: 'ctr', label: 'CTR (%)' }
]

const selectedMetricName = computed(() => {
  return metrics.find(m => m.id === activeMetric.value)?.label || 'Показы'
})

// Dynamic Datasets for "Сегодня", "7 дней", "30 дней"
const datasets = {
  'Сегодня': [
    { label: '00:00', views: 1200, income: 240, ctr: 3.1, clicks: 37 },
    { label: '04:00', views: 600, income: 110, ctr: 2.8, clicks: 17 },
    { label: '08:00', views: 2800, income: 590, ctr: 3.5, clicks: 98 },
    { label: '12:00', views: 5600, income: 1180, ctr: 3.8, clicks: 213 },
    { label: '16:00', views: 7200, income: 1540, ctr: 4.1, clicks: 295 },
    { label: '20:00', views: 6100, income: 1300, ctr: 3.7, clicks: 226 },
    { label: '23:59', views: 3400, income: 720, ctr: 3.2, clicks: 109 }
  ],
  '7 дней': [
    { label: 'Пн', views: 18400, income: 3680, ctr: 3.2, clicks: 588 },
    { label: 'Вт', views: 21200, income: 4240, ctr: 3.4, clicks: 720 },
    { label: 'Ср', views: 24500, income: 5100, ctr: 3.6, clicks: 882 },
    { label: 'Чт', views: 23100, income: 4850, ctr: 3.5, clicks: 808 },
    { label: 'Пт', views: 28900, income: 6120, ctr: 3.9, clicks: 1127 },
    { label: 'Сб', views: 15400, income: 3080, ctr: 3.1, clicks: 477 },
    { label: 'Вс', views: 11350, income: 2270, ctr: 2.9, clicks: 329 }
  ],
  '30 дней': [
    { label: 'Нед 1', views: 98000, income: 20500, ctr: 3.3, clicks: 3234 },
    { label: 'Нед 2', views: 112000, income: 24600, ctr: 3.5, clicks: 3920 },
    { label: 'Нед 3', views: 135000, income: 29800, ctr: 3.7, clicks: 4995 },
    { label: 'Нед 4', views: 142850, income: 31400, ctr: 3.8, clicks: 5428 }
  ]
}

const activeDataPoints = computed(() => {
  const current = datasets[selectedPeriod.value] || datasets['7 дней']
  return current.map(item => ({
    label: item.label,
    value: item[activeMetric.value],
    clicks: item.clicks,
    ctr: item.ctr
  }))
})

// Dynamic Y-axis labels & plotting bounds
const yAxisLabels = computed(() => {
  const values = activeDataPoints.value.map(p => p.value)
  const max = Math.max(...values, 10)
  if (activeMetric.value === 'views') {
    return ['0', `${Math.round(max * 0.33 / 1000)}k`, `${Math.round(max * 0.66 / 1000)}k`, `${Math.round(max / 1000)}k`]
  }
  if (activeMetric.value === 'income') {
    return ['0 ₽', `${Math.round(max * 0.33)} ₽`, `${Math.round(max * 0.66)} ₽`, `${Math.round(max)} ₽`]
  }
  return ['0%', '1.5%', '3.0%', `${max.toFixed(1)}%`]
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
  if (metric === 'views') return val.toLocaleString() + ' показов'
  if (metric === 'income') return val.toLocaleString() + ' ₽'
  return val + '%'
}

const periodTotals = computed(() => {
  const current = datasets[selectedPeriod.value] || datasets['7 дней']
  const totalViews = current.reduce((sum, i) => sum + i.views, 0).toLocaleString() + ' показов'
  const totalIncome = current.reduce((sum, i) => sum + i.income, 0).toLocaleString() + ' ₽'
  const avgCtr = (current.reduce((sum, i) => sum + i.ctr, 0) / current.length).toFixed(2) + '%'
  return {
    views: totalViews,
    income: totalIncome,
    ctr: avgCtr
  }
})

// Current period KPI cards
const currentStats = computed(() => {
  if (selectedPeriod.value === 'Сегодня') {
    return [
      { title: 'Просмотры сегодня', value: '26 900', trend: '+18.4%', isPositive: true, iconD: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
      { title: 'Клики AdSlot', value: '994', trend: '+12.1%', isPositive: true, iconD: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122' },
      { title: 'Средний CTR', value: '3.69%', trend: '+0.3%', isPositive: true, iconD: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { title: 'Доход за сегодня', value: '5 670 ₽', trend: '+22.0%', isPositive: true, iconD: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
    ]
  }
  return [
    { title: 'Всего показов', value: '142 850', trend: '+14.2%', isPositive: true, iconD: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { title: 'Клики AdSlot', value: '4 820', trend: '+8.6%', isPositive: true, iconD: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122' },
    { title: 'Средний CTR', value: '3.37%', trend: '+0.4%', isPositive: true, iconD: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { title: 'Доход за период', value: '28 400 ₽', trend: '+21.5%', isPositive: true, iconD: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
  ]
})

const transactions = [
  { id: 1, sponsor: 'Cloudflare Enterprise', slot: 'Top Leaderboard (728×90)', impressions: '54 300', income: '11 200 ₽', status: 'Выплачено', dotClass: 'bg-emerald-500' },
  { id: 2, sponsor: 'JetBrains Partner Network', slot: 'Sidebar (300×250)', impressions: '42 100', income: '8 420 ₽', status: 'Выплачено', dotClass: 'bg-indigo-500' },
  { id: 3, sponsor: 'Яндекс Рекламная Сеть', slot: 'In-Feed Native Card', impressions: '28 900', income: '5 780 ₽', status: 'Выплачено', dotClass: 'bg-red-500' },
  { id: 4, sponsor: 'Google AdSense Premium', slot: 'Sidebar (300×250)', impressions: '17 550', income: '3 510 ₽', status: 'Выплачено', dotClass: 'bg-blue-500' },
  { id: 5, sponsor: 'Stripe Marketplace Billing', slot: 'Checkout Banner', impressions: '9 400', income: '2 850 ₽', status: 'В обработке', dotClass: 'bg-amber-500' }
]
</script>
