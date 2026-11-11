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
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs" :class="c.color">
              {{ c.name[0] }}
            </div>
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
          <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs" :class="activeContact.color">
            {{ activeContact.name[0] }}
          </div>
          <div>
            <h4 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{{ activeContact.name }}</h4>
            <span class="text-[11px] text-emerald-500 font-medium">В сети</span>
          </div>
        </div>
        <span class="text-xs text-slate-400">Шифрование сообщений</span>
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
  { id: 1, name: 'Анна Смирнова', lastMessage: 'Сайт на Cloudflare Pages открывается моментально!', time: '12:45', online: true, color: 'bg-indigo-600' },
  { id: 2, name: 'Дмитрий Ковалев', lastMessage: 'Как настроить VITE_BASE для GitHub Pages?', time: '11:20', online: true, color: 'bg-purple-600' },
  { id: 3, name: 'Техподдержка Cloudflare', lastMessage: '500 сборок в месяц активны на вашем тарифе.', time: 'Вчера', online: false, color: 'bg-amber-600' }
])

const activeContact = ref(contacts.value[0])

const messages = ref([
  { id: 1, text: 'Привет! Как продвигается запуск Tailwind UI Studio в продакшен?', isMine: false, time: '12:40' },
  { id: 2, text: 'Привет! Всё готово: настроили модули AdSlot, проверили производительность и развернули проект на CDN!', isMine: true, time: '12:42' },
  { id: 3, text: 'Супер! Как показатели Core Web Vitals и CLS при подгрузке баннеров?', isMine: false, time: '12:44' },
  { id: 4, text: 'Идеально — нулевой Cumulative Layout Shift, компоненты полностью адаптивны.', isMine: true, time: '12:45' }
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
      text: 'Отлично! Проект принят на высший балл 🚀',
      isMine: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  }, 1000)
}
</script>

