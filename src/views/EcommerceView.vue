<template>
  <div class="space-y-6">
    <!-- Шапка раздела и корзина -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-amber-500/20">
      <div>
        <h1 class="heading-gothic text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Лавка Торговца & Игровой Арсенал
        </h1>
        <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
          Официальные дополнения (DLC), мобильные геймпады и золотые яйца выживших
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Индикатор корзины с векторной иконкой -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-amber-500/40 bg-zinc-100 dark:bg-zinc-900/90 text-xs font-bold text-amber-700 dark:text-amber-300 shadow-gold">
          <svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>Корзина:</span>
          <span class="bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-full text-[11px] font-bold">{{ cartCount }}</span>
        </div>
      </div>
    </div>

    <!-- Панель фильтров и поиска -->
    <div class="card-base p-3.5 flex flex-wrap items-center justify-between gap-3 border-zinc-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900/80 shadow-xs">
      <div class="flex items-center gap-1.5 flex-wrap">
        <button
          v-for="cat in ['Все', 'DLC Дополнения', 'Оборудование', 'Реликвии']"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-3 py-1 rounded-md text-xs font-bold transition-all"
          :class="selectedCategory === cat
            ? 'bg-amber-500 text-zinc-950 shadow-gold'
            : 'text-zinc-600 hover:text-amber-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-amber-300 dark:hover:bg-zinc-800'"
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

    <!-- Сетка товаров: первый ряд -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="item in firstRowProducts"
        :key="item.id"
        class="card-base p-4 flex flex-col justify-between border-zinc-200 dark:border-amber-500/20 hover:border-amber-500/40 transition-colors group bg-white dark:bg-zinc-900/80 shadow-xs"
      >
        <div>
          <!-- Изображение товара и метки -->
          <div class="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-950 aspect-video flex items-center justify-center mb-3 border border-zinc-200 dark:border-zinc-800">
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

          <div class="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span class="font-bold text-zinc-900 dark:text-zinc-100">{{ item.rating }}</span>
            <span class="text-zinc-500 dark:text-zinc-400 text-[11px]">({{ item.reviews }} отзывов)</span>
          </div>

          <h3 class="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">{{ item.name }}</h3>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div class="text-base font-bold font-mono text-amber-600 dark:text-amber-400">{{ item.price }} BYN</div>
            <div v-if="item.oldPrice" class="text-xs text-zinc-400 dark:text-zinc-500 line-through font-mono">{{ item.oldPrice }} BYN</div>
          </div>
          <!-- Для DLC: переход на официальную страницу Steam -->
          <a
            v-if="item.steamUrl"
            :href="item.steamUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary btn-sm px-3.5 py-1.5 flex items-center gap-1.5"
            title="Купить официальное DLC в Steam"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-10 10c0 4.74 3.31 8.7 7.74 9.73l2.84-4.14a2.98 2.98 0 0 1-.58-.59l-3.3 1.34a7.99 7.99 0 0 1-1.7-4.11l3.52-1.44a3 3 0 0 1 5.96-.32l3.41 1.4a8 8 0 1 1-8.89-11.87zm4 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
            </svg>
            <span>В Steam</span>
            <span class="text-[10px]">↗</span>
          </a>
          <!-- Для остальных товаров лавки: добавление в корзину -->
          <button
            v-else
            @click="addToCart(item)"
            class="btn-gold btn-sm px-3.5 py-1.5"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>

    <!-- Встроенный рекламный блок в ленте товаров -->
    <div class="py-1">
      <AdSlot
        format="in-feed"
        label="Партнёрский промо-блок"
        slotTitle="Нативная интеграция Google Play Pass"
        :initialCreative="allCreative"
        :key="'ad-ecom-feed-' + allCreative"
      />
    </div>

    <!-- Сетка товаров: второй ряд -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="item in secondRowProducts"
        :key="item.id"
        class="card-base p-4 flex flex-col justify-between border-zinc-200 dark:border-amber-500/20 hover:border-amber-500/40 transition-colors group bg-white dark:bg-zinc-900/80 shadow-xs"
      >
        <div>
          <!-- Изображение товара и метки -->
          <div class="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-950 aspect-video flex items-center justify-center mb-3 border border-zinc-200 dark:border-zinc-800">
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

          <div class="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span class="font-bold text-zinc-900 dark:text-zinc-100">{{ item.rating }}</span>
            <span class="text-zinc-500 dark:text-zinc-400 text-[11px]">({{ item.reviews }} отзывов)</span>
          </div>

          <h3 class="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">{{ item.name }}</h3>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{{ item.desc }}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div class="text-base font-bold font-mono text-amber-600 dark:text-amber-400">{{ item.price }} BYN</div>
            <div v-if="item.oldPrice" class="text-xs text-zinc-400 dark:text-zinc-500 line-through font-mono">{{ item.oldPrice }} BYN</div>
          </div>
          <!-- Для DLC: переход на официальную страницу Steam -->
          <a
            v-if="item.steamUrl"
            :href="item.steamUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary btn-sm px-3.5 py-1.5 flex items-center gap-1.5"
            title="Купить официальное DLC в Steam"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-10 10c0 4.74 3.31 8.7 7.74 9.73l2.84-4.14a2.98 2.98 0 0 1-.58-.59l-3.3 1.34a7.99 7.99 0 0 1-1.7-4.11l3.52-1.44a3 3 0 0 1 5.96-.32l3.41 1.4a8 8 0 1 1-8.89-11.87zm4 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
            </svg>
            <span>В Steam</span>
            <span class="text-[10px]">↗</span>
          </a>
          <!-- Для остальных товаров лавки: добавление в корзину -->
          <button
            v-else
            @click="addToCart(item)"
            class="btn-gold btn-sm px-3.5 py-1.5"
          >
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
import { pushToast } from '../utils/store.js'

defineProps({
  allCreative: {
    type: Boolean,
    default: true
  }
})

const cartCount = ref(0)
const selectedCategory = ref('Все')
const searchQuery = ref('')

const addToCart = (item) => {
  if (item.steamUrl) return
  cartCount.value++
  pushToast({
    title: 'Добавлено в заказ!',
    message: `${item.name} (${item.price} BYN) добавлен в корзину`,
    type: 'gold'
  })
}

const products = [
  {
    id: 1,
    name: 'DLC: Legacy of the Moonspell',
    price: '4.99',
    oldPrice: '6.99',
    category: 'DLC Дополнения',
    desc: 'Огромная карта Гора Луны, 8 новых персонажей клана Мунспелл и 13 видов эволюционирующего оружия.',
    image: './img/hero-bg.jpg',
    badge: 'Хит продаж',
    rating: '4.9',
    reviews: 1420,
    steamUrl: 'https://store.steampowered.com/app/2230760/Vampire_Survivors_Legacy_of_the_Moonspell/'
  },
  {
    id: 2,
    name: 'DLC: Tides of the Foscari',
    price: '4.99',
    oldPrice: '6.99',
    category: 'DLC Дополнения',
    desc: 'Зачарованная лесная академия Фоскари, 8 магов-выживших и легендарное оружие SpellString.',
    image: './img/gameplay-screen.jpg',
    badge: 'Новинка',
    rating: '4.8',
    reviews: 890,
    steamUrl: 'https://store.steampowered.com/app/2394600/Vampire_Survivors_Tides_of_the_Foscari/'
  },
  {
    id: 3,
    name: 'Контроллер Razer Kishi Ultra USB-C',
    price: '349',
    oldPrice: '429',
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
    price: '119',
    oldPrice: '149',
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
    price: '9.99',
    oldPrice: '13.99',
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
    price: '499',
    oldPrice: '589',
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
