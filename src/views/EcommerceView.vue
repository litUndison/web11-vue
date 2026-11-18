<template>
  <div class="space-y-6">
    <!-- Header & Cart Summary -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
      <div>
        <h1 class="heading-gothic text-2xl font-bold tracking-tight text-zinc-100">
          Лавка Торговца & Игровой Арсенал
        </h1>
        <p class="text-xs sm:text-sm text-zinc-400 mt-0.5">
          Официальные дополнения (DLC), мобильные геймпады и золотые яйца выживших
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Cart Pill Button -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-amber-500/30 bg-zinc-900/90 text-xs font-bold text-amber-300 shadow-gold">
          <span>🛒 Корзина:</span>
          <span class="bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-full text-[11px] font-bold">{{ cartCount }}</span>
        </div>
      </div>
    </div>

    <!-- Filter Toolbar -->
    <div class="card-base p-3.5 flex flex-wrap items-center justify-between gap-3 border-amber-500/20 bg-zinc-900/80">
      <div class="flex items-center gap-1.5 flex-wrap">
        <button
          v-for="cat in ['Все', 'DLC Дополнения', 'Оборудование', 'Реликвии']"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-3 py-1 rounded-md text-xs font-bold transition-all"
          :class="selectedCategory === cat
            ? 'bg-amber-500 text-zinc-950 shadow-gold'
            : 'text-zinc-400 hover:text-amber-300 hover:bg-zinc-800'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="w-full sm:w-64">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Поиск по арсеналу..."
          class="input-base text-xs py-1.5"
        />
      </div>
    </div>

    <!-- Product Grid: First Row (3 Products) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="item in firstRowProducts"
        :key="item.id"
        class="card-base p-4 flex flex-col justify-between border-amber-500/20 hover:border-amber-500/40 transition-colors group bg-zinc-900/80"
      >
        <div>
          <!-- Image Box with Badges -->
          <div class="relative overflow-hidden rounded-lg bg-zinc-950 aspect-video flex items-center justify-center mb-3 border border-zinc-800">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-amber-300 border border-amber-500/30">
              {{ item.category }}
            </span>
            <span v-if="item.badge" class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white shadow-blood">
              {{ item.badge }}
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
            <span>★</span>
            <span class="font-bold text-zinc-100">{{ item.rating }}</span>
            <span class="text-zinc-400 text-[11px]">({{ item.reviews }} отзывов)</span>
          </div>

          <h3 class="font-bold text-sm text-zinc-100 leading-snug">{{ item.name }}</h3>
          <p class="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <div class="text-base font-bold font-mono text-amber-400">{{ item.price }} ₽</div>
            <div v-if="item.oldPrice" class="text-xs text-zinc-500 line-through font-mono">{{ item.oldPrice }} ₽</div>
          </div>
          <button @click="addToCart" class="btn-gold btn-sm px-3.5 py-1.5">
            В корзину
          </button>
        </div>
      </div>
    </div>

    <!-- Native AdSlot in Product Feed -->
    <div class="py-1">
      <AdSlot
        format="in-feed"
        label="Партнёрский промо-блок"
        slotTitle="Нативная интеграция Google Play Pass"
        :initialCreative="allCreative"
        :key="'ad-ecom-feed-' + allCreative"
      />
    </div>

    <!-- Product Grid: Second Row (3 Products) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="item in secondRowProducts"
        :key="item.id"
        class="card-base p-4 flex flex-col justify-between border-amber-500/20 hover:border-amber-500/40 transition-colors group bg-zinc-900/80"
      >
        <div>
          <!-- Image Box with Badges -->
          <div class="relative overflow-hidden rounded-lg bg-zinc-950 aspect-video flex items-center justify-center mb-3 border border-zinc-800">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-amber-300 border border-amber-500/30">
              {{ item.category }}
            </span>
            <span v-if="item.badge" class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-zinc-950 shadow-gold">
              {{ item.badge }}
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
            <span>★</span>
            <span class="font-bold text-zinc-100">{{ item.rating }}</span>
            <span class="text-zinc-400 text-[11px]">({{ item.reviews }} отзывов)</span>
          </div>

          <h3 class="font-bold text-sm text-zinc-100 leading-snug">{{ item.name }}</h3>
          <p class="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <div class="text-base font-bold font-mono text-amber-400">{{ item.price }} ₽</div>
            <div v-if="item.oldPrice" class="text-xs text-zinc-500 line-through font-mono">{{ item.oldPrice }} ₽</div>
          </div>
          <button @click="addToCart" class="btn-gold btn-sm px-3.5 py-1.5">
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
    name: 'DLC: Legacy of the Moonspell',
    price: '149',
    oldPrice: '199',
    category: 'DLC Дополнения',
    desc: 'Огромная карта Гора Луны, 8 новых персонажей клана Мунспелл и 13 видов эволюционирующего оружия.',
    image: './img/hero-bg.jpg',
    badge: 'Хит продаж',
    rating: '4.9',
    reviews: 1420
  },
  {
    id: 2,
    name: 'DLC: Tides of the Foscari',
    price: '149',
    oldPrice: '199',
    category: 'DLC Дополнения',
    desc: 'Зачарованная лесная академия Фоскари, 8 магов-выживших и легендарное оружие SpellString.',
    image: './img/gameplay-screen.jpg',
    badge: 'Новинка',
    rating: '4.8',
    reviews: 890
  },
  {
    id: 3,
    name: 'Контроллер Razer Kishi Ultra USB-C',
    price: '9 990',
    oldPrice: '12 500',
    category: 'Оборудование',
    desc: 'Премиальный мобильный контроллер консольного уровня для iPhone 15/16 и Android с тактильной отдачей.',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80',
    badge: 'Официальный выбор',
    rating: '5.0',
    reviews: 640
  },
  {
    id: 4,
    name: 'Коллекционная реплика: Кровавая Слеза',
    price: '3 490',
    oldPrice: '4 200',
    category: 'Реликвии',
    desc: 'Металлическая копия артефакта Bloody Tear на дубовой подставке с гравировкой Ордена Belpaese.',
    image: './img/bloody-tear.jpg',
    badge: 'Лимитировано',
    rating: '4.9',
    reviews: 215
  },
  {
    id: 5,
    name: 'Пакет Торговца: 100 Золотых Яиц',
    price: '299',
    oldPrice: '399',
    category: 'Реликвии',
    desc: 'Мгновенный постоянный прирост характеристик любого персонажа: +HP, +Скорость, +Урон магии.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    badge: 'Буст',
    rating: '4.7',
    reviews: 530
  },
  {
    id: 6,
    name: 'Беспроводные наушники SteelSeries Arctis Nova',
    price: '14 490',
    oldPrice: '16 990',
    category: 'Оборудование',
    desc: '360° пространственный звук Spatial Audio для мгновенного обнаружения приближающихся боссов.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    badge: 'Hi-Res Audio',
    rating: '4.9',
    reviews: 970
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
