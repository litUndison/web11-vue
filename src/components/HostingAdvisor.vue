<template>
  <div class="card-base p-5 sm:p-6 my-6 border-amber-500/20 bg-zinc-900/90 shadow-card">
    <div class="max-w-3xl">
      <div class="flex items-center gap-2 mb-2">
        <h3 class="heading-gothic text-lg sm:text-xl font-bold tracking-tight text-zinc-100">
          Интерактивный советник выбора хостинга & CDN
        </h3>
        <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
          Advisor
        </span>
      </div>
      <p class="text-xs sm:text-sm text-zinc-400">
        Укажите требования вашего игрового портала для автоматической проверки соответствия правилам платформ (ToS) и лимитам трафика 2026 года.
      </p>

      <!-- Questions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <!-- Question 1: Ads -->
        <div class="p-3.5 rounded-lg border border-zinc-800 bg-zinc-950/60">
          <label class="block text-xs font-bold text-amber-400 mb-2">
            1. Планируете ли спонсорскую монетизацию?
          </label>
          <div class="space-y-1.5 text-xs">
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.ads === 'yes' ? 'bg-zinc-800 font-bold text-zinc-100 border border-amber-500/30' : 'text-zinc-400'">
              <input type="radio" v-model="answers.ads" value="yes" class="text-amber-500 focus:ring-0">
              <span>Да, спонсорские баннеры / РСЯ / AdSense</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.ads === 'moderate' ? 'bg-zinc-800 font-bold text-zinc-100 border border-amber-500/30' : 'text-zinc-400'">
              <input type="radio" v-model="answers.ads" value="moderate" class="text-amber-500 focus:ring-0">
              <span>Только скромные спонсорские плашки</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.ads === 'none' ? 'bg-zinc-800 font-bold text-zinc-100 border border-amber-500/30' : 'text-zinc-400'">
              <input type="radio" v-model="answers.ads" value="none" class="text-amber-500 focus:ring-0">
              <span>Нет, проект строго некоммерческий</span>
            </label>
          </div>
        </div>

        <!-- Question 2: Traffic -->
        <div class="p-3.5 rounded-lg border border-zinc-800 bg-zinc-950/60">
          <label class="block text-xs font-bold text-amber-400 mb-2">
            2. Ожидаемый объём трафика игроков
          </label>
          <div class="space-y-1.5 text-xs">
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.traffic === 'high' ? 'bg-zinc-800 font-bold text-zinc-100 border border-amber-500/30' : 'text-zinc-400'">
              <input type="radio" v-model="answers.traffic" value="high" class="text-amber-500 focus:ring-0">
              <span>Высокий (> 100 ГБ / вирусный охват)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors" :class="answers.traffic === 'low' ? 'bg-zinc-800 font-bold text-zinc-100 border border-amber-500/30' : 'text-zinc-400'">
              <input type="radio" v-model="answers.traffic" value="low" class="text-amber-500 focus:ring-0">
              <span>Небольшой портал (< 50 ГБ/мес)</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Result Card -->
      <div class="mt-4 p-4 rounded-lg border border-zinc-800 bg-zinc-950/80">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="text-xs text-zinc-400">Рекомендуемая платформа:</span>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold" :class="adviceResult.badgeColor">
            {{ adviceResult.verdict }}
          </span>
        </div>
        <h4 class="text-base font-bold text-amber-400 flex items-center gap-2">
          <span>{{ adviceResult.name }}</span>
          <span class="text-xs font-normal text-zinc-400">({{ adviceResult.tagline }})</span>
        </h4>
        <p class="text-xs text-zinc-300 mt-1.5 leading-relaxed">
          {{ adviceResult.reason }}
        </p>

        <div class="mt-3 pt-2.5 border-t border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
          <div class="flex items-center gap-3 text-[11px]">
            <span>Полоса: <strong class="text-zinc-100 font-mono">{{ adviceResult.bandwidth }}</strong></span>
            <span>Риск: <strong class="text-zinc-100">{{ adviceResult.risk }}</strong></span>
          </div>
          <a
            :href="adviceResult.link"
            target="_blank"
            class="text-amber-400 hover:text-amber-300 hover:underline font-bold text-xs flex items-center gap-1"
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
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      tagline: 'Максимальная безопасность и безлимит',
      bandwidth: 'Не ограничена (Unlimited)',
      risk: 'Отсутствует (Разрешено)',
      link: 'https://pages.cloudflare.com',
      reason: 'При монетизации и высоком трафике игроков Cloudflare Pages — единственная бесплатная платформа с абсолютно неограниченным трафиком без риска блокировки аккаунта за коммерцию. Поддержка Vite и статических ассетов работает из коробки.'
    }
  }

  if (answers.ads === 'moderate') {
    return {
      name: 'GitHub Pages',
      verdict: 'Альтернатива',
      badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      tagline: 'Удобно для репозиториев',
      bandwidth: '100 ГБ/мес (мягкий лимит)',
      risk: 'Низкий при умеренной монетизации',
      link: 'https://pages.github.com',
      reason: 'Для игровых лендингов и персональных проектов с умеренными спонсорскими блоками GitHub Pages удобен бесшовной интеграцией с Git Actions. При этом важно следить, чтобы сайт не превращался в чисто рекламную витрину.'
    }
  }

  return {
    name: 'Cloudflare Pages / Vercel',
    verdict: 'Любой вариант',
    badgeColor: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
    tagline: 'Для пет-проектов',
    bandwidth: 'Безлимит / 100 ГБ',
    risk: 'Отсутствует',
    link: 'https://pages.cloudflare.com',
    reason: 'Без рекламы допустимо использование любого сервиса, однако Cloudflare Pages по-прежнему предпочтительнее отсутствием жестких квот трафика в случае резкого роста популярности игры.'
  }
})
</script>
