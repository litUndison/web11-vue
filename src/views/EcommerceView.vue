<template>
  <div class="space-y-8">
    <!-- Header & Cart Summary -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1f293d]">
      <div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-2">
          E-Commerce витрина
        </div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Каталог продукции</span>
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Интерактивная сетка товаров с фильтрами по категориям и нативным спонсорским слотом в ленте
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Cart Pill Button -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-950/60 dark:to-purple-950/60 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold shadow-sm">
          <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <span>В корзине: {{ cartCount }} шт.</span>
        </div>
      </div>
    </div>

    <!-- Filter Toolbar -->
    <div class="card-base p-4 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs text-slate-400 font-bold mr-1">Фильтр:</span>
        <button
          v-for="cat in ['Все', 'Обувь', 'Гаджеты', 'Аксессуары']"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
          :class="selectedCategory === cat
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
            : 'bg-slate-100 dark:bg-[#030712] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#1f293d]'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="w-full sm:w-72">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Поиск по товарам..."
          class="input-base text-xs py-2"
        />
      </div>
    </div>

    <!-- Product Grid: First Row (3 Products) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in firstRowProducts" :key="item.id" class="card-base card-hover p-5 flex flex-col justify-between group">
        <div>
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#030712] dark:to-[#0f172a] aspect-square flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform duration-300 border border-slate-200/50 dark:border-[#1f293d]/50">
            <span>{{ item.emoji }}</span>
            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 dark:bg-[#0b1120]/90 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-[#1f293d]">
              {{ item.category }}
            </span>
          </div>

          <h3 class="font-extrabold text-base text-slate-900 dark:text-white">{{ item.name }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 dark:border-[#1f293d] flex items-center justify-between">
          <span class="text-lg font-black text-indigo-600 dark:text-indigo-400">{{ item.price }} ₽</span>
          <button @click="addToCart" class="btn-primary btn-sm text-xs py-1.5 px-3.5">
            В корзину
          </button>
        </div>
      </div>
    </div>

    <!-- Native AdSlot in Product Feed -->
    <div class="py-2">
      <AdSlot
        format="in-feed"
        label="Спонсорский блок в каталоге"
        slotTitle="Нативное размещение в продуктовой ленте"
        :initialCreative="allCreative"
        :key="'ad-ecom-feed-' + allCreative"
      />
    </div>

    <!-- Product Grid: Second Row (3 Products) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in secondRowProducts" :key="item.id" class="card-base card-hover p-5 flex flex-col justify-between group">
        <div>
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#030712] dark:to-[#0f172a] aspect-square flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform duration-300 border border-slate-200/50 dark:border-[#1f293d]/50">
            <span>{{ item.emoji }}</span>
            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 dark:bg-[#0b1120]/90 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-[#1f293d]">
              {{ item.category }}
            </span>
          </div>

          <h3 class="font-extrabold text-base text-slate-900 dark:text-white">{{ item.name }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 dark:border-[#1f293d] flex items-center justify-between">
          <span class="text-lg font-black text-indigo-600 dark:text-indigo-400">{{ item.price }} ₽</span>
          <button @click="addToCart" class="btn-primary btn-sm text-xs py-1.5 px-3.5">
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
  { id: 4, name: 'Наушники SoundCore Pro ANC', price: '7 990', category: 'Гаджеты', desc: 'Активное шумоподавление ANC и Hi-Res Audio.', emoji: '🎧' },
  { id: 5, name: 'Кеды Canvas Vintage White', price: '4 500', category: 'Обувь', desc: 'Классический ретро-стиль из 100% органического хлопка.', emoji: '👟' },
  { id: 6, name: 'Картхолдер Slim Aluminum', price: '1 890', category: 'Аксессуары', desc: 'Алюминиевый корпус с RFID-защитой от сканирования.', emoji: '💳' }
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
