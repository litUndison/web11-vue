<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="pb-4 border-b border-amber-500/20">
      <h1 class="heading-gothic text-2xl font-bold tracking-tight text-zinc-100">
        Облачная инфраструктура сохранений, кроссплей & CDN
      </h1>
      <p class="text-xs sm:text-sm text-zinc-400 mt-0.5 max-w-3xl">
        Комплексный сравнительный анализ облачных платформ для распространения игровых ресурсов и кросс-сейвов, правовой аудит условий монетизации и калькулятор подбора провайдера.
      </p>
    </div>

    <!-- Live Site Banner -->
    <div class="card-base p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-amber-500/30 bg-zinc-900/90 shadow-card">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span class="text-xs font-bold text-emerald-400">Production Live Deployment</span>
        </div>
        <h3 class="heading-gothic text-base sm:text-lg font-bold text-amber-400 mt-1">
          GitHub Pages Production Deployment (Vampire Survivors Mobile)
        </h3>
        <a
          href="https://litundison.github.io/web11-vue/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-amber-300 underline font-mono text-xs sm:text-sm mt-0.5 block hover:text-amber-200"
        >
          https://litundison.github.io/web11-vue/
        </a>
      </div>

      <div class="flex items-center gap-2.5">
        <a
          href="https://litundison.github.io/web11-vue/"
          target="_blank"
          class="btn-gold btn-sm px-4 py-2"
        >
          <span>Открыть сайт</span>
          <span class="text-xs">↗</span>
        </a>
        <a
          href="https://github.com/litUndison/web11-vue"
          target="_blank"
          class="btn-secondary btn-sm px-4 py-2"
        >
          <span>Репозиторий GitHub</span>
          <span class="text-xs">↗</span>
        </a>
      </div>
    </div>

    <!-- Interactive Advisor Widget -->
    <HostingAdvisor />

    <!-- Comparative Table -->
    <HostingTable />

    <!-- Parameters of Deployment and Integration -->
    <div class="card-base p-5 sm:p-6 space-y-5 border-amber-500/20 bg-zinc-900/80">
      <h3 class="heading-gothic text-lg font-bold text-zinc-100 border-b border-zinc-800 pb-3">
        Спецификация облачной архитектуры и интеграции рекламы
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 1. Production Environment -->
        <div class="p-4 rounded-lg border border-zinc-800 bg-zinc-950/60 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono uppercase text-amber-400 block mb-1">Production Environment</span>
            <h4 class="font-bold text-sm text-zinc-100 mb-2">
              Глобальное развёртывание & CI/CD Pipeline
            </h4>
            <div class="space-y-1.5 text-xs text-zinc-300">
              <p>
                <strong>Основной домен:</strong>
                <a href="https://litundison.github.io/web11-vue/" target="_blank" class="text-amber-400 font-mono underline ml-1">
                  https://litundison.github.io/web11-vue/
                </a>
              </p>
              <p class="text-zinc-400 text-[11px]">
                Автоматическая сборка Vite и валидация через GitHub Actions Workflow при каждом коммите в ветку main.
              </p>
            </div>
          </div>
          <div class="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span class="font-mono text-[11px]">Статус: Live SLA 99.99%</span>
            <span class="text-emerald-400 font-bold">Активен</span>
          </div>
        </div>

        <!-- 2. Rationale & SLA -->
        <div class="p-4 rounded-lg border border-zinc-800 bg-zinc-950/60 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono uppercase text-amber-400 block mb-1">Cloud Infrastructure Rationale</span>
            <h4 class="font-bold text-sm text-zinc-100 mb-2">
              Обоснование выбора хостинга для игры
            </h4>
            <blockquote class="border-l-2 border-amber-500 pl-2.5 text-xs text-zinc-300 leading-relaxed italic">
              «В качестве приоритетной платформы для статического игрового портала с рекламой выбран <strong>Cloudflare Pages</strong> (с альтернативным деплоем на <strong>GitHub Pages</strong>). Бесплатный тариф Cloudflare Pages не накладывает лимитов на трафик (unlimited bandwidth) и полностью разрешает коммерческую спонсорскую монетизацию в отличие от Vercel Hobby.»
            </blockquote>
          </div>
          <div class="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span class="font-mono text-[11px]">ToS: Verified Safe</span>
            <span class="text-amber-400 font-bold">Zero CLS Risk</span>
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
