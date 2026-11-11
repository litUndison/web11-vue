<template>
  <div class="space-y-12">
    <!-- Top Advertisement Slot (Leaderboard 728x90) -->
    <div class="max-w-5xl mx-auto px-4">
      <AdSlot
        format="banner"
        label="Рекламное место (Leaderboard)"
        slotTitle="Спонсорский баннер в шапке лендинга"
        :initialCreative="allCreative"
        :key="'ad-landing-top-' + allCreative"
      />
    </div>

    <!-- Hero Section (Task 2.1 from web9-10 with Modern 2026 Redesign) -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-16 border border-indigo-500/20 shadow-2xl">
      <!-- Glow ambient orbs -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Tailwind UI Studio • Релиз 2026
        </div>

        <h1 class="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
          Современный веб-интерфейс на
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Tailwind CSS & Vue 3
          </span>
        </h1>

        <p class="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Комплексная дизайн-система и готовые модули на реактивной архитектуре <strong>Vue 3</strong> и <strong>Tailwind CSS</strong> со встроенными слотами рекламной монетизации <strong>AdSlot</strong> и оптимизацией Core Web Vitals.
        </p>

        <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            @click="$emit('switch-tab', 'dashboard')"
            class="px-6 py-3 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
          >
            Открыть Дашборд
          </button>
          <button
            @click="$emit('switch-tab', 'hosting-analysis')"
            class="px-6 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105"
          >
            Cloud & Хостинг
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section (Task 3.3) -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Все компоненты в едином интерфейсе
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Модульная архитектура с чистыми классами Tailwind CSS и поддержкой светлой/тёмной темы
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card-base card-hover p-6">
          <div class="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Аналитический дашборд</h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Метрики выручки, графики активности и таблица транзакций с сайдбаром и встроенным рекламным блоком 300×250.
          </p>
        </div>

        <div class="card-base card-hover p-6">
          <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Каталог товаров</h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            E-commerce сетка с динамической фильтрацией, корзиной покупок и нативным спонсорским слотом в ленте.
          </p>
        </div>

        <div class="card-base card-hover p-6">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Интеграция AdSlot</h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Поддержка стандартов IAB, нулевой Cumulative Layout Shift (CLS) и переключение между плейсхолдером и рекламой.
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing Section (Task 2.2) -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Тарифные планы (Pricing Matrix)
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Гибкие условия для проектов любого масштаба с чистой версткой на Tailwind
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <!-- Basic -->
        <div class="card-base p-6 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Старт</span>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-1">Basic</h3>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-3xl font-extrabold text-slate-900 dark:text-white">0 ₽</span>
              <span class="text-xs text-slate-400">/ месяц</span>
            </div>
            <ul class="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-center gap-2">✓ 1 веб-проект на Vue 3</li>
              <li class="flex items-center gap-2">✓ До 10 000 просмотров/мес</li>
              <li class="flex items-center gap-2">✓ Базовый AdSlot плейсхолдер</li>
            </ul>
          </div>
          <button class="btn-outline w-full mt-6 py-2 text-xs">Выбрать тариф</button>
        </div>

        <!-- Pro (Featured) -->
        <div class="card-base p-6 flex flex-col justify-between relative ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-xl bg-gradient-to-b from-indigo-50/50 to-white dark:from-slate-900 dark:to-slate-900 lg:-translate-y-2">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold bg-indigo-600 text-white shadow-md">
            Популярный выбор
          </div>
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Для команд</span>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-1">Pro Developer</h3>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">1 490 ₽</span>
              <span class="text-xs text-slate-400">/ месяц</span>
            </div>
            <ul class="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-center gap-2 font-medium">✓ Все модули (Канбан, Чат, E-com)</li>
              <li class="flex items-center gap-2 font-medium">✓ Неограниченный трафик Cloudflare</li>
              <li class="flex items-center gap-2 font-medium">✓ Спонсорские блоки без ограничений</li>
              <li class="flex items-center gap-2 font-medium">✓ Кастомные форматы баннеров</li>
            </ul>
          </div>
          <button class="btn-primary w-full mt-6 py-2.5 text-xs">Подключить Pro</button>
        </div>

        <!-- Enterprise -->
        <div class="card-base p-6 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Корпоративный</span>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-1">Enterprise</h3>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-3xl font-extrabold text-slate-900 dark:text-white">По запросу</span>
            </div>
            <ul class="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-center gap-2">✓ Индивидуальная интеграция РСЯ / AdSense</li>
              <li class="flex items-center gap-2">✓ Выделенный SLA 99.99%</li>
              <li class="flex items-center gap-2">✓ Консультации по ToS хостингов</li>
            </ul>
          </div>
          <button class="btn-outline w-full mt-6 py-2 text-xs">Связаться с нами</button>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-4xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
        Часто задаваемые вопросы (FAQ)
      </h2>
      <div class="space-y-3">
        <details class="group card-base p-4 cursor-pointer">
          <summary class="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between list-none">
            <span>Можно ли размещать рекламу на бесплатном тарифе Cloudflare Pages?</span>
            <span class="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Да. В условиях бесплатного тарифа Cloudflare Pages отсутствуют запреты на рекламу или коммерческую деятельность, а полоса пропускания не тарифицируется.
          </p>
        </details>

        <details class="group card-base p-4 cursor-pointer">
          <summary class="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between list-none">
            <span>Почему нельзя размещать Google AdSense на тарифе Vercel Hobby?</span>
            <span class="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Пункт 1.2 Terms of Service сервиса Vercel строго ограничивает тариф Hobby некоммерческим использованием. Размещение рекламы признаётся коммерческой деятельностью и ведёт к заморозке аккаунта.
          </p>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup>
import AdSlot from '../components/AdSlot.vue'

defineProps({
  allCreative: {
    type: Boolean,
    default: false
  }
})

defineEmits(['switch-tab'])
</script>

