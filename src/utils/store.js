import { reactive, ref } from 'vue';
import { playCoinSound, playClickSound, playLevelUpSound, playChestFanfare } from './audio.js';

const savedGold = localStorage.getItem('vamp_player_gold');
export const playerGold = ref(savedGold ? parseInt(savedGold, 10) : 294600);

export const addGold = (amount) => {
  playerGold.value += amount;
  localStorage.setItem('vamp_player_gold', playerGold.value.toString());
  playCoinSound();
};

export const spendGold = (amount) => {
  if (playerGold.value >= amount) {
    playerGold.value -= amount;
    localStorage.setItem('vamp_player_gold', playerGold.value.toString());
    playCoinSound();
    return true;
  }
  return false;
};

// Toast notification management
export const toasts = reactive([]);

let toastCounter = 0;
export const pushToast = ({ title, message, type = 'gold', duration = 3500 }) => {
  const id = ++toastCounter;
  toasts.push({ id, title, message, type });

  if (type === 'gold' || type === 'loot') {
    playCoinSound();
  } else if (type === 'level') {
    playLevelUpSound();
  } else {
    playClickSound();
  }

  setTimeout(() => {
    const idx = toasts.findIndex(t => t.id === id);
    if (idx !== -1) {
      toasts.splice(idx, 1);
    }
  }, duration);
};

// Modals control
export const isChestModalOpen = ref(false);
export const isCommandPaletteOpen = ref(false);

export const openChestModal = () => {
  isChestModalOpen.value = true;
  playClickSound();
};

export const closeChestModal = () => {
  isChestModalOpen.value = false;
};

export const openCommandPalette = () => {
  isCommandPaletteOpen.value = true;
  playClickSound();
};

export const closeCommandPalette = () => {
  isCommandPaletteOpen.value = false;
};

// Fullscreen toggle
export const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.debug('Fullscreen error:', err);
    });
    pushToast({
      title: 'Полноэкранный режим',
      message: 'Веб-приложение развернуто на весь экран (Esc для выхода)',
      type: 'info'
    });
  } else {
    document.exitFullscreen().catch(err => console.debug(err));
  }
};
