<template>
  <div class="space-y-6">
    <!-- Header & Cart Summary -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Каталог оборудования и аксессуаров
        </h1>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Адаптивная витрина товаров со встроенной нативной монетизацией In-Feed
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Cart Pill Button -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium shadow-2xs">
          <svg class="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <span class="text-zinc-800 dark:text-zinc-200">Корзина: <strong class="font-semibold">{{ cartCount }}</strong></span>
        </div>
      </div>
    </div>

    <!-- Filter Toolbar -->
    <div class="card-base p-3.5 flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-1.5 flex-wrap">
        <button
          v-for="cat in ['Все', 'Гаджеты', 'Аудио', 'Аксессуары']"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
          :class="selectedCategory === cat
            ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-2xs'
            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="w-full sm:w-64">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Поиск по названию..."
          class="input-base text-xs py-1.5"
        />
      </div>
    </div>

    <!-- Product Grid: First Row (3 Products) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="item in firstRowProducts"
        :key="item.id"
        class="card-base p-4 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
      >
        <div>
          <!-- Image Box with Badges -->
          <div class="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 aspect-square flex items-center justify-center mb-3">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              loading="lazy"
            />
            <span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 shadow-2xs backdrop-blur-xs">
              {{ item.category }}
            </span>
            <span v-if="item.badge" class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-2xs">
              {{ item.badge }}
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
            <span>★</span>
            <span class="font-semibold text-zinc-900 dark:text-zinc-100">{{ item.rating }}</span>
            <span class="text-zinc-400 text-[11px]">({{ item.reviews }})</span>
          </div>

          <h3 class="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{{ item.name }}</h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div class="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">{{ item.price }} ₽</div>
            <div v-if="item.oldPrice" class="text-xs text-zinc-400 line-through font-mono">{{ item.oldPrice }} ₽</div>
          </div>
          <button @click="addToCart" class="btn-primary btn-sm px-3.5 py-1.5">
            Купить
          </button>
        </div>
      </div>
    </div>

    <!-- Native AdSlot in Product Feed -->
    <div class="py-1">
      <AdSlot
        format="in-feed"
        label="Партнёрское размещение"
        slotTitle="Нативная монетизация каталога"
        :initialCreative="allCreative"
        :key="'ad-ecom-feed-' + allCreative"
      />
    </div>

    <!-- Product Grid: Second Row (3 Products) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="item in secondRowProducts"
        :key="item.id"
        class="card-base p-4 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
      >
        <div>
          <!-- Image Box with Badges -->
          <div class="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 aspect-square flex items-center justify-center mb-3">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              loading="lazy"
            />
            <span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 shadow-2xs backdrop-blur-xs">
              {{ item.category }}
            </span>
            <span v-if="item.badge" class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-2xs">
              {{ item.badge }}
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
            <span>★</span>
            <span class="font-semibold text-zinc-900 dark:text-zinc-100">{{ item.rating }}</span>
            <span class="text-zinc-400 text-[11px]">({{ item.reviews }})</span>
          </div>

          <h3 class="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{{ item.name }}</h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div class="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">{{ item.price }} ₽</div>
            <div v-if="item.oldPrice" class="text-xs text-zinc-400 line-through font-mono">{{ item.oldPrice }} ₽</div>
          </div>
          <button @click="addToCart" class="btn-primary btn-sm px-3.5 py-1.5">
            Купить
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
    default: true
  }
})

const cartCount = ref(0)
const selectedCategory = ref('Все')
const searchQuery = ref('')

const addToCart = () => {
  cartCount.value++
}

const products = [
  {
    id: 1,
    name: 'Механическая клавиатура Keychron Pro (75%)',
    price: '11 400',
    oldPrice: '14 200',
    category: 'Гаджеты',
    desc: 'Смазанные линейные свитчи, Hot-Swap, шумоизоляция Poron и кастомные PBT-кейкапы.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    badge: 'Хит',
    rating: '4.9',
    reviews: 142
  },
  {
    id: 2,
    name: 'Смарт-часы Titanium Ultra 49mm',
    price: '16 990',
    oldPrice: '21 500',
    category: 'Гаджеты',
    desc: 'Титановый корпус, сапфировое стекло, мониторинг пульса и до 14 дней на одном заряде.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    badge: 'Новинка',
    rating: '4.8',
    reviews: 89
  },
  {
    id: 3,
    name: 'Кожаный рюкзак Nomad Commuter 24L',
    price: '7 800',
    oldPrice: '9 900',
    category: 'Аксессуары',
    desc: 'Премиальная влагостойкая кожа, защищённый отсек для ноутбука 16" и антивор-замки.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    badge: 'Премиум',
    rating: '5.0',
    reviews: 64
  },
  {
    id: 4,
    name: 'Беспроводные наушники Studio ANC Pro',
    price: '8 990',
    oldPrice: '11 990',
    category: 'Аудио',
    desc: 'Гибридное активное шумоподавление ANC, 40 мм титановые драйверы и кодек LDAC.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    badge: 'Скидка -25%',
    rating: '4.9',
    reviews: 215
  },
  {
    id: 5,
    name: 'Акустическая стереосистема SoundDesk 360',
    price: '6 890',
    oldPrice: '8 500',
    category: 'Аудио',
    desc: 'Панорамный звук 360 градусов, влагозащита IPX7 и поддержка стереопары TWS.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    badge: 'Hi-Res',
    rating: '4.7',
    reviews: 53
  },
  {
    id: 6,
    name: 'Городские кроссовки Aeroknit Trainer',
    price: '9 490',
    oldPrice: '12 990',
    category: 'Аксессуары',
    desc: 'Ультралегкая подошва и дышащий текстиль для комфортных тренировок и работы в офисе.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    badge: 'Выбор года',
    rating: '4.9',
    reviews: 97
  }
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
