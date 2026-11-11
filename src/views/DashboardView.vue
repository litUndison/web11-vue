<template>
  <div class="space-y-6">
    <!-- Topbar info -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Аналитический Дашборд</span>
          <span class="px-2 py-0.5 text-xs font-bold rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">v2.0</span>
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Обзор ключевых показателей проекта и встроенная боковая панель с рекламным блоком
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-400">Период:</span>
        <button
          v-for="p in ['Сегодня', '7 дней', '30 дней']"
          :key="p"
          @click="selectedPeriod = p"
          class="px-2.5 py-1 text-xs rounded-lg font-medium transition-colors"
          :class="selectedPeriod === p ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Stat Cards Grid (Task 4.1) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.title" class="card-base p-5">
        <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>{{ stat.title }}</span>
          <span class="text-lg">{{ stat.icon }}</span>
        </div>
        <div class="text-2xl font-extrabold text-slate-900 dark:text-white">
          {{ stat.value }}
        </div>
        <div class="mt-2 flex items-center gap-1.5 text-xs font-semibold" :class="stat.isPositive ? 'text-emerald-500' : 'text-rose-500'">
          <span>{{ stat.trend }}</span>
          <span class="text-slate-400 font-normal">к прошлому периоду</span>
        </div>
      </div>
    </div>

    <!-- Main Two-Column Layout (Content + Sidebar with AdSlot) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left Content (8 cols): Chart Visualizer & Transactions -->
      <div class="lg:col-span-8 space-y-6">
        
        <!-- Activity Chart Box -->
        <div class="card-base p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-sm text-slate-900 dark:text-white">Динамика показов и конверсий</h3>
            <span class="text-xs text-indigo-500 font-medium">Обновлено 5 мин назад</span>
          </div>

          <div class="h-44 flex items-end gap-2 pt-6">
            <div v-for="(val, idx) in chartData" :key="idx" class="flex-1 flex flex-col items-center gap-1 group">
              <div
                class="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-purple-500 group-hover:from-indigo-500 group-hover:to-pink-500 transition-all cursor-pointer shadow-sm"
                :style="{ height: val + '%' }"
                :title="'Значение: ' + val + '%'"
              ></div>
              <span class="text-[10px] text-slate-400 font-mono">{{ idx + 1 }} ноя</span>
            </div>
          </div>
        </div>

        <!-- Transactions Table (Task 4.1) -->
        <div class="card-base p-6">
          <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-4">Последние операции монетизации</h3>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th class="pb-2">Рекламодатель</th>
                  <th class="pb-2">Формат слота</th>
                  <th class="pb-2">Показы</th>
                  <th class="pb-2">Доход</th>
                  <th class="pb-2 text-right">Статус</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr v-for="t in transactions" :key="t.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td class="py-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {{ t.sponsor }}
                  </td>
                  <td class="py-3 font-mono text-slate-500">{{ t.slot }}</td>
                  <td class="py-3">{{ t.impressions }}</td>
                  <td class="py-3 font-bold text-emerald-600 dark:text-emerald-400">{{ t.income }}</td>
                  <td class="py-3 text-right">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {{ t.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Right Sidebar (4 cols): AdSlot Sidebar (300x250) + Info -->
      <div class="lg:col-span-4 space-y-6">
        
        <!-- Sidebar AdSlot (Task 1 Шаг 3: Sidebar 300x250) -->
        <div class="card-base p-4">
          <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span class="font-bold uppercase tracking-wider text-[10px]">Рекламное место (Сайдбар)</span>
            <span class="font-mono text-[10px]">300 × 250</span>
          </div>

          <AdSlot
            format="sidebar"
            label="Рекламное место"
            slotTitle="Сайдбар Medium Rectangle"
            :initialCreative="allCreative"
            :key="'ad-dash-side-' + allCreative"
          />
        </div>

        <!-- Quick Summary Widget -->
        <div class="card-base p-5 bg-gradient-to-br from-indigo-50/60 to-white dark:from-slate-900 dark:to-slate-900">
          <h4 class="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            Параметры хостинга
          </h4>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Сайт успешно развёрнут и протестирован с поддержкой рекламных блоков AdSlot. Безлимитная полоса пропускания Cloudflare гарантирует защиту от падений при росте трафика.
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdSlot from '../components/AdSlot.vue'

defineProps({
  allCreative: {
    type: Boolean,
    default: false
  }
})

const selectedPeriod = ref('7 дней')

const stats = [
  { title: 'Всего просмотров', value: '142 850', trend: '+14.2%', isPositive: true, icon: '👁️' },
  { title: 'Клики по AdSlot', value: '4 820', trend: '+8.6%', isPositive: true, icon: '🖱️' },
  { title: 'CTR рекламы', value: '3.37%', trend: '+0.4%', isPositive: true, icon: '📈' },
  { title: 'Доход проекта', value: '28 400 ₽', trend: '+21.5%', isPositive: true, icon: '💰' }
]

const chartData = [35, 45, 60, 52, 78, 65, 88, 92, 80, 95]

const transactions = [
  { id: 1, sponsor: 'Cloudflare Pro', slot: 'Sidebar (300×250)', impressions: '42 100', income: '8 420 ₽', status: 'Выплачено' },
  { id: 2, sponsor: 'Vite Developer Tool', slot: 'Top Leaderboard', impressions: '54 300', income: '11 200 ₽', status: 'Выплачено' },
  { id: 3, sponsor: 'Tailwind UI Studio', slot: 'In-Feed Slot', impressions: '28 900', income: '5 780 ₽', status: 'Выплачено' },
  { id: 4, sponsor: 'Vue Mastery', slot: 'Sidebar (300×250)', impressions: '17 550', income: '3 000 ₽', status: 'Выплачено' }
]
</script>

