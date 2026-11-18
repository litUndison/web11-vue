<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none"
    @click.self="close"
  >
    <div
      class="relative w-full max-w-md rounded-2xl border border-amber-500/50 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-zinc-100 p-6 shadow-2xl text-center space-y-5 overflow-hidden animate-in fade-in zoom-in-95"
    >
      <!-- Фоновое свечение -->
      <div
        v-if="isOpened"
        class="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-red-500/10 to-transparent animate-pulse"
      ></div>

      <!-- Кнопка закрытия -->
      <button
        @click="close"
        class="absolute top-3 right-3 text-zinc-400 hover:text-amber-400 p-1.5 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <div class="space-y-1">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
          <span>Сундук с добычей</span>
        </div>
        <h3 class="heading-gothic text-xl font-bold text-amber-400">
          {{ isOpened ? 'Трофеи Выжившего!' : 'Тайный Сундук с Лутом' }}
        </h3>
        <p class="text-xs text-zinc-400">
          {{ isOpened ? 'Вы получили редкое супероружие и золото' : 'Нажмите на сундук, чтобы сорвать печать и забрать награду' }}
        </p>
      </div>

      <!-- Область сундука -->
      <div class="py-6 flex flex-col items-center justify-center relative">
        <!-- Закрытое состояние -->
        <div
          v-if="!isOpened"
          @click="openChest"
          class="cursor-pointer group flex flex-col items-center"
        >
          <div
            class="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-zinc-950 shadow-gold transition-transform duration-200 group-hover:scale-110 active:scale-95 border-2 border-amber-300"
            :class="isShaking ? 'animate-bounce' : ''"
          >
            <svg class="w-14 h-14 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <span class="mt-4 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-zinc-950 shadow-gold group-hover:brightness-110 transition-all">
            Открыть сундук (Бесплатно)
          </span>
        </div>

        <!-- Открытое состояние с наградой -->
        <div v-else class="space-y-4 animate-in zoom-in-50 duration-300 flex flex-col items-center">
          <!-- Карточка выпавшего предмета -->
          <div class="relative p-4 rounded-xl border border-amber-400 bg-zinc-900/90 shadow-gold max-w-xs w-full flex items-center gap-3 text-left">
            <div class="w-14 h-14 rounded-lg bg-zinc-950 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
              <svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div class="min-w-0">
              <span class="text-[9px] font-mono uppercase font-bold text-amber-400 px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30">
                {{ currentReward.rarity }}
              </span>
              <h4 class="font-bold text-sm text-zinc-100 truncate mt-1">{{ currentReward.name }}</h4>
              <p class="text-[11px] text-zinc-400 line-clamp-2 leading-tight mt-0.5">{{ currentReward.desc }}</p>
            </div>
          </div>

          <!-- Награда золотом -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <svg class="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
              <text x="10" y="14" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle" fill="currentColor">G</text>
            </svg>
            <span>Получено золота:</span>
            <span class="text-sm font-mono text-amber-400">+{{ currentReward.gold }} G</span>
          </div>

          <!-- Кнопки действий -->
          <div class="flex items-center gap-2 pt-2">
            <button
              @click="resetChest"
              class="btn-secondary btn-sm px-4 py-2 text-xs"
            >
              Открыть ещё раз
            </button>
            <button
              @click="claimAndClose"
              class="btn-gold btn-sm px-5 py-2 text-xs font-bold"
            >
              Забрать в инвентарь
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isChestModalOpen, closeChestModal, addGold, pushToast } from '../utils/store.js'

const isOpen = isChestModalOpen
const isOpened = ref(false)
const isShaking = ref(false)

// Список возможных наград
const rewardsList = [
  {
    name: 'Кровавая Слеза (Bloody Tear)',
    rarity: 'Легендарное',
    gold: 5000,
    desc: 'Эволюция Кнута. Критические удары и вампирический хил +8 HP за удар.'
  },
  {
    name: 'Священная Палочка (Holy Wand)',
    rarity: 'Эпическое',
    gold: 3500,
    desc: 'Эволюция Палочки. Непрерывный пулеметный шквал снарядов без перезарядки.'
  },
  {
    name: 'Пожиратель Душ (Soul Eater)',
    rarity: 'Легендарное',
    gold: 4200,
    desc: 'Эволюция Чеснока. Расширяющаяся аура, поглощающая жизненную силу врагов.'
  },
  {
    name: 'Знак Победы (Victory Sword)',
    rarity: 'Мифическое',
    gold: 7500,
    desc: 'Рассекает пространство и уничтожает экран нежити волной чистой ярости.'
  },
  {
    name: 'Золотое Яйцо Охотника (x10)',
    rarity: 'Реликвия',
    gold: 2500,
    desc: 'Постоянное усиление базовых характеристик скорости и урона.'
  }
]

const currentReward = ref(rewardsList[0])

// Анимация и открытие сундука
const openChest = () => {
  if (isShaking.value || isOpened.value) return
  isShaking.value = true

  setTimeout(() => {
    isShaking.value = false
    isOpened.value = true
    const rand = Math.floor(Math.random() * rewardsList.length)
    currentReward.value = rewardsList[rand]
    addGold(currentReward.value.gold)
  }, 400)
}

// Сброс состояния сундука
const resetChest = () => {
  isOpened.value = false
  isShaking.value = false
}

// Получение награды и закрытие
const claimAndClose = () => {
  pushToast({
    title: 'Трофей получен',
    message: `${currentReward.value.name} добавлен в арсенал (+${currentReward.value.gold} G)`,
    type: 'gold'
  })
  close()
}

// Закрытие модального окна
const close = () => {
  closeChestModal()
  setTimeout(() => {
    resetChest()
  }, 300)
}
</script>
