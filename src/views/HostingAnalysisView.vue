<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="pb-4 border-b border-slate-200 dark:border-slate-800">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
        Инфраструктура & Cloud
      </div>
      <h2 class="text-3xl font-black text-slate-900 dark:text-white">
        Облачная инфраструктура и сравнительный анализ хостингов
      </h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
        Комплексный анализ облачных платформ для статических приложений с рекламой, рекомендации по соблюдению правил монетизации и интерактивный калькулятор подбора сервиса.
      </p>
    </div>

    <!-- Live Site Banner -->
    <div class="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-purple-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Сайт опубликован онлайн</span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-1">
          GitHub Pages Production URL
        </h3>
        <a
          href="https://litundison.github.io/web11-vue/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-indigo-600 dark:text-indigo-400 underline font-mono text-sm mt-0.5 block hover:text-indigo-700"
        >
          https://litundison.github.io/web11-vue/
        </a>
      </div>

      <div class="flex items-center gap-2">
        <a
          href="https://litundison.github.io/web11-vue/"
          target="_blank"
          class="btn-primary btn-sm py-2 px-4 shadow-sm"
        >
          Открыть сайт ↗
        </a>
        <a
          href="https://github.com/litUndison/web11-vue"
          target="_blank"
          class="btn-outline btn-sm py-2 px-4"
        >
          GitHub репозиторий ↗
        </a>
      </div>
    </div>

    <!-- Interactive Advisor Widget -->
    <HostingAdvisor />

    <!-- Comparative Table (Task 2) -->
    <HostingTable />

    <!-- Materials for Submission (Task 1 Step 4) -->
    <div class="card-base p-6 sm:p-8 space-y-6">
      <h3 class="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
        Параметры развёртывания и спецификация интеграции
      </h3>

      <!-- 1. Ссылка -->
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">1. Ссылка на сайт:</h4>
        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <strong>Основной URL:</strong> <a href="https://litundison.github.io/web11-vue/" target="_blank" class="text-indigo-600 dark:text-indigo-400 font-mono underline">https://litundison.github.io/web11-vue/</a>
        </p>
        <p class="text-xs text-slate-500 mt-1">
          (Репозиторий: <a href="https://github.com/litUndison/web11-vue" target="_blank" class="text-indigo-500 underline font-mono">https://github.com/litUndison/web11-vue</a>, настроен GitHub Actions CI/CD).
        </p>
      </div>

      <!-- 2. Обоснование выбора платформы -->
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">2. Обоснование выбора платформы (3 предложения):</h4>
        <blockquote class="border-l-4 border-indigo-500 pl-3 italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          «В качестве приоритетной платформы для статического сайта с рекламой выбран <strong>Cloudflare Pages</strong> (с альтернативным деплоем на <strong>GitHub Pages</strong>). Бесплатный тариф Cloudflare Pages не накладывает лимитов на пропускную способность (unlimited bandwidth) и не содержит запретов на коммерческую деятельность и рекламу в отличие от тарифа Vercel Hobby, где размещение рекламы грозит баном аккаунта. Кроме того, сервис предоставляет 500 сборок в месяц и бесшовную интеграцию со сборщиком Vite, обеспечивая максимальную надёжность при масштабировании аудитории.»
        </blockquote>
      </div>

      <!-- 3. Фрагмент кода AdSlot.vue -->
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-2">3. Фрагмент кода компонента AdSlot.vue:</h4>
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
      v-if="!showCreativeMode"
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

      <!-- 4. Расположение блоков -->
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">4. Расположение рекламных блоков на страницах:</h4>
        <ul class="list-disc list-inside text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
          <li><strong>Лендинг (Шапка):</strong> баннер Top Leaderboard 728×90 под главным меню;</li>
          <li><strong>Дашборд (Сайдбар):</strong> медийный блок Medium Rectangle 300×250 в правой колонке аналитики;</li>
          <li><strong>Каталог (Лента):</strong> нативный адаптивный слот In-Feed между рядами товаров.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import HostingAdvisor from '../components/HostingAdvisor.vue'
import HostingTable from '../components/HostingTable.vue'
</script>

