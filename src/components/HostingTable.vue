<template>
  <div class="card-base p-5 sm:p-6 my-6 border-zinc-200/80 dark:border-zinc-800/90">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
      <div>
        <h3 class="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Сравнение облачных платформ (2026)
        </h3>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Анализ тарифов, лимитов полосы пропускания и правовых рисков размещения рекламы
        </p>
      </div>

      <!-- Quick Platform Filter & Search -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div class="relative w-full sm:w-56">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Поиск платформы..."
            class="input-base text-xs py-1.5 pl-7"
          />
          <svg class="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <div class="flex items-center gap-1 flex-wrap">
          <button
            v-for="filter in ['Все', 'Безопасные', 'Рискованные']"
            :key="filter"
            @click="activeFilter = filter"
            class="px-2.5 py-1 text-xs rounded-md font-medium transition-colors"
            :class="activeFilter === filter
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800'"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop Table View (Sticky platform column, min-w-1000px) -->
    <div class="hidden lg:block overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table class="w-full min-w-[1000px] text-left text-xs border-collapse">
        <thead class="bg-zinc-50/90 dark:bg-zinc-900/90 text-zinc-500 uppercase font-semibold text-[10px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
          <tr>
            <th class="p-3.5 sticky left-0 bg-zinc-50 dark:bg-zinc-900 z-20 min-w-[180px] shadow-[1px_0_0_0_rgba(0,0,0,0.06)] dark:shadow-[1px_0_0_0_rgba(255,255,255,0.06)]">Платформа</th>
            <th class="p-3.5 min-w-[140px]">Трафик / Полоса</th>
            <th class="p-3.5 min-w-[120px]">Сборки</th>
            <th class="p-3.5 min-w-[120px]">Коммерция</th>
            <th class="p-3.5 min-w-[150px]">Политика рекламы</th>
            <th class="p-3.5 min-w-[100px]">Домен + SSL</th>
            <th class="p-3.5 min-w-[100px]">Git-деплой</th>
            <th class="p-3.5 min-w-[210px]">Подходящий сценарий</th>
            <th class="p-3.5 text-center min-w-[110px]">Оценка риска</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-zinc-600 dark:text-zinc-300">
          <tr
            v-for="p in filteredPlatforms"
            :key="p.name"
            class="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors group"
            :class="p.isRecommended ? 'bg-indigo-50/20 dark:bg-indigo-950/10' : ''"
          >
            <!-- Platform Name (Sticky on scroll) -->
            <td class="p-3.5 font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap sticky left-0 bg-white dark:bg-[#121217] z-10 shadow-[1px_0_0_0_rgba(0,0,0,0.06)] dark:shadow-[1px_0_0_0_rgba(255,255,255,0.06)] group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800/30 transition-colors">
              <div class="flex items-center gap-2">
                <span>{{ p.name }}</span>
                <span
                  v-if="p.isRecommended"
                  class="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                >
                  Выбор №1
                </span>
                <span
                  v-else-if="p.isAlternative"
                  class="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                >
                  Альтернатива
                </span>
              </div>
            </td>

            <!-- Bandwidth -->
            <td class="p-3.5 whitespace-nowrap font-medium">
              <span :class="p.bandwidthHighlight">{{ p.bandwidth }}</span>
            </td>

            <!-- Builds -->
            <td class="p-3.5 whitespace-nowrap font-mono text-zinc-500">
              {{ p.builds }}
            </td>

            <!-- Commercial Policy -->
            <td class="p-3.5 font-medium">
              <span :class="p.commercialAllowed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                {{ p.commercialText }}
              </span>
            </td>

            <!-- Ads Policy -->
            <td class="p-3.5">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium" :class="p.adsBadgeClass">
                {{ p.adsPolicy }}
              </span>
            </td>

            <!-- Domain + SSL -->
            <td class="p-3.5 whitespace-nowrap text-zinc-500">
              Бесплатно (Auto-SSL)
            </td>

            <!-- Git Deploy -->
            <td class="p-3.5 whitespace-nowrap text-zinc-500">
              Авто (Vite)
            </td>

            <!-- Scenario -->
            <td class="p-3.5 text-zinc-500 leading-relaxed text-[11px]">
              {{ p.scenario }}
            </td>

            <!-- Risk Badge -->
            <td class="p-3.5 text-center whitespace-nowrap">
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium"
                :class="p.riskClass"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="p.riskDotClass"></span>
                {{ p.riskLevel }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Responsive Cards View (for < 1024px) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 lg:hidden">
      <div
        v-for="p in filteredPlatforms"
        :key="'mob-' + p.name"
        class="card-base p-4 space-y-3 border"
        :class="p.isRecommended ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-zinc-200 dark:border-zinc-800'"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-sm text-zinc-900 dark:text-zinc-100">{{ p.name }}</h4>
            <span
              v-if="p.isRecommended"
              class="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
            >
              №1 выбор
            </span>
          </div>
          <span
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium"
            :class="p.riskClass"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="p.riskDotClass"></span>
            {{ p.riskLevel }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
          <div>
            <span class="text-zinc-400 block text-[10px] uppercase font-semibold">Полоса:</span>
            <span class="font-medium text-zinc-800 dark:text-zinc-200" :class="p.bandwidthHighlight">{{ p.bandwidth }}</span>
          </div>
          <div>
            <span class="text-zinc-400 block text-[10px] uppercase font-semibold">Сборки:</span>
            <span class="text-zinc-600 dark:text-zinc-400 font-mono">{{ p.builds }}</span>
          </div>
          <div>
            <span class="text-zinc-400 block text-[10px] uppercase font-semibold">Коммерция:</span>
            <span :class="p.commercialAllowed ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-rose-600 dark:text-rose-400 font-medium'">
              {{ p.commercialText }}
            </span>
          </div>
          <div>
            <span class="text-zinc-400 block text-[10px] uppercase font-semibold">Реклама:</span>
            <span class="text-zinc-700 dark:text-zinc-300 text-[11px]">{{ p.adsPolicy }}</span>
          </div>
        </div>

        <p class="text-[11px] text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 leading-relaxed">
          {{ p.scenario }}
        </p>
      </div>
    </div>

    <!-- Alert Box: Policies Nuances -->
    <div class="mt-5 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 text-xs text-zinc-600 dark:text-zinc-400">
      <div class="flex items-start gap-3">
        <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <div class="space-y-1">
          <h4 class="font-semibold text-zinc-900 dark:text-zinc-100">Правовой аудит условий обслуживания хостингов (2026):</h4>
          <p>
            <strong>Vercel (Hobby):</strong> пункт 1.2 ToS строго ограничивает бесплатный тариф некоммерческим использованием. Размещение баннеров или AdSense влечет блокировку.<br>
            <strong>Cloudflare Pages:</strong> не накладывает лимитов на трафик (unlimited bandwidth) и полностью разрешает коммерческую баннерную рекламу.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('Все')
const searchQuery = ref('')

const platforms = [
  {
    name: 'Cloudflare Pages',
    bandwidth: 'Безлимит (Unlimited)',
    bandwidthHighlight: 'text-indigo-600 dark:text-indigo-400 font-semibold',
    builds: '500 сборок/мес (20 мин)',
    commercialAllowed: true,
    commercialText: 'Разрешено',
    adsPolicy: 'Разрешена (без ограничений)',
    adsBadgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    scenario: 'Оптимально для статических Vue/Vite сайтов с рекламой и неограниченным трафиком.',
    riskLevel: 'Безопасно',
    riskClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    riskDotClass: 'bg-emerald-500',
    isRecommended: true,
    isAlternative: false,
    riskType: 'safe'
  },
  {
    name: 'GitHub Pages',
    bandwidth: '100 ГБ/мес (soft limit)',
    bandwidthHighlight: 'text-zinc-700 dark:text-zinc-300',
    builds: '2 000 мин Actions/мес',
    commercialAllowed: true,
    commercialText: 'Личные/проекты',
    adsPolicy: 'Умеренная монетизация',
    adsBadgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    scenario: 'Портфолио, документация, персональные блоги с умеренными спонсорскими блоками.',
    riskLevel: 'Серая зона',
    riskClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    riskDotClass: 'bg-amber-500',
    isRecommended: false,
    isAlternative: true,
    riskType: 'neutral'
  },
  {
    name: 'Netlify',
    bandwidth: '100 ГБ/мес',
    bandwidthHighlight: 'text-zinc-700 dark:text-zinc-300',
    builds: '300 кредитов/мес',
    commercialAllowed: true,
    commercialText: 'Разрешено (неявно)',
    adsPolicy: 'Допустимо (со слов поддержки)',
    adsBadgeClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    scenario: 'Быстрое прототипирование и Jamstack-сайты с редкими сборками.',
    riskLevel: 'Низкий/Средний',
    riskClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    riskDotClass: 'bg-blue-500',
    isRecommended: false,
    isAlternative: false,
    riskType: 'neutral'
  },
  {
    name: 'Vercel',
    bandwidth: '100 ГБ/мес (тариф Hobby)',
    bandwidthHighlight: 'text-zinc-700 dark:text-zinc-300',
    builds: '6 000 минут/мес',
    commercialAllowed: false,
    commercialText: 'СТРОГО НЕ-КОММЕРЧЕСКИЙ',
    adsPolicy: 'ЗАПРЕЩЕНА (риск бана)',
    adsBadgeClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
    scenario: 'Персональные пет-проекты без какой-либо сторонней монетизации.',
    riskLevel: 'Высокий риск',
    riskClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
    riskDotClass: 'bg-rose-500',
    isRecommended: false,
    isAlternative: false,
    riskType: 'risky'
  },
  {
    name: 'Render (Static)',
    bandwidth: '100 ГБ/мес',
    bandwidthHighlight: 'text-zinc-700 dark:text-zinc-300',
    builds: '500 минут/мес (shared)',
    commercialAllowed: true,
    commercialText: 'Разрешено',
    adsPolicy: 'Разрешена (в рамках лимитов)',
    adsBadgeClass: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
    scenario: 'Статические лендинги и связка со спиннинговыми веб-сервисами Render.',
    riskLevel: 'Низкий',
    riskClass: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
    riskDotClass: 'bg-zinc-500',
    isRecommended: false,
    isAlternative: false,
    riskType: 'safe'
  }
]

const filteredPlatforms = computed(() => {
  let list = platforms
  if (activeFilter.value === 'Безопасные') {
    list = list.filter(p => p.riskType === 'safe')
  } else if (activeFilter.value === 'Рискованные') {
    list = list.filter(p => p.riskType === 'risky' || p.riskType === 'neutral')
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.scenario.toLowerCase().includes(q) || p.adsPolicy.toLowerCase().includes(q))
  }
  return list
})
</script>
