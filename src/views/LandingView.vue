<template>
  <div class="space-y-16">
    <!-- Top Advertisement Slot (Leaderboard 728x90) -->
    <div class="max-w-4xl mx-auto">
      <AdSlot
        format="banner"
        label="Спонсорский блок (Leaderboard)"
        slotTitle="Премиум-размещение в шапке портала"
        :initialCreative="allCreative"
        :key="'ad-landing-top-' + allCreative"
      />
    </div>

    <!-- Hero Section -->
    <section class="relative text-center max-w-4xl mx-auto pt-6 pb-12 space-y-6">
      <!-- Minimalist Status Pill -->
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60 shadow-2xs">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>Tailwind UI Studio v2.5</span>
        <span class="text-zinc-400">•</span>
        <span class="text-zinc-500 dark:text-zinc-400">Enterprise Ready</span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
        Платформа веб-интерфейсов и монетизации на Vue 3
      </h1>

      <!-- Subtitle -->
      <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
        Готовая архитектура компонентов корпоративного уровня со встроенной поддержкой рекламных форматов IAB, интерактивной аналитикой и нулевым сдвигом верстки.
      </p>

      <!-- CTA Buttons -->
      <div class="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          @click="$emit('switch-tab', 'dashboard')"
          class="btn-primary btn-md px-5 py-2.5 text-sm font-semibold shadow-sm"
        >
          <span>Открыть дашборд</span>
          <span class="text-xs">→</span>
        </button>
        <button
          @click="$emit('switch-tab', 'hosting-analysis')"
          class="btn-secondary btn-md px-5 py-2.5 text-sm"
        >
          <span>Cloud & Инфраструктура</span>
        </button>
      </div>

      <!-- Key Performance Metrics Strip -->
      <div class="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-zinc-200 dark:border-zinc-800/80 max-w-3xl mx-auto">
        <div class="text-center">
          <div class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">100%</div>
          <div class="text-xs text-zinc-500 mt-0.5">Vue 3 Composition</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">0 ms</div>
          <div class="text-xs text-zinc-500 mt-0.5">CLS Сдвиг макета</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">99.99%</div>
          <div class="text-xs text-zinc-500 mt-0.5">SLA Доступность</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">&lt;30 ms</div>
          <div class="text-xs text-zinc-500 mt-0.5">Edge CDN Latency</div>
        </div>
      </div>
    </section>

    <!-- Features Bento Grid -->
    <section class="max-w-6xl mx-auto">
      <div class="text-center max-w-xl mx-auto mb-10">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Возможности архитектуры
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Модульная система компонентов, строгая типизация и соблюдение веб-стандартов
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Feature 1 -->
        <div class="card-base p-6 space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
          <div class="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Аналитический дашборд
          </h3>
          <p class="text-xs sm:text-sm text-zinc-500 leading-relaxed">
            Интерактивный векторный график метрик, динамический переключатель периодов и журнал расчётов с рекламодателями.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="card-base p-6 space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
          <div class="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Каталог e-Commerce
          </h3>
          <p class="text-xs sm:text-sm text-zinc-500 leading-relaxed">
            Адаптивная витрина товаров со студийными фотографиями, фильтрами категорий, корзиной и нативной рекламой In-Feed.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="card-base p-6 space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
          <div class="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Стандарты IAB AdSlot
          </h3>
          <p class="text-xs sm:text-sm text-zinc-500 leading-relaxed">
            Поддержка форматов Leaderboard (728×90), Medium Rectangle (300×250) и Fluid In-Feed с гарантией нулевого CLS.
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="max-w-6xl mx-auto">
      <div class="text-center max-w-xl mx-auto mb-10">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Тарифные планы
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Гибкие варианты подключения для стартапов и корпоративных команд
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <!-- Starter Plan -->
        <div class="card-base p-6 flex flex-col justify-between">
          <div>
            <div class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Стартовый</div>
            <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">Free Tier</h3>
            <div class="mt-3 flex items-baseline gap-1">
              <span class="text-3xl font-bold text-zinc-900 dark:text-zinc-100">0 ₽</span>
              <span class="text-xs text-zinc-400">/ навсегда</span>
            </div>
            <ul class="mt-6 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>До 10 000 просмотров/мес</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>Базовые пресеты AdSlot</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>Деплой на GitHub Pages</span>
              </li>
            </ul>
          </div>
          <button class="btn-secondary btn-sm w-full mt-6 py-2">Выбрать Free</button>
        </div>

        <!-- Pro Plan (Featured) -->
        <div class="card-base p-6 flex flex-col justify-between border-indigo-500/80 dark:border-indigo-400/80 ring-1 ring-indigo-500/30 relative">
          <div class="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-600 text-white shadow-xs">
            Рекомендуемый
          </div>
          <div>
            <div class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Профессиональный</div>
            <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">Pro Developer</h3>
            <div class="mt-3 flex items-baseline gap-1">
              <span class="text-3xl font-bold text-zinc-900 dark:text-zinc-100">1 490 ₽</span>
              <span class="text-xs text-zinc-400">/ месяц</span>
            </div>
            <ul class="mt-6 space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
              <li class="flex items-center gap-2">
                <span class="text-indigo-600 dark:text-indigo-400 font-bold">✓</span>
                <span>Все модули (Дашборд, Чат, Канбан, E-com)</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-indigo-600 dark:text-indigo-400 font-bold">✓</span>
                <span>Безлимитная полоса Cloudflare Pages</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-indigo-600 dark:text-indigo-400 font-bold">✓</span>
                <span>Интеграция сетей РСЯ / AdSense</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-indigo-600 dark:text-indigo-400 font-bold">✓</span>
                <span>Кастомный домен и Auto-SSL</span>
              </li>
            </ul>
          </div>
          <button class="btn-primary btn-sm w-full mt-6 py-2 font-semibold">Подключить Pro</button>
        </div>

        <!-- Enterprise Plan -->
        <div class="card-base p-6 flex flex-col justify-between">
          <div>
            <div class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Корпоративный</div>
            <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">Enterprise</h3>
            <div class="mt-3 flex items-baseline gap-1">
              <span class="text-3xl font-bold text-zinc-900 dark:text-zinc-100">По запросу</span>
            </div>
            <ul class="mt-6 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>Выделенный SLA 99.99%</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>Кастомные размеры рекламных сеток</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>Поддержка 24/7 с персональным менеджером</span>
              </li>
            </ul>
          </div>
          <button class="btn-secondary btn-sm w-full mt-6 py-2">Связаться с нами</button>
        </div>
      </div>
    </section>

    <!-- Prominently Featured Comparison Table -->
    <section class="max-w-6xl mx-auto">
      <HostingTable />
    </section>

    <!-- Testimonials Section with Real Photography -->
    <section class="max-w-6xl mx-auto">
      <div class="text-center max-w-xl mx-auto mb-10">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Отзывы пользователей
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Мнения команд разработчиков и продуктовых специалистов
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="card-base p-5 space-y-3">
          <div class="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
              alt="Екатерина Романова"
              class="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
            />
            <div>
              <h4 class="font-semibold text-xs text-zinc-900 dark:text-zinc-100">Екатерина Романова</h4>
              <p class="text-[11px] text-zinc-400">Head of Product, FinTech Cloud</p>
            </div>
          </div>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            «Архитектура AdSlot позволила интегрировать нативные промо-блоки с нулевым сдвигом верстки. Показатели Core Web Vitals выросли до 99/100 в Lighthouse.»
          </p>
          <div class="text-amber-500 text-xs">★★★★★</div>
        </div>

        <div class="card-base p-5 space-y-3">
          <div class="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
              alt="Алексей Соколов"
              class="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
            />
            <div>
              <h4 class="font-semibold text-xs text-zinc-900 dark:text-zinc-100">Алексей Соколов</h4>
              <p class="text-[11px] text-zinc-400">VP of Engineering, RetailHub</p>
            </div>
          </div>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            «Перенос витрины на Cloudflare Pages с Vue 3 занял меньше часа. Неограниченный трафик обеспечил надежность во время сезонных распродаж.»
          </p>
          <div class="text-amber-500 text-xs">★★★★★</div>
        </div>

        <div class="card-base p-5 space-y-3">
          <div class="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="Елена Васильева"
              class="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
            />
            <div>
              <h4 class="font-semibold text-xs text-zinc-900 dark:text-zinc-100">Елена Васильева</h4>
              <p class="text-[11px] text-zinc-400">Lead UX Architect, DataStream</p>
            </div>
          </div>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            «Минималистичный дизайн в стиле Linear выглядит солидно и профессионально. Пользователи отмечают безупречную скорость загрузки интерфейса.»
          </p>
          <div class="text-amber-500 text-xs">★★★★★</div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-3xl mx-auto pb-6">
      <div class="text-center mb-6">
        <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Часто задаваемые вопросы
        </h2>
      </div>
      <div class="space-y-3">
        <details class="group card-base p-4 cursor-pointer">
          <summary class="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 flex items-center justify-between list-none">
            <span>Допускается ли размещение сторонней рекламы на Cloudflare Pages?</span>
            <span class="text-xs text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-2.5 leading-relaxed">
            Да. Условия обслуживания бесплатного тарифа Cloudflare Pages не накладывают ограничений на стороннюю баннерную рекламу или коммерческую монетизацию статических веб-сайтов, а полоса пропускания не лимитируется.
          </p>
        </details>

        <details class="group card-base p-4 cursor-pointer">
          <summary class="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 flex items-center justify-between list-none">
            <span>Каковы риски размещения рекламных баннеров на платформе Vercel?</span>
            <span class="text-xs text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-2.5 leading-relaxed">
            Пункт 1.2 Terms of Service тарифа Vercel Hobby строго запрещает любую коммерческую эксплуатацию ресурса. Размещение рекламы квалифицируется как коммерческая деятельность, что ведёт к блокировке аккаунта.
          </p>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup>
import AdSlot from '../components/AdSlot.vue'
import HostingTable from '../components/HostingTable.vue'

defineProps({
  allCreative: {
    type: Boolean,
    default: true
  }
})

defineEmits(['switch-tab'])
</script>
