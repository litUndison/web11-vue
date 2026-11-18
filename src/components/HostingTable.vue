<template>
  <div class="card-base p-5 sm:p-6 my-6 border-amber-500/20 bg-zinc-900/90 shadow-card">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-zinc-800">
      <div>
        <h3 class="heading-gothic text-lg sm:text-xl font-bold tracking-tight text-zinc-100">
          Сравнительный анализ облачных платформ (Cloud Sync & CDN)
        </h3>
        <p class="text-xs text-zinc-400 mt-0.5">
          Анализ тарифов, лимитов пропускной способности и правовых рисков размещения спонсорской рекламы
        </p>
      </div>

      <!-- Фильтр и поиск по платформам -->
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
            class="px-2.5 py-1 text-xs rounded-md font-bold transition-all"
            :class="activeFilter === filter
              ? 'bg-amber-500 text-zinc-950 shadow-gold'
              : 'text-zinc-400 hover:text-amber-300 hover:bg-zinc-800 border border-zinc-800'"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </div>

    <!-- Таблица для десктопа -->
    <div class="hidden lg:block overflow-x-auto rounded-lg border border-zinc-800">
      <table class="w-full min-w-[1000px] text-left text-xs border-collapse">
        <thead class="bg-zinc-950 text-zinc-400 uppercase font-semibold text-[10px] tracking-wider border-b border-zinc-800">
          <tr>
            <th class="p-3.5 sticky left-0 bg-zinc-950 z-20 min-w-[180px] shadow-[1px_0_0_0_rgba(255,255,255,0.06)]">Платформа</th>
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
        <tbody class="divide-y divide-zinc-800 text-zinc-300">
          <tr
            v-for="p in filteredPlatforms"
            :key="p.name"
            class="hover:bg-zinc-800/40 transition-colors group"
            :class="p.isRecommended ? 'bg-amber-500/10' : ''"
          >
            <!-- Название платформы -->
            <td class="p-3.5 font-bold text-zinc-100 whitespace-nowrap sticky left-0 bg-zinc-900 z-10 shadow-[1px_0_0_0_rgba(255,255,255,0.06)] group-hover:bg-zinc-800 transition-colors">
              <div class="flex items-center gap-2">
                <span>{{ p.name }}</span>
                <span
                  v-if="p.isRecommended"
                  class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30"
                >
                  Выбор №1
                </span>
                <span
                  v-else-if="p.isAlternative"
                  class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30"
                >
                  Альтернатива
                </span>
              </div>
            </td>

            <!-- Трафик -->
            <td class="p-3.5 whitespace-nowrap font-medium">
              <span :class="p.bandwidthHighlight">{{ p.bandwidth }}</span>
            </td>

            <!-- Сборки -->
            <td class="p-3.5 whitespace-nowrap font-mono text-zinc-400">
              {{ p.builds }}
            </td>

            <!-- Коммерческое использование -->
            <td class="p-3.5 font-medium">
              <span :class="p.commercialAllowed ? 'text-emerald-400' : 'text-rose-400'">
                {{ p.commercialText }}
              </span>
            </td>

            <!-- Политика рекламы -->
            <td class="p-3.5">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium" :class="p.adsBadgeClass">
                {{ p.adsPolicy }}
              </span>
            </td>

            <!-- Домен и SSL -->
            <td class="p-3.5 whitespace-nowrap text-zinc-400">
              Бесплатно (Auto-SSL)
            </td>

            <!-- Деплой из Git -->
            <td class="p-3.5 whitespace-nowrap text-zinc-400">
              Авто (Vite)
            </td>

            <!-- Сценарий использования -->
            <td class="p-3.5 text-zinc-400 leading-relaxed text-[11px]">
              {{ p.scenario }}
            </td>

            <!-- Оценка риска -->
            <td class="p-3.5 text-center whitespace-nowrap">
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold"
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

    <!-- Мобильное представление в виде карточек -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 lg:hidden">
      <div
        v-for="p in filteredPlatforms"
        :key="'mob-' + p.name"
        class="card-base p-4 space-y-3 border bg-zinc-950"
        :class="p.isRecommended ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-zinc-800'"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-sm text-zinc-100">{{ p.name }}</h4>
            <span
              v-if="p.isRecommended"
              class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30"
            >
              №1 выбор
            </span>
          </div>
          <span
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold"
            :class="p.riskClass"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="p.riskDotClass"></span>
            {{ p.riskLevel }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-zinc-800">
          <div>
            <span class="text-zinc-500 block text-[10px] uppercase font-semibold">Полоса:</span>
            <span class="font-medium text-zinc-200" :class="p.bandwidthHighlight">{{ p.bandwidth }}</span>
          </div>
          <div>
            <span class="text-zinc-500 block text-[10px] uppercase font-semibold">Сборки:</span>
            <span class="text-zinc-400 font-mono">{{ p.builds }}</span>
          </div>
          <div>
            <span class="text-zinc-500 block text-[10px] uppercase font-semibold">Коммерция:</span>
            <span :class="p.commercialAllowed ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'">
              {{ p.commercialText }}
            </span>
          </div>
          <div>
            <span class="text-zinc-500 block text-[10px] uppercase font-semibold">Реклама:</span>
            <span class="text-zinc-300 text-[11px]">{{ p.adsPolicy }}</span>
          </div>
        </div>

        <p class="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800 leading-relaxed">
          {{ p.scenario }}
        </p>
      </div>
    </div>

    <!-- Информационный блок -->
    <div class="mt-5 p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 text-xs text-zinc-400">
      <div class="flex items-start gap-3">
        <span class="text-base text-amber-400 shrink-0 mt-0.5">⚠️</span>
        <div class="space-y-1">
          <h4 class="font-bold text-amber-400">Правовой аудит условий обслуживания хостингов:</h4>
          <p>
            <strong>Vercel (Hobby):</strong> пункт 1.2 ToS строго ограничивает бесплатный тариф некоммерческим использованием. Размещение баннеров или рекламы влечет блокировку.<br>
            <strong>Cloudflare Pages:</strong> не накладывает лимитов на трафик (unlimited bandwidth) и полностью разрешает коммерческую спонсорскую рекламу.
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

// Данные о хостинг-платформах
const platforms = [
  {
    name: 'Cloudflare Pages',
    bandwidth: 'Безлимит (Unlimited)',
    bandwidthHighlight: 'text-amber-400 font-bold',
    builds: '500 сборок/мес (20 мин)',
    commercialAllowed: true,
    commercialText: 'Разрешено',
    adsPolicy: 'Разрешена (без ограничений)',
    adsBadgeClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    scenario: 'Оптимально для статических сайтов с рекламой, играми и неограниченным трафиком.',
    riskLevel: 'Безопасно',
    riskClass: 'bg-emerald-500/20 text-emerald-400',
    riskDotClass: 'bg-emerald-500',
    isRecommended: true,
    isAlternative: false,
    riskType: 'safe'
  },
  {
    name: 'GitHub Pages',
    bandwidth: '100 ГБ/мес (soft limit)',
    bandwidthHighlight: 'text-zinc-300',
    builds: '2 000 мин Actions/мес',
    commercialAllowed: true,
    commercialText: 'Личные/проекты',
    adsPolicy: 'Умеренная монетизация',
    adsBadgeClass: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    scenario: 'Портфолио, документация, игровые лендинги с умеренными спонсорскими блоками.',
    riskLevel: 'Серая зона',
    riskClass: 'bg-amber-500/20 text-amber-400',
    riskDotClass: 'bg-amber-500',
    isRecommended: false,
    isAlternative: true,
    riskType: 'neutral'
  },
  {
    name: 'Netlify',
    bandwidth: '100 ГБ/мес',
    bandwidthHighlight: 'text-zinc-300',
    builds: '300 кредитов/мес',
    commercialAllowed: true,
    commercialText: 'Разрешено (неявно)',
    adsPolicy: 'Допустимо (со слов поддержки)',
    adsBadgeClass: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    scenario: 'Быстрое прототипирование и Jamstack-сайты с редкими сборками.',
    riskLevel: 'Низкий/Средний',
    riskClass: 'bg-blue-500/20 text-blue-400',
    riskDotClass: 'bg-blue-500',
    isRecommended: false,
    isAlternative: false,
    riskType: 'neutral'
  },
  {
    name: 'Vercel',
    bandwidth: '100 ГБ/мес (тариф Hobby)',
    bandwidthHighlight: 'text-zinc-300',
    builds: '6 000 минут/мес',
    commercialAllowed: false,
    commercialText: 'СТРОГО НЕ-КОММЕРЧЕСКИЙ',
    adsPolicy: 'ЗАПРЕЩЕНА (риск бана)',
    adsBadgeClass: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    scenario: 'Персональные пет-проекты без какой-либо сторонней монетизации.',
    riskLevel: 'Высокий риск',
    riskClass: 'bg-rose-500/20 text-rose-400',
    riskDotClass: 'bg-rose-500',
    isRecommended: false,
    isAlternative: false,
    riskType: 'risky'
  },
  {
    name: 'Render (Static)',
    bandwidth: '100 ГБ/мес',
    bandwidthHighlight: 'text-zinc-300',
    builds: '500 минут/мес (shared)',
    commercialAllowed: true,
    commercialText: 'Разрешено',
    adsPolicy: 'Разрешена (в рамках лимитов)',
    adsBadgeClass: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
    scenario: 'Статические лендинги и связка со спиннинговыми веб-сервисами Render.',
    riskLevel: 'Низкий',
    riskClass: 'bg-zinc-800 text-zinc-300',
    riskDotClass: 'bg-zinc-500',
    isRecommended: false,
    isAlternative: false,
    riskType: 'safe'
  }
]

// Фильтрация списка платформ
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
