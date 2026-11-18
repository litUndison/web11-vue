<template>
  <div class="max-w-2xl mx-auto card-base p-6 sm:p-8 border-zinc-200 dark:border-amber-500/30 bg-white dark:bg-zinc-900/90 shadow-card">
    <div class="mb-6">
      <h2 class="heading-gothic text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Посвящение в Орден Охотников & Cloud Sync ID
      </h2>
      <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
        Регистрация профиля выжившего, привязка платформы и получение стартовых артефактов
      </p>

      <!-- Индикатор прогресса шагов -->
      <div class="mt-5">
        <div class="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">
          <span :class="currentStep >= 1 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''">1. Позывной</span>
          <span :class="currentStep >= 2 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''">2. Платформа</span>
          <span :class="currentStep >= 3 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''">3. Стартовый пак</span>
          <span :class="currentStep >= 4 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''">4. Синхронизация</span>
        </div>
        <div class="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-amber-500 transition-all duration-200 rounded-full shadow-gold"
            :style="{ width: ((currentStep - 1) / 3 * 100) + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Шаг 1: Профиль -->
    <div v-if="currentStep === 1" class="space-y-3.5">
      <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">Шаг 1: Имя и боевой позывной</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Имя охотника</label>
          <input v-model="formData.name" type="text" placeholder="Antonio" class="input-base" />
        </div>
        <div>
          <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Клан / Гильдия</label>
          <input v-model="formData.clan" type="text" placeholder="Belpaese" class="input-base" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Игровой Email для Cloud Sync</label>
        <input v-model="formData.email" type="email" placeholder="hunter@poncle.games" class="input-base" />
      </div>
    </div>

    <!-- Шаг 2: Платформа -->
    <div v-if="currentStep === 2" class="space-y-3.5">
      <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">Шаг 2: Устройство и ориентация управления</h3>
      <div class="space-y-2 text-xs">
        <label
          v-for="plat in platforms"
          :key="plat.id"
          class="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer transition-colors"
          :class="formData.platform === plat.id ? 'border-amber-500 bg-amber-500/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'"
        >
          <input type="radio" v-model="formData.platform" :value="plat.id" name="platform" class="text-amber-500 focus:ring-0" />
          <div class="flex-1">
            <div class="font-bold text-zinc-900 dark:text-zinc-100">{{ plat.title }}</div>
            <div class="text-zinc-500 dark:text-zinc-400 text-[11px]">{{ plat.desc }}</div>
          </div>
        </label>
      </div>
    </div>

    <!-- Шаг 3: Стартовый набор -->
    <div v-if="currentStep === 3" class="space-y-3.5">
      <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">Шаг 3: Стартовый сундук снаряжения</h3>
      <div class="space-y-2.5 text-xs">
        <label
          class="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer transition-colors"
          :class="formData.pack === 'free' ? 'border-amber-500 bg-amber-500/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'"
        >
          <input type="radio" v-model="formData.pack" value="free" name="pack" class="text-amber-500 focus:ring-0" />
          <div>
            <div class="font-bold text-zinc-900 dark:text-zinc-100">Набор Рекрута (Бесплатно • 0 BYN)</div>
            <div class="text-zinc-600 dark:text-zinc-400">Стартовый персонаж Antonio Belpaese + Кнут + 5 000 золотых монет.</div>
          </div>
        </label>
        <label
          class="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer transition-colors"
          :class="formData.pack === 'champion' ? 'border-amber-500 bg-amber-500/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'"
        >
          <input type="radio" v-model="formData.pack" value="champion" name="pack" class="text-amber-500 focus:ring-0" />
          <div>
            <div class="font-bold text-amber-600 dark:text-amber-400">Набор Паладина (9.99 BYN)</div>
            <div class="text-zinc-600 dark:text-zinc-400">Разблокировка 4 персонажей Belpaese + 50 000 золота + 20 Золотых Яиц.</div>
          </div>
        </label>
      </div>
    </div>

    <!-- Шаг 4: Итоговые данные -->
    <div v-if="currentStep === 4" class="space-y-4">
      <div class="text-center py-2">
        <div class="w-12 h-12 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-2 border border-amber-500/40 shadow-gold">
          <!-- Векторная летучая мышь -->
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4c-1.5 2-3 2.5-4.5 2C4.5 5 2 7 2 11c0 3 3 5 4 5s2-2 3-2c1.5 0 2 2 3 2s1.5-2 3-2c1 0 3 2 4 2s4-2 4-5c0-4-2.5-6-5.5-5-1.5.5-3 0-4.5-2z" />
          </svg>
        </div>
        <h3 class="heading-gothic text-base font-bold text-zinc-900 dark:text-zinc-100">Посвящение завершено!</h3>
        <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">Ваш профиль зарегистрирован в глобальной базе охотников</p>
      </div>

      <div class="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-950 text-xs space-y-1.5 border border-zinc-200 dark:border-amber-500/20 text-zinc-800 dark:text-zinc-200">
        <p><strong>Охотник:</strong> {{ formData.name || 'Antonio' }} {{ formData.clan || 'Belpaese' }}</p>
        <p><strong>Cloud Email:</strong> {{ formData.email || 'hunter@poncle.games' }}</p>
        <p><strong>Устройство:</strong> {{ selectedPlatformTitle }}</p>
        <p><strong>Стартовый сундук:</strong> {{ formData.pack === 'champion' ? 'Набор Паладина' : 'Набор Рекрута' }}</p>
        <p class="pt-2 border-t border-zinc-200 dark:border-zinc-800 font-mono text-amber-600 dark:text-amber-400"><strong>Ключ Cloud Sync:</strong> VAMP-{{ syncKey }}-SAVE</p>
      </div>
    </div>

    <!-- Кнопки перехода между шагами -->
    <div class="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
      <button
        v-if="currentStep > 1"
        @click="currentStep--"
        class="btn-secondary btn-sm px-4 py-2"
      >
        ← Назад
      </button>
      <div v-else></div>

      <button
        v-if="currentStep < 4"
        @click="currentStep++"
        class="btn-gold btn-sm px-5 py-2 font-bold"
      >
        <span>Далее</span>
        <span>→</span>
      </button>

      <button
        v-else
        @click="finishRegistration"
        class="btn-gold btn-sm px-5 py-2 font-bold flex items-center gap-1.5"
      >
        <span>Вступить в бой!</span>
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { pushToast, addGold } from '../utils/store.js'
import { playLevelUpSound } from '../utils/audio.js'

const currentStep = ref(1)
const syncKey = ref('8F9K2Q')

const formData = ref({
  name: 'Antonio',
  clan: 'Belpaese',
  email: 'hunter@poncle.games',
  platform: 'ios',
  pack: 'free'
})

const platforms = [
  { id: 'ios', title: 'Apple iOS (iPhone / iPad)', desc: 'Поддержка ProMotion 120 FPS и Metal API' },
  { id: 'android', title: 'Google Android (Смартфоны & Планшеты)', desc: 'Оптимизация под Vulkan API и 90-120 Гц' },
  { id: 'controller', title: 'Геймпад Bluetooth / USB-C (Razer Kishi)', desc: 'Аппаратная раскладка кнопок и вибрация' }
]

const selectedPlatformTitle = computed(() => {
  const p = platforms.find(item => item.id === formData.value.platform)
  return p ? p.title : 'Мобильное устройство'
})

const finishRegistration = () => {
  playLevelUpSound()
  const reward = formData.value.pack === 'champion' ? 50000 : 5000
  addGold(reward)
  pushToast({
    title: 'Посвящение успешно!',
    message: `Добро пожаловать в Орден, ${formData.value.name}! Начислено ${reward.toLocaleString()} G`,
    type: 'gold'
  })
}
</script>
