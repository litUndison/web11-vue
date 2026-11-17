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
        Спецификация архитектуры и интеграции рекламной инфраструктуры
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- 1. Production URL & CI/CD -->
        <div class="p-5 rounded-2xl bg-slate-50 dark:bg-[#081612]/70 border border-slate-200 dark:border-[#17342b] flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
              Production Environment
            </div>
            <h4 class="font-extrabold text-sm text-slate-900 dark:text-white mb-2">
              Глобальное развёртывание & CI/CD
            </h4>
            <div class="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>Основной домен:</strong>
                <a href="https://litundison.github.io/web11-vue/" target="_blank" class="text-emerald-600 dark:text-emerald-400 font-mono underline font-bold block sm:inline sm:ml-1">
                  https://litundison.github.io/web11-vue/
                </a>
              </p>
              <p class="text-xs text-slate-400">
                Исходный код синхронизирован с корпоративным репозиторием GitHub, автоматическая сборка и валидация через GitHub Actions Workflow.
              </p>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-200/60 dark:border-[#17342b]/60 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-mono">Статус: Live SLA 99.99%</span>
            <span class="text-emerald-500 font-bold">Активен</span>
          </div>
        </div>

        <!-- 2. Rationale & SLA -->
        <div class="p-5 rounded-2xl bg-slate-50 dark:bg-[#081612]/70 border border-slate-200 dark:border-[#17342b] flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 mb-2">
              Cloud Infrastructure Rationale
            </div>
            <h4 class="font-extrabold text-sm text-slate-900 dark:text-white mb-2">
              Обоснование выбора платформы
            </h4>
            <blockquote class="border-l-4 border-emerald-500 pl-3 italic text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              «В качестве приоритетной платформы для статического сайта с рекламой выбран <strong>Cloudflare Pages</strong> (с альтернативным деплоем на <strong>GitHub Pages</strong>). Бесплатный тариф Cloudflare Pages не накладывает лимитов на трафик (unlimited bandwidth) и полностью разрешает коммерческую монетизацию в отличие от Vercel Hobby.»
            </blockquote>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-200/60 dark:border-[#17342b]/60 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-mono">500 сборок/мес • Edge CDN</span>
            <span class="text-emerald-500 font-bold">Лимиты соблюдены</span>
          </div>
        </div>
      </div>

      <!-- 3. AdSlot code -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-[#081612]/70 border border-slate-200 dark:border-[#17342b]">
        <div class="flex items-center justify-between mb-3">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-1">
              Component Architecture
            </div>
            <h4 class="font-extrabold text-sm text-slate-900 dark:text-white">
              Архитектура компонента AdSlot.vue (стандарт IAB)
            </h4>
          </div>
          <span class="text-[11px] font-mono text-slate-400 hidden sm:inline">Vue 3 Script Setup</span>
        </div>
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

      <!-- 4. Locations -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-[#081612]/70 border border-slate-200 dark:border-[#17342b]">
        <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-1">
          Placement Matrix
        </div>
        <h4 class="font-extrabold text-sm text-slate-900 dark:text-white mb-3">
          Карта нативного размещения рекламных блоков в приложении
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-3.5 rounded-xl bg-white dark:bg-[#0e221c] border border-slate-200 dark:border-[#17342b]">
            <span class="text-xs font-bold text-emerald-500">Лендинг (Шапка)</span>
            <p class="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">Top Leaderboard 728×90</p>
            <p class="text-[11px] text-slate-400 mt-0.5">Cloudflare Pages Enterprise промо</p>
          </div>
          <div class="p-3.5 rounded-xl bg-white dark:bg-[#0e221c] border border-slate-200 dark:border-[#17342b]">
            <span class="text-xs font-bold text-emerald-500">Дашборд (Сайдбар)</span>
            <p class="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">Medium Rectangle 300×250</p>
            <p class="text-[11px] text-slate-400 mt-0.5">JetBrains WebStorm 2026</p>
          </div>
          <div class="p-3.5 rounded-xl bg-white dark:bg-[#0e221c] border border-slate-200 dark:border-[#17342b]">
            <span class="text-xs font-bold text-emerald-500">Каталог (Лента)</span>
            <p class="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">Native In-Feed 100%</p>
            <p class="text-[11px] text-slate-400 mt-0.5">Яндекс Рекламная Сеть (РСЯ)</p>
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
