<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="pb-4 border-b border-slate-200 dark:border-[#17342b]">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-[#0e221c] text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-2">
        Инфраструктура & Cloud
      </div>
      <h2 class="text-3xl font-black text-slate-900 dark:text-white">
        Облачная инфраструктура и сравнительный анализ хостингов
      </h2>
      <p class="text-sm text-slate-500 dark:text-emerald-100/70 mt-1 max-w-3xl">
        Комплексный анализ облачных платформ для статических приложений с рекламой, рекомендации по соблюдению правил монетизации и интерактивный калькулятор подбора сервиса.
      </p>
    </div>

    <!-- Live Site Banner -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg backdrop-blur-xl">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span class="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Проект опубликован онлайн</span>
        </div>
        <h3 class="text-xl font-black text-slate-900 dark:text-white mt-1">
          GitHub Pages Production Deployment
        </h3>
        <a
          href="https://litundison.github.io/web11-vue/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-emerald-600 dark:text-emerald-400 underline font-mono text-sm mt-1 block font-semibold hover:text-emerald-300"
        >
          https://litundison.github.io/web11-vue/
        </a>
      </div>

      <div class="flex items-center gap-3">
        <a
          href="https://litundison.github.io/web11-vue/"
          target="_blank"
          class="btn-primary btn-sm py-2.5 px-5 shadow-glow-emerald"
        >
          Открыть сайт ↗
        </a>
        <a
          href="https://github.com/litUndison/web11-vue"
          target="_blank"
          class="btn-outline btn-sm py-2.5 px-5"
        >
          GitHub репозиторий ↗
        </a>
      </div>
    </div>

    <!-- Interactive Advisor Widget -->
    <HostingAdvisor />

    <!-- Comparative Table -->
    <HostingTable />

    <!-- Parameters of Deployment and Integration -->
    <div class="card-base p-6 sm:p-8 space-y-6">
      <h3 class="text-xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-[#17342b] pb-4">
        Параметры развёртывания и спецификация интеграции
      </h3>

      <!-- 1. URL -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-[#081612]/70 border border-slate-200 dark:border-[#17342b]">
        <h4 class="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
          <span>Ссылка на сайт:</span>
        </h4>
        <div class="pl-8 space-y-1">
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <strong>Основной URL:</strong> <a href="https://litundison.github.io/web11-vue/" target="_blank" class="text-emerald-600 dark:text-emerald-400 font-mono underline font-bold">https://litundison.github.io/web11-vue/</a>
          </p>
          <p class="text-xs text-slate-400">
            (Репозиторий: <a href="https://github.com/litUndison/web11-vue" target="_blank" class="text-emerald-400 underline font-mono">https://github.com/litUndison/web11-vue</a>, настроен GitHub Actions CI/CD).
          </p>
        </div>
      </div>

      <!-- 2. Rationale -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-[#081612]/70 border border-slate-200 dark:border-[#17342b]">
        <h4 class="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
          <span>Обоснование выбора платформы:</span>
        </h4>
        <div class="pl-8">
          <blockquote class="border-l-4 border-emerald-500 pl-4 italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            «В качестве приоритетной платформы для статического сайта с рекламой выбран <strong>Cloudflare Pages</strong> (с альтернативным деплоем на <strong>GitHub Pages</strong>). Бесплатный тариф Cloudflare Pages не накладывает лимитов на пропускную способность (unlimited bandwidth) и не содержит запретов на коммерческую деятельность и рекламу в отличие от тарифа Vercel Hobby, где размещение рекламы грозит баном аккаунта. Кроме того, сервис предоставляет 500 сборок в месяц и бесшовную интеграцию со сборщиком Vite, обеспечивая максимальную надёжность при масштабировании аудитории.»
          </blockquote>
        </div>
      </div>

      <!-- 3. AdSlot code -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-[#081612]/70 border border-slate-200 dark:border-[#17342b]">
        <h4 class="font-extrabold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">3</span>
          <span>Архитектура компонента AdSlot.vue:</span>
        </h4>
        <div class="pl-8">
          <div class="bg-[#040d0a] text-emerald-200 rounded-xl p-4 font-mono text-xs overflow-x-auto shadow-inner border border-[#17342b]">
            <pre><code>&lt;template&gt;
  &lt;aside
    :id="slotId"
    role="complementary"
    aria-label="Спонсорский блок"
    class="ad-slot-wrapper relative my-5 transition-all duration-300"
    :class="containerClass"
  &gt;
    &lt;div
      v-if="!showCreativeMode"
      class="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-emerald-500/35 bg-white/60 dark:bg-[#081612]/70 rounded-2xl p-5 text-center select-none shadow-sm"
      :style="customDimensions"
    &gt;
      &lt;span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-[#0e221c] text-emerald-700 dark:text-emerald-300"&gt;
        &#123;&#123; label &#125;&#125; (&#123;&#123; displayDimensions &#125;&#125;)
      &lt;/span&gt;
      &lt;span class="text-xs sm:text-sm font-extrabold uppercase text-slate-500 mt-2"&gt;&#123;&#123; slotTitle &#125;&#125;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/aside&gt;
&lt;/template&gt;</code></pre>
          </div>
        </div>
      </div>

      <!-- 4. Locations -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-[#081612]/70 border border-slate-200 dark:border-[#17342b]">
        <h4 class="font-extrabold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">4</span>
          <span>Фактическое расположение рекламных блоков:</span>
        </h4>
        <div class="pl-8">
          <ul class="list-disc list-inside text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <li><strong>Лендинг (Шапка):</strong> баннер Top Leaderboard 728×90 px под главным меню;</li>
            <li><strong>Дашборд (Сайдбар):</strong> медийный блок Medium Rectangle 300×250 px в правой колонке аналитики;</li>
            <li><strong>Каталог (Лента):</strong> нативный адаптивный слот In-Feed между рядами товаров.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HostingAdvisor from '../components/HostingAdvisor.vue'
import HostingTable from '../components/HostingTable.vue'
</script>
