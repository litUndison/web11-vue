<template>
  <div class="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#0a0a0d] text-zinc-800 dark:text-zinc-100 transition-colors duration-200 relative overflow-x-hidden bg-subtle-grid">
    <!-- Main Top Navbar with Live App State & Controls -->
    <Navbar
      :activeTab="activeTab"
      :allCreative="allCreativeMode"
      @select-tab="setTab"
      @toggle-all-ads="toggleAllAdsMode"
    />

    <!-- Main Content Area with Dynamic Views -->
    <main class="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      <!-- Transition wrapper for views -->
      <transition name="fade" mode="out-in">
        <component
          :is="currentViewComponent"
          :allCreative="allCreativeMode"
          @switch-tab="setTab"
        />
      </transition>
    </main>

    <!-- Global Footer -->
    <Footer />

    <!-- Web App Features: Mobile Floating Dock -->
    <MobileDock
      :activeTab="activeTab"
      @select-tab="setTab"
    />

    <!-- Web App Features: Command Palette (Ctrl+K) -->
    <CommandPalette
      @select-tab="setTab"
    />

    <!-- Web App Features: Treasure Chest Simulator Modal -->
    <ChestModal />

    <!-- Web App Features: Real-time Toast Notifications -->
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

// Import views
import LandingView from './views/LandingView.vue'
import DashboardView from './views/DashboardView.vue'
import EcommerceView from './views/EcommerceView.vue'
import KanbanView from './views/KanbanView.vue'
import MessengerView from './views/MessengerView.vue'
import MultiStepView from './views/MultiStepView.vue'
import DesignSystemView from './views/DesignSystemView.vue'
import HostingAnalysisView from './views/HostingAnalysisView.vue'

const activeTab = ref('landing')
const allCreativeMode = ref(true)

const viewMap = {
  landing: LandingView,
  dashboard: DashboardView,
  ecommerce: EcommerceView,
  kanban: KanbanView,
  messenger: MessengerView,
  multistep: MultiStepView,
  'design-system': DesignSystemView,
  'hosting-analysis': HostingAnalysisView
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
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
