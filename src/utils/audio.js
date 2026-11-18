// Звуковой синтезатор на основе Web Audio API

let audioCtx = null;
let soundEnabled = true;

// Получение аудио контекста
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const isSoundEnabled = () => soundEnabled;

// Переключение состояния звука
export const toggleSound = () => {
  soundEnabled = !soundEnabled;
  localStorage.setItem('vamp_sound_enabled', soundEnabled ? '1' : '0');
  if (soundEnabled) {
    playCoinSound();
  }
  return soundEnabled;
};

// Инициализация звука
export const initSoundState = () => {
  const saved = localStorage.getItem('vamp_sound_enabled');
  soundEnabled = saved !== '0';
};

// Звук сбора золота
export const playCoinSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {
    console.debug('Audio error:', e);
  }
};

// Звук клика интерфейса
export const playClickSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.debug('Audio error:', e);
  }
};

// Звук открытия сундука
export const playChestFanfare = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [
      { freq: 523.25, time: 0.0, dur: 0.1 },
      { freq: 659.25, time: 0.1, dur: 0.1 },
      { freq: 783.99, time: 0.2, dur: 0.12 },
      { freq: 1046.50, time: 0.32, dur: 0.4 }
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime + n.time;

      osc.type = 'square';
      osc.frequency.setValueAtTime(n.freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + n.dur);
    });
  } catch (e) {
    console.debug('Audio error:', e);
  }
};

// Звук повышения уровня
export const playLevelUpSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    });
  } catch (e) {
    console.debug('Audio error:', e);
  }
};
