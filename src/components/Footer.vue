<template>
  <footer class="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
        <!-- Col 1 -->
        <div class="md:col-span-2 space-y-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
              TN
            </div>
            <span class="font-bold text-slate-900 dark:text-white text-base">TechNova Portal</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            Учебный проект по веб-разработке (День 11): «Публикация сайта и интеграция рекламного блока AdSlot». Выполнен с использованием Vue 3, Vite и Tailwind CSS v3.4.
          </p>
          <div class="text-[11px] text-slate-400">
            Автор практики: <span class="font-medium text-slate-600 dark:text-slate-300">Eugene</span> • 2026
          </div>
        </div>

        <!-- Col 2: Terms of Service Quick Links -->
        <div class="space-y-2">
          <h5 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Политики хостингов</h5>
          <ul class="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <li>
              <a href="https://www.cloudflare.com/terms/" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Cloudflare Terms of Use
              </a>
            </li>
            <li>
              <a href="https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                GitHub Acceptable Use Policy
              </a>
            </li>
            <li>
              <a href="https://vercel.com/legal/terms" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Vercel Terms of Service (Hobby)
              </a>
            </li>
            <li>
              <a href="https://www.netlify.com/legal/terms-of-use/" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Netlify Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: AdSlot specs -->
        <div class="space-y-2">
          <h5 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Спецификация AdSlot</h5>
          <ul class="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <li>• IAB Leaderboard (728×90)</li>
            <li>• Medium Rectangle (300×250)</li>
            <li>• In-Feed Native Card (Fluid)</li>
            <li>• Custom Dimensions via Props</li>
          </ul>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <span>© 2026 TechNova Project. Все права защищены.</span>
        <span>Развернуто и протестировано для Cloudflare Pages & GitHub Pages</span>
      </div>
    </div>
  </footer>
</template>
