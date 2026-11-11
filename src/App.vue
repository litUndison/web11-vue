<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
    <!-- Main Top Navbar with Tabs -->
    <Navbar
      :activeTab="activeTab"
      :allCreative="allCreativeMode"
      @select-tab="setTab"
      @toggle-all-ads="toggleAllAdsMode"
    />

    <!-- Main Content Area with Dynamic Views -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

// Import all views from web9-10 enhanced with Day 11 requirements
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
