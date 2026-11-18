import { reactive, ref } from 'vue';
import { playCoinSound, playClickSound, playLevelUpSound, playChestFanfare } from './audio.js';

// Баланс золота игрока
const savedGold = localStorage.getItem('vamp_player_gold');
export const playerGold = ref(savedGold ? parseInt(savedGold, 10) : 294600);

// Добавление золота
export const addGold = (amount) => {
  playerGold.value += amount;
  localStorage.setItem('vamp_player_gold', playerGold.value.toString());
  playCoinSound();
};

// Списание золота
export const spendGold = (amount) => {
  if (playerGold.value >= amount) {
    playerGold.value -= amount;
    localStorage.setItem('vamp_player_gold', playerGold.value.toString());
    playCoinSound();
    return true;
  }
  return false;
};

// Хранилище всплывающих уведомлений
export const toasts = reactive([]);

let toastCounter = 0;

// Добавление уведомления
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

// Состояние модальных окон
export const isChestModalOpen = ref(false);
export const isCommandPaletteOpen = ref(false);

// Открытие окна сундука
export const openChestModal = () => {
  isChestModalOpen.value = true;
  playClickSound();
};

// Закрытие окна сундука
export const closeChestModal = () => {
  isChestModalOpen.value = false;
};

// Открытие палитры команд
export const openCommandPalette = () => {
  isCommandPaletteOpen.value = true;
  playClickSound();
};

// Закрытие палитры команд
export const closeCommandPalette = () => {
  isCommandPaletteOpen.value = false;
};

// Переключение полноэкранного режима
export const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.debug('Fullscreen error:', err);
    });
    pushToast({
      title: 'Полноэкранный режим',
      message: 'Приложение развернуто на весь экран (Esc для выхода)',
      type: 'info'
    });
  } else {
    document.exitFullscreen().catch(err => console.debug(err));
  }
};
