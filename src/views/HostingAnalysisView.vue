<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="pb-4 border-b border-zinc-200 dark:border-zinc-800">
      <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Облачная инфраструктура и сравнительный анализ хостингов
      </h1>
      <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-3xl">
        Комплексный анализ облачных платформ для статических приложений с рекламой, рекомендации по соблюдению правил монетизации и интерактивный калькулятор подбора сервиса.
      </p>
    </div>

    <!-- Live Site Banner -->
    <div class="card-base p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-zinc-200 dark:border-zinc-800">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Production Live</span>
        </div>
        <h3 class="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">
          GitHub Pages Production Deployment
        </h3>
        <a
          href="https://litundison.github.io/web11-vue/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-indigo-600 dark:text-indigo-400 underline font-mono text-xs sm:text-sm mt-0.5 block hover:opacity-80"
        >
          https://litundison.github.io/web11-vue/
        </a>
      </div>

      <div class="flex items-center gap-2.5">
        <a
          href="https://litundison.github.io/web11-vue/"
          target="_blank"
          class="btn-primary btn-sm px-4 py-2"
        >
          <span>Открыть сайт</span>
          <span class="text-xs">↗</span>
        </a>
        <a
          href="https://github.com/litUndison/web11-vue"
          target="_blank"
          class="btn-secondary btn-sm px-4 py-2"
        >
          <span>GitHub</span>
          <span class="text-xs">↗</span>
        </a>
      </div>
    </div>

    <!-- Interactive Advisor Widget -->
    <HostingAdvisor />

    <!-- Comparative Table -->
    <HostingTable />

    <!-- Parameters of Deployment and Integration -->
    <div class="card-base p-5 sm:p-6 space-y-5">
      <h3 class="text-lg font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        Спецификация архитектуры и интеграции рекламной инфраструктуры
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 1. Production Environment -->
        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Production Environment</span>
            <h4 class="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2">
              Глобальное развёртывание & CI/CD
            </h4>
            <div class="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
              <p>
                <strong>Основной домен:</strong>
                <a href="https://litundison.github.io/web11-vue/" target="_blank" class="text-indigo-600 dark:text-indigo-400 font-mono underline ml-1">
                  https://litundison.github.io/web11-vue/
                </a>
              </p>
              <p class="text-zinc-500 text-[11px]">
                Автоматическая сборка Vite и валидация через GitHub Actions Workflow при каждом коммите.
              </p>
            </div>
          </div>
          <div class="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <span class="font-mono text-[11px]">Статус: Live SLA 99.99%</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-medium">Активен</span>
          </div>
        </div>

        <!-- 2. Rationale & SLA -->
        <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Cloud Infrastructure Rationale</span>
            <h4 class="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2">
              Обоснование выбора платформы
            </h4>
            <blockquote class="border-l-2 border-indigo-500 pl-2.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
              «В качестве приоритетной платформы для статического сайта с рекламой выбран <strong>Cloudflare Pages</strong> (с альтернативным деплоем на <strong>GitHub Pages</strong>). Бесплатный тариф Cloudflare Pages не накладывает лимитов на трафик (unlimited bandwidth) и полностью разрешает коммерческую монетизацию в отличие от Vercel Hobby.»
            </blockquote>
          </div>
          <div class="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <span class="font-mono text-[11px]">500 сборок/мес • Edge CDN</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-medium">Лимиты соблюдены</span>
          </div>
        </div>
      </div>

      <!-- 3. AdSlot code -->
      <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
            Архитектура компонента AdSlot.vue (стандарт IAB)
          </h4>
          <span class="text-[10px] font-mono text-zinc-400">Vue 3 Script Setup</span>
        </div>
        <div class="bg-zinc-900 text-zinc-200 rounded-md p-3.5 font-mono text-[11px] overflow-x-auto border border-zinc-800">
          <pre><code>&lt;template&gt;
  &lt;aside
    :id="slotId"
    role="complementary"
    aria-label="Спонсорский блок"
    class="ad-slot-wrapper relative my-4"
    :class="containerClass"
  &gt;
    &lt;div
      v-if="!showCreativeMode"
      class="flex flex-col items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 text-center select-none"
      :style="customDimensions"
    &gt;
      &lt;span class="text-xs font-semibold uppercase text-zinc-500"&gt;&#123;&#123; slotTitle &#125;&#125;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/aside&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>

      <!-- 4. Locations -->
      <div class="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60">
        <h4 class="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 mb-3">
          Карта нативного размещения рекламных блоков в приложении
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Лендинг (Шапка)</span>
            <p class="text-xs text-zinc-700 dark:text-zinc-300 font-medium mt-1">Top Leaderboard 728×90</p>
            <p class="text-[11px] text-zinc-400 mt-0.5">Cloudflare Pages Enterprise промо</p>
          </div>
          <div class="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Дашборд (Сайдбар)</span>
            <p class="text-xs text-zinc-700 dark:text-zinc-300 font-medium mt-1">Medium Rectangle 300×250</p>
            <p class="text-[11px] text-zinc-400 mt-0.5">JetBrains WebStorm IDE</p>
          </div>
          <div class="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Каталог (Лента)</span>
            <p class="text-xs text-zinc-700 dark:text-zinc-300 font-medium mt-1">Native In-Feed 100%</p>
            <p class="text-[11px] text-zinc-400 mt-0.5">Яндекс Рекламная Сеть (РСЯ)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HostingAdvisor from '../components/HostingAdvisor.vue'
import HostingTable from '../components/HostingTable.vue'
</script>
