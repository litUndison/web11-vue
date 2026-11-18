<template>
  <div class="space-y-6">
    <!-- Шапка страницы -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-amber-500/20">
      <div>
        <h1 class="heading-gothic text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Игровая Статистика Выживших
        </h1>
        <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
          Глобальный трекинг уничтоженных орд нежити, добытого золота и открытых сундуков
        </p>
      </div>

      <!-- Переключатель периода -->
      <div class="flex items-center gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-amber-500/30 bg-zinc-100 dark:bg-zinc-900/90 shadow-2xs">
        <button
          v-for="p in ['Сегодня', '7 дней', '30 дней']"
          :key="p"
          @click="selectedPeriod = p"
          class="px-3 py-1 text-xs rounded-md font-bold transition-all"
          :class="selectedPeriod === p
            ? 'bg-amber-500 text-zinc-950 font-bold shadow-gold'
            : 'text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-300'"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Карточки ключевых показателей -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in currentStats"
        :key="stat.title"
        class="card-base p-5 border-zinc-200 dark:border-amber-500/20 hover:border-amber-500/40 transition-colors bg-white dark:bg-zinc-900/80 shadow-xs"
      >
        <div class="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 mb-2">
          <span class="font-medium text-xs">{{ stat.title }}</span>
          <span class="text-amber-500 shrink-0">
            <!-- Векторная иконка черепа -->
            <svg v-if="stat.icon === 'skull'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
              <path d="M8 20v-2h8v2M10 18v2M14 18v2M5 11a7 7 0 1 1 14 0c0 3-2 5-3 7H8c-1-2-3-4-3-7z"/>
            </svg>
            <!-- Векторная иконка золота -->
            <svg v-else-if="stat.icon === 'gold'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 7v10M9 9.5h5a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3h5"/>
            </svg>
            <!-- Векторная иконка сундука -->
            <svg v-else-if="stat.icon === 'chest'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="8" width="18" height="13" rx="2"/>
              <path d="M12 8v13M3 13h18M12 8a3 3 0 1 0-3-3c0 2 3 3 3 3zm0 0a3 3 0 1 1 3-3c0 2-3 3-3 3z"/>
            </svg>
            <!-- Векторная иконка таймера -->
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="9"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </span>
        </div>

        <div class="text-2xl font-bold heading-gothic text-amber-500 dark:text-amber-400">
          {{ stat.value }}
        </div>

        <div class="mt-2.5 flex items-center justify-between text-xs">
          <span
            class="inline-flex items-center gap-0.5 font-bold text-[11px]"
            :class="stat.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'"
          >
            <span>{{ stat.isPositive ? '↑' : '↓' }}</span>
            <span>{{ stat.trend }}</span>
          </span>
          <span class="text-zinc-500 dark:text-zinc-400 text-[11px]">к прошл. периоду</span>
        </div>
      </div>
    </div>

    <!-- Основной контент: график и рекламная колонка -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Левая колонка: график и таблица -->
      <div class="lg:col-span-8 space-y-6">
        
        <!-- Интерактивный график -->
        <div class="card-base p-5 sm:p-6 space-y-4 border-zinc-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900/80 shadow-xs">
          <!-- Заголовок графика и элементы управления -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="heading-gothic font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                  Динамика показателей
                </h3>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Live Sync
                </span>
              </div>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                {{ selectedMetricName }}: детализация по сессиям за «{{ selectedPeriod }}»
              </p>
            </div>

            <!-- Переключатели метрики и вида графика -->
            <div class="flex items-center gap-2 flex-wrap">
              <div class="flex items-center p-0.5 rounded-lg border border-zinc-200 dark:border-amber-500/30 bg-zinc-100 dark:bg-zinc-950 text-xs">
                <button
                  v-for="m in metrics"
                  :key="m.id"
                  @click="activeMetric = m.id"
                  class="px-2.5 py-1 rounded text-xs font-semibold transition-all"
                  :class="activeMetric === m.id
                    ? 'bg-amber-500 text-zinc-950 shadow-gold'
                    : 'text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-300'"
                >
                  {{ m.label }}
                </button>
              </div>

              <button
                @click="chartType = chartType === 'line' ? 'bar' : 'line'"
                class="p-1.5 rounded-lg border border-zinc-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                :title="chartType === 'line' ? 'Столбчатая диаграмма' : 'Плавный график'"
              >
                <!-- Иконка графика -->
                <svg v-if="chartType === 'line'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <!-- Иконка диаграммы -->
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Векторная область диаграммы -->
          <div class="relative w-full h-60 select-none" @mouseleave="hoveredIndex = null">
            <!-- Всплывающая подсказка -->
            <div
              v-if="hoveredIndex !== null && activeDataPoints[hoveredIndex]"
              class="absolute z-20 pointer-events-none p-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-950 text-white shadow-2xl border border-amber-500/40 text-xs transition-all duration-75"
              :style="tooltipStyle"
            >
              <div class="font-mono text-[10px] text-amber-400 mb-0.5">{{ activeDataPoints[hoveredIndex].label }}</div>
              <div class="font-bold text-sm text-zinc-100">
                {{ formatMetricValue(activeDataPoints[hoveredIndex].value, activeMetric) }}
              </div>
              <div class="text-[10px] text-zinc-300 mt-1 flex items-center gap-2">
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

              <!-- Линии сетки -->
              <g stroke="currentColor" class="text-zinc-200 dark:text-zinc-800" stroke-width="1" stroke-dasharray="3 3">
                <line x1="45" y1="20" x2="680" y2="20" />
                <line x1="45" y1="65" x2="680" y2="65" />
                <line x1="45" y1="110" x2="680" y2="110" />
                <line x1="45" y1="155" x2="680" y2="155" />
              </g>

              <!-- Метки оси Y -->
              <g fill="currentColor" class="text-zinc-500 dark:text-zinc-400" font-size="10" font-family="monospace">
                <text x="36" y="24" text-anchor="end">{{ yAxisLabels[3] }}</text>
                <text x="36" y="69" text-anchor="end">{{ yAxisLabels[2] }}</text>
                <text x="36" y="114" text-anchor="end">{{ yAxisLabels[1] }}</text>
                <text x="36" y="159" text-anchor="end">{{ yAxisLabels[0] }}</text>
              </g>

              <!-- Отображение графика линией -->
              <template v-if="chartType === 'line'">
                <!-- Заливка области -->
                <path :d="areaPathString" fill="url(#areaGradientGold)" />

                <!-- Линия графика -->
                <path
                  :d="linePathString"
                  fill="none"
                  stroke="#f59e0b"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <!-- Точки данных -->
                <g v-for="(p, i) in plottedPoints" :key="'pt-' + i">
                  <!-- Вертикальная линия курсора -->
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

                  <!-- Кружок точки -->
                  <circle
                    :cx="p.x"
                    :cy="p.y"
                    :r="hoveredIndex === i ? 6 : 4"
                    class="transition-all duration-150 cursor-pointer"
                    :fill="hoveredIndex === i ? '#dc2626' : '#f59e0b'"
                    stroke="#ffffff"
                    :stroke-width="hoveredIndex === i ? 2.5 : 1.5"
                  />

                  <!-- Область наведения мыши -->
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

              <!-- Отображение столбцами -->
              <template v-else>
                <g v-for="(p, i) in plottedPoints" :key="'bar-' + i">
                  <rect
                    :x="p.x - 14"
                    :y="p.y"
                    width="28"
                    :height="Math.max(2, 160 - p.y)"
                    rx="3"
                    class="transition-all duration-200 cursor-pointer"
                    :fill="hoveredIndex === i ? '#f59e0b' : '#d97706'"
                    @mouseenter="hoveredIndex = i"
                  />
                </g>
              </template>

              <!-- Метки оси X -->
              <g fill="currentColor" class="text-zinc-500 dark:text-zinc-400" font-size="10" font-family="monospace">
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

          <!-- Сводка за период -->
          <div class="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>Всего за период: <strong class="text-amber-600 dark:text-amber-400 font-bold">{{ periodTotals[activeMetric] }}</strong></span>
            <span class="font-mono text-[11px] text-zinc-500">Условие победы: 30:00 • Множитель золота: ×1.5</span>
          </div>
        </div>

        <!-- Журнал последних экспедиций и наград -->
        <div class="card-base p-5 sm:p-6 space-y-4 border-zinc-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900/80 shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 class="heading-gothic font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                Журнал последних экспедиций и битв с боссами
              </h3>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                Хроника сражений, полученные артефакты и добыча золота
              </p>
            </div>
            <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              5 событий
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full min-w-[540px] text-left text-xs">
              <thead class="text-zinc-500 uppercase font-semibold text-[10px] tracking-wider border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <tr>
                  <th class="pb-2.5">Событие / Локация</th>
                  <th class="pb-2.5">Режим боя</th>
                  <th class="pb-2.5">Время матча</th>
                  <th class="pb-2.5">Награда</th>
                  <th class="pb-2.5 text-right">Итог</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                <tr v-for="t in transactions" :key="t.id" class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td class="py-3 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" :class="t.dotClass"></span>
                    <span>{{ t.sponsor }}</span>
                  </td>
                  <td class="py-3 font-mono text-zinc-500 dark:text-zinc-400 text-[11px]">{{ t.slot }}</td>
                  <td class="py-3 font-mono">{{ t.impressions }}</td>
                  <td class="py-3 font-bold font-mono text-amber-600 dark:text-amber-400">{{ t.income }}</td>
                  <td class="py-3 text-right">
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-medium"
                      :class="t.status === 'Победа' || t.status === 'Получено' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30'"
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

      <!-- Правая колонка: рекламный блок и статистика карт -->
      <div class="lg:col-span-4 space-y-4">
        
        <!-- Контейнер рекламного блока -->
        <div class="card-base p-4 space-y-3 border-zinc-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900/80 shadow-xs">
          <div class="flex items-center justify-between text-xs pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span class="font-bold text-amber-600 dark:text-amber-400 text-xs">Игровой спонсор</span>
            <span class="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">IAB 300×250</span>
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

        <!-- Популярные этапы выживания -->
        <div class="card-base p-4 space-y-3 border-zinc-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900/80 shadow-xs">
          <div class="flex items-center justify-between text-xs pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span class="font-bold text-zinc-900 dark:text-zinc-100">Популярные локации выживания</span>
            <span class="font-mono text-[10px] text-amber-600 dark:text-amber-400">Сезон 1</span>
          </div>
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-zinc-700 dark:text-zinc-300">Инкрустированная Библиотека</span>
              <span class="font-mono font-bold text-amber-600 dark:text-amber-400">42%</span>
            </div>
            <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div class="bg-amber-500 h-full rounded-full" style="width: 42%"></div>
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="text-zinc-700 dark:text-zinc-300">Безумный Лес</span>
              <span class="font-mono font-bold text-amber-600 dark:text-amber-400">28%</span>
            </div>
            <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div class="bg-amber-500/80 h-full rounded-full" style="width: 28%"></div>
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="text-zinc-700 dark:text-zinc-300">Молочный Завод</span>
              <span class="font-mono font-bold text-amber-600 dark:text-amber-400">18%</span>
            </div>
            <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div class="bg-amber-500/60 h-full rounded-full" style="width: 18%"></div>
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="text-zinc-700 dark:text-zinc-300">Капелла Магна</span>
              <span class="font-mono font-bold text-amber-600 dark:text-amber-400">12%</span>
            </div>
            <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div class="bg-amber-500/40 h-full rounded-full" style="width: 12%"></div>
            </div>
          </div>
          <div class="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
            <span>Любимый билд: Святая Вода</span>
            <span class="font-mono text-emerald-600 dark:text-emerald-400">DPS +140%</span>
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
  { id: 'monsters', label: 'Орда монстров' },
  { id: 'gold', label: 'Добыча золота' },
  { id: 'chests', label: 'Сундуки удачи' }
]

const selectedMetricName = computed(() => {
  const m = metrics.find(item => item.id === activeMetric.value)
  return m ? m.label : 'Показатель'
})

// Наборы данных для графиков
const datasets = {
  'Сегодня': [
    { label: '04:00', monsters: 12000, gold: 3500, chests: 14, kills: 12000, rate: 8.5 },
    { label: '08:00', monsters: 28000, gold: 8200, chests: 32, kills: 28000, rate: 12.0 },
    { label: '12:00', monsters: 45000, gold: 14100, chests: 55, kills: 45000, rate: 18.2 },
    { label: '16:00', monsters: 68000, gold: 21500, chests: 82, kills: 68000, rate: 26.5 },
    { label: '20:00', monsters: 82000, gold: 26800, chests: 98, kills: 82000, rate: 31.4 },
    { label: '23:59', monsters: 36500, gold: 11200, chests: 41, kills: 36500, rate: 14.1 }
  ],
  '7 дней': [
    { label: 'Пн', monsters: 142000, gold: 38400, chests: 160, kills: 142000, rate: 11.2 },
    { label: 'Вт', monsters: 165000, gold: 44200, chests: 185, kills: 165000, rate: 12.8 },
    { label: 'Ср', monsters: 188000, gold: 51000, chests: 210, kills: 188000, rate: 14.5 },
    { label: 'Чт', monsters: 175000, gold: 48500, chests: 195, kills: 175000, rate: 13.6 },
    { label: 'Пт', monsters: 230000, gold: 64200, chests: 265, kills: 230000, rate: 17.8 },
    { label: 'Сб', monsters: 278000, gold: 76500, chests: 310, kills: 278000, rate: 21.5 },
    { label: 'Вс', monsters: 250000, gold: 70800, chests: 280, kills: 250000, rate: 19.4 }
  ],
  '30 дней': [
    { label: 'Нед 1', monsters: 820000, gold: 220000, chests: 920, kills: 820000, rate: 22.0 },
    { label: 'Нед 2', monsters: 940000, gold: 255000, chests: 1050, kills: 940000, rate: 24.5 },
    { label: 'Нед 3', monsters: 1120000, gold: 310000, chests: 1280, kills: 1120000, rate: 29.2 },
    { label: 'Нед 4', monsters: 1280000, gold: 355000, chests: 1420, kills: 1280000, rate: 33.4 }
  ]
}

const activeDataPoints = computed(() => {
  const data = datasets[selectedPeriod.value] || datasets['7 дней']
  return data.map(item => ({
    label: item.label,
    value: item[activeMetric.value],
    kills: item.kills ? item.kills.toLocaleString() : '0',
    rate: item.rate || 0
  }))
})

// Расчет координат для векторного графика
const plottedPoints = computed(() => {
  const points = activeDataPoints.value
  if (!points.length) return []

  const values = points.map(p => p.value)
  const maxVal = Math.max(...values, 100) * 1.15
  const minVal = 0

  const width = 680
  const height = 200
  const padLeft = 55
  const padRight = 30
  const padTop = 25
  const padBottom = 45

  const usableWidth = width - padLeft - padRight
  const usableHeight = height - padTop - padBottom
  const stepX = usableWidth / Math.max(1, points.length - 1)

  return points.map((p, idx) => {
    const x = padLeft + idx * stepX
    const normalized = (p.value - minVal) / (maxVal - minVal)
    const y = padTop + usableHeight - (normalized * usableHeight)
    return { x, y, value: p.value }
  })
})

const linePathString = computed(() => {
  const pts = plottedPoints.value
  if (!pts.length) return ''
  return pts.reduce((acc, p, idx) => {
    if (idx === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
    const prev = pts[idx - 1]
    const cx1 = (prev.x + p.x) / 2
    const cy1 = prev.y
    const cx2 = (prev.x + p.x) / 2
    const cy2 = p.y
    return `${acc} C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
  }, '')
})

const areaPathString = computed(() => {
  const pts = plottedPoints.value
  if (!pts.length) return ''
  const first = pts[0]
  const last = pts[pts.length - 1]
  const baseLine = linePathString.value
  return `${baseLine} L ${last.x.toFixed(1)} 160 L ${first.x.toFixed(1)} 160 Z`
})

const yAxisLabels = computed(() => {
  const points = activeDataPoints.value
  if (!points.length) return ['0', '1', '2', '3']
  const values = points.map(p => p.value)
  const maxVal = Math.max(...values, 100) * 1.15

  const formatShort = (v) => {
    if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M'
    if (v >= 1000) return Math.round(v / 1000) + 'k'
    return Math.round(v).toString()
  }

  return [
    formatShort(0),
    formatShort(maxVal * 0.33),
    formatShort(maxVal * 0.66),
    formatShort(maxVal)
  ]
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

// Карточки показателей выбранного периода
const currentStats = computed(() => {
  if (selectedPeriod.value === 'Сегодня') {
    return [
      { title: 'Монстров сегодня', value: '271 500', trend: '+18.4%', isPositive: true, icon: 'skull' },
      { title: 'Добыто золота', value: '56 700 G', trend: '+22.0%', isPositive: true, icon: 'gold' },
      { title: 'Сундуков открыто', value: '258 шт', trend: '+12.1%', isPositive: true, icon: 'chest' },
      { title: 'Среднее выживание', value: '28:15 мин', trend: '+5.4%', isPositive: true, icon: 'clock' }
    ]
  }
  return [
    { title: 'Всего повержено', value: '1 428 500', trend: '+14.2%', isPositive: true, icon: 'skull' },
    { title: 'Казна Охотников', value: '294 600 G', trend: '+21.5%', isPositive: true, icon: 'gold' },
    { title: 'Сундуков с арканами', value: '1 428 шт', trend: '+8.6%', isPositive: true, icon: 'chest' },
    { title: 'Среднее выживание', value: '26:45 мин', trend: '+7.8%', isPositive: true, icon: 'clock' }
  ]
})

const transactions = [
  { id: 1, sponsor: 'Сундук 25-й мин: Красный Дракон', slot: 'Капелла Магна', impressions: '30:00 мин', income: 'Holy Wand Evolution', status: 'Победа', dotClass: 'bg-emerald-500' },
  { id: 2, sponsor: 'Спонсорский сундук: Razer Kishi', slot: 'Библиотека', impressions: '28:45 мин', income: '+10 000 G', status: 'Получено', dotClass: 'bg-amber-500' },
  { id: 3, sponsor: 'Секретный босс: Зеленый Жнец', slot: 'Молочный Завод', impressions: '25:12 мин', income: '+15 000 G', status: 'Победа', dotClass: 'bg-emerald-500' },
  { id: 4, sponsor: 'Лавка Торговца: 10 Золотых яиц', slot: 'Торговец', impressions: 'Покупка', income: '+10 Яиц', status: 'Получено', dotClass: 'bg-indigo-500' },
  { id: 5, sponsor: 'Бонус Google Play Pass Pack', slot: 'Стартовый пак', impressions: 'Награда', income: '+7 500 G', status: 'Получено', dotClass: 'bg-amber-500' }
]
</script>
