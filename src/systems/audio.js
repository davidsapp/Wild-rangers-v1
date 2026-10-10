// =========================================================
// WILD RANGERS ADVENTURE
// AUDIO SYSTEM
// =========================================================

let soundOn =
  localStorage.getItem("wr_v1_sound") !== "off";

let audioCtx = null;
let musicTimer = null;

// ---------------------------------------------------------
// START AUDIO
// ---------------------------------------------------------

export function startAudio() {
  if (!soundOn) return;

  try {
    if (!audioCtx) {
      const Ctx =
        window.AudioContext ||
        window.webkitAudioContext;

      if (Ctx) {
        audioCtx = new Ctx();
      }
    }

    if (
      audioCtx &&
      audioCtx.state === "suspended"
    ) {
      audioCtx.resume();
    }
  } catch (e) {}
}

// ---------------------------------------------------------
// TONE
// ---------------------------------------------------------

export function tone(
  freq = 440,
  duration = 0.08,
  type = "sine",
  volume = 0.035,
  delay = 0
) {
  if (!soundOn) return;

  startAudio();

  if (!audioCtx) return;

  try {
    const osc =
      audioCtx.createOscillator();

    const gain =
      audioCtx.createGain();

    osc.type = type;

    osc.frequency.setValueAtTime(
      freq,
      audioCtx.currentTime + delay
    );

    gain.gain.setValueAtTime(
      0.0001,
      audioCtx.currentTime + delay
    );

    gain.gain.exponentialRampToValueAtTime(
      volume,
      audioCtx.currentTime +
        delay +
        0.01
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audioCtx.currentTime +
        delay +
        duration
    );

    osc.connect(gain);
    gain.connect(
      audioCtx.destination
    );

    osc.start(
      audioCtx.currentTime + delay
    );

    osc.stop(
      audioCtx.currentTime +
        delay +
        duration +
        0.03
    );
  } catch (e) {}
}

// ---------------------------------------------------------
// SOUND EFFECTS
// ---------------------------------------------------------

export function soundTap() {
  tone(
    520,
    0.06,
    "sine",
    0.025
  );
}

export function soundCorrect() {
  tone(
    523,
    0.09,
    "sine",
    0.035
  );

  tone(
    659,
    0.12,
    "sine",
    0.04,
    0.08
  );

  tone(
    784,
    0.18,
    "sine",
    0.045,
    0.18
  );
}

export function soundWrong() {
  tone(
    220,
    0.12,
    "triangle",
    0.035
  );

  tone(
    175,
    0.18,
    "triangle",
    0.03,
    0.1
  );
}

export function soundWin() {
  tone(
    523,
    0.12,
    "sine",
    0.04
  );

  tone(
    659,
    0.12,
    "sine",
    0.04,
    0.12
  );

  tone(
    784,
    0.14,
    "sine",
    0.045,
    0.24
  );

  tone(
    1046,
    0.28,
    "sine",
    0.05,
    0.38
  );
}

export function soundGuide() {
  tone(
    392,
    0.1,
    "sine",
    0.025
  );

  tone(
    523,
    0.15,
    "sine",
    0.03,
    0.1
  );
}

export function soundCollect() {
  tone(
    620,
    0.07,
    "sine",
    0.03
  );

  tone(
    820,
    0.1,
    "sine",
    0.035,
    0.07
  );
}

// ---------------------------------------------------------
// AMBIENT MUSIC
// ---------------------------------------------------------

export function startAmbient() {
  if (!soundOn || musicTimer) {
    return;
  }

  const playAmbient = () => {
    if (!soundOn) {
      musicTimer = null;
      return;
    }

    tone(
      261,
      0.55,
      "sine",
      0.008
    );

    tone(
      329,
      0.55,
      "sine",
      0.006,
      0.18
    );

    tone(
      392,
      0.7,
      "sine",
      0.007,
      0.36
    );

    musicTimer = setTimeout(() => {
      musicTimer = null;
      startAmbient();
    }, 6500);
  };

  playAmbient();
}

export function stopAmbient() {
  if (musicTimer) {
    clearTimeout(musicTimer);
    musicTimer = null;
  }
}

// ---------------------------------------------------------
// SOUND TOGGLE
// ---------------------------------------------------------

export function toggleSound() {
  soundOn = !soundOn;

  localStorage.setItem(
    "wr_v1_sound",
    soundOn ? "on" : "off"
  );

  if (soundOn) {
    startAudio();
    soundTap();
    startAmbient();
  } else {
    stopAmbient();
  }

  return soundOn;
}

export function soundLabel() {
  return soundOn
    ? "🔊"
    : "🔇";
}

// ---------------------------------------------------------
// ON-SCREEN AUDIO BUTTON
// ---------------------------------------------------------


export function audioControl(s) {
  const g = s.add.graphics();

  g.fillStyle(0x183d29, 0.96);
  g.fillRoundedRect(450, 25, 70, 60, 16);

  const label = s.add.text(
    485,
    55,
    soundLabel(),
    {
      fontFamily: "Arial",
      fontSize: "28px",
      color: "#ffffff"
    }
  ).setOrigin(0.5);

  const hit = s.add.rectangle(
    485,
    55,
    70,
    60,
    0xffffff,
    0
  ).setInteractive({ useHandCursor: true });

  hit.on("pointerdown", () => {
    const enabled = toggleSound();
    label.setText(enabled ? "🔊" : "🔇");
  });

  return { hit, g, label };
}
