<template>
  <div class="card-base p-0 overflow-hidden flex flex-col md:flex-row h-[600px] border border-slate-200 dark:border-[#17342b]">
    <!-- Left: Dialogs List -->
    <div class="w-full md:w-80 border-r border-slate-200 dark:border-[#17342b] flex flex-col bg-slate-50/50 dark:bg-[#081612]/70">
      <div class="p-4 border-b border-slate-200 dark:border-[#17342b]">
        <h3 class="font-bold text-sm text-slate-900 dark:text-white">Сообщения</h3>
        <input type="search" placeholder="Поиск контактов..." class="input-base text-xs py-1.5 mt-2" />
      </div>

      <div class="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-[#17342b]/60">
        <div
          v-for="c in contacts"
          :key="c.id"
          @click="activeContact = c"
          class="p-3.5 flex items-center gap-3 cursor-pointer transition-colors"
          :class="activeContact.id === c.id ? 'bg-emerald-50/80 dark:bg-[#0e221c] border-l-4 border-emerald-500' : 'hover:bg-slate-100/60 dark:hover:bg-white/5'"
        >
          <div class="relative">
            <img :src="c.avatar" :alt="c.name" class="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-200 dark:border-[#17342b]" />
            <span v-if="c.online" class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-900 dark:text-white truncate">{{ c.name }}</span>
              <span class="text-[10px] text-slate-400 font-mono">{{ c.time }}</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{{ c.lastMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Chat Area -->
    <div class="flex-1 flex flex-col bg-white dark:bg-[#040d0a]">
      <!-- Chat Header -->
      <div class="p-4 border-b border-slate-200 dark:border-[#17342b] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img :src="activeContact.avatar" :alt="activeContact.name" class="w-9 h-9 rounded-full object-cover shadow-sm border border-slate-200 dark:border-[#17342b]" />
          <div>
            <h4 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{{ activeContact.name }}</h4>
            <span class="text-[11px] text-emerald-500 font-medium">{{ activeContact.role || 'В сети' }}</span>
          </div>
        </div>
        <span class="text-xs text-slate-400">Шифрование сообщений E2E</span>
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
            class="max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-sm"
            :class="msg.isMine
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-semibold rounded-br-sm shadow-glow-emerald'
              : 'bg-slate-100 dark:bg-[#0e221c] text-slate-800 dark:text-emerald-100 rounded-bl-sm border border-slate-200/50 dark:border-[#17342b]'"
          >
            <p>{{ msg.text }}</p>
            <span class="block text-[10px] mt-1 text-right" :class="msg.isMine ? 'text-slate-900 font-bold' : 'text-slate-400'">
              {{ msg.time }}
            </span>
          </div>
        </div>
      </div>

      <!-- Input Bar -->
      <div class="p-3 border-t border-slate-200 dark:border-[#17342b] flex items-center gap-2">
        <input
          v-model="inputMsg"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Напишите сообщение..."
          class="input-base text-xs py-2 flex-1"
        />
        <button @click="sendMessage" class="btn-primary btn-sm px-4">
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
    lastMessage: 'SLA 99.99% подтвержден для всех глобальных PoP-узлов.',
    time: 'Вчера',
    online: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
  }
])

const activeContact = ref(contacts.value[0])

const messages = ref([
  { id: 1, text: 'Привет! Как продвигается запуск Tailwind UI Studio в продакшен?', isMine: false, time: '12:40' },
  { id: 2, text: 'Привет! Всё готово: настроили модули AdSlot, проверили производительность и развернули проект на CDN!', isMine: true, time: '12:42' },
  { id: 3, text: 'Супер! Как показатели Core Web Vitals и CLS при подгрузке баннеров?', isMine: false, time: '12:44' },
  { id: 4, text: 'Идеально — нулевой Cumulative Layout Shift, компоненты полностью адаптивны и удерживают 99/100 в Lighthouse.', isMine: true, time: '12:45' }
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
      text: 'Отлично! Архитектура подтверждена, аудит SLA 99.99% и монетизация активны 🚀',
      isMine: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  }, 1000)
}
</script>

