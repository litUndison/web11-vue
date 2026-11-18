<template>
  <div class="space-y-6">
    <div class="pb-4 border-b border-zinc-200 dark:border-amber-500/20">
      <h1 class="heading-gothic text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Гримуар Дизайн-Системы Vampire Survivors
      </h1>
      <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
        Библиотека атомарных интерфейсных элементов: готическая типографика, боевые кнопки и редкости артефактов
      </p>
    </div>

    <!-- Цветовая палитра -->
    <div class="card-base p-5 space-y-3 border-zinc-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900/80 shadow-xs">
      <h3 class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 heading-gothic">1. Цветовая палитра: Blood & Radiant Gold</h3>
      <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-center text-xs font-mono">
        <div class="p-3 rounded-lg bg-amber-950 text-amber-200 border border-amber-700">Gold 950</div>
        <div class="p-3 rounded-lg bg-amber-900 text-amber-200">Gold 900</div>
        <div class="p-3 rounded-lg bg-amber-800 text-amber-100">Gold 800</div>
        <div class="p-3 rounded-lg bg-amber-700 text-amber-100">Gold 700</div>
        <div class="p-3 rounded-lg bg-amber-600 text-zinc-950 font-bold">Gold 600</div>
        <div class="p-3 rounded-lg bg-amber-500 text-zinc-950 font-bold shadow-gold">Gold 500</div>
        <div class="p-3 rounded-lg bg-amber-400 text-zinc-950 font-bold">Gold 400</div>
        <div class="p-3 rounded-lg bg-red-700 text-white font-bold">Blood 700</div>
        <div class="p-3 rounded-lg bg-red-600 text-white font-bold shadow-blood">Blood 600</div>
        <div class="p-3 rounded-lg bg-zinc-950 text-zinc-200 border border-zinc-700">Obsidian</div>
      </div>
    </div>

    <!-- Кнопки интерфейса -->
    <div class="card-base p-5 space-y-3 border-zinc-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900/80 shadow-xs">
      <h3 class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 heading-gothic">2. Матрица боевых кнопок</h3>
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn-gold btn-sm">Золото SM</button>
        <button class="btn-gold btn-md">Золото MD</button>
        <button class="btn-gold btn-lg">Золото LG</button>
        <button class="btn-blood btn-md">Кровь MD</button>
        <button class="btn-secondary btn-md">Сталь Охотника</button>
        <button class="btn-outline btn-md border-amber-500/50 text-amber-700 dark:text-amber-300">Фолиант</button>
        <button class="btn-ghost btn-md text-amber-600 dark:text-amber-400">Призрак</button>
      </div>
    </div>

    <!-- Редкости предметов -->
    <div class="card-base p-5 space-y-3 border-zinc-200 dark:border-amber-500/20 bg-white dark:bg-zinc-900/80 shadow-xs">
      <h3 class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 heading-gothic">3. Градация редкости реликвий и арканов</h3>
      <div class="flex flex-wrap items-center gap-2.5">
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700">Обычное</span>
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-500/40">Редкое</span>
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40">Эпическое</span>
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-500/50 shadow-gold">Легендарное</span>
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-500/50 shadow-blood">Проклятое</span>
      </div>

      <div class="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div class="p-3.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-amber-500/30 text-zinc-700 dark:text-zinc-300 flex items-center gap-2.5">
          <svg class="w-5 h-5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" />
          </svg>
          <span><strong>Combat Tested:</strong> Оптимизированные стили для 60-120 FPS экранов и мгновенного тактильного отклика.</span>
        </div>
        <div class="p-3.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-amber-500/30 text-zinc-700 dark:text-zinc-300 flex items-center gap-2.5">
          <svg class="w-5 h-5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span><strong>Zero Shift:</strong> Соблюдение жестких габаритов баннеров IAB (CLS = 0) при любых размерах экрана.</span>
        </div>
      </div>
    </div>
  </div>
</template>
