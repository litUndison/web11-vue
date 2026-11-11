<template>
  <div class="space-y-6">
    <!-- Header & Cart Summary -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Каталог товаров</span>
          <span class="px-2 py-0.5 text-xs font-bold rounded-md bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">E-Commerce</span>
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Интерактивная сетка товаров с фильтрами по категориям и нативным спонсорским слотом в ленте
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Cart Pill Button -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <span>В корзине: {{ cartCount }} шт.</span>
        </div>
      </div>
    </div>

    <!-- Filter Toolbar -->
    <div class="card-base p-4 flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-1.5 flex-wrap">
        <span class="text-xs text-slate-400 mr-1">Категории:</span>
        <button
          v-for="cat in ['Все', 'Обувь', 'Гаджеты', 'Аксессуары']"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
          :class="selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="w-full sm:w-64">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Поиск по товарам..."
          class="input-base text-xs py-1.5"
        />
      </div>
    </div>

    <!-- Product Grid: First Row (3 Products) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in firstRowProducts" :key="item.id" class="card-base card-hover p-4 flex flex-col justify-between group">
        <div>
          <div class="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 aspect-square flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform duration-300">
            <span>{{ item.emoji }}</span>
            <span class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 shadow-sm">
              {{ item.category }}
            </span>
          </div>

          <h3 class="font-bold text-sm text-slate-900 dark:text-white">{{ item.name }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{{ item.desc }}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span class="text-base font-extrabold text-indigo-600 dark:text-indigo-400">{{ item.price }} ₽</span>
          <button @click="addToCart" class="btn-primary btn-sm text-xs py-1">
            В корзину
          </button>
        </div>
      </div>
    </div>

    <!-- Native AdSlot in Product Feed (Task 1 Шаг 3: In-Feed Slot) -->
    <div class="py-2">
      <AdSlot
        format="in-feed"
        label="Рекламное место в каталоге"
        slotTitle="Спонсорский блок в ленте товаров"
        :initialCreative="allCreative"
        :key="'ad-ecom-feed-' + allCreative"
      />
    </div>

    <!-- Product Grid: Second Row (3 Products) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in secondRowProducts" :key="item.id" class="card-base card-hover p-4 flex flex-col justify-between group">
        <div>
          <div class="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 aspect-square flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform duration-300">
            <span>{{ item.emoji }}</span>
            <span class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 shadow-sm">
              {{ item.category }}
            </span>
          </div>

          <h3 class="font-bold text-sm text-slate-900 dark:text-white">{{ item.name }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{{ item.desc }}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span class="text-base font-extrabold text-indigo-600 dark:text-indigo-400">{{ item.price }} ₽</span>
          <button @click="addToCart" class="btn-primary btn-sm text-xs py-1">
            В корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdSlot from '../components/AdSlot.vue'

defineProps({
  allCreative: {
    type: Boolean,
    default: false
  }
})

const cartCount = ref(0)
const selectedCategory = ref('Все')
const searchQuery = ref('')

const addToCart = () => {
  cartCount.value++
}

const products = [
  { id: 1, name: 'Кроссовки Nova Runner Pro', price: '8 490', category: 'Обувь', desc: 'Ультралегкая подошва и дышащая мембрана для марафонов.', emoji: '👟' },
  { id: 2, name: 'Смарт-часы ChronoTech 4', price: '14 990', category: 'Гаджеты', desc: 'AMOLED экран, мониторинг ЭКГ и 14 дней автономности.', emoji: '⌚' },
  { id: 3, name: 'Кожаный рюкзак Nomad Urban', price: '6 200', category: 'Аксессуары', desc: 'Водоотталкивающая ткань и отделение для ноутбука 16".', emoji: '🎒' },
  { id: 4, name: 'Беспроводные наушники SoundCore Pro', price: '7 990', category: 'Гаджеты', desc: 'Активное шумоподавление ANC и Hi-Res Audio.', emoji: '🎧' },
  { id: 5, name: 'Кеды Canvas Vintage White', price: '4 500', category: 'Обувь', desc: 'Классический ретро-стиль из 100% органического хлопка.', emoji: '👟' },
  { id: 6, name: 'Минималистичный картхолдер Slim', price: '1 890', category: 'Аксессуары', desc: 'Алюминиевый корпус с RFID-защитой от сканирования.', emoji: '💳' }
]

const filtered = computed(() => {
  return products.filter(p => {
    const matchCat = selectedCategory.value === 'Все' || p.category === selectedCategory.value
    const matchQuery = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCat && matchQuery
  })
})

const firstRowProducts = computed(() => filtered.value.slice(0, 3))
const secondRowProducts = computed(() => filtered.value.slice(3))
</script>

