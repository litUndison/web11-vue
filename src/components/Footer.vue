<template>
  <footer class="mt-16 border-t border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-sm transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
        <!-- Col 1 -->
        <div class="md:col-span-2 space-y-3">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 font-bold text-xs">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <span class="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Tailwind UI Studio</span>
          </div>
          <p class="text-xs text-zinc-500 max-w-md leading-relaxed">
            Платформа интерфейсных компонентов на Vue 3 и Tailwind CSS со встроенной архитектурой рекламных форматов IAB и оптимизацией Core Web Vitals.
          </p>
          <div class="text-[11px] text-zinc-400">
            © 2026 Tailwind UI Studio Inc. Корпоративная инфраструктура и дизайн-система. Релиз v2.5.4 LTS.
          </div>
        </div>

        <!-- Col 2: Terms of Service Quick Links -->
        <div class="space-y-2">
          <h5 class="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Политики хостингов</h5>
          <ul class="space-y-1.5 text-xs text-zinc-500">
            <li>
              <a href="https://www.cloudflare.com/terms/" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                Cloudflare Terms of Use
              </a>
            </li>
            <li>
              <a href="https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                GitHub Acceptable Use Policy
              </a>
            </li>
            <li>
              <a href="https://vercel.com/legal/terms" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                Vercel Terms of Service (Hobby)
              </a>
            </li>
            <li>
              <a href="https://www.netlify.com/legal/terms-of-use/" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                Netlify Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: AdSlot specs -->
        <div class="space-y-2">
          <h5 class="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Спецификация AdSlot</h5>
          <ul class="space-y-1.5 text-xs text-zinc-500 font-mono text-[11px]">
            <li>• Leaderboard (728×90 px)</li>
            <li>• Medium Rectangle (300×250 px)</li>
            <li>• In-Feed Native Card (Fluid)</li>
            <li>• Responsive CLS = 0 ms</li>
          </ul>
        </div>
      </div>

      <div class="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
        <span>© 2026 Tailwind UI Studio. Все права защищены.</span>
        <span class="flex items-center gap-1.5 font-mono text-[11px]">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>All systems operational</span>
        </span>
      </div>
    </div>
  </footer>
</template>
