<template>
  <div class="max-w-3xl mx-auto card-base p-6 sm:p-8">
    <div class="mb-8">
      <h2 class="text-2xl font-black text-slate-900 dark:text-white">Многошаговая форма регистрации</h2>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Пошаговое оформление заказа и подписки на услуги хостинга (Task 4.2)
      </p>

      <!-- Stepper Progress Bar -->
      <div class="mt-6">
        <div class="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span :class="currentStep >= 1 ? 'text-indigo-600 dark:text-indigo-400' : ''">1. Профиль</span>
          <span :class="currentStep >= 2 ? 'text-indigo-600 dark:text-indigo-400' : ''">2. Адрес</span>
          <span :class="currentStep >= 3 ? 'text-indigo-600 dark:text-indigo-400' : ''">3. Оплата</span>
          <span :class="currentStep >= 4 ? 'text-indigo-600 dark:text-indigo-400' : ''">4. Финал</span>
        </div>
        <div class="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 rounded-full"
            :style="{ width: ((currentStep - 1) / 3 * 100) + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Step 1: Profile -->
    <div v-if="currentStep === 1" class="space-y-4">
      <h3 class="text-base font-bold text-slate-900 dark:text-white">Шаг 1: Персональные данные</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Имя</label>
          <input v-model="formData.name" type="text" placeholder="Иван" class="input-base" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Фамилия</label>
          <input v-model="formData.surname" type="text" placeholder="Иванов" class="input-base" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Электронная почта</label>
        <input v-model="formData.email" type="email" placeholder="eugene@example.com" class="input-base" />
      </div>
    </div>

    <!-- Step 2: Address -->
    <div v-if="currentStep === 2" class="space-y-4">
      <h3 class="text-base font-bold text-slate-900 dark:text-white">Шаг 2: Адресные данные</h3>
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Город</label>
        <input v-model="formData.city" type="text" placeholder="Москва" class="input-base" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Улица и дом</label>
        <input v-model="formData.street" type="text" placeholder="ул. Ленина, д. 10" class="input-base" />
      </div>
    </div>

    <!-- Step 3: Payment -->
    <div v-if="currentStep === 3" class="space-y-4">
      <h3 class="text-base font-bold text-slate-900 dark:text-white">Шаг 3: Способ монетизации и оплаты</h3>
      <div class="space-y-2 text-xs">
        <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <input type="radio" v-model="formData.plan" value="free" name="plan" class="text-indigo-600" />
          <div>
            <div class="font-bold text-slate-900 dark:text-white">Бесплатный тариф (0 ₽)</div>
            <div class="text-slate-500">Cloudflare Pages безлимитная полоса</div>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <input type="radio" v-model="formData.plan" value="pro" name="plan" class="text-indigo-600" />
          <div>
            <div class="font-bold text-slate-900 dark:text-white">Pro Developer (1 490 ₽)</div>
            <div class="text-slate-500">Кастомный домен, SSL и интеграция РСЯ</div>
          </div>
        </label>
      </div>
    </div>

    <!-- Step 4: Summary -->
    <div v-if="currentStep === 4" class="space-y-4">
      <div class="text-center py-4">
        <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xl mx-auto mb-2">
          ✓
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Данные успешно заполнены!</h3>
        <p class="text-xs text-slate-500 mt-1">Проверьте сводную информацию перед отправкой</p>
      </div>

      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
        <p><strong>Пользователь:</strong> {{ formData.name || 'Eugene' }} {{ formData.surname || 'Student' }}</p>
        <p><strong>Email:</strong> {{ formData.email || 'eugene@example.com' }}</p>
        <p><strong>Адрес:</strong> {{ formData.city || 'Москва' }}, {{ formData.street || 'ул. Студенческая' }}</p>
        <p><strong>Выбранный план:</strong> {{ formData.plan === 'pro' ? 'Pro Developer' : 'Бесплатный тариф' }}</p>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
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
        class="btn-primary btn-sm bg-emerald-600 hover:bg-emerald-700"
      >
        Завершить регистрацию
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentStep = ref(1)

const formData = reactive({
  name: 'Eugene',
  surname: 'Student',
  email: 'eugene@web-practice.dev',
  city: 'Москва',
  street: 'ул. Веб-разработки, д. 11',
  plan: 'free'
})

const submitForm = () => {
  alert('Форма успешно отправлена! Все шаги подтверждены.')
  currentStep.value = 1
}
</script>
