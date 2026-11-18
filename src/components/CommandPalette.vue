<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm select-none"
    @click.self="close"
  >
    <div
      class="w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-amber-500/40 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-2xl overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95"
    >
      <!-- Поле поиска -->
      <div class="relative flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
        <svg class="w-4 h-4 text-amber-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="Поиск по разделам, арсеналу или командам (Esc для отмены)..."
          class="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
          @keydown.down.prevent="navigate(1)"
          @keydown.up.prevent="navigate(-1)"
          @keydown.enter.prevent="selectActive"
          @keydown.esc.prevent="close"
        />
        <kbd class="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded">
          ESC
        </kbd>
      </div>

      <!-- Список команд -->
      <div class="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-100 dark:divide-zinc-900 text-xs">
        <div v-if="filteredCommands.length === 0" class="py-8 text-center text-zinc-500">
          Ничего не найдено по запросу «{{ query }}»
        </div>

        <div
          v-for="(cmd, index) in filteredCommands"
          :key="cmd.id"
          @click="execute(cmd)"
          @mouseenter="selectedIndex = index"
          class="flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors"
          :class="selectedIndex === index ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'"
        >
          <div class="flex items-center gap-3">
            <span class="w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 shrink-0">
              {{ cmd.badge }}
            </span>
            <div>
              <div class="font-bold text-zinc-900 dark:text-zinc-100">{{ cmd.title }}</div>
              <div class="text-[11px] text-zinc-500 dark:text-zinc-400">{{ cmd.desc }}</div>
            </div>
          </div>
          <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
            {{ cmd.category }}
          </span>
        </div>
      </div>

      <!-- Подсказки по навигации -->
      <div class="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between text-[11px] text-zinc-500">
        <div class="flex items-center gap-2">
          <span>Навигация: <strong>↑</strong> <strong>↓</strong></span>
          <span>• Выбор: <strong>Enter</strong></span>
        </div>
        <span class="text-amber-600 dark:text-amber-400 font-mono">Командная панель</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { isCommandPaletteOpen, closeCommandPalette, openChestModal, toggleFullscreen, pushToast } from '../utils/store.js'
import { toggleSound } from '../utils/audio.js'

const emit = defineEmits(['select-tab'])

const isOpen = isCommandPaletteOpen
const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref(null)

// Список доступных команд и разделов
const commands = [
  { id: 'tab-landing', title: 'Обзор игры & Релиз', desc: 'Главный лендинг, особенности и трейлер', badge: 'VS', category: 'Раздел', action: () => emit('select-tab', 'landing') },
  { id: 'tab-dash', title: 'Игровая Статистика', desc: 'Векторная диаграмма поверженных монстров и золота', badge: 'ST', category: 'Раздел', action: () => emit('select-tab', 'dashboard') },
  { id: 'tab-ecom', title: 'Лавка Торговца & Арсенал', desc: 'DLC Moonspell, Foscari, геймпады Razer Kishi', badge: 'EC', category: 'Раздел', action: () => emit('select-tab', 'ecommerce') },
  { id: 'tab-kanban', title: 'Roadmap разработки', desc: 'План релизов: 120 FPS, Кооператив на 4 игроков', badge: 'RD', category: 'Раздел', action: () => emit('select-tab', 'kanban') },
  { id: 'tab-chat', title: 'Чат Гильдии Охотников', desc: 'Переписка с Antonio, Imelda и техподдержкой', badge: 'CH', category: 'Раздел', action: () => emit('select-tab', 'messenger') },
  { id: 'tab-order', title: 'Орден Охотников (Cloud ID)', desc: 'Генерация персонального ключа синхронизации', badge: 'ID', category: 'Раздел', action: () => emit('select-tab', 'multistep') },
  { id: 'act-chest', title: 'Открыть сундук удачи', desc: 'Мини-игра: случайный дроп золота и эволюции оружия', badge: 'BX', category: 'Действие', action: () => openChestModal() },
  { id: 'act-fullscreen', title: 'Полноэкранный режим', desc: 'Переключить веб-приложение во весь экран (F11)', badge: 'FS', category: 'Действие', action: () => toggleFullscreen() },
  { id: 'act-sound', title: 'Звуковые эффекты 8-bit', desc: 'Включить или отключить звуки интерфейса', badge: 'AU', category: 'Действие', action: () => {
    const state = toggleSound();
    pushToast({ title: 'Звук', message: state ? 'Ретро-звуки включены' : 'Звук отключен', type: 'info' });
  }},
  { id: 'act-save', title: 'Синхронизировать сохранения', desc: 'Записать текущий прогресс в локальное хранилище', badge: 'SV', category: 'Действие', action: () => {
    pushToast({ title: 'Облачная синхронизация', message: 'Сохранения успешно отправлены в облако', type: 'gold' });
  }}
]

// Фильтрация команд по поисковому запросу
const filteredCommands = computed(() => {
  if (!query.value.trim()) return commands
  const q = query.value.toLowerCase().trim()
  return commands.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
})

// Навигация стрелками клавиатуры
const navigate = (direction) => {
  const count = filteredCommands.value.length
  if (count === 0) return
  selectedIndex.value = (selectedIndex.value + direction + count) % count
}

// Выбор активного элемента
const selectActive = () => {
  const cmd = filteredCommands.value[selectedIndex.value]
  if (cmd) execute(cmd)
}

// Выполнение выбранной команды
const execute = (cmd) => {
  close()
  if (cmd.action) cmd.action()
}

// Закрытие палитры
const close = () => {
  closeCommandPalette()
  query.value = ''
  selectedIndex.value = 0
}

watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

// Обработка горячей клавиши Ctrl+K
const handleKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (isOpen.value) {
      close()
    } else {
      isCommandPaletteOpen.value = true
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
