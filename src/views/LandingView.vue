<template>
  <div class="space-y-16">
    <!-- Рекламный блок в шапке -->
    <div class="max-w-4xl mx-auto">
      <AdSlot
        format="banner"
        label="Спонсорский блок (Leaderboard)"
        slotTitle="Официальный игровой спонсор"
        :initialCreative="allCreative"
        :key="'ad-landing-top-' + allCreative"
      />
    </div>

    <!-- Главный баннер -->
    <section class="relative rounded-2xl overflow-hidden border border-amber-500/20 bg-zinc-950 shadow-card">
      <!-- Фоновое изображение -->
      <div class="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <img
          src="../assets/img/hero-bg.jpg"
          alt="Vampire Survivors Hero Background"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 py-12 sm:py-16 text-center space-y-6">
        <!-- Метка релиза -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-gold">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>Официальный мобильный релиз • Версия 1.10</span>
          <span class="text-amber-500/60">•</span>
          <span class="text-amber-200">100% Бесплатно</span>
        </div>

        <!-- Заголовок -->
        <h1 class="heading-gothic text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 leading-[1.1]">
          ВЫЖИВИ В АДУ <br />
          <span class="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            ДО РАССВЕТА
          </span>
        </h1>

        <!-- Подзаголовок -->
        <p class="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Культовый инди-хит от Poncle теперь в твоем смартфоне. Уничтожай орды ночной нежити одним пальцем, открывай рецепты в Гримуаре и создавай ультимативные билды выживания.
        </p>

        <!-- Кнопки действий -->
        <div class="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://apps.apple.com/app/vampire-survivors/id6444525702"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gold px-6 py-3 text-sm font-bold shadow-gold flex items-center gap-2"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.67-.82 1.13-1.96.99-3.1-.99.04-2.17.66-2.86 1.48-.61.71-1.14 1.88-.99 2.99 1.1.09 2.2-.55 2.86-1.37z"/>
            </svg>
            <span>App Store (iOS)</span>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.poncle.vampiresurvivors"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-blood px-6 py-3 text-sm font-bold shadow-blood flex items-center gap-2"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.222 2.222 0 0 1-.61-.912V2.726c0-.342.22-.68.61-.912zm11.3 11.3l2.42 2.42-11.83 6.64 9.41-9.06zm0-2.228L5.5 1.826l11.83 6.64-2.42 2.42zm1.65 1.114l3.88 2.18c.84.47.84 1.24 0 1.71l-3.88 2.18-2.02-2.03 2.02-2.04z"/>
            </svg>
            <span>Google Play (Android)</span>
          </a>

          <button
            @click="$emit('switch-tab', 'ecommerce')"
            class="btn-secondary px-5 py-3 text-sm font-semibold border-amber-500/30 text-amber-300 hover:text-amber-200"
          >
            <span>Арсенал & DLC</span>
            <span class="text-xs">→</span>
          </button>

          <button
            @click="openChestModal"
            class="btn-gold px-5 py-3 text-sm font-bold shadow-gold flex items-center gap-2"
          >
            <span>🎁</span>
            <span>Сундук с лутом</span>
          </button>
        </div>

        <!-- Макет экрана смартфона -->
        <div class="pt-8 max-w-xl mx-auto">
          <div class="relative rounded-2xl p-2.5 bg-gradient-to-b from-amber-500/40 via-zinc-800 to-amber-700/40 shadow-2xl border border-amber-500/30">
            <div class="relative rounded-xl overflow-hidden aspect-video bg-zinc-950">
              <img
                src="../assets/img/gameplay-screen.jpg"
                alt="Геймплей мобильной версии Vampire Survivors"
                class="w-full h-full object-cover"
              />
              <!-- Интерфейс геймплея -->
              <div class="absolute top-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
                <div class="flex items-center gap-2">
                  <span class="text-amber-400 font-bold">LV 99</span>
                  <span class="text-emerald-400 font-bold">HP 250/250</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-rose-400 font-bold">☠ 142 800</span>
                  <span class="text-amber-300 font-bold">⏱ 28:45</span>
                  <span class="text-sky-300 font-bold">120 FPS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Статистика игры -->
        <div class="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-800/80 max-w-3xl mx-auto">
          <div class="text-center p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <div class="text-2xl font-bold heading-gothic text-amber-400">100 000+</div>
            <div class="text-xs text-zinc-400 mt-0.5">Монстров на экране</div>
          </div>
          <div class="text-center p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <div class="text-2xl font-bold heading-gothic text-amber-400">60-120 FPS</div>
            <div class="text-xs text-zinc-400 mt-0.5">Vulkan & Metal API</div>
          </div>
          <div class="text-center p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <div class="text-2xl font-bold heading-gothic text-amber-400">98%</div>
            <div class="text-xs text-zinc-400 mt-0.5">Крайне положительно</div>
          </div>
          <div class="text-center p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <div class="text-2xl font-bold heading-gothic text-amber-400">10M+</div>
            <div class="text-xs text-zinc-400 mt-0.5">Загрузок в мире</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Особенности игры -->
    <section class="max-w-6xl mx-auto space-y-8">
      <div class="text-center max-w-xl mx-auto">
        <h2 class="heading-gothic text-2xl sm:text-3xl font-bold text-zinc-100">
          Особенности мобильного релиза
        </h2>
        <p class="text-xs sm:text-sm text-zinc-400 mt-1">
          Идеальная адаптация для сенсорных экранов смартфонов и планшетов
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Преимущество 1 -->
        <div class="card-base p-5 space-y-3 border-amber-500/20 hover:border-amber-500/40 transition-colors">
          <div class="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-lg">
            👆
          </div>
          <h3 class="font-bold text-sm text-zinc-100">Управление одним пальцем</h3>
          <p class="text-xs text-zinc-400 leading-relaxed">
            Вертикальная или горизонтальная ориентация. Автоматическая атака снарядами — маневрируйте и уворачивайтесь от орд нежити.
          </p>
        </div>

        <!-- Преимущество 2 -->
        <div class="card-base p-5 space-y-3 border-amber-500/20 hover:border-amber-500/40 transition-colors">
          <div class="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center text-lg">
            ⚡
          </div>
          <h3 class="font-bold text-sm text-zinc-100">100 000+ врагов без лагов</h3>
          <p class="text-xs text-zinc-400 leading-relaxed">
            Высокооптимизированный графический пайплайн гарантирует плавные 60-120 кадров в секунду даже на 29-й минуте ада.
          </p>
        </div>

        <!-- Преимущество 3 -->
        <div class="card-base p-5 space-y-3 border-amber-500/20 hover:border-amber-500/40 transition-colors">
          <div class="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-lg">
            📖
          </div>
          <h3 class="font-bold text-sm text-zinc-100">Глубокие синергии билдов</h3>
          <p class="text-xs text-zinc-400 leading-relaxed">
            Более 50 уникальных охотников, тайные реликвии, карты Таро (Арканы) и десятки ветвей эволюций супероружия.
          </p>
        </div>

        <!-- Преимущество 4 -->
        <div class="card-base p-5 space-y-3 border-amber-500/20 hover:border-amber-500/40 transition-colors">
          <div class="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-lg">
            ☁️
          </div>
          <h3 class="font-bold text-sm text-zinc-100">Офлайн и Cloud Sync</h3>
          <p class="text-xs text-zinc-400 leading-relaxed">
            Играйте в метро или самолете без интернета. Прогресс мгновенно синхронизируется через облачную сеть сохранений.
          </p>
        </div>
      </div>
    </section>

    <!-- Выбор персонажей -->
    <section class="max-w-6xl mx-auto space-y-8" id="characters">
      <div class="text-center max-w-xl mx-auto">
        <h2 class="heading-gothic text-2xl sm:text-3xl font-bold text-zinc-100">
          Выжившие Охотники
        </h2>
        <p class="text-xs sm:text-sm text-zinc-400 mt-1">
          Выберите легендарного героя и отправляйтесь в темные земли
        </p>
      </div>

      <div class="card-base p-6 border-amber-500/30">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <!-- Изображение персонажей -->
          <div class="lg:col-span-6 relative rounded-xl overflow-hidden border border-amber-500/30 shadow-card">
            <img
              src="../assets/img/characters.jpg"
              alt="Охотники Vampire Survivors"
              class="w-full h-auto object-cover"
            />
            <div class="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/80 text-[11px] font-mono text-amber-300 border border-amber-500/30">
              Орден Belpaese & Союзники
            </div>
          </div>

          <!-- Интерактивный переключатель -->
          <div class="lg:col-span-6 space-y-5">
            <!-- Вкладки персонажей -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="(char, idx) in characterList"
                :key="char.name"
                @click="selectChar(idx)"
                class="p-2.5 rounded-lg border text-xs font-bold transition-all text-left"
                :class="selectedCharIdx === idx
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-gold'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'"
              >
                <div class="truncate">{{ char.name }}</div>
                <div class="text-[10px] font-normal text-zinc-400">{{ char.title }}</div>
              </button>
            </div>

            <!-- Детали активного персонажа -->
            <div class="p-5 rounded-xl border border-amber-500/20 bg-zinc-900/80 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="heading-gothic text-lg font-bold text-amber-400">
                    {{ activeChar.name }}
                  </h3>
                  <div class="text-xs text-zinc-400">{{ activeChar.role }}</div>
                </div>
                <span class="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {{ activeChar.weapon }}
                </span>
              </div>

              <p class="text-xs text-zinc-300 leading-relaxed">
                {{ activeChar.description }}
              </p>

              <!-- Характеристики -->
              <div class="grid grid-cols-3 gap-3 text-xs pt-2 border-t border-zinc-800">
                <div>
                  <span class="text-zinc-500 block text-[10px] uppercase font-mono">Базовое HP</span>
                  <span class="font-bold text-emerald-400">{{ activeChar.hp }}</span>
                </div>
                <div>
                  <span class="text-zinc-500 block text-[10px] uppercase font-mono">Скорость бега</span>
                  <span class="font-bold text-amber-400">{{ activeChar.speed }}</span>
                </div>
                <div>
                  <span class="text-zinc-500 block text-[10px] uppercase font-mono">Особый пассив</span>
                  <span class="font-bold text-rose-400 truncate block">{{ activeChar.passive }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Гримуар эволюций оружия -->
    <section class="max-w-6xl mx-auto space-y-8" id="weapons">
      <div class="text-center max-w-xl mx-auto">
        <h2 class="heading-gothic text-2xl sm:text-3xl font-bold text-zinc-100">
          Гримуар Эволюций Оружия
        </h2>
        <p class="text-xs sm:text-sm text-zinc-400 mt-1">
          Объединяйте оружие 8-го уровня с пассивными артефактами в сундуках боссов
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Рецепт 1: Кнут -->
        <div class="card-base p-5 border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span class="text-amber-400 font-bold">Эволюция #1</span>
              <span>Вампиризм</span>
            </div>
            <div class="flex items-center justify-center gap-3 py-3">
              <div class="w-14 h-14 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
                <img src="../assets/img/whip.jpg" alt="Кнут (Whip)" class="w-full h-full object-cover" />
              </div>
              <span class="text-amber-400 font-bold text-lg">+</span>
              <div class="w-14 h-14 rounded-lg border border-zinc-700 bg-zinc-900 flex flex-col items-center justify-center text-center p-1 shrink-0">
                <span class="text-lg">🖤</span>
                <span class="text-[8px] font-mono text-zinc-400 leading-tight">Пустое Сердце</span>
              </div>
              <span class="text-amber-400 font-bold text-lg">➔</span>
              <div class="w-14 h-14 rounded-lg overflow-hidden border border-red-500 bg-zinc-900 shadow-blood shrink-0">
                <img src="../assets/img/bloody-tear.jpg" alt="Кровавая слеза (Bloody Tear)" class="w-full h-full object-cover" />
              </div>
            </div>
            <h4 class="font-bold text-sm text-amber-400 text-center mt-1">Кровавая Слеза (Bloody Tear)</h4>
            <p class="text-xs text-zinc-300 mt-2 leading-relaxed">
              Кнут эволюционирует в смертоносную цепь, наносящую критические удары и восстанавливающую по 8 HP за каждое попадание по толпе.
            </p>
          </div>
          <div class="pt-3 border-t border-zinc-800 text-[11px] font-mono text-amber-400/80 flex items-center justify-between">
            <span>Рекомендовано: Antonio</span>
            <span>★ Легендарное</span>
          </div>
        </div>

        <!-- Рецепт 2: Волшебная палочка -->
        <div class="card-base p-5 border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span class="text-amber-400 font-bold">Эволюция #2</span>
              <span>Шквал магии</span>
            </div>
            <div class="flex items-center justify-center gap-3 py-3">
              <div class="w-14 h-14 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
                <img src="../assets/img/wand.jpg" alt="Волшебная палочка (Magic Wand)" class="w-full h-full object-cover" />
              </div>
              <span class="text-amber-400 font-bold text-lg">+</span>
              <div class="w-14 h-14 rounded-lg border border-zinc-700 bg-zinc-900 flex flex-col items-center justify-center text-center p-1 shrink-0">
                <span class="text-lg">📖</span>
                <span class="text-[8px] font-mono text-zinc-400 leading-tight">Фолиант</span>
              </div>
              <span class="text-amber-400 font-bold text-lg">➔</span>
              <div class="w-14 h-14 rounded-lg overflow-hidden border border-amber-400 bg-zinc-900 shadow-gold shrink-0">
                <img src="../assets/img/holy-wand.jpg" alt="Священная палочка (Holy Wand)" class="w-full h-full object-cover" />
              </div>
            </div>
            <h4 class="font-bold text-sm text-amber-400 text-center mt-1">Священная Палочка (Holy Wand)</h4>
            <p class="text-xs text-zinc-300 mt-2 leading-relaxed">
              Устраняет перезарядку снарядов. Заливает экран непрерывным пулеметным потоком самонаводящихся зарядов света.
            </p>
          </div>
          <div class="pt-3 border-t border-zinc-800 text-[11px] font-mono text-amber-400/80 flex items-center justify-between">
            <span>Рекомендовано: Imelda</span>
            <span>★ Легендарное</span>
          </div>
        </div>

        <!-- Рецепт 3: Чеснок -->
        <div class="card-base p-5 border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span class="text-amber-400 font-bold">Эволюция #3</span>
              <span>Аура вампиризма</span>
            </div>
            <div class="flex items-center justify-center gap-3 py-3">
              <div class="w-14 h-14 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
                <img src="../assets/img/garlic.jpg" alt="Чеснок (Garlic)" class="w-full h-full object-cover" />
              </div>
              <span class="text-amber-400 font-bold text-lg">+</span>
              <div class="w-14 h-14 rounded-lg border border-zinc-700 bg-zinc-900 flex flex-col items-center justify-center text-center p-1 shrink-0">
                <span class="text-lg">❤️</span>
                <span class="text-[8px] font-mono text-zinc-400 leading-tight">Пуммарола</span>
              </div>
              <span class="text-amber-400 font-bold text-lg">➔</span>
              <div class="w-14 h-14 rounded-lg border border-purple-500 bg-zinc-900 flex flex-col items-center justify-center text-center p-1 shadow-lg shrink-0">
                <span class="text-xl">🌌</span>
                <span class="text-[9px] font-mono text-purple-300 font-bold">Soul Eater</span>
              </div>
            </div>
            <h4 class="font-bold text-sm text-amber-400 text-center mt-1">Пожиратель Душ (Soul Eater)</h4>
            <p class="text-xs text-zinc-300 mt-2 leading-relaxed">
              Аура вокруг персонажа увеличивается в радиусе, отталкивает нежить и крадет жизненную силу, повышая урон за каждое поглощение.
            </p>
          </div>
          <div class="pt-3 border-t border-zinc-800 text-[11px] font-mono text-amber-400/80 flex items-center justify-between">
            <span>Рекомендовано: Poe Ratcho</span>
            <span>★ Легендарное</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Сравнительная таблица облачной инфраструктуры -->
    <section class="max-w-6xl mx-auto space-y-4">
      <div class="text-center max-w-xl mx-auto">
        <h2 class="heading-gothic text-2xl sm:text-3xl font-bold text-zinc-100">
          Синхронизация сохранений & Облачные серверы
        </h2>
        <p class="text-xs sm:text-sm text-zinc-400 mt-1">
          Сравнительный анализ архитектуры CDN и хостинг-платформ для поддержки миллионов игроков
        </p>
      </div>

      <HostingTable />
    </section>

    <!-- Отзывы и награды -->
    <section class="max-w-6xl mx-auto space-y-8" id="reviews">
      <div class="text-center max-w-xl mx-auto">
        <h2 class="heading-gothic text-2xl sm:text-3xl font-bold text-zinc-100">
          Признание критиков и награды
        </h2>
        <p class="text-xs sm:text-sm text-zinc-400 mt-1">
          Почему игра стала триумфатором мировой игровой индустрии
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div class="card-base p-5 text-center space-y-2 border-amber-500/20">
          <div class="text-3xl font-bold heading-gothic text-amber-400">BAFTA</div>
          <div class="text-xs font-bold text-zinc-200">Games Awards Winner</div>
          <p class="text-[11px] text-zinc-400 leading-relaxed">
            Победитель в номинациях «Лучшая игра года» и «Лучший геймдизайн».
          </p>
        </div>

        <div class="card-base p-5 text-center space-y-2 border-amber-500/20">
          <div class="text-3xl font-bold heading-gothic text-amber-400">9.5 / 10</div>
          <div class="text-xs font-bold text-zinc-200">IGN Review</div>
          <p class="text-[11px] text-zinc-400 leading-relaxed">
            «Шедевр минималистичного экшена и чистейший дофаминовый восторг».
          </p>
        </div>

        <div class="card-base p-5 text-center space-y-2 border-amber-500/20">
          <div class="text-3xl font-bold heading-gothic text-amber-400">90 / 100</div>
          <div class="text-xs font-bold text-zinc-200">PC Gamer</div>
          <p class="text-[11px] text-zinc-400 leading-relaxed">
            «Лучшая игра десятилетия для быстрых сессий и бесконечного погружения».
          </p>
        </div>

        <div class="card-base p-5 text-center space-y-2 border-amber-500/20">
          <div class="text-3xl font-bold heading-gothic text-amber-400">98%</div>
          <div class="text-xs font-bold text-zinc-200">Steam Rating</div>
          <p class="text-[11px] text-zinc-400 leading-relaxed">
            Ошеломительно положительные отзывы от более чем 250 000 игроков.
          </p>
        </div>
      </div>
    </section>

    <!-- Часто задаваемые вопросы -->
    <section class="max-w-3xl mx-auto space-y-6 pb-6" id="faq">
      <div class="text-center">
        <h2 class="heading-gothic text-2xl sm:text-3xl font-bold text-zinc-100">
          Часто задаваемые вопросы (FAQ)
        </h2>
        <p class="text-xs sm:text-sm text-zinc-400 mt-1">
          Всё, что нужно знать о мобильной версии Vampire Survivors
        </p>
      </div>

      <div class="space-y-3">
        <details class="group card-base p-4 cursor-pointer border-zinc-800">
          <summary class="font-bold text-xs sm:text-sm text-amber-400 flex items-center justify-between list-none">
            <span>Бесплатна ли игра на смартфонах iOS и Android?</span>
            <span class="text-xs text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs text-zinc-300 mt-2.5 leading-relaxed">
            Да! Игра доступна совершенно бесплатно в App Store и Google Play. В ней нет пейволлов, pay-to-win механик или таймеров энергии. Вы можете наслаждаться полноценным контентом без обязательных платежей.
          </p>
        </details>

        <details class="group card-base p-4 cursor-pointer border-zinc-800">
          <summary class="font-bold text-xs sm:text-sm text-amber-400 flex items-center justify-between list-none">
            <span>Требуется ли постоянное подключение к интернету?</span>
            <span class="text-xs text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs text-zinc-300 mt-2.5 leading-relaxed">
            Нет. Мобильная версия Vampire Survivors на 100% поддерживает автономный офлайн-режим. Вы можете играть в самолете, метро или на даче. При появлении сети прогресс автоматически синхронизируется с облаком.
          </p>
        </details>

        <details class="group card-base p-4 cursor-pointer border-zinc-800">
          <summary class="font-bold text-xs sm:text-sm text-amber-400 flex items-center justify-between list-none">
            <span>Как разблокировать эволюцию оружия в бою?</span>
            <span class="text-xs text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs text-zinc-300 mt-2.5 leading-relaxed">
            Прокачайте оружие до максимального 8-го уровня, получите хотя бы 1-й уровень соответствующего пассивного артефакта, продержитесь до 10-й минуты матча и победите босса, чтобы открыть выпавший сундук.
          </p>
        </details>

        <details class="group card-base p-4 cursor-pointer border-zinc-800">
          <summary class="font-bold text-xs sm:text-sm text-amber-400 flex items-center justify-between list-none">
            <span>Поддерживаются ли физические геймпады и контроллеры?</span>
            <span class="text-xs text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs text-zinc-300 mt-2.5 leading-relaxed">
            Да. Игра обладает нативной поддержкой мобильных контроллеров Razer Kishi Ultra, Backbone One, а также беспроводных геймпадов Xbox Wireless Controller и Sony DualSense.
          </p>
        </details>
      </div>
    </section>

    <!-- Нижний баннер загрузки -->
    <section class="max-w-4xl mx-auto">
      <div class="rounded-2xl p-8 border border-amber-500/30 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-center space-y-4 shadow-card">
        <h3 class="heading-gothic text-2xl sm:text-3xl font-bold text-amber-400">
          Готовы вступить в битву за выживание?
        </h3>
        <p class="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          Установите игру прямо сейчас на свой смартфон и испытайте настоящий шквал экшена.
        </p>
        <div class="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://apps.apple.com/app/vampire-survivors/id6444525702"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-gold px-6 py-2.5 text-xs sm:text-sm font-bold"
          >
            Скачать для iPhone & iPad
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.poncle.vampiresurvivors"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-blood px-6 py-2.5 text-xs sm:text-sm font-bold"
          >
            Скачать для Android
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdSlot from '../components/AdSlot.vue'
import HostingTable from '../components/HostingTable.vue'
import { openChestModal } from '../utils/store.js'
import { playClickSound } from '../utils/audio.js'

defineProps({
  allCreative: {
    type: Boolean,
    default: true
  }
})

defineEmits(['switch-tab'])

const selectedCharIdx = ref(0)

const selectChar = (idx) => {
  selectedCharIdx.value = idx
  playClickSound()
}

const characterList = [
  {
    name: 'Antonio Belpaese',
    title: 'Воин с Кнутом',
    role: 'Стартовый боец клана Бельпаезе',
    weapon: 'Кнут (Whip)',
    description: 'Легендарный охотник на вампиров. Наносит сокрушительные горизонтальные удары кнутом, каждые 10 уровней увеличивая урон на +10% (вплоть до +50%).',
    hp: '120',
    speed: '+10%',
    passive: '+10% Урона / 10 уровней'
  },
  {
    name: 'Imelda Belpaese',
    title: 'Архимаг',
    role: 'Магистр заклинаний тайного света',
    weapon: 'Волшебная палочка (Magic Wand)',
    description: 'Ученая чародейка, способная ускоренно поглощать кристаллы опыта. Получает дополнительный прирост к опыту каждые 5 уровней, опережая орды врагов в развитии.',
    hp: '100',
    speed: 'Норма',
    passive: '+10% Опыта / 5 уровней'
  },
  {
    name: 'Gennaro Belpaese',
    title: 'Мастер Ножей',
    role: 'Быстрый стрелок метательных клинков',
    weapon: 'Нож (Knife)',
    description: 'Мастер молниеносного метания кинжалов. Пассивно дарует +1 дополнительный снаряд ко всем видам оружия в арсенале с самого начала матча.',
    hp: '100',
    speed: '+15%',
    passive: '+1 Доп. снаряд ко всему оружию'
  },
  {
    name: 'Mortaccio',
    title: 'Костяной Лорд',
    role: 'Загадочный восставший скелет',
    weapon: 'Кость (Bone)',
    description: 'Тайный персонаж, бросающий рикошетящие кости. Каждые 20 уровней получает еще один дополнительный снаряд (до +3 снарядов на 60-м уровне).',
    hp: '100',
    speed: 'Норма',
    passive: '+1 Снаряд / 20 уровней'
  }
]

const activeChar = computed(() => characterList[selectedCharIdx.value])
</script>

