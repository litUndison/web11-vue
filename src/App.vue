<template>
  <div class="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#040d0a] text-slate-800 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden bg-grid-pattern">
    <!-- Ambient background light blooms (Cyber Emerald & Mint) -->
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[450px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10"></div>
    <div class="fixed top-[350px] -left-40 w-[600px] h-[600px] bg-teal-500/5 dark:bg-teal-900/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    <div class="fixed top-[550px] -right-40 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-950/25 blur-[120px] rounded-full pointer-events-none -z-10"></div>

    <!-- Main Top Navbar with Tabs -->
    <Navbar
      :activeTab="activeTab"
      :allCreative="allCreativeMode"
      @select-tab="setTab"
      @toggle-all-ads="toggleAllAdsMode"
    />

    <!-- Main Content Area with Dynamic Views -->
    <main class="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

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
const allCreativeMode = ref(false)

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
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
