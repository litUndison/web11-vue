<template>
  <div class="card-base p-0 overflow-hidden flex flex-col md:flex-row h-[600px] border-zinc-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900/90 shadow-card">
    <!-- Список контактов -->
    <div class="w-full md:w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col bg-zinc-50 dark:bg-zinc-950/60">
      <div class="p-3.5 border-b border-zinc-200 dark:border-zinc-800">
        <h3 class="heading-gothic font-bold text-xs text-amber-600 dark:text-amber-400">Чат Гильдии Охотников</h3>
        <input type="search" placeholder="Поиск соратников..." class="input-base text-xs py-1.5 mt-2" />
      </div>

      <div class="flex-1 overflow-y-auto divide-y divide-zinc-200 dark:divide-zinc-800">
        <div
          v-for="c in contacts"
          :key="c.id"
          @click="activeContact = c"
          class="p-3 flex items-center gap-3 cursor-pointer transition-colors"
          :class="activeContact.id === c.id ? 'bg-amber-500/10 border-l-2 border-amber-500' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/40'"
        >
          <div class="relative shrink-0">
            <div class="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <!-- Иконка меча -->
              <svg v-if="c.iconType === 'sword'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" />
              </svg>
              <!-- Иконка магии -->
              <svg v-else-if="c.iconType === 'magic'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <!-- Иконка облака -->
              <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </div>
            <span v-if="c.online" class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900"></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-zinc-900 dark:text-zinc-100 truncate">{{ c.name }}</span>
              <span class="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{{ c.time }}</span>
            </div>
            <p class="text-xs text-zinc-600 dark:text-zinc-400 truncate mt-0.5">{{ c.lastMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Область переписки -->
    <div class="flex-1 flex flex-col bg-white dark:bg-zinc-900/95">
      <!-- Шапка диалога -->
      <div class="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-950/40">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <svg v-if="activeContact.iconType === 'sword'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" />
            </svg>
            <svg v-else-if="activeContact.iconType === 'magic'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
          </div>
          <div>
            <h4 class="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">{{ activeContact.name }}</h4>
            <span class="text-[11px] text-amber-600 dark:text-amber-400 font-mono">{{ activeContact.role }}</span>
          </div>
        </div>
        <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Канал гильдии активен
        </span>
      </div>

      <!-- Лента сообщений -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div
          v-for="msg in currentMessages"
          :key="msg.id"
          class="flex"
          :class="msg.isMine ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-xs sm:max-w-md px-3.5 py-2.5 rounded-xl text-xs sm:text-sm"
            :class="msg.isMine
              ? 'bg-amber-500 text-zinc-950 font-medium rounded-br-xs shadow-gold'
              : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 rounded-bl-xs border border-zinc-200 dark:border-zinc-700'"
          >
            <p>{{ msg.text }}</p>
            <span class="block text-[10px] mt-1 text-right" :class="msg.isMine ? 'opacity-80 font-mono text-zinc-900' : 'text-zinc-500 dark:text-zinc-400 font-mono'">
              {{ msg.time }}
            </span>
          </div>
        </div>
      </div>

      <!-- Поле ввода сообщения -->
      <div class="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50/80 dark:bg-zinc-950/40">
        <input
          v-model="inputMsg"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Напишите сообщение в чат выживших..."
          class="input-base text-xs py-2 flex-1"
        />
        <button @click="sendMessage" class="btn-gold btn-sm px-4 py-2">
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { pushToast } from '../utils/store.js'

const contacts = ref([
  {
    id: 1,
    name: 'Antonio Belpaese',
    role: 'Воин с Кнутом',
    lastMessage: 'Кровавая Слеза сносит боссов за секунды, отличный билд!',
    time: '12:45',
    online: true,
    iconType: 'sword'
  },
  {
    id: 2,
    name: 'Imelda Belpaese',
    role: 'Архимаг',
    lastMessage: 'Пустой фолиант 5-го уровня полностью устранил кулдаун!',
    time: '11:20',
    online: true,
    iconType: 'magic'
  },
  {
    id: 3,
    name: 'Служба Cloud Sync Poncle',
    role: 'Техническая поддержка',
    lastMessage: 'Облачные сохранения для вашего профиля успешно синхронизированы.',
    time: 'Вчера',
    online: false,
    iconType: 'cloud'
  }
])

const activeContact = ref(contacts.value[0])
const inputMsg = ref('')

const messagesData = ref({
  1: [
    { id: 1, text: 'Приветствую, охотник! Как успехи на этапе Библиотека?', time: '12:40', isMine: false },
    { id: 2, text: 'Продержался 30 минут! Взял Кнут и Пустое Сердце, эволюционировал в Кровавую Слезу.', time: '12:42', isMine: true },
    { id: 3, text: 'Кровавая Слеза сносит боссов за секунды, отличный билд!', time: '12:45', isMine: false }
  ],
  2: [
    { id: 1, text: 'Рекомендую протестировать связку Волшебной Палочки и Empty Tome.', time: '11:15', isMine: false },
    { id: 2, text: 'Пустой фолиант 5-го уровня полностью устранил кулдаун!', time: '11:20', isMine: false }
  ],
  3: [
    { id: 1, text: 'Облачные сохранения для вашего профиля успешно синхронизированы.', time: 'Вчера', isMine: false }
  ]
})

const currentMessages = computed(() => messagesData.value[activeContact.value.id] || [])

const sendMessage = () => {
  if (!inputMsg.value.trim()) return
  const currentList = messagesData.value[activeContact.value.id]
  if (currentList) {
    currentList.push({
      id: Date.now(),
      text: inputMsg.value.trim(),
      time: 'Сейчас',
      isMine: true
    })
    inputMsg.value = ''
    pushToast({
      title: 'Сообщение отправлено',
      message: `Отправлено в чат ${activeContact.value.name}`,
      type: 'info'
    })
  }
}
</script>
