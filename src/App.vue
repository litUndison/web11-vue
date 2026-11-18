<template>
  <div class="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#0a0a0d] text-zinc-900 dark:text-zinc-100 transition-colors duration-200 relative overflow-x-hidden bg-subtle-grid">
    <!-- Шапка сайта -->
    <Navbar
      :activeTab="activeTab"
      :allCreative="allCreativeMode"
      @select-tab="setTab"
      @toggle-all-ads="toggleAllAdsMode"
    />

    <!-- Основная область контента -->
    <main class="flex-1 w-full mx-auto px-3 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      <!-- Анимация переходов -->
      <transition name="fade" mode="out-in">
        <component
          :is="currentViewComponent"
          :allCreative="allCreativeMode"
          @switch-tab="setTab"
        />
      </transition>
    </main>

    <!-- Подвал сайта -->
    <Footer />

    <!-- Мобильная панель навигации -->
    <MobileDock
      :activeTab="activeTab"
      @select-tab="setTab"
    />

    <!-- Командная строка поиска -->
    <CommandPalette
      @select-tab="setTab"
    />

    <!-- Модальное окно сундука -->
    <ChestModal />

    <!-- Всплывающие уведомления -->
    <ToastContainer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CommandPalette from './components/CommandPalette.vue'
import ChestModal from './components/ChestModal.vue'
import ToastContainer from './components/ToastContainer.vue'
import MobileDock from './components/MobileDock.vue'

// Импорт коммерческих представлений
import LandingView from './views/LandingView.vue'
import DashboardView from './views/DashboardView.vue'
import EcommerceView from './views/EcommerceView.vue'
import KanbanView from './views/KanbanView.vue'
import MessengerView from './views/MessengerView.vue'
import MultiStepView from './views/MultiStepView.vue'
import DesignSystemView from './views/DesignSystemView.vue'

const activeTab = ref('landing')
const allCreativeMode = ref(true)

const viewMap = {
  landing: LandingView,
  dashboard: DashboardView,
  ecommerce: EcommerceView,
  kanban: KanbanView,
  messenger: MessengerView,
  multistep: MultiStepView,
  'design-system': DesignSystemView
}

const currentViewComponent = computed(() => {
  return viewMap[activeTab.value] || LandingView
})

const setTab = (tabId) => {
  activeTab.value = tabId
  window.location.hash = tabId
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleAllAdsMode = () => {
  allCreativeMode.value = !allCreativeMode.value
}

onMounted(() => {
  const hash = window.location.hash.replace('#', '')
  if (hash && viewMap[hash]) {
    activeTab.value = hash
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
