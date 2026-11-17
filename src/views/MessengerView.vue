<template>
  <div class="card-base p-0 overflow-hidden flex flex-col md:flex-row h-[600px] border-zinc-200 dark:border-zinc-800">
    <!-- Left: Dialogs List -->
    <div class="w-full md:w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col bg-zinc-50/50 dark:bg-zinc-900/50">
      <div class="p-3.5 border-b border-zinc-200 dark:border-zinc-800">
        <h3 class="font-semibold text-xs text-zinc-900 dark:text-zinc-100">Сообщения</h3>
        <input type="search" placeholder="Поиск диалогов..." class="input-base text-xs py-1.5 mt-2" />
      </div>

      <div class="flex-1 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60">
        <div
          v-for="c in contacts"
          :key="c.id"
          @click="activeContact = c"
          class="p-3 flex items-center gap-3 cursor-pointer transition-colors"
          :class="activeContact.id === c.id ? 'bg-zinc-100 dark:bg-zinc-800/80 border-l-2 border-indigo-600' : 'hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'"
        >
          <div class="relative shrink-0">
            <img :src="c.avatar" :alt="c.name" class="w-9 h-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
            <span v-if="c.online" class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900"></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-zinc-900 dark:text-zinc-100 truncate">{{ c.name }}</span>
              <span class="text-[10px] text-zinc-400 font-mono">{{ c.time }}</span>
            </div>
            <p class="text-xs text-zinc-500 truncate mt-0.5">{{ c.lastMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Chat Area -->
    <div class="flex-1 flex flex-col bg-white dark:bg-[#121217]">
      <!-- Chat Header -->
      <div class="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img :src="activeContact.avatar" :alt="activeContact.name" class="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
          <div>
            <h4 class="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">{{ activeContact.name }}</h4>
            <span class="text-[11px] text-zinc-400 font-mono">{{ activeContact.role }}</span>
          </div>
        </div>
        <span class="text-[11px] text-zinc-400 font-mono">Шифрование E2E</span>
      </div>

      <!-- Messages Stream -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="flex"
          :class="msg.isMine ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-xs sm:max-w-md px-3.5 py-2 rounded-xl text-xs sm:text-sm"
            :class="msg.isMine
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-br-xs'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-xs border border-zinc-200/50 dark:border-zinc-700/50'"
          >
            <p>{{ msg.text }}</p>
            <span class="block text-[10px] mt-1 text-right" :class="msg.isMine ? 'opacity-70 font-mono' : 'text-zinc-400 font-mono'">
              {{ msg.time }}
            </span>
          </div>
        </div>
      </div>

      <!-- Input Bar -->
      <div class="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50/50 dark:bg-zinc-900/30">
        <input
          v-model="inputMsg"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Напишите сообщение..."
          class="input-base text-xs py-2 flex-1"
        />
        <button @click="sendMessage" class="btn-primary btn-sm px-4 py-2">
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const contacts = ref([
  {
    id: 1,
    name: 'Анна Смирнова',
    role: 'Директор по продукту',
    lastMessage: 'Трафик вырос на 45%, рекламные блоки работают безупречно!',
    time: '12:45',
    online: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Дмитрий Ковалев',
    role: 'Lead Cloud Architect',
    lastMessage: 'Edge CDN кэширует 98.4% статических запросов.',
    time: '11:20',
    online: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Cloudflare Enterprise Support',
    role: 'Корпоративная поддержка',
    lastMessage: 'SLA 99.99% подтвержден для всех PoP-узлов.',
    time: 'Вчера',
    online: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
  }
])

const activeContact = ref(contacts.value[0])

const messages = ref([
  { id: 1, text: 'Привет! Как показатели Core Web Vitals после запуска рекламных блоков?', isMine: false, time: '12:40' },
  { id: 2, text: 'Привет! Нулевой Cumulative Layout Shift, компоненты AdSlot полностью удерживают 99/100 в Lighthouse.', isMine: true, time: '12:42' },
  { id: 3, text: 'Отлично! Скорость отдачи статики через Cloudflare Pages стабильная?', isMine: false, time: '12:44' },
  { id: 4, text: 'Да, время отклика менее 25 мс по всему миру, лимитов на полосу нет.', isMine: true, time: '12:45' }
])

const inputMsg = ref('')

const sendMessage = () => {
  if (!inputMsg.value.trim()) return
  messages.value.push({
    id: Date.now(),
    text: inputMsg.value.trim(),
    isMine: true,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  inputMsg.value = ''

  // Auto reply
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      text: 'Принято! Архитектура и SLA подтверждены 🚀',
      isMine: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  }, 1000)
}
</script>
