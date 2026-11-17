<template>
  <div class="space-y-6">
    <div class="pb-4 border-b border-zinc-200 dark:border-zinc-800">
      <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        UI Kit & Дизайн-система
      </h1>
      <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
        Библиотека переиспользуемых атомарных компонентов, матрица кнопок и цветовая палитра
      </p>
    </div>

    <!-- 1. Color Palette -->
    <div class="card-base p-5 space-y-3">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">1. Палитра Brand (Electric Indigo / Zinc)</h3>
      <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-center text-xs font-mono">
        <div class="p-3 rounded-lg bg-indigo-50 text-indigo-950 border border-indigo-200">50</div>
        <div class="p-3 rounded-lg bg-indigo-100 text-indigo-950 border border-indigo-200">100</div>
        <div class="p-3 rounded-lg bg-indigo-200 text-indigo-950">200</div>
        <div class="p-3 rounded-lg bg-indigo-300 text-indigo-950">300</div>
        <div class="p-3 rounded-lg bg-indigo-400 text-white">400</div>
        <div class="p-3 rounded-lg bg-indigo-500 text-white">500</div>
        <div class="p-3 rounded-lg bg-indigo-600 text-white font-bold">600</div>
        <div class="p-3 rounded-lg bg-indigo-700 text-white font-bold">700</div>
        <div class="p-3 rounded-lg bg-indigo-800 text-white">800</div>
        <div class="p-3 rounded-lg bg-indigo-900 text-white">900</div>
      </div>
    </div>

    <!-- 2. Button Matrix -->
    <div class="card-base p-5 space-y-3">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">2. Матрица компонентов кнопок</h3>
      <div class="flex flex-wrap items-center gap-2.5">
        <button class="btn-primary btn-sm">Primary SM</button>
        <button class="btn-primary btn-md">Primary MD</button>
        <button class="btn-primary btn-lg">Primary LG</button>
        <button class="btn-accent btn-md">Accent (Indigo)</button>
        <button class="btn-secondary btn-md">Secondary</button>
        <button class="btn-outline btn-md">Outline</button>
        <button class="btn-ghost btn-md">Ghost</button>
      </div>
    </div>

    <!-- 3. Badges & Alerts -->
    <div class="card-base p-5 space-y-3">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">3. Бейджи и статусы</h3>
      <div class="flex flex-wrap items-center gap-2">
        <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">Neutral</span>
        <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">Brand</span>
        <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">Success</span>
        <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">Warning</span>
        <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">Danger</span>
      </div>

      <div class="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div class="p-3.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-2.5">
          <span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
          <span><strong>Production Ready:</strong> Все компоненты интерфейса оптимизированы и протестированы.</span>
        </div>
        <div class="p-3.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border border-amber-500/20 flex items-center gap-2.5">
          <span class="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">!</span>
          <span><strong>ToS Compliance:</strong> Регулярная верификация условий монетизации облачных хостингов.</span>
        </div>
      </div>
    </div>
  </div>
</template>
