<template>
  <div class="max-w-2xl mx-auto card-base p-6 sm:p-8">
    <div class="mb-6">
      <h2 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Онбординг и оформление тарифа
      </h2>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
        Пошаговая настройка профиля разработчика и выбор модели монетизации
      </p>

      <!-- Stepper Progress Bar -->
      <div class="mt-5">
        <div class="flex items-center justify-between text-xs font-medium text-zinc-500 mb-2">
          <span :class="currentStep >= 1 ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''">1. Профиль</span>
          <span :class="currentStep >= 2 ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''">2. Адрес</span>
          <span :class="currentStep >= 3 ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''">3. Тариф</span>
          <span :class="currentStep >= 4 ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''">4. Подтверждение</span>
        </div>
        <div class="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-indigo-600 transition-all duration-200 rounded-full"
            :style="{ width: ((currentStep - 1) / 3 * 100) + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Step 1: Profile -->
    <div v-if="currentStep === 1" class="space-y-3.5">
      <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Шаг 1: Персональные данные</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Имя</label>
          <input v-model="formData.name" type="text" placeholder="Иван" class="input-base" />
        </div>
        <div>
          <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Фамилия</label>
          <input v-model="formData.surname" type="text" placeholder="Иванов" class="input-base" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Корпоративный Email</label>
        <input v-model="formData.email" type="email" placeholder="a.voronov@technova.io" class="input-base" />
      </div>
    </div>

    <!-- Step 2: Address -->
    <div v-if="currentStep === 2" class="space-y-3.5">
      <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Шаг 2: Адресные реквизиты</h3>
      <div>
        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Город</label>
        <input v-model="formData.city" type="text" placeholder="Москва" class="input-base" />
      </div>
      <div>
        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Улица и офис</label>
        <input v-model="formData.street" type="text" placeholder="Пресненская наб., д. 12" class="input-base" />
      </div>
    </div>

    <!-- Step 3: Payment -->
    <div v-if="currentStep === 3" class="space-y-3.5">
      <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Шаг 3: Модель монетизации и план</h3>
      <div class="space-y-2 text-xs">
        <label class="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
          <input type="radio" v-model="formData.plan" value="free" name="plan" class="text-indigo-600 focus:ring-0" />
          <div>
            <div class="font-semibold text-zinc-900 dark:text-zinc-100">Бесплатный тариф (0 ₽)</div>
            <div class="text-zinc-500">Cloudflare Pages безлимитная полоса</div>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
          <input type="radio" v-model="formData.plan" value="pro" name="plan" class="text-indigo-600 focus:ring-0" />
          <div>
            <div class="font-semibold text-zinc-900 dark:text-zinc-100">Pro Developer (1 490 ₽/мес)</div>
            <div class="text-zinc-500">Кастомный домен, SSL, AdSlot SDK и РСЯ</div>
          </div>
        </label>
      </div>
    </div>

    <!-- Step 4: Summary -->
    <div v-if="currentStep === 4" class="space-y-4">
      <div class="text-center py-2">
        <div class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg mx-auto mb-2 border border-emerald-500/20">
          ✓
        </div>
        <h3 class="text-base font-bold text-zinc-900 dark:text-zinc-100">Данные успешно заполнены!</h3>
        <p class="text-xs text-zinc-500 mt-0.5">Проверьте сводную информацию перед подтверждением</p>
      </div>

      <div class="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 text-xs space-y-1.5 border border-zinc-200 dark:border-zinc-800">
        <p><strong>Пользователь:</strong> {{ formData.name || 'Александр' }} {{ formData.surname || 'Воронов' }}</p>
        <p><strong>Email:</strong> {{ formData.email || 'a.voronov@technova.io' }}</p>
        <p><strong>Адрес:</strong> {{ formData.city || 'Москва' }}, {{ formData.street || 'Пресненская наб., д. 12' }}</p>
        <p><strong>Тариф:</strong> {{ formData.plan === 'pro' ? 'Pro Developer' : 'Бесплатный тариф' }}</p>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
      <button
        v-if="currentStep > 1"
        @click="currentStep--"
        class="btn-secondary btn-sm"
      >
        ← Назад
      </button>
      <div v-else></div>

      <button
        v-if="currentStep < 4"
        @click="currentStep++"
        class="btn-primary btn-sm"
      >
        Далее →
      </button>
      <button
        v-else
        @click="submitForm"
        class="btn-primary btn-sm"
      >
        Подтвердить заказ
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentStep = ref(1)

const formData = reactive({
  name: 'Александр',
  surname: 'Воронов',
  email: 'a.voronov@technova.io',
  city: 'Москва',
  street: 'Пресненская наб., д. 12 (Москва-Сити)',
  plan: 'pro'
})

const submitForm = () => {
  alert('Заказ успешно подтверждён!')
  currentStep.value = 1
}
</script>
