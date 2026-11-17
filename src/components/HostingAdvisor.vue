<template>
  <div class="card-base p-5 sm:p-6 my-6 border-zinc-200 dark:border-zinc-800">
    <div class="max-w-3xl">
      <div class="flex items-center gap-2 mb-2">
        <h3 class="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Интерактивный помощник выбора платформы
        </h3>
        <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          Advisor
        </span>
      </div>
      <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
        Укажите требования вашего веб-приложения для автоматической проверки соответствия правилам платформ (ToS) и лимитам трафика 2026 года.
      </p>

      <!-- Questions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <!-- Question 1: Ads -->
        <div class="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60">
          <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            1. Планируете ли размещение рекламы?
          </label>
          <div class="space-y-1.5 text-xs">
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.ads === 'yes' ? 'bg-white dark:bg-zinc-800 shadow-2xs font-medium text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'">
              <input type="radio" v-model="answers.ads" value="yes" class="text-indigo-600 focus:ring-0">
              <span>Да, коммерческие баннеры / РСЯ / AdSense</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.ads === 'moderate' ? 'bg-white dark:bg-zinc-800 shadow-2xs font-medium text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'">
              <input type="radio" v-model="answers.ads" value="moderate" class="text-indigo-600 focus:ring-0">
              <span>Только скромные спонсорские плашки</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.ads === 'none' ? 'bg-white dark:bg-zinc-800 shadow-2xs font-medium text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'">
              <input type="radio" v-model="answers.ads" value="none" class="text-indigo-600 focus:ring-0">
              <span>Нет, проект строго некоммерческий</span>
            </label>
          </div>
        </div>

        <!-- Question 2: Traffic -->
        <div class="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60">
          <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            2. Ожидаемый объём трафика
          </label>
          <div class="space-y-1.5 text-xs">
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.traffic === 'high' ? 'bg-white dark:bg-zinc-800 shadow-2xs font-medium text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'">
              <input type="radio" v-model="answers.traffic" value="high" class="text-indigo-600 focus:ring-0">
              <span>Высокий (> 100 ГБ / вирусный охват)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.traffic === 'low' ? 'bg-white dark:bg-zinc-800 shadow-2xs font-medium text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'">
              <input type="radio" v-model="answers.traffic" value="low" class="text-indigo-600 focus:ring-0">
              <span>Небольшой сайт / портфолио (< 50 ГБ/мес)</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Result Card -->
      <div class="mt-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="text-xs text-zinc-400">Рекомендуемая платформа:</span>
          <span class="px-2 py-0.5 rounded text-[10px] font-semibold" :class="adviceResult.badgeColor">
            {{ adviceResult.verdict }}
          </span>
        </div>
        <h4 class="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>{{ adviceResult.name }}</span>
          <span class="text-xs font-normal text-zinc-400">({{ adviceResult.tagline }})</span>
        </h4>
        <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
          {{ adviceResult.reason }}
        </p>

        <div class="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-2">
          <div class="flex items-center gap-3 text-[11px]">
            <span>Полоса: <strong class="text-zinc-900 dark:text-zinc-100 font-mono">{{ adviceResult.bandwidth }}</strong></span>
            <span>Риск: <strong class="text-zinc-900 dark:text-zinc-100">{{ adviceResult.risk }}</strong></span>
          </div>
          <a
            :href="adviceResult.link"
            target="_blank"
            class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-xs flex items-center gap-1"
          >
            <span>Перейти к сервису</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const answers = reactive({
  ads: 'yes',
  traffic: 'high'
})

const adviceResult = computed(() => {
  if (answers.ads === 'yes') {
    return {
      name: 'Cloudflare Pages',
      verdict: 'Выбор №1',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
      tagline: 'Максимальная безопасность и безлимит',
      bandwidth: 'Не ограничена (Unlimited)',
      risk: 'Отсутствует (Разрешено)',
      link: 'https://pages.cloudflare.com',
      reason: 'При монетизации и высоком трафике Cloudflare Pages — единственная бесплатная платформа с абсолютно неограниченным трафиком без риска блокировки аккаунта за коммерцию. Поддержка Vite и Vue 3 работает из коробки.'
    }
  }

  if (answers.ads === 'moderate') {
    return {
      name: 'GitHub Pages',
      verdict: 'Альтернатива',
      badgeColor: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
      tagline: 'Удобно для репозиториев',
      bandwidth: '100 ГБ/мес (мягкий лимит)',
      risk: 'Низкий при умеренной монетизации',
      link: 'https://pages.github.com',
      reason: 'Для персональных проектов с умеренными спонсорскими блоками GitHub Pages удобен интеграцией с Git. При этом важно следить, чтобы сайт не превращался в чисто рекламную витрину.'
    }
  }

  return {
    name: 'Cloudflare Pages / Vercel',
    verdict: 'Любой вариант',
    badgeColor: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
    tagline: 'Для пет-проектов',
    bandwidth: 'Безлимит / 100 ГБ',
    risk: 'Отсутствует',
    link: 'https://pages.cloudflare.com',
    reason: 'Без рекламы допустимо использование любого сервиса, однако Cloudflare Pages по-прежнему предпочтительнее отсутствием жестких квот трафика в случае резкого роста популярности.'
  }
})
</script>
