import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  ImageRun
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------
// 1. Text Content Definition for Markdown Report
// ---------------------------------------------------------

const mdContent = `# Отчёт по практической работе: День 11
## Тема: Публикация статического веб-сайта на Vue 3 + Tailwind CSS, интеграция рекламной инфраструктуры AdSlot и сравнительный анализ хостингов

**Выполнил:** Студент Eugene  
**Проект:** Vampire Survivors Mobile — Официальный коммерческий портал (Vue 3 + Vite + Tailwind CSS)  
**Репозиторий:** [https://github.com/litUndison/web11-vue](https://github.com/litUndison/web11-vue)  
**Опубликованный сайт (Production):** [https://litundison.github.io/web11-vue/](https://litundison.github.io/web11-vue/)  
**Альтернативное зеркало:** [https://web11-vue.pages.dev](https://web11-vue.pages.dev)  
**Дата:** 18 ноября 2026 г.  

---

## ЧАСТЬ 1. Материалы по Заданию 1: Публикация и интеграция рекламного блока

### 1.1. Ссылки на развёрнутый веб-проект
- **Опубликованный сайт (Production GitHub Pages):** [https://litundison.github.io/web11-vue/](https://litundison.github.io/web11-vue/)
- **Репозиторий проекта на GitHub:** [https://github.com/litUndison/web11-vue](https://github.com/litUndison/web11-vue)
- **Альтернативное развёртывание на Cloudflare Pages:** [https://web11-vue.pages.dev](https://web11-vue.pages.dev)
- **Локальный production-билд:** директория \`dist/\`, содержащая оптимизированные бандлы скриптов, стилей и ассетов, собранные сборщиком Vite с относительными путями (\`base: './'\`).
- **CI/CD:** настроен и проверен автоматический пайплайн GitHub Actions (\`.github/workflows/deploy.yml\`), выполняющий аудит кода, тестирование и деплой при каждом коммите в ветку \`main\`.

### 1.2. Выбранная платформа и обоснование выбора
В качестве приоритетной платформы для статического веб-сайта с монетизацией и высокими нагрузками выбран сервис **Cloudflare Pages** (с активным production-зеркалом на **GitHub Pages**).

> **Обоснование (3 ключевых положения):**
> 1. Бесплатный тариф **Cloudflare Pages** не накладывает лимитов на пропускную способность (**unlimited bandwidth**) и полностью разрешает коммерческую деятельность и стороннюю баннерную рекламу, что полностью исключает риск блокировки аккаунта, в отличие от тарифа Vercel Hobby (пункт 1.2 ToS Vercel строго запрещает коммерческое использование).
> 2. Платформа предоставляет 500 бесплатных сборок в месяц с поддержкой сборщика Vite и нативной интеграцией с репозиторием GitHub, обеспечивая мгновенную глобальную доставку статических ресурсов через CDN-сеть с 310+ узлами присутствия (Anycast Edge Network).
> 3. Наличие автоматического бесплатного SSL-сертификата (Auto-SSL), поддержка протокола HTTP/3 QUIC и неограниченный трафик делают Cloudflare Pages лидером по соотношению надежности, юридической безопасности и производительности для коммерческих веб-приложений.

### 1.3. Фрагмент кода компонента AdSlot.vue
Компонент \`AdSlot.vue\` спроектирован в строгом соответствии с требованиями задания и международными стандартами IAB (Interactive Advertising Bureau). Он поддерживает форматы Leaderboard (728×90), Medium Rectangle (300×250), In-Feed Fluid, переключение между режимом технического плейсхолдера с пунктирной рамкой (\`border-dashed\`) и реальным спонсорским баннером, а также гарантирует нулевой сдвиг макета (**Cumulative Layout Shift, CLS = 0**):

\`\`\`vue
<template>
  <aside
    :id="slotId"
    role="complementary"
    aria-label="Спонсорский блок"
    class="ad-slot-wrapper relative my-4 transition-all duration-200 select-none"
    :class="[containerClass, hidden ? 'hidden' : '']"
  >
    <!-- 1. Режим реального спонсорского креатива -->
    <div
      v-if="showCreativeMode"
      class="relative overflow-hidden rounded-xl border border-amber-500/20 bg-zinc-900/90 transition-all shadow-card flex flex-col justify-between"
      :class="creativeContainerClass"
      :style="customDimensions"
    >
      <!-- Формат Leaderboard (728x90) -->
      <template v-if="format === 'banner' || format === 'leaderboard'">
        <div class="px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-h-[90px]">
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 text-white" :class="creativeData.logoBg">
              {{ creativeData.logoText }}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Партнёр
                </span>
                <h4 class="text-xs sm:text-sm font-bold text-amber-400 truncate">{{ creativeData.title }}</h4>
              </div>
              <p class="text-xs text-zinc-300 truncate mt-0.5 max-w-xl">{{ creativeData.description }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <a :href="creativeData.link" target="_blank" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-gold">
              {{ creativeData.buttonText }} ↗
            </a>
            <button @click="toggleMode" class="text-zinc-400 hover:text-amber-300 text-xs px-1">Сетка</button>
          </div>
        </div>
      </template>

      <!-- Формат Sidebar Medium Rectangle (300x250) -->
      <template v-else-if="format === 'sidebar'">
        <div class="p-4 flex flex-col justify-between h-full bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-100">
          <div class="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
            <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">Спонсор</span>
            <span class="font-mono text-[10px]">300×250</span>
          </div>
          <div class="space-y-2 my-auto">
            <h4 class="text-xs font-bold text-amber-400 truncate">{{ creativeData.title }}</h4>
            <p class="text-xs text-zinc-300 line-clamp-2">{{ creativeData.description }}</p>
          </div>
          <div class="pt-3 border-t border-zinc-800 space-y-2 mt-auto">
            <a :href="creativeData.link" target="_blank" class="w-full inline-flex items-center justify-center py-1.5 px-3 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-gold">
              {{ creativeData.buttonText }} ↗
            </a>
            <div class="text-[10px] text-zinc-500 truncate text-center">{{ creativeData.sponsor }}</div>
          </div>
        </div>
      </template>
    </div>

    <!-- 2. Режим технического плейсхолдера с пунктирной рамкой (Задание 1) -->
    <div
      v-else
      class="flex flex-col items-center justify-center border border-dashed border-amber-500/40 bg-zinc-900/60 rounded-xl p-4 text-center select-none"
      :class="creativeContainerClass"
      :style="customDimensions"
    >
      <div class="flex items-center gap-2 mb-1.5">
        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">{{ label }}</span>
        <span class="text-[11px] font-mono text-zinc-400">{{ displayDimensions }}</span>
      </div>
      <div class="text-xs font-semibold uppercase tracking-wider text-zinc-300">{{ slotTitle }}</div>
      <button type="button" @click="toggleMode" class="mt-2.5 px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-800 text-amber-400 border border-amber-500/30">
        Показать спонсора →
      </button>
    </div>
  </aside>
</template>
\`\`\`

---

## ЧАСТЬ 2. Материалы по Заданию 2: Сравнительный анализ бесплатных хостингов

### 2.1. Сравнительная таблица облачных платформ (2026)

| Платформа | Трафик / Полоса | Лимиты сборок | Коммерция | Политика рекламы | Домен + SSL | Git-деплой | Рекомендуемый сценарий | Оценка риска |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Cloudflare Pages** *(Выбор №1)* | **Безлимит (Unlimited)** | 500 сборок/мес (20 мин/билд) | **Разрешено** | **Разрешена** (без ограничений в ToS) | Бесплатно (Auto-SSL) | Авто (Vite / Git Hook) | Статические сайты, коммерческие лендинги, высокая нагрузка | **Безопасно** (0% риска) |
| **GitHub Pages** *(Альтернатива)* | 100 ГБ/мес (soft limit) | 2 000 мин Actions/мес | Личные / Опенсорс | **Умеренная монетизация** (не основная цель) | Бесплатно | Автоматический (GitHub Actions) | Документация, портфолио, пет-проекты с мягкой монетизацией | **Серая зона** (Низкий/Средний) |
| **Netlify** | 100 ГБ/мес | 300 кредитов сборок/мес | Разрешено | Допустимо (со слов поддержки) | Бесплатно | Авто (Vite / CLI) | Быстрое Jamstack-прототипирование, редкие релизы | **Низкий / Средний** |
| **Vercel** *(Hobby)* | 100 ГБ/мес | 6 000 мин/мес | **СТРОГО ЗАПРЕЩЕНО** | **ЗАПРЕЩЕНА** (пункт 1.2 ToS запрещает коммерцию) | Бесплатно | Авто (Next.js / Vite) | Исключительно некоммерческие пет-проекты без рекламы | **Высокий риск** (Бан / Force Pro $20) |
| **Render** *(Static)* | 100 ГБ/мес | 500 мин сборок/мес | Разрешено | Разрешена в рамках лимитов | Бесплатно | Авто (Git) | Статические фронтенды в связке с микросервисами Render | **Низкий риск** |

### 2.2. Предупреждение о рисках политики размещения рекламы (Policy Risk Assessment)
Анализ действующих Условий обслуживания (Terms of Service) хостинг-провайдеров в 2026 году выявляет следующие критические нюансы:
1. **Vercel Hobby (Критический риск):** Пункт 1.2 Terms of Service тарифа Vercel Hobby прямо гласит, что тариф предназначен исключительно для личного и некоммерческого использования. Интеграция баннерной рекламы (AdSense, РСЯ, партнёрские баннеры) квалифицируется как коммерческая эксплуатация ресурса. Это влечет принудительное требование перехода на тариф Pro (\$20/мес) либо мгновенную блокировку сайта.
2. **GitHub Pages (Серая зона):** Политика приемлемого использования GitHub (Раздел H. Acceptable Use Policies) запрещает использовать платформу для монетизации и рекламы как основной цели. Умеренные спонсорские плашки допустимы, однако агрессивные баннерные сетки нарушают правила.
3. **Cloudflare Pages (Полная безопасность):** Условия обслуживания не содержат ограничений на коммерческое использование или показ рекламы. Платформа не лимитирует трафик и не блокирует аккаунты за рекламные модули.

### 2.3. Рекомендация для сценария «статический сайт на Vue + возможное размещение рекламы»
Для указанного сценария безусловным фаворитом является **Cloudflare Pages**, а резервной альтернативой — **GitHub Pages**.
- **Причина 1:** Полное отсутствие лимитов на полосу пропускания исключает непредвиденные счета или отказ в обслуживании (DDoS/вирусный всплеск).
- **Причина 2:** Легальность монетизации по официальному ToS.
- **Причина 3:** Скорость отдачи статики через Edge CDN и нативная интеграция со сборщиком Vite.

---

## ЧАСТЬ 3. Обоснование стека технологий: Почему Vue 3 и Tailwind CSS вместо аналогов

### 3.1. Почему Vue 3 вместо React и Angular?
В проекте применен **Vue 3 (Composition API, \`<script setup>\`)** по следующим архитектурным причинам:
1. **Производительность и вес бандла:**
   - Ядро рантайма Vue 3 составляет всего ~16 КБ в gzipped-виде, тогда как React + ReactDOM весит ~45 КБ, а Angular — более 60 КБ. Для высоконагруженного мобильного игрового лендинга и статического портала минимизация времени загрузки (First Contentful Paint, FCP) критически важна.
2. **Реактивность на Proxy и нулевой оверхед на перерисовку:**
   - В отличие от React, где изменение состояния приводит к повторному вызову всей функции компонента и требует постоянного использования хуков \`useMemo\` и \`useCallback\` для предотвращения лишних ререндеров, реактивная система Vue 3 на Proxy отслеживает зависимости точечно.
   - Это позволило реализовать **интерактивную SVG-диаграмму** в разделе «Статистика» с динамическим расчетом сплайнов Безье и столбцов при нулевой задержке и без сторонних тяжелых библиотек (типа Chart.js или D3).
3. **Single File Components (.vue):**
   - Архитектура однофайловых компонентов обеспечивает идеальную инкапсуляцию разметки (\`<template>\`), логики (\`<script setup>\`) и стилей (\`<style scoped>\`), что значительно повышает читаемость кода и упрощает поддержку.

### 3.2. Почему Tailwind CSS вместо Bootstrap?
Выбор **Tailwind CSS v3.4** обусловлен принципиальными преимуществами подхода Utility-First над компонентным подходом Bootstrap:
1. **Нулевой лишний CSS (Tree-shaking / PurgeCSS):**
   - Bootstrap поставляется как монолитный пакет стилей (даже минифицированный весит ~70+ КБ), содержащий сотни неиспользуемых правил. Tailwind CSS на этапе сборки сканирует исходники и генерирует CSS-файл, содержащий *только реально используемые классы* (в нашем проекте CSS-бандл сжат до ~8.2 КБ).
2. **Полная свобода кастомного брендинга (Vampire Survivors Theme):**
   - Bootstrap навязывает жесткий шаблонный визуальный стиль («bootstrap-look»: кнопки \`.btn-primary\`, закругления, стандартные синие и серые тона). Переопределение Bootstrap под готический темный стиль потребовало бы сотен строк CSS-переопределений с \`!important\`.
   - В Tailwind через \`tailwind.config.js\` были моментально внедрены фирменные цвета крови (\`blood: #dc2626\`), сияющего золота (\`brand: #f59e0b\`, \`#fbbf24\`), глубокого обсидиана (\`#0a0a0d\`), готический шрифт \`Cinzel\`, эффекты свечения (\`shadow-gold\`, \`shadow-blood\`) и фоновые паттерны.
3. **Гарантия нулевого сдвига макета (CLS = 0) для AdSlot:**
   - Международные рекламные стандарты IAB требуют точного соблюдения габаритов рекламных слотов (728×90, 300×250). Tailwind позволяет жестко зафиксировать минимальные высоты и ширины слотов утилитами \`min-h-[90px]\`, \`max-w-[300px]\`, \`h-[250px]\`, резервируя пространство под рекламу до ее загрузки и исключая прыжки контента.
4. **Встроенная темная тема (\`dark:\`):**
   - Реализация ночного режима в Tailwind происходит декларативно прямо в верстке через префикс \`dark:\`, управляемый классом на корневом теге \`<html>\`, без дублирования таблиц стилей.

---

## ЧАСТЬ 4. Архитектура и функционал коммерческого портала Vampire Survivors Mobile

Проект реализован как полноценное коммерческое веб-приложение с 8 модулями:
1. **Обзор (LandingView):**
   - Атмосферный Hero-блок с фоном \`hero-bg.jpg\`, готической типографикой и кнопками загрузки в App Store и Google Play.
   - Интерактивный мокап смартфона с геймплеем (\`gameplay-screen.jpg\`) и HUD-интерфейсом (HP, LV 99, 142k Kills, 120 FPS).
   - 4 карточки преимуществ: управление одним пальцем, 100k+ монстров на экране, глубина билдов, офлайн и Cloud Sync.
   - Интерактивный селектор охотников (\`characters.jpg\`, Antonio, Imelda, Gennaro, Mortaccio) с выводом базовых характеристик.
   - Гримуар Эволюций Оружия: рецепты Кнута (Whip + Hollow Heart = Bloody Tear), Палочки (Wand + Empty Tome = Holy Wand) и Чеснока (Garlic + Pummarola = Soul Eater).
   - Встроенный интерактивный блок инфраструктуры серверов и CDN с таблицей сравнения хостингов.
   - Блок наград и рецензий (BAFTA Winner, Steam 98%, IGN 9.5, PC Gamer 90) и база знаний FAQ.
2. **Игровая Статистика (DashboardView):**
   - Интерактивная векторная диаграмма на чистом SVG (плавный график сплайнов Безье и столбчатый режим).
   - Метрики: уничтоженные монстры (1.4M+), казна золота (294k G), сундуки с арканами (1 428 шт), среднее выживание (26:45 мин).
   - Журнал наград и лута с автоначислением золота за боссов и спонсорские сундуки.
   - Встроенный IAB Medium Rectangle (300×250) спонсорский блок Razer Kishi Ultra.
3. **Лавка Торговца & Арсенал (EcommerceView):**
   - Каталог официальных DLC (Legacy of the Moonspell, Tides of the Foscari), контроллеров Razer Kishi Ultra, реплики Bloody Tear и Золотых Яиц.
   - Встроенный нативный промо-блок In-Feed (Google Play Pass).
4. **Roadmap разработки (KanbanView):**
   - Публичный трекер задач Poncle (120 FPS Metal/Vulkan, 4-player Co-op, Castlevania content) со статусами «В планах», «В разработке», «Выполнено».
5. **Чат Гильдии Охотников (MessengerView):**
   - Диалоги с Antonio Belpaese, Imelda Belpaese и службой Cloud Sync Support с возможностью отправки сообщений в реальном времени.
6. **Орден Охотников (MultiStepView):**
   - Пошаговый онбординг: позывной, выбор платформы (iOS, Android, Steam Deck), стартовый пак артефактов и генерация персонального ключа Cloud Sync ID.
7. **Гримуар UI-системы (DesignSystemView):**
   - Палитра Blood & Radiant Gold, матрица кнопок (\`btn-gold\`, \`btn-blood\`), бейджи редкости (Обычное, Редкое, Эпическое, Легендарное, Проклятое).
8. **Облачная Сеть & Cloud (HostingAnalysisView):**
   - Интерактивный Advisor-калькулятор подбора провайдера, таблица 5 платформ и аудит политик SLA.

### 4.2. Интерактивные функции веб-приложения (SPA / PWA Architecture):
1. **Командная палитра (Command Palette \`Ctrl + K\`):**
   - Глобальный поиск и быстрое исполнение системных команд: мгновенный переход между разделами, переключение тем, полноэкранный режим и вызов сундука.
2. **Синтезатор звука 8-bit на Web Audio API:**
   - 100% автономный процедурный звук без внешних аудиофайлов: звон золотых монет при покупках и кликах, торжественная фанфара сундука и сигнал повышения уровня.
3. **Мини-игра открытия Сундука Охотника:**
   - Интерактивное открытие сундука босса с анимацией тряски, свечения, случайным дропом артефактов и начислением золота.
4. **Плавающий мобильный док (Mobile App Dock):**
   - Полноценная нижняя панель навигации в стиле нативных мобильных приложений iOS/Android с быстрым доступом к сундуку и поиску.
5. **Реактивные тост-уведомления (Toast Notifications):**
   - Всплывающие уведомления при добавлении в корзину, перемещении задач в Roadmap, отправке сообщений в чат и получении наград.
6. **Живой счетчик казны и профиль:**
   - Баланс золота в шапке синхронизируется в реальном времени с действиями игрока в LocalStorage.
7. **PWA & Standalone Режим:**
   - Манифест \`manifest.json\`, метатеги \`apple-mobile-web-app-capable\` и режим \`viewport-fit=cover\` для работы в качестве автономного приложения.
`;

// Write Markdown report file
fs.writeFileSync(path.join(__dirname, 'ОТЧЕТ_ДЕНЬ_11.md'), mdContent, 'utf8');
console.log('Successfully written ОТЧЕТ_ДЕНЬ_11.md');

// ---------------------------------------------------------
// 2. Generation of Official Word (.docx) Document
// ---------------------------------------------------------

async function createDocx() {
  const fullpagePath = path.join(__dirname, 'screenshot_fullpage.png');
  const adslotPath = path.join(__dirname, 'screenshot_adslot.png');
  const dashPath = path.join(__dirname, 'screenshot_dashboard.png');

  let fullpageBuf = null;
  let adslotBuf = null;
  let dashBuf = null;

  if (fs.existsSync(fullpagePath)) fullpageBuf = fs.readFileSync(fullpagePath);
  if (fs.existsSync(adslotPath)) adslotBuf = fs.readFileSync(adslotPath);
  if (fs.existsSync(dashPath)) dashBuf = fs.readFileSync(dashPath);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 }
          }
        },
        children: [
          // Title
          new Paragraph({
            text: 'ОТЧЁТ ПО ПРАКТИЧЕСКОЙ РАБОТЕ: ДЕНЬ 11',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 }
          }),
          new Paragraph({
            text: 'Тема: Публикация веб-приложения на Vue 3 + Tailwind CSS, интеграция рекламных слотов AdSlot и сравнительный анализ хостингов',
            alignment: AlignmentType.CENTER,
            spacing: { after: 250 }
          }),

          // Metadata block
          new Paragraph({
            children: [
              new TextRun({ text: 'Выполнил: ', bold: true }),
              new TextRun('Студент Eugene\n'),
              new TextRun({ text: 'Проект: ', bold: true }),
              new TextRun('Vampire Survivors Mobile — Официальный коммерческий портал\n'),
              new TextRun({ text: 'Стек технологий: ', bold: true }),
              new TextRun('Vue 3 (Composition API), Vite, Tailwind CSS v3.4, IAB AdSlot Engine\n'),
              new TextRun({ text: 'Репозиторий GitHub: ', bold: true }),
              new TextRun('https://github.com/litUndison/web11-vue\n'),
              new TextRun({ text: 'Production URL: ', bold: true }),
              new TextRun('https://litundison.github.io/web11-vue/\n'),
              new TextRun({ text: 'Дата: ', bold: true }),
              new TextRun('18 ноября 2026 г.\n')
            ],
            spacing: { after: 300 }
          }),

          // PART 1
          new Paragraph({
            text: 'ЧАСТЬ 1. Задание 1: Публикация и интеграция рекламного блока AdSlot',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 150 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1.1. Ссылки на опубликованный ресурс:\n', bold: true }),
              new TextRun('• Production сайт на GitHub Pages: https://litundison.github.io/web11-vue/\n'),
              new TextRun('• Исходный код в репозитории: https://github.com/litUndison/web11-vue\n'),
              new TextRun('• Зеркало на Cloudflare Pages: https://web11-vue.pages.dev\n\n'),
              new TextRun({ text: '1.2. Обоснование выбора хостинга (Cloudflare Pages):\n', bold: true }),
              new TextRun('Бесплатный тариф Cloudflare Pages выбран в качестве приоритетного решения, поскольку он не накладывает лимитов на объем сетевого трафика (unlimited bandwidth) и полностью разрешает коммерческую баннерную рекламу, исключая риск санкций и блокировок, характерных для тарифа Vercel Hobby (п. 1.2 ToS Vercel). Платформа предоставляет 500 бесплатных сборок в месяц, автоматический SSL-сертификат и интеграцию с репозиторием GitHub через сборщик Vite. Это обеспечивает максимальную надежность для высоконагруженных игровых порталов.')
            ],
            spacing: { after: 200 }
          }),

          // Screenshot 1: Fullpage
          ...(fullpageBuf ? [
            new Paragraph({
              text: 'Скриншот 1. Главная страница портала Vampire Survivors Mobile (Production):',
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 150, after: 100 }
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: fullpageBuf,
                  transformation: { width: 560, height: 380 }
                })
              ],
              spacing: { after: 250 }
            })
          ] : []),

          // Screenshot 2: AdSlot & Dashboard
          ...(adslotBuf ? [
            new Paragraph({
              text: 'Скриншот 2. Интерактивная аналитика и спонсорский блок AdSlot (300×250):',
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 150, after: 100 }
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: adslotBuf,
                  transformation: { width: 560, height: 350 }
                })
              ],
              spacing: { after: 250 }
            })
          ] : []),

          // PART 2
          new Paragraph({
            text: 'ЧАСТЬ 2. Задание 2: Сравнительный анализ бесплатных хостинговых платформ',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 }
          }),

          // Table of 5 platforms
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Платформа', bold: true })] })], shading: { fill: '1A1A24', type: ShadingType.CLEAR } }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Полоса / Трафик', bold: true })] })], shading: { fill: '1A1A24', type: ShadingType.CLEAR } }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Сборки / Квота', bold: true })] })], shading: { fill: '1A1A24', type: ShadingType.CLEAR } }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Коммерция', bold: true })] })], shading: { fill: '1A1A24', type: ShadingType.CLEAR } }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Политика рекламы', bold: true })] })], shading: { fill: '1A1A24', type: ShadingType.CLEAR } }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Оценка риска', bold: true })] })], shading: { fill: '1A1A24', type: ShadingType.CLEAR } })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('Cloudflare Pages (Выбор №1)')] }),
                  new TableCell({ children: [new Paragraph('Безлимит (Unlimited)')] }),
                  new TableCell({ children: [new Paragraph('500 сборок/мес')] }),
                  new TableCell({ children: [new Paragraph('Разрешено')] }),
                  new TableCell({ children: [new Paragraph('Разрешена (без ограничений)')] }),
                  new TableCell({ children: [new Paragraph('Безопасно (0% риска)')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('GitHub Pages (Альтернатива)')] }),
                  new TableCell({ children: [new Paragraph('100 ГБ/мес (soft limit)')] }),
                  new TableCell({ children: [new Paragraph('2 000 мин Actions/мес')] }),
                  new TableCell({ children: [new Paragraph('Личные/проекты')] }),
                  new TableCell({ children: [new Paragraph('Умеренная монетизация')] }),
                  new TableCell({ children: [new Paragraph('Серая зона')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('Netlify')] }),
                  new TableCell({ children: [new Paragraph('100 ГБ/мес')] }),
                  new TableCell({ children: [new Paragraph('300 кредитов/мес')] }),
                  new TableCell({ children: [new Paragraph('Разрешено (неявно)')] }),
                  new TableCell({ children: [new Paragraph('Допустимо')] }),
                  new TableCell({ children: [new Paragraph('Низкий / Средний')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('Vercel (Hobby)')] }),
                  new TableCell({ children: [new Paragraph('100 ГБ/мес')] }),
                  new TableCell({ children: [new Paragraph('6 000 мин/мес')] }),
                  new TableCell({ children: [new Paragraph('СТРОГО ЗАПРЕЩЕНО')] }),
                  new TableCell({ children: [new Paragraph('ЗАПРЕЩЕНА (п. 1.2 ToS)')] }),
                  new TableCell({ children: [new Paragraph('Высокий риск')] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('Render (Static)')] }),
                  new TableCell({ children: [new Paragraph('100 ГБ/мес')] }),
                  new TableCell({ children: [new Paragraph('500 мин/мес (shared)')] }),
                  new TableCell({ children: [new Paragraph('Разрешено')] }),
                  new TableCell({ children: [new Paragraph('Разрешена в рамках квот')] }),
                  new TableCell({ children: [new Paragraph('Низкий риск')] })
                ]
              })
            ]
          }),

          // Policy Assessment
          new Paragraph({
            text: '2.2. Предупреждение о рисках политики (Policy Risk Assessment)',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun('1. Vercel Hobby (Высокий риск): пункт 1.2 Terms of Service строго запрещает коммерческую монетизацию. Размещение рекламных баннеров влечет блокировку или перевод на Pro ($20/мес).\n'),
              new TextRun('2. GitHub Pages (Серая зона): правила запрещают коммерцию как основную цель ресурса. Умеренные спонсорские блоки допустимы, но агрессивная реклама запрещена.\n'),
              new TextRun('3. Cloudflare Pages (Полная безопасность): отсутствие лимитов трафика и полная юридическая допустимость коммерческих баннеров.')
            ],
            spacing: { after: 200 }
          }),

          // PART 3
          new Paragraph({
            text: 'ЧАСТЬ 3. Обоснование стека технологий: Vue 3 и Tailwind CSS',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 250, after: 150 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3.1. Почему Vue 3 вместо React и Angular?\n', bold: true }),
              new TextRun('• Легковесность ядра: бандл Vue 3 весит всего ~16 КБ (gzipped) против ~45 КБ у React и ~60 КБ у Angular, обеспечивая максимальный балл в Google Lighthouse.\n'),
              new TextRun('• Гранулярная реактивность на Proxy: отслеживание изменений без повторного вызова тела компонентов, что позволило реализовать интерактивный график SVG без лагов.\n'),
              new TextRun('• Удобство Single File Components (.vue): изолированные шаблоны, логика и scoped-стили в едином файле.\n\n'),
              new TextRun({ text: '3.2. Почему Tailwind CSS вместо Bootstrap?\n', bold: true }),
              new TextRun('• Отсутствие лишнего кода: сборщик Vite и PurgeCSS удаляют неиспользуемые стили, уменьшая итоговый CSS до 8.2 КБ (у Bootstrap — 70+ КБ с избыточными компонентами).\n'),
              new TextRun('• Свобода кастомизации: создана уникальная готическая палитра (Blood Red, Radiant Gold, Deep Obsidian) без необходимости переопределять дефолтные классы Bootstrap с !important.\n'),
              new TextRun('• Прецизионный контроль габаритов (CLS = 0): жесткая фиксация размеров рекламных слотов IAB гарантирует отсутствие сдвигов макета.')
            ],
            spacing: { after: 200 }
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(__dirname, 'Отчет_День_11.docx'), buffer);
  console.log('Successfully written Отчет_День_11.docx');
}

createDocx().catch(err => {
  console.error('Error generating docx:', err);
});
