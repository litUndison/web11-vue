<template>
  <div class="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-500/20 my-8">
    <div class="max-w-3xl">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
        Интерактивный мастер
      </div>
      <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
        Подбор идеального хостинга для вашего Vue 3 проекта
      </h3>
      <p class="text-slate-300 text-sm mt-2">
        Ответьте на несколько вопросов, чтобы система автоматически проверила соответствие правилам платформ (ToS) и лимитам 2026 года.
      </p>

      <!-- Questions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <!-- Question 1: Ads -->
        <div class="bg-white/5 border border-white/10 rounded-xl p-4">
          <label class="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
            1. Планируете ли рекламу или баннеры?
          </label>
          <div class="space-y-1.5 text-xs">
            <label class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors" :class="answers.ads === 'yes' ? 'bg-indigo-600/30 border border-indigo-400' : ''">
              <input type="radio" v-model="answers.ads" value="yes" class="text-indigo-500 focus:ring-0">
              <span>Да, планируются рекламные блоки / AdSense / РСЯ</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors" :class="answers.ads === 'moderate' ? 'bg-indigo-600/30 border border-indigo-400' : ''">
              <input type="radio" v-model="answers.ads" value="moderate" class="text-indigo-500 focus:ring-0">
              <span>Только скромные логотипы спонсоров / донаты</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors" :class="answers.ads === 'none' ? 'bg-indigo-600/30 border border-indigo-400' : ''">
              <input type="radio" v-model="answers.ads" value="none" class="text-indigo-500 focus:ring-0">
              <span>Нет, проект строго некоммерческий</span>
            </label>
          </div>
        </div>

        <!-- Question 2: Traffic -->
        <div class="bg-white/5 border border-white/10 rounded-xl p-4">
          <label class="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
            2. Ожидаемый трафик
          </label>
          <div class="space-y-1.5 text-xs">
            <label class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors" :class="answers.traffic === 'high' ? 'bg-indigo-600/30 border border-indigo-400' : ''">
              <input type="radio" v-model="answers.traffic" value="high" class="text-indigo-500 focus:ring-0">
              <span>Потенциально высокий (> 100 ГБ / вирусный охват)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors" :class="answers.traffic === 'low' ? 'bg-indigo-600/30 border border-indigo-400' : ''">
              <input type="radio" v-model="answers.traffic" value="low" class="text-indigo-500 focus:ring-0">
              <span>Небольшой персональный сайт / портфолио (< 50 ГБ в месяц)</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Result Card -->
      <div class="mt-6 p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="text-xs font-medium text-slate-300">Рекомендуемая платформа:</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider" :class="adviceResult.badgeColor">
            {{ adviceResult.verdict }}
          </span>
        </div>
        <h4 class="text-xl font-bold text-white flex items-center gap-2">
          <span>{{ adviceResult.name }}</span>
          <span class="text-xs font-normal text-indigo-200">({{ adviceResult.tagline }})</span>
        </h4>
        <p class="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
          {{ adviceResult.reason }}
        </p>

        <div class="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
          <div class="flex items-center gap-4">
            <span>Пропускная способность: <strong class="text-white">{{ adviceResult.bandwidth }}</strong></span>
            <span>Риск бана за рекламу: <strong class="text-white">{{ adviceResult.risk }}</strong></span>
          </div>
          <a
            :href="adviceResult.link"
            target="_blank"
            class="text-indigo-300 hover:text-white font-semibold underline flex items-center gap-1"
          >
            Перейти к платформе
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
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
      verdict: 'Победитель (Выбор №1)',
      badgeColor: 'bg-emerald-500 text-white',
      tagline: 'Максимальная безопасность и безлимит',
      bandwidth: 'Не ограничена (Unlimited)',
      risk: 'Отсутствует (Разрешено)',
      link: 'https://pages.cloudflare.com',
      reason: 'Поскольку вы планируете размещение рекламы и высокий трафик, Cloudflare Pages — единственная бесплатная платформа, предлагающая абсолютно неограниченный трафик без риска штрафов за перерасход или блокировки аккаунта за коммерческую деятельность. Поддержка Vite и Vue 3 работает из коробки.'
    }
  }

  if (answers.ads === 'moderate') {
    return {
      name: 'GitHub Pages',
      verdict: 'Рекомендуемая альтернатива',
      badgeColor: 'bg-blue-500 text-white',
      tagline: 'Отлично для личных репозиториев',
      bandwidth: '100 ГБ/мес (мягкий лимит)',
      risk: 'Низкий при умеренной монетизации',
      link: 'https://pages.github.com',
      reason: 'Для личного портфолио и проектных сайтов с умеренными спонсорскими блоками GitHub Pages удобен бесшовной интеграцией с Git. Однако следите за тем, чтобы сайт не выглядел исключительно как рекламная страница.'
    }
  }

  return {
    name: 'Cloudflare Pages / Vercel',
    verdict: 'Свободный выбор',
    badgeColor: 'bg-indigo-500 text-white',
    tagline: 'Для чистых пет-проектов',
    bandwidth: 'Безлимит / 100 ГБ',
    risk: 'Отсутствует (рекламы нет)',
    link: 'https://pages.cloudflare.com',
    reason: 'Без рекламы допустимо использование любого сервиса, однако Cloudflare Pages по-прежнему выигрывает отсутствием жестких квот трафика в случае всплеска посещаемости.'
  }
})
</script>

