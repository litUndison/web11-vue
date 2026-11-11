<template>
  <div class="space-y-16">
    <!-- Top Advertisement Slot (Leaderboard 728x90) -->
    <div class="max-w-5xl mx-auto px-2">
      <AdSlot
        format="banner"
        label="Спонсорский блок (Leaderboard)"
        slotTitle="Премиум-размещение в шапке портала"
        :initialCreative="allCreative"
        :key="'ad-landing-top-' + allCreative"
      />
    </div>

    <!-- Hero Section (Ultra-Modern High-Tech 2026 Redesign) -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#081612] via-[#05110d] to-[#040d0a] text-white p-8 sm:p-20 border border-[#17342b]/80 shadow-2xl">
      <!-- Glow ambient background light -->
      <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-500/15 rounded-full blur-[90px] pointer-events-none"></div>

      <div class="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <!-- Floating Pill Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 backdrop-blur-md shadow-xs">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-emerald-300 font-extrabold">Tailwind UI Studio</span>
          <span class="text-emerald-600">•</span>
          <span class="text-slate-300">Cyber Emerald 2026</span>
        </div>

        <!-- Big Radiant Heading -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
          Передовой веб-интерфейс на
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 block mt-2">
            Vue 3 & Tailwind CSS
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-emerald-100/80 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
          Единая платформа компонентов корпоративного уровня со встроенной поддержкой монетизации, аналитическим дашбордом и нулевым сдвигом верстки (CLS = 0).
        </p>

        <!-- CTA Buttons -->
        <div class="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            @click="$emit('switch-tab', 'dashboard')"
            class="px-8 py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 shadow-glow-emerald transition-all hover:scale-105 active:scale-95 border border-emerald-400/30 flex items-center gap-2"
          >
            <span>Открыть Дашборд</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
          <button
            @click="$emit('switch-tab', 'hosting-analysis')"
            class="px-8 py-4 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Cloud & Хостинг</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">CDN</span>
          </button>
        </div>

        <!-- Live Metrics Bar inside Hero -->
        <div class="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div class="text-2xl sm:text-3xl font-black text-white">100%</div>
            <div class="text-xs text-slate-400 mt-0.5 font-medium">Vue 3 Composition</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-black text-white">0 ms</div>
            <div class="text-xs text-slate-400 mt-0.5 font-medium">CLS Задержка</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-black text-white">v3.4+</div>
            <div class="text-xs text-slate-400 mt-0.5 font-medium">Tailwind CSS Core</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-black text-emerald-400">99.9%</div>
            <div class="text-xs text-slate-400 mt-0.5 font-medium">SLA Доступность</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid Features Section -->
    <section class="max-w-7xl mx-auto px-2">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs font-black uppercase tracking-widest text-emerald-400">Возможности платформы</span>
        <h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Всё для построения современного SaaS
        </h2>
        <p class="text-sm text-slate-500 dark:text-emerald-100/70 mt-2">
          Модульная архитектура, оптимизация производительности и передовые стандарты безопасности
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Feature 1 -->
        <div class="card-base card-hover p-7 relative overflow-hidden group">
          <div class="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-[#0e221c] text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-emerald-500/20">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Аналитический дашборд</h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-emerald-100/70 leading-relaxed">
            Метрики выручки, графики активности, таблица транзакций со статусами и встроенный сайдбар-слот монетизации 300×250 px.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="card-base card-hover p-7 relative overflow-hidden group">
          <div class="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-teal-500/20">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <h3 class="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Каталог товаров & E-Com</h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-emerald-100/70 leading-relaxed">
            Интерактивная сетка товаров с фильтрацией по категориям, поиском, корзиной и нативным спонсорским слотом в ленте.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="card-base card-hover p-7 relative overflow-hidden group">
          <div class="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-emerald-500/20">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Архитектура AdSlot</h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-emerald-100/70 leading-relaxed">
            Поддержка мировых стандартов IAB (Leaderboard, Medium Rectangle, In-Feed), предсказуемые габариты и нулевой сдвиг макета.
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="max-w-7xl mx-auto px-2">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs font-black uppercase tracking-widest text-emerald-400">Тарифы и подписка</span>
        <h2 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Прозрачные условия без скрытых комиссий
        </h2>
        <p class="text-sm text-slate-500 dark:text-emerald-100/70 mt-2">
          Масштабируйтесь от небольших сайтов до миллионов посетителей в месяц
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <!-- Basic -->
        <div class="card-base p-8 flex flex-col justify-between">
          <div>
            <span class="text-xs font-black uppercase tracking-widest text-slate-400">Стартовый</span>
            <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-1">Basic</h3>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-4xl font-black text-slate-900 dark:text-white">0 ₽</span>
              <span class="text-xs text-slate-400 font-semibold">/ навсегда</span>
            </div>
            <ul class="mt-6 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-center gap-2.5">
                <span class="text-emerald-400 font-bold">✓</span>
                <span>До 10 000 просмотров/мес</span>
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-emerald-400 font-bold">✓</span>
                <span>Базовые пресеты AdSlot</span>
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-emerald-400 font-bold">✓</span>
                <span>Публикация на GitHub Pages</span>
              </li>
            </ul>
          </div>
          <button class="btn-outline w-full mt-8 py-3 text-xs font-bold">Выбрать тариф</button>
        </div>

        <!-- Pro (Featured) -->
        <div class="card-base p-8 flex flex-col justify-between relative ring-2 ring-emerald-500 dark:ring-emerald-400 shadow-glow-emerald bg-gradient-to-b from-emerald-500/10 via-white to-white dark:from-emerald-950/40 dark:via-[#081612] dark:to-[#081612] lg:-translate-y-3">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md">
            Рекомендуемый выбор
          </div>
          <div>
            <span class="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Профессиональный</span>
            <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-1">Pro Developer</h3>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-4xl font-black text-emerald-600 dark:text-emerald-400">1 490 ₽</span>
              <span class="text-xs text-slate-400 font-semibold">/ месяц</span>
            </div>
            <ul class="mt-6 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-200">
              <li class="flex items-center gap-2.5 font-medium">
                <span class="text-emerald-400 font-black">✓</span>
                <span>Все модули (Дашборд, Чат, Канбан, E-com)</span>
              </li>
              <li class="flex items-center gap-2.5 font-medium">
                <span class="text-emerald-400 font-black">✓</span>
                <span>Безлимитная полоса Cloudflare Pages</span>
              </li>
              <li class="flex items-center gap-2.5 font-medium">
                <span class="text-emerald-400 font-black">✓</span>
                <span>Подключение сетей РСЯ / AdSense</span>
              </li>
              <li class="flex items-center gap-2.5 font-medium">
                <span class="text-emerald-400 font-black">✓</span>
                <span>Кастомный домен и бесплатный Auto-SSL</span>
              </li>
            </ul>
          </div>
          <button class="btn-primary w-full mt-8 py-3 text-xs font-black tracking-wide">Подключить Pro</button>
        </div>

        <!-- Enterprise -->
        <div class="card-base p-8 flex flex-col justify-between">
          <div>
            <span class="text-xs font-black uppercase tracking-widest text-slate-400">Корпоративный</span>
            <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-1">Enterprise</h3>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-4xl font-black text-slate-900 dark:text-white">По запросу</span>
            </div>
            <ul class="mt-6 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-center gap-2.5">
                <span class="text-emerald-400 font-bold">✓</span>
                <span>Индивидуальная интеграция монетизации</span>
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-emerald-400 font-bold">✓</span>
                <span>Выделенный SLA 99.99% доступности</span>
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-emerald-400 font-bold">✓</span>
                <span>Приоритетная поддержка 24/7</span>
              </li>
            </ul>
          </div>
          <button class="btn-outline w-full mt-8 py-3 text-xs font-bold">Связаться с нами</button>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-4xl mx-auto px-2 py-4">
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Вопросы и ответы (FAQ)
        </h2>
      </div>
      <div class="space-y-4">
        <details class="group card-base p-5 cursor-pointer">
          <summary class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between list-none">
            <span>Допускается ли размещение сторонней рекламы на Cloudflare Pages?</span>
            <span class="w-6 h-6 rounded-full bg-slate-100 dark:bg-[#0e221c] flex items-center justify-center text-xs text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-emerald-100/70 mt-3 leading-relaxed">
            Да. Условия обслуживания бесплатного тарифа Cloudflare Pages не накладывают ограничений на стороннюю баннерную рекламу или монетизацию статических веб-сайтов, а полоса пропускания не лимитируется.
          </p>
        </details>

        <details class="group card-base p-5 cursor-pointer">
          <summary class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between list-none">
            <span>Каковы риски размещения рекламных баннеров на платформе Vercel?</span>
            <span class="w-6 h-6 rounded-full bg-slate-100 dark:bg-[#0e221c] flex items-center justify-center text-xs text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-emerald-100/70 mt-3 leading-relaxed">
            Пункт 1.2 Terms of Service тарифа Vercel Hobby строго запрещает любую коммерческую эксплуатацию ресурса. Размещение рекламы квалифицируется как коммерческая деятельность, что ведёт к блокировке аккаунта.
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
