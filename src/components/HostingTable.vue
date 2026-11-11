<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 my-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 mb-2">
          Задание 2: Сравнительный анализ
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
          Сравнение бесплатных хостинг-платформ (2026)
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Анализ тарифов, лимитов пропускной способности, совместимости с Vue 3 + Vite и рисков размещения рекламы
        </p>
      </div>

      <!-- Quick Platform Filter or View Options -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-500 font-medium">Фильтр:</span>
        <button
          v-for="filter in ['Все', 'Безопасные для рекламы', 'Рискованные']"
          :key="filter"
          @click="activeFilter = filter"
          class="px-2.5 py-1 text-xs rounded-lg transition-colors font-medium"
          :class="activeFilter === filter
            ? 'bg-indigo-600 text-white'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <!-- Table Container (Horizontal Scroll for Responsive) -->
    <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table class="w-full text-left text-xs sm:text-sm">
        <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th class="p-3.5">Платформа</th>
            <th class="p-3.5">Трафик / Полоса</th>
            <th class="p-3.5">Лимиты сборок</th>
            <th class="p-3.5">Коммерч. проекты</th>
            <th class="p-3.5">Политика рекламы</th>
            <th class="p-3.5">Домен + SSL</th>
            <th class="p-3.5">Git-деплой</th>
            <th class="p-3.5 min-w-[200px]">Подходящий сценарий</th>
            <th class="p-3.5 text-center">Оценка риска</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
          <tr
            v-for="p in filteredPlatforms"
            :key="p.name"
            class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
            :class="p.isRecommended ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''"
          >
            <!-- Name & Badge -->
            <td class="p-3.5 font-bold text-slate-900 dark:text-white">
              <div class="flex items-center gap-2">
                <span>{{ p.name }}</span>
                <span
                  v-if="p.isRecommended"
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300"
                >
                  Выбор №1
                </span>
                <span
                  v-else-if="p.isAlternative"
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300"
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
            <td class="p-3.5 whitespace-nowrap">
              {{ p.builds }}
            </td>

            <!-- Commercial Policy -->
            <td class="p-3.5">
              <span
                class="inline-flex items-center gap-1 font-medium"
                :class="p.commercialAllowed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'"
              >
                <span>{{ p.commercialText }}</span>
              </span>
            </td>

            <!-- Ads Policy -->
            <td class="p-3.5">
              <span
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                :class="p.adsBadgeClass"
              >
                {{ p.adsPolicy }}
              </span>
            </td>

            <!-- Custom Domain + SSL -->
            <td class="p-3.5 whitespace-nowrap">
              <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Бесплатно
              </span>
            </td>

            <!-- Git Deploy -->
            <td class="p-3.5 whitespace-nowrap">
              <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Авто (Vite)
              </span>
            </td>

            <!-- Scenario -->
            <td class="p-3.5 text-xs text-slate-500 dark:text-slate-400">
              {{ p.scenario }}
            </td>

            <!-- Risk Badge -->
            <td class="p-3.5 text-center whitespace-nowrap">
              <span
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
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

    <!-- Alert Box: Policies Nuances -->
    <div class="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
      <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <div>
          <h4 class="font-bold mb-1">Критическое предупреждение о политиках хостингов (2026):</h4>
          <ul class="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Vercel (Hobby):</strong> Прямо запрещает коммерческое использование (п. 1.2 Terms of Service). Размещение AdSense или баннеров классифицируется как коммерческая деятельность — высокий риск блокировки!</li>
            <li><strong>GitHub Pages:</strong> Допускает умеренную монетизацию личных блогов и опенсорс-проектов, но прямо запрещает платформу «в целях коммерции или как рекламную витрину» (п. H GitHub Acceptable Use Policies).</li>
            <li><strong>Netlify:</strong> Бесплатный тариф ограничен 300 кредитами сборок в месяц; поддержка заверяет о допустимости рекламы, но официальные ToS не дают твёрдых гарантий.</li>
            <li><strong>Cloudflare Pages:</strong> Не накладывает ограничений на пропускную способность и трафик, разрешает статические сайты с рекламой (при условии законности контента). <strong>Идеальный выбор!</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('Все')

const platforms = [
  {
    name: 'Cloudflare Pages',
    bandwidth: 'Безлимит (Unlimited)',
    bandwidthHighlight: 'text-emerald-600 dark:text-emerald-400 font-bold',
    builds: '500 сборок/мес (до 20 мин/билд)',
    commercialAllowed: true,
    commercialText: 'Разрешено',
    adsPolicy: 'Разрешена (без ограничений)',
    adsBadgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300',
    scenario: 'Лучший выбор для статических Vue/Vite сайтов с рекламой и высоким трафиком.',
    riskLevel: 'Безопасно',
    riskClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    riskDotClass: 'bg-emerald-500',
    isRecommended: true,
    isAlternative: false,
    riskType: 'safe'
  },
  {
    name: 'GitHub Pages',
    bandwidth: '100 ГБ/мес (soft limit)',
    bandwidthHighlight: 'text-slate-700 dark:text-slate-300',
    builds: '2 000 мин Actions/мес',
    commercialAllowed: true,
    commercialText: 'Личные/проекты',
    adsPolicy: 'Умеренная монетизация (серая зона)',
    adsBadgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300',
    scenario: 'Портфолио, документация, личные блоги с ненавязчивыми спонсорскими баннерами.',
    riskLevel: 'Серая зона',
    riskClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    riskDotClass: 'bg-amber-500',
    isRecommended: false,
    isAlternative: true,
    riskType: 'neutral'
  },
  {
    name: 'Netlify',
    bandwidth: '100 ГБ/мес (300 кредитов)',
    bandwidthHighlight: 'text-slate-700 dark:text-slate-300',
    builds: '300 кредитов сборок/мес',
    commercialAllowed: true,
    commercialText: 'Разрешено (неявно)',
    adsPolicy: 'Допустимо (со слов поддержки)',
    adsBadgeClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300',
    scenario: 'Быстрое прототипирование и Jamstack-сайты с небольшим трафиком.',
    riskLevel: 'Низкий/Средний',
    riskClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
    riskDotClass: 'bg-sky-500',
    isRecommended: false,
    isAlternative: false,
    riskType: 'neutral'
  },
  {
    name: 'Vercel',
    bandwidth: '100 ГБ/мес (тариф Hobby)',
    bandwidthHighlight: 'text-slate-700 dark:text-slate-300',
    builds: '6 000 минут/мес',
    commercialAllowed: false,
    commercialText: 'СТРОГО НЕ-КОММЕРЧЕСКИЙ',
    adsPolicy: 'ЗАПРЕЩЕНА (риск бана)',
    adsBadgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300',
    scenario: 'Некоммерческие учебные пет-проекты без монетизации и рекламы.',
    riskLevel: 'Высокий риск',
    riskClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    riskDotClass: 'bg-rose-500',
    isRecommended: false,
    isAlternative: false,
    riskType: 'risky'
  },
  {
    name: 'Render (Static)',
    bandwidth: '100 ГБ/мес',
    bandwidthHighlight: 'text-slate-700 dark:text-slate-300',
    builds: '500 минут/мес (shared CPU)',
    commercialAllowed: true,
    commercialText: 'Разрешено',
    adsPolicy: 'Разрешена (в рамках лимитов)',
    adsBadgeClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-300',
    scenario: 'Статические лендинги и связка со спиннинговыми бэкендами на одном сервисе.',
    riskLevel: 'Низкий',
    riskClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
    riskDotClass: 'bg-slate-500',
    isRecommended: false,
    isAlternative: false,
    riskType: 'safe'
  }
]

const filteredPlatforms = computed(() => {
  if (activeFilter.value === 'Безопасные для рекламы') {
    return platforms.filter(p => p.riskType === 'safe')
  }
  if (activeFilter.value === 'Рискованные') {
    return platforms.filter(p => p.riskType === 'risky' || p.riskType === 'neutral')
  }
  return platforms
})
</script>

