<template>
  <div class="space-y-6">
    <div class="pb-4 border-b border-amber-500/20">
      <h1 class="heading-gothic text-2xl font-bold tracking-tight text-zinc-100">
        Гримуар Дизайн-Системы Vampire Survivors
      </h1>
      <p class="text-xs sm:text-sm text-zinc-400 mt-0.5">
        Библиотека атомарных интерфейсных элементов: готическая типографика, боевые кнопки и редкости артефактов
      </p>
    </div>

    <!-- Цветовая палитра -->
    <div class="card-base p-5 space-y-3 border-amber-500/20 bg-zinc-900/80">
      <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400 heading-gothic">1. Цветовая палитра: Blood & Radiant Gold</h3>
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
    <div class="card-base p-5 space-y-3 border-amber-500/20 bg-zinc-900/80">
      <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400 heading-gothic">2. Матрица боевых кнопок</h3>
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn-gold btn-sm">Золото SM</button>
        <button class="btn-gold btn-md">Золото MD</button>
        <button class="btn-gold btn-lg">Золото LG</button>
        <button class="btn-blood btn-md">Кровь MD</button>
        <button class="btn-secondary btn-md">Сталь Охотника</button>
        <button class="btn-outline btn-md border-amber-500/40 text-amber-300">Фолиант</button>
        <button class="btn-ghost btn-md text-amber-400">Призрак</button>
      </div>
    </div>

    <!-- Редкости предметов -->
    <div class="card-base p-5 space-y-3 border-amber-500/20 bg-zinc-900/80">
      <h3 class="text-xs font-bold uppercase tracking-wider text-amber-400 heading-gothic">3. Градация редкости реликвий и арканов</h3>
      <div class="flex flex-wrap items-center gap-2.5">
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">Обычное</span>
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-sky-950/80 text-sky-400 border border-sky-500/40">Редкое</span>
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">Эпическое</span>
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow-gold">Легендарное</span>
        <span class="px-2.5 py-1 rounded text-xs font-bold bg-red-950/80 text-red-400 border border-red-500/50 shadow-blood">Проклятое</span>
      </div>

      <div class="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div class="p-3.5 rounded-lg bg-zinc-950 border border-amber-500/30 text-zinc-300 flex items-center gap-2.5">
          <span class="text-lg">⚔️</span>
          <span><strong>Combat Tested:</strong> Оптимизированные стили для 60-120 FPS экранов и мгновенного тактильного отклика.</span>
        </div>
        <div class="p-3.5 rounded-lg bg-zinc-950 border border-amber-500/30 text-zinc-300 flex items-center gap-2.5">
          <span class="text-lg">🛡️</span>
          <span><strong>Zero Shift:</strong> Соблюдение жестких габаритов баннеров IAB (CLS = 0) при любых размерах экрана.</span>
        </div>
      </div>
    </div>
  </div>
</template>
