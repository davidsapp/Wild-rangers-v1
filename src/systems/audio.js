// =========================================================
// WILD RANGERS ADVENTURE
// AUDIO SYSTEM
// =========================================================

let soundOn =
  localStorage.getItem("wr_v1_sound") !== "off";

let audioCtx = null;
let musicTimer = null;

export function startAudio() {
  if (!audioCtx) {
    audioCtx =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

export function tone(
  frequency,
  duration,
  type = "sine",
  volume = 0.05
) {
  if (!soundOn) return;

  startAudio();

  const oscillator =
    audioCtx.createOscillator();

  const gain =
    audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.value =
    frequency;

  gain.gain.setValueAtTime(
    volume,
    audioCtx.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + duration
  );

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(
    audioCtx.currentTime + duration
  );
}

export function soundTap() {
  tone(520, 0.07, "sine", 0.04);
}

export function soundCorrect() {
  tone(660, 0.10, "sine", 0.05);

  setTimeout(() => {
    tone(880, 0.14, "sine", 0.05);
  }, 80);
}

export function soundWrong() {
  tone(220, 0.18, "sawtooth", 0.035);
}

export function soundWin() {
  tone(523, 0.12, "sine", 0.05);

  setTimeout(() => {
    tone(659, 0.12, "sine", 0.05);
  }, 120);

  setTimeout(() => {
    tone(784, 0.20, "sine", 0.05);
  }, 240);
}

export function soundGuide() {
  tone(440, 0.10, "sine", 0.04);
}

export function soundCollect() {
  tone(740, 0.08, "triangle", 0.04);

  setTimeout(() => {
    tone(980, 0.12, "triangle", 0.04);
  }, 70);
}

export function startAmbient() {
  if (!soundOn || musicTimer) return;

  startAudio();

  musicTimer = setInterval(() => {
    tone(196, 0.30, "sine", 0.012);

    setTimeout(() => {
      tone(247, 0.30, "sine", 0.012);
    }, 350);
  }, 5000);
}

export function stopAmbient() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
}

export function toggleSound() {
  soundOn = !soundOn;

  localStorage.setItem(
    "wr_v1_sound",
    soundOn ? "on" : "off"
  );

  if (soundOn) {
    startAudio();
    startAmbient();
  } else {
    stopAmbient();
  }

  return soundOn;
}

export function soundLabel() {
  return soundOn
    ? "🔊 Sound On"
    : "🔇 Sound Off";
}

export function audioControl(s) {
  return {
    get enabled() {
      return soundOn;
    },

    toggle() {
      return toggleSound();
    },

    label() {
      return soundLabel();
    }
  };
}