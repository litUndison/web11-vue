<template>
  <div class="space-y-8">
    <div class="pb-4 border-b border-slate-200 dark:border-slate-800">
      <h2 class="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
        <span>UI Kit и Дизайн-система</span>
        <span class="px-2 py-0.5 text-xs font-bold rounded-md bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300">Tailwind 3.4</span>
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Библиотека переиспользуемых атомарных компонентов, матрица кнопок и цветовая палитра
      </p>
    </div>

    <!-- 1. Color Palette -->
    <div class="card-base p-6 space-y-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">1. Палитра Brand (Indigo 50-950)</h3>
      <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-center text-[10px] font-mono">
        <div class="p-3 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200">50</div>
        <div class="p-3 rounded-lg bg-indigo-100 text-indigo-900">100</div>
        <div class="p-3 rounded-lg bg-indigo-200 text-indigo-900">200</div>
        <div class="p-3 rounded-lg bg-indigo-300 text-indigo-950">300</div>
        <div class="p-3 rounded-lg bg-indigo-400 text-white">400</div>
        <div class="p-3 rounded-lg bg-indigo-500 text-white">500</div>
        <div class="p-3 rounded-lg bg-indigo-600 text-white font-bold shadow-sm">600</div>
        <div class="p-3 rounded-lg bg-indigo-700 text-white font-bold">700</div>
        <div class="p-3 rounded-lg bg-indigo-800 text-white">800</div>
        <div class="p-3 rounded-lg bg-indigo-900 text-white">900</div>
      </div>
    </div>

    <!-- 2. Button Matrix -->
    <div class="card-base p-6 space-y-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">2. Матрица кнопок (Button Matrix)</h3>
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
    <div class="card-base p-6 space-y-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">3. Бейджи и Статусы</h3>
      <div class="flex flex-wrap items-center gap-2">
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">Brand</span>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Success</span>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">Warning</span>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">Danger</span>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">Neutral</span>
      </div>

      <div class="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
          <span>✓</span>
          <span><strong>Успешно:</strong> Проект соответствует всем требованиям Дня 11!</span>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-2">
          <span>⚠️</span>
          <span><strong>Предупреждение:</strong> Тариф Vercel Hobby запрещает монетизацию.</span>
        </div>
      </div>
    </div>
  </div>
</template>
