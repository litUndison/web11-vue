<template>
  <footer class="mt-16 border-t border-amber-500/20 dark:border-amber-500/20 bg-zinc-950/80 backdrop-blur-md transition-colors duration-200 text-zinc-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
        <!-- Col 1: Brand & Lore -->
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-zinc-950 font-bold text-sm shadow-gold">
              🦇
            </div>
            <span class="heading-gothic font-bold text-lg text-amber-400 tracking-wide">
              Vampire <span class="text-zinc-100">Survivors</span>
            </span>
          </div>
          <p class="text-xs text-zinc-400 max-w-md leading-relaxed">
            Официальный портал культового готического rogue-lite выживания от Poncle. Миллионы загрузок на iOS и Android. Офлайн-режим, кросс-платформенные сохранения и безумный драйв сражений с нежитью.
          </p>
          <div class="flex items-center gap-3 pt-1">
            <a
              href="https://apps.apple.com/app/vampire-survivors/id6444525702"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-amber-500/30 text-xs font-semibold text-zinc-100 hover:border-amber-400 transition-colors"
            >
              <span>App Store</span>
              <span class="text-[10px]">↗</span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.poncle.vampiresurvivors"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-amber-500/30 text-xs font-semibold text-zinc-100 hover:border-amber-400 transition-colors"
            >
              <span>Google Play</span>
              <span class="text-[10px]">↗</span>
            </a>
          </div>
        </div>

        <!-- Col 2: Navigation Links -->
        <div class="space-y-2">
          <h5 class="text-xs font-bold uppercase tracking-wider text-amber-400 heading-gothic">Навигация</h5>
          <ul class="space-y-1.5 text-xs text-zinc-400">
            <li>
              <a href="#hero" class="hover:text-amber-300 transition-colors">Обзор игры</a>
            </li>
            <li>
              <a href="#characters" class="hover:text-amber-300 transition-colors">Охотники (Персонажи)</a>
            </li>
            <li>
              <a href="#weapons" class="hover:text-amber-300 transition-colors">Гримуар Эволюций</a>
            </li>
            <li>
              <a href="#reviews" class="hover:text-amber-300 transition-colors">Награды & Рецензии</a>
            </li>
            <li>
              <a href="#faq" class="hover:text-amber-300 transition-colors">База знаний & FAQ</a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Cloud & Game Specs -->
        <div class="space-y-2">
          <h5 class="text-xs font-bold uppercase tracking-wider text-amber-400 heading-gothic">Сервер & Платформы</h5>
          <ul class="space-y-1.5 text-xs text-zinc-400 font-mono text-[11px]">
            <li>• Cloud Save Sync: Global CDN</li>
            <li>• Target Framerate: 60 - 120 FPS</li>
            <li>• Metal & Vulkan API Support</li>
            <li>• Controller: Razer Kishi / Xbox / DualSense</li>
            <li>• Offline: 100% автономный геймплей</li>
          </ul>
        </div>
      </div>

      <div class="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
        <span>© 2026 Poncle Ltd. Все права защищены. Vampire Survivors является зарегистрированным товарным знаком.</span>
        <span class="flex items-center gap-1.5 font-mono text-[11px] text-amber-400">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Game Servers: Online (SLA 99.99%)</span>
        </span>
      </div>
    </div>
  </footer>
</template>
