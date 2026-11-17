<template>
  <div class="space-y-8">
    <!-- Header & Cart Summary -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#17342b]">
      <div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-[#0e221c] text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-2">
          E-Commerce витрина
        </div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Каталог продукции</span>
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-emerald-100/70 mt-1">
          Интерактивная сетка товаров с фильтрами по категориям и нативным спонсорским слотом в ленте
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Cart Pill Button -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-[#0e221c] dark:to-[#081612] border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shadow-sm">
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-sm'
            : 'bg-slate-100 dark:bg-[#040d0a] text-slate-600 dark:text-emerald-200 hover:bg-slate-200 dark:hover:bg-[#0e221c] border border-slate-200 dark:border-[#17342b]'"
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
      <div v-for="item in firstRowProducts" :key="item.id" class="card-base card-hover p-4 sm:p-5 flex flex-col justify-between group">
        <div>
          <!-- Image Box with Badges -->
          <div class="relative overflow-hidden rounded-2xl bg-[#081612] aspect-square flex items-center justify-center mb-4 border border-slate-200/50 dark:border-[#17342b]/50">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 dark:bg-[#081612]/90 text-slate-800 dark:text-emerald-200 shadow-sm border border-slate-200 dark:border-[#17342b]">
              {{ item.category }}
            </span>
            <span v-if="item.badge" class="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md">
              {{ item.badge }}
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
            <span>★</span>
            <span class="font-bold text-slate-800 dark:text-white">{{ item.rating }}</span>
            <span class="text-slate-400 text-[11px]">({{ item.reviews }} отзывов)</span>
          </div>

          <h3 class="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{{ item.name }}</h3>
          <p class="text-xs text-slate-500 dark:text-emerald-100/70 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 dark:border-[#17342b] flex items-center justify-between">
          <div>
            <div class="text-lg font-black text-emerald-600 dark:text-emerald-400">{{ item.price }} ₽</div>
            <div v-if="item.oldPrice" class="text-xs text-slate-400 line-through">{{ item.oldPrice }} ₽</div>
          </div>
          <button @click="addToCart" class="btn-primary btn-sm text-xs py-2 px-4 shadow-glow-emerald">
            В корзину
          </button>
        </div>
      </div>
    </div>

    <!-- Native AdSlot in Product Feed -->
    <div class="py-2">
      <AdSlot
        format="in-feed"
        label="Партнерское размещение"
        slotTitle="Нативная монетизация каталога"
        :initialCreative="allCreative"
        :key="'ad-ecom-feed-' + allCreative"
      />
    </div>

    <!-- Product Grid: Second Row (3 Products) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in secondRowProducts" :key="item.id" class="card-base card-hover p-4 sm:p-5 flex flex-col justify-between group">
        <div>
          <!-- Image Box with Badges -->
          <div class="relative overflow-hidden rounded-2xl bg-[#081612] aspect-square flex items-center justify-center mb-4 border border-slate-200/50 dark:border-[#17342b]/50">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 dark:bg-[#081612]/90 text-slate-800 dark:text-emerald-200 shadow-sm border border-slate-200 dark:border-[#17342b]">
              {{ item.category }}
            </span>
            <span v-if="item.badge" class="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md">
              {{ item.badge }}
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
            <span>★</span>
            <span class="font-bold text-slate-800 dark:text-white">{{ item.rating }}</span>
            <span class="text-slate-400 text-[11px]">({{ item.reviews }} отзывов)</span>
          </div>

          <h3 class="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{{ item.name }}</h3>
          <p class="text-xs text-slate-500 dark:text-emerald-100/70 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 dark:border-[#17342b] flex items-center justify-between">
          <div>
            <div class="text-lg font-black text-emerald-600 dark:text-emerald-400">{{ item.price }} ₽</div>
            <div v-if="item.oldPrice" class="text-xs text-slate-400 line-through">{{ item.oldPrice }} ₽</div>
          </div>
          <button @click="addToCart" class="btn-primary btn-sm text-xs py-2 px-4 shadow-glow-emerald">
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
  {
    id: 1,
    name: 'Кроссовки Cyber Runner X Pro',
    price: '9 490',
    oldPrice: '12 990',
    category: 'Обувь',
    desc: 'Ультралегкая карбоновая пластина и адаптивная амортизация для марафонских дистанций.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    badge: 'Хит продаж',
    rating: '4.9',
    reviews: 142
  },
  {
    id: 2,
    name: 'Смарт-часы ChronoTech Titanium Ultra',
    price: '16 990',
    oldPrice: '21 500',
    category: 'Гаджеты',
    desc: 'Титановый корпус, сапфировое стекло, мониторинг ЭКГ и до 14 дней на одном заряде.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    badge: 'Новинка',
    rating: '4.8',
    reviews: 89
  },
  {
    id: 3,
    name: 'Кожаный рюкзак Nomad Stealth Pack',
    price: '7 800',
    oldPrice: '9 900',
    category: 'Аксессуары',
    desc: 'Премиальная влагостойкая кожа Nappa, защищённый отсек для ноутбука 16" и антивор-замки.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    badge: 'Премиум',
    rating: '5.0',
    reviews: 64
  },
  {
    id: 4,
    name: 'Беспроводные наушники SoundCore Studio ANC',
    price: '8 990',
    oldPrice: '11 990',
    category: 'Гаджеты',
    desc: 'Активное шумоподавление ANC гибридного типа, 40 мм титановые драйверы и LDAC кодек.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    badge: 'Скидка -25%',
    rating: '4.9',
    reviews: 215
  },
  {
    id: 5,
    name: 'Механическая клавиатура Matrix RGB Pro',
    price: '11 400',
    oldPrice: '14 200',
    category: 'Гаджеты',
    desc: 'Смазанные линейные свитчи, Hot-Swap, шумоизоляция Poron и кастомные PBT-кейкапы.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    badge: 'Выбор геймеров',
    rating: '4.9',
    reviews: 97
  },
  {
    id: 6,
    name: 'Акустическая система Studio Bass 360',
    price: '6 890',
    oldPrice: '8 500',
    category: 'Аксессуары',
    desc: 'Панорамный объёмный звук 360 градусов, водозащита IPX7 и поддержка стереопары TWS.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    badge: 'Hi-Res',
    rating: '4.7',
    reviews: 53
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
