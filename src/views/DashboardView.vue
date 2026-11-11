<template>
  <div class="space-y-8">
    <!-- Topbar info -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#17342b]">
      <div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-[#0e221c] text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-2">
          Аналитический центр
        </div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Дашборд производительности</span>
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-emerald-100/70 mt-1">
          Мониторинг ключевых показателей трафика, доходов от AdSlot и конверсий в реальном времени
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-400 font-semibold">Интервал:</span>
        <button
          v-for="p in ['Сегодня', '7 дней', '30 дней']"
          :key="p"
          @click="selectedPeriod = p"
          class="px-3 py-1.5 text-xs rounded-xl font-bold transition-all"
          :class="selectedPeriod === p ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-sm' : 'bg-white dark:bg-[#081612] text-slate-600 dark:text-emerald-200 hover:bg-slate-100 dark:hover:bg-[#0e221c] border border-slate-200 dark:border-[#17342b]'"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div v-for="stat in stats" :key="stat.title" class="card-base card-hover p-6 relative overflow-hidden group">
        <div class="flex items-center justify-between text-xs text-slate-500 dark:text-emerald-200/70 mb-3">
          <span class="font-bold tracking-wider uppercase text-[11px]">{{ stat.title }}</span>
          <span class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-[#0e221c] text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-base shadow-xs border border-emerald-500/20">
            {{ stat.icon }}
          </span>
        </div>
        <div class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {{ stat.value }}
        </div>
        <div class="mt-3 flex items-center gap-2 text-xs font-bold" :class="stat.isPositive ? 'text-emerald-500' : 'text-rose-500'">
          <span class="px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20">
            {{ stat.trend }}
          </span>
          <span class="text-slate-400 font-normal">к прошлому периоду</span>
        </div>
      </div>
    </div>

    <!-- Main Two-Column Layout (Content + Sidebar with AdSlot) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left Content (8 cols): Chart Visualizer & Transactions -->
      <div class="lg:col-span-8 space-y-6">
        
        <!-- Activity Chart Box -->
        <div class="card-base p-7">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-extrabold text-base text-slate-900 dark:text-white">Динамика показов и монетизации</h3>
              <p class="text-xs text-slate-400 mt-0.5">Статистика по рекламным позициям</p>
            </div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </span>
          </div>

          <div class="h-48 flex items-end gap-2.5 pt-4">
            <div v-for="(val, idx) in chartData" :key="idx" class="flex-1 flex flex-col items-center gap-2 group">
              <div
                class="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 via-emerald-500 to-teal-400 group-hover:from-emerald-400 group-hover:to-teal-300 transition-all duration-300 cursor-pointer shadow-md group-hover:shadow-glow-emerald"
                :style="{ height: val + '%' }"
                :title="'Показатель: ' + val + '%'"
              ></div>
              <span class="text-[10px] text-slate-400 font-mono font-bold">{{ idx + 1 }} ноя</span>
            </div>
          </div>
        </div>

        <!-- Transactions Table -->
        <div class="card-base p-7">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-extrabold text-base text-slate-900 dark:text-white">История начислений</h3>
            <span class="text-xs text-slate-400">Всего 4 записи</span>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="text-slate-400 uppercase font-black text-[10px] tracking-wider border-b border-slate-200 dark:border-[#17342b]">
                <tr>
                  <th class="pb-3">Партнёр / Сеть</th>
                  <th class="pb-3">Формат слота</th>
                  <th class="pb-3">Показы</th>
                  <th class="pb-3">Доход</th>
                  <th class="pb-3 text-right">Статус</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-[#17342b]/60 text-slate-700 dark:text-emerald-100/80">
                <tr v-for="t in transactions" :key="t.id" class="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                  <td class="py-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-400"></span>
                    {{ t.sponsor }}
                  </td>
                  <td class="py-3.5 font-mono text-slate-500 text-xs">{{ t.slot }}</td>
                  <td class="py-3.5 font-semibold">{{ t.impressions }}</td>
                  <td class="py-3.5 font-black text-emerald-600 dark:text-emerald-400">{{ t.income }}</td>
                  <td class="py-3.5 text-right">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-500/20">
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
        
        <!-- Sidebar AdSlot -->
        <div class="card-base p-5">
          <div class="flex items-center justify-between text-xs text-slate-400 mb-3">
            <span class="font-black uppercase tracking-wider text-[11px] text-slate-500 dark:text-emerald-200/60">Сайдбар-блок</span>
            <span class="font-mono text-[11px] font-bold text-emerald-400">300 × 250</span>
          </div>

          <AdSlot
            format="sidebar"
            label="Спонсорский блок"
            slotTitle="Сайдбар Medium Rectangle"
            :initialCreative="allCreative"
            :key="'ad-dash-side-' + allCreative"
          />
        </div>

        <!-- Infrastructure Summary Card -->
        <div class="card-base p-6 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 border-emerald-500/20">
          <h4 class="font-black text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
            <span>⚡ Облачная инфраструктура</span>
          </h4>
          <p class="text-xs text-slate-600 dark:text-emerald-100/70 leading-relaxed font-normal">
            Проект оптимизирован под глобальную сеть CDN с поддержкой Edge Caching. Бесперебойная отдача статики без рисков перерасхода трафика.
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
  { title: 'Средний CTR', value: '3.37%', trend: '+0.4%', isPositive: true, icon: '📈' },
  { title: 'Доход за период', value: '28 400 ₽', trend: '+21.5%', isPositive: true, icon: '💰' }
]

const chartData = [35, 45, 60, 52, 78, 65, 88, 92, 80, 95]

const transactions = [
  { id: 1, sponsor: 'Cloudflare Pro', slot: 'Sidebar (300×250)', impressions: '42 100', income: '8 420 ₽', status: 'Выплачено' },
  { id: 2, sponsor: 'Vite Developer Tool', slot: 'Top Leaderboard', impressions: '54 300', income: '11 200 ₽', status: 'Выплачено' },
  { id: 3, sponsor: 'Tailwind UI Studio', slot: 'In-Feed Slot', impressions: '28 900', income: '5 780 ₽', status: 'Выплачено' },
  { id: 4, sponsor: 'Vue Mastery', slot: 'Sidebar (300×250)', impressions: '17 550', income: '3 000 ₽', status: 'Выплачено' }
]
</script>
