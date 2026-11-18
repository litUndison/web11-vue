<template>
  <div class="max-w-2xl mx-auto card-base p-6 sm:p-8 border-amber-500/30 bg-zinc-900/90 shadow-card">
    <div class="mb-6">
      <h2 class="heading-gothic text-xl font-bold tracking-tight text-zinc-100">
        Посвящение в Орден Охотников & Cloud Sync ID
      </h2>
      <p class="text-xs text-zinc-400 mt-0.5">
        Регистрация профиля выжившего, привязка платформы и получение стартовых артефактов
      </p>

      <!-- Stepper Progress Bar -->
      <div class="mt-5">
        <div class="flex items-center justify-between text-xs font-bold text-zinc-400 mb-2">
          <span :class="currentStep >= 1 ? 'text-amber-400 font-bold' : ''">1. Позывной</span>
          <span :class="currentStep >= 2 ? 'text-amber-400 font-bold' : ''">2. Платформа</span>
          <span :class="currentStep >= 3 ? 'text-amber-400 font-bold' : ''">3. Стартовый пак</span>
          <span :class="currentStep >= 4 ? 'text-amber-400 font-bold' : ''">4. Синхронизация</span>
        </div>
        <div class="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-amber-500 transition-all duration-200 rounded-full shadow-gold"
            :style="{ width: ((currentStep - 1) / 3 * 100) + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Step 1: Profile -->
    <div v-if="currentStep === 1" class="space-y-3.5">
      <h3 class="text-sm font-bold text-zinc-100">Шаг 1: Имя и боевой позывной</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-zinc-300 mb-1">Имя охотника</label>
          <input v-model="formData.name" type="text" placeholder="Antonio" class="input-base" />
        </div>
        <div>
          <label class="block text-xs font-medium text-zinc-300 mb-1">Клан / Гильдия</label>
          <input v-model="formData.clan" type="text" placeholder="Belpaese" class="input-base" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-medium text-zinc-300 mb-1">Игровой Email для Cloud Sync</label>
        <input v-model="formData.email" type="email" placeholder="hunter@poncle.games" class="input-base" />
      </div>
    </div>

    <!-- Step 2: Platform -->
    <div v-if="currentStep === 2" class="space-y-3.5">
      <h3 class="text-sm font-bold text-zinc-100">Шаг 2: Устройство и ориентация управления</h3>
      <div class="space-y-2 text-xs">
        <label
          v-for="plat in platforms"
          :key="plat.id"
          class="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 cursor-pointer transition-colors"
          :class="formData.platform === plat.id ? 'border-amber-400 bg-amber-500/10' : 'hover:bg-zinc-800/40'"
        >
          <input type="radio" v-model="formData.platform" :value="plat.id" name="platform" class="text-amber-500 focus:ring-0" />
          <div class="flex-1">
            <div class="font-bold text-zinc-100">{{ plat.title }}</div>
            <div class="text-zinc-400 text-[11px]">{{ plat.desc }}</div>
          </div>
        </label>
      </div>
    </div>

    <!-- Step 3: Starter Pack -->
    <div v-if="currentStep === 3" class="space-y-3.5">
      <h3 class="text-sm font-bold text-zinc-100">Шаг 3: Стартовый сундук снаряжения</h3>
      <div class="space-y-2.5 text-xs">
        <label
          class="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 cursor-pointer transition-colors"
          :class="formData.pack === 'free' ? 'border-amber-400 bg-amber-500/10' : 'hover:bg-zinc-800/40'"
        >
          <input type="radio" v-model="formData.pack" value="free" name="pack" class="text-amber-500 focus:ring-0" />
          <div>
            <div class="font-bold text-zinc-100">Набор Рекрута (Бесплатно • 0 ₽)</div>
            <div class="text-zinc-400">Стартовый персонаж Antonio Belpaese + Кнут + 5 000 золотых монет.</div>
          </div>
        </label>
        <label
          class="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 cursor-pointer transition-colors"
          :class="formData.pack === 'champion' ? 'border-amber-400 bg-amber-500/10' : 'hover:bg-zinc-800/40'"
        >
          <input type="radio" v-model="formData.pack" value="champion" name="pack" class="text-amber-500 focus:ring-0" />
          <div>
            <div class="font-bold text-amber-400">Набор Паладина (299 ₽)</div>
            <div class="text-zinc-400">Разблокировка 4 персонажей Belpaese + 50 000 золота + 20 Золотых Яиц.</div>
          </div>
        </label>
      </div>
    </div>

    <!-- Step 4: Summary -->
    <div v-if="currentStep === 4" class="space-y-4">
      <div class="text-center py-2">
        <div class="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl mx-auto mb-2 border border-amber-500/40 shadow-gold">
          🦇
        </div>
        <h3 class="heading-gothic text-base font-bold text-zinc-100">Посвящение завершено!</h3>
        <p class="text-xs text-zinc-400 mt-0.5">Ваш профиль зарегистрирован в глобальной базе охотников</p>
      </div>

      <div class="p-4 rounded-lg bg-zinc-950 text-xs space-y-1.5 border border-amber-500/20">
        <p><strong>Охотник:</strong> {{ formData.name || 'Antonio' }} {{ formData.clan || 'Belpaese' }}</p>
        <p><strong>Cloud Email:</strong> {{ formData.email || 'hunter@poncle.games' }}</p>
        <p><strong>Устройство:</strong> {{ selectedPlatformTitle }}</p>
        <p><strong>Стартовый сундук:</strong> {{ formData.pack === 'champion' ? 'Набор Паладина' : 'Набор Рекрута' }}</p>
        <p class="pt-2 border-t border-zinc-800 font-mono text-amber-400"><strong>Ключ Cloud Sync:</strong> VAMP-{{ Math.random().toString(36).substring(2, 8).toUpperCase() }}-SAVE</p>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
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
        class="btn-gold btn-sm px-5 py-2 font-bold"
      >
        <span>Вступить в бой!</span>
        <span>⚔️</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(1)

const formData = ref({
  name: 'Antonio',
  clan: 'Belpaese',
  email: 'hunter@poncle.games',
  platform: 'ios',
  pack: 'free'
})

const platforms = [
  { id: 'ios', title: 'Apple iOS (iPhone / iPad)', desc: 'Поддержка ProMotion 120 FPS и Metal API' },
  { id: 'android', title: 'Google Android (Galaxy / Pixel)', desc: 'Оптимизация Vulkan API и геймпады USB-C' },
  { id: 'deck', title: 'Steam Deck / Портативный ПК', desc: 'Синхронизация сохранений Steam Cloud' }
]

const selectedPlatformTitle = computed(() => {
  return platforms.find(p => p.id === formData.platform.value)?.title || 'Apple iOS (iPhone)'
})

const finishRegistration = () => {
  alert('Профиль охотника активирован! Облачное сохранение синхронизировано.')
}
</script>
