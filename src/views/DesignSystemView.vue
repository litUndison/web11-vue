<template>
  <div class="space-y-8">
    <div class="pb-4 border-b border-slate-200 dark:border-[#1f293d]">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 border border-pink-500/20 mb-2">
        Дизайн-система
      </div>
      <h2 class="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
        <span>UI Kit & Дизайн-система</span>
      </h2>
      <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
        Библиотека переиспользуемых атомарных компонентов, матрица кнопок и цветовая палитра
      </p>
    </div>

    <!-- 1. Color Palette -->
    <div class="card-base p-7 space-y-4">
      <h3 class="text-xs font-black uppercase tracking-wider text-slate-400">1. Палитра Brand (Indigo 50-950)</h3>
      <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 text-center text-xs font-mono">
        <div class="p-4 rounded-xl bg-indigo-50 text-indigo-950 border border-indigo-200 font-bold">50</div>
        <div class="p-4 rounded-xl bg-indigo-100 text-indigo-950 font-bold">100</div>
        <div class="p-4 rounded-xl bg-indigo-200 text-indigo-950 font-bold">200</div>
        <div class="p-4 rounded-xl bg-indigo-300 text-indigo-950 font-bold">300</div>
        <div class="p-4 rounded-xl bg-indigo-400 text-white font-bold">400</div>
        <div class="p-4 rounded-xl bg-indigo-500 text-white font-bold shadow-md">500</div>
        <div class="p-4 rounded-xl bg-indigo-600 text-white font-black shadow-glow-indigo">600</div>
        <div class="p-4 rounded-xl bg-indigo-700 text-white font-bold">700</div>
        <div class="p-4 rounded-xl bg-indigo-800 text-white font-bold">800</div>
        <div class="p-4 rounded-xl bg-indigo-900 text-white font-bold">900</div>
      </div>
    </div>

    <!-- 2. Button Matrix -->
    <div class="card-base p-7 space-y-4">
      <h3 class="text-xs font-black uppercase tracking-wider text-slate-400">2. Матрица интерактивных кнопок</h3>
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn-primary btn-sm">Primary SM</button>
        <button class="btn-primary btn-md">Primary MD</button>
        <button class="btn-primary btn-lg">Primary LG</button>
        <button class="btn-secondary btn-md">Secondary</button>
        <button class="btn-outline btn-md">Outline</button>
        <button class="btn-danger btn-md">Danger</button>
        <button class="btn-ghost btn-md">Ghost</button>
      </div>
    </div>

    <!-- 3. Badges & Alerts -->
    <div class="card-base p-7 space-y-4">
      <h3 class="text-xs font-black uppercase tracking-wider text-slate-400">3. Бейджи и Статусы</h3>
      <div class="flex flex-wrap items-center gap-2.5">
        <span class="px-3 py-1 rounded-full text-xs font-black uppercase bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-500/20">Brand</span>
        <span class="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-500/20">Success</span>
        <span class="px-3 py-1 rounded-full text-xs font-black uppercase bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-500/20">Warning</span>
        <span class="px-3 py-1 rounded-full text-xs font-black uppercase bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-500/20">Danger</span>
        <span class="px-3 py-1 rounded-full text-xs font-black uppercase bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300/40">Neutral</span>
      </div>

      <div class="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
        <div class="p-4 rounded-2xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-3">
          <span class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
          <span><strong>Статус готовности:</strong> Все модули дизайн-системы протестированы и готовы к продакшену.</span>
        </div>
        <div class="p-4 rounded-2xl bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 flex items-center gap-3">
          <span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">!</span>
          <span><strong>Контроль политик:</strong> Проверка совместимости ToS хостингов перед развёртыванием рекламы.</span>
        </div>
      </div>
    </div>
  </div>
</template>
