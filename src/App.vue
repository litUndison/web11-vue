<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
    <!-- Navbar -->
    <Navbar
      :allCreative="allCreativeMode"
      @toggle-all-ads="toggleAllAdsMode"
    />

    <!-- Top Advertisement Slot (Banner / Leaderboard 728x90) -->
    <section id="ad-top" class="w-full px-4 pt-4 sm:pt-6">
      <div class="max-w-7xl mx-auto">
        <AdSlot
          format="banner"
          label="Рекламное место (Leaderboard)"
          slotTitle="Спонсорский баннер в шапке сайта"
          :initialCreative="allCreativeMode"
          :key="'ad-top-' + allCreativeMode"
        />
      </div>
    </section>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 shadow-xl border border-indigo-800/40">
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 max-w-3xl">
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              Учебная практика • День 11
            </span>
            <span class="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Статус: Готово к публикации
            </span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Публикация сайта и интеграция рекламного блока AdSlot
          </h1>

          <p class="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Полнофункциональное веб-приложение на <strong>Vue 3 + Tailwind CSS</strong>, демонстрирующее корректное встраивание рекламных слотов, соблюдение стандартов CLS, а также глубокий сравнительный анализ бесплатных хостингов 2026 года.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#ad-demo"
              class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Интеграция AdSlot (Задание 1)
            </a>
            <a
              href="#hosting-analysis"
              class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105"
            >
              Анализ платформ (Задание 2)
            </a>
            <button
              type="button"
              @click="toggleAllAdsMode"
              class="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 transition-all"
            >
              {{ allCreativeMode ? 'Показать плейсхолдеры' : 'Симуляция рекламы' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content & Sidebar Layout -->
    <main id="ad-demo" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left: Articles Stream with Native AdSlot In-Feed (8 Cols) -->
        <div class="lg:col-span-8 space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Лента публикаций</span>
                <span class="text-xs font-normal text-slate-500">(Интеграция контента и рекламы)</span>
              </h2>
            </div>
            <div class="flex items-center gap-1 text-xs">
              <span class="text-slate-400">Категория:</span>
              <button
                v-for="cat in ['Все', 'Хостинг', 'Vue 3', 'Монетизация']"
                :key="cat"
                @click="selectedCategory = cat"
                class="px-2 py-1 rounded-md text-xs font-medium transition-colors"
                :class="selectedCategory === cat ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Group 1 of Articles -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ArticleCard
              v-for="article in firstHalfArticles"
              :key="article.id"
              :article="article"
            />
          </div>

          <!-- In-Feed AdSlot between articles (as required by specification) -->
          <div class="py-2">
            <AdSlot
              format="in-feed"
              label="Рекламное место в ленте (In-Feed)"
              slotTitle="Нативный спонсорский блок между статьями"
              :initialCreative="allCreativeMode"
              :key="'ad-feed-' + allCreativeMode"
            />
          </div>

          <!-- Group 2 of Articles -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ArticleCard
              v-for="article in secondHalfArticles"
              :key="article.id"
              :article="article"
            />
          </div>
        </div>

        <!-- Right: Sidebar with AdSlot Sidebar 300x250 (4 Cols) -->
        <aside class="lg:col-span-4 space-y-6">
          
          <!-- Student Info Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                E
              </div>
              <div>
                <h3 class="font-bold text-slate-900 dark:text-white text-sm">Eugene (Студент)</h3>
                <p class="text-xs text-slate-500">Практикум: Вёрстка веб-страниц</p>
                <span class="inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  День 11: Публикация & AdSlot
                </span>
              </div>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Развёртывание статического сайта на Vue + Tailwind CSS с соблюдением правил хостингов в отношении монетизации.
            </p>
          </div>

          <!-- Sidebar Advertisement Slot (Format 'sidebar' / 300x250 Medium Rectangle) -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Сайдбар-блок</span>
              <span class="text-[10px] font-mono">300 × 250</span>
            </div>
            
            <AdSlot
              format="sidebar"
              label="Рекламное место (Sidebar)"
              slotTitle="Медийный блок 300×250"
              :initialCreative="allCreativeMode"
              :key="'ad-sidebar-' + allCreativeMode"
            />
          </div>

          <!-- Hosting Selection Quick Card -->
          <div class="bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-5 text-xs text-slate-700 dark:text-slate-300">
            <h4 class="font-bold text-indigo-950 dark:text-indigo-200 text-sm mb-2 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              Рекомендованная платформа
            </h4>
            <p class="leading-relaxed">
              <strong>Cloudflare Pages:</strong> бесплатный тариф не содержит запрета на рекламу и не ограничивает полосу пропускания, что исключает риск непредвиденных счетов или блокировки сайта.
            </p>
            <a
              href="#hosting-analysis"
              class="mt-3 inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Читать сравнительный анализ</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>

        </aside>
      </div>

      <!-- Section: Interactive Advisor Widget -->
      <section id="advisor" class="mt-12">
        <HostingAdvisor />
      </section>

      <!-- Section: Hosting Comparison Table (Задание 2) -->
      <section id="hosting-analysis" class="mt-12">
        <HostingTable />
      </section>

      <!-- Section: Step 4 Submission Materials (Шаг 4 Задания 1) -->
      <section id="submission-report" class="mt-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-3">
          Шаг 4: Материалы для сдачи
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Отчёт о публикации сайта и интеграции рекламного блока
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Сводка обязательных материалов в соответствии с требованиями практического задания «День 11».
        </p>

        <div class="space-y-6 text-sm">
          <!-- 1. Ссылка на сайт -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              <span>Ссылка на сайт:</span>
            </h4>
            <div class="mt-2 pl-8 space-y-1">
              <p class="text-slate-700 dark:text-slate-300">
                <strong>Cloudflare Pages:</strong> <a href="https://technova-web11.pages.dev" target="_blank" class="text-indigo-600 dark:text-indigo-400 underline font-mono">https://technova-web11.pages.dev</a>
              </p>
              <p class="text-slate-500 text-xs">
                (Также проект полностью собран в директорию <code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">dist/</code> и готов к деплою на любой статический хостинг одной командой).
              </p>
            </div>
          </div>

          <!-- 2. Обоснование выбора платформы -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
              <span>Название платформы и обоснование выбора (2–3 предложения):</span>
            </h4>
            <div class="mt-2 pl-8">
              <blockquote class="border-l-4 border-indigo-500 pl-3 italic text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                «В качестве основной платформы выбран <strong>Cloudflare Pages</strong>. Бесплатный тариф сервиса не накладывает ограничений на пропускную способность (unlimited bandwidth) и не содержит запретов на размещение рекламы и коммерческую деятельность в отличие от тарифа Vercel Hobby. Кроме того, Cloudflare Pages предоставляет 500 сборок в месяц и бесшовную интеграцию со сборщиком Vite, гарантируя отказоустойчивость сайта при росте аудитории.»
              </blockquote>
            </div>
          </div>

          <!-- 3. Фрагмент кода AdSlot.vue -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
              <span>Фрагмент кода AdSlot.vue:</span>
            </h4>
            <div class="mt-2 pl-8">
              <div class="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <pre><code>&lt;template&gt;
  &lt;aside
    :id="slotId"
    role="complementary"
    aria-label="Рекламный блок"
    class="ad-slot-wrapper relative my-4 transition-all duration-300"
    :class="containerClass"
  &gt;
    &lt;div
      class="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/90 dark:bg-slate-900/60 rounded-xl p-4 text-center select-none"
      :style="customDimensions"
    &gt;
      &lt;span class="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"&gt;
        &#123;&#123; label &#125;&#125; (&#123;&#123; displayDimensions &#125;&#125;)
      &lt;/span&gt;
      &lt;span class="text-sm font-semibold uppercase text-slate-500 mt-2"&gt;&#123;&#123; slotTitle &#125;&#125;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/aside&gt;
&lt;/template&gt;</code></pre>
              </div>
            </div>
          </div>

          <!-- 4. Расположение рекламных блоков на странице -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">4</span>
              <span>Фактическое расположение рекламных блоков на странице:</span>
            </h4>
            <div class="mt-2 pl-8">
              <ul class="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                <li><strong>Верхний блок (Leaderboard):</strong> расположен под главной шапкой навигации (<code class="text-indigo-500 font-mono">#ad-top</code>), формат 728×90 px.</li>
                <li><strong>Нативный блок в ленте (In-Feed):</strong> встроен между 2-й и 3-й карточками статей, адаптивный по ширине контейнера контента.</li>
                <li><strong>Боковой блок (Sidebar):</strong> размещён в правой колонке сайдбара (<code class="text-indigo-500 font-mono">format="sidebar"</code>), IAB Medium Rectangle 300×250 px.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from './components/Navbar.vue'
import AdSlot from './components/AdSlot.vue'
import ArticleCard from './components/ArticleCard.vue'
import HostingTable from './components/HostingTable.vue'
import HostingAdvisor from './components/HostingAdvisor.vue'
import Footer from './components/Footer.vue'

// State for toggling creative ad simulation vs wireframe dashed placeholders
const allCreativeMode = ref(false)
const selectedCategory = ref('Все')

const toggleAllAdsMode = () => {
  allCreativeMode.value = !allCreativeMode.value
}

// Tech Articles List
const articles = [
  {
    id: 1,
    title: 'Развертывание Vue 3 приложения на Cloudflare Pages',
    excerpt: 'Пошаговый гайд по подключению GitHub-репозитория, настройке билд-команды npm run build и привязке кастомного домена с SSL.',
    category: 'Хостинг',
    author: 'Александр',
    date: '4 ноя 2026',
    readTime: '4 мин',
    likes: 38
  },
  {
    id: 2,
    title: 'Политика хостингов в 2026: почему Vercel запрещает рекламу',
    excerpt: 'Разбор юридических нюансов тарифов Hobby и Free. Как не получить бан аккаунта при подключении Google AdSense или баннеров.',
    category: 'Монетизация',
    author: 'Елена',
    date: '3 ноя 2026',
    readTime: '6 мин',
    likes: 54
  },
  {
    id: 3,
    title: 'Архитектура AdSlot: предотвращение CLS (Cumulative Layout Shift)',
    excerpt: 'Как резервировать размеры под рекламные блоки в Tailwind CSS, чтобы избежать скачков верстки при асинхронной загрузке рекламы.',
    category: 'Vue 3',
    author: 'Максим',
    date: '2 ноя 2026',
    readTime: '5 мин',
    likes: 29
  },
  {
    id: 4,
    title: 'Сравнение Netlify Credit Model и безлимитного Cloudflare Pages',
    excerpt: 'Анализ перехода Netlify на систему кредитов сборок в 2026 году и сопоставление реальной стоимости при росте веб-трафика.',
    category: 'Хостинг',
    author: 'Дмитрий',
    date: '1 ноя 2026',
    readTime: '7 мин',
    likes: 42
  }
]

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'Все') return articles
  return articles.filter(a => a.category === selectedCategory.value)
})

const firstHalfArticles = computed(() => {
  return filteredArticles.value.slice(0, 2)
})

const secondHalfArticles = computed(() => {
  return filteredArticles.value.slice(2)
})
</script>

