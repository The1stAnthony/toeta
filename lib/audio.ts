// Shared Web Audio helpers — used by dashboard and dessert roll.
// All sounds are synthesized; no external audio files needed.

export function playMealReady() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Three quick noise bursts simulating dice clatter
    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.07;
      const bufSize = Math.floor(ctx.sampleRate * 0.018);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let j = 0; j < bufSize; j++) data[j] = (Math.random() * 2 - 1) * (1 - j / bufSize);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.2, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
      src.connect(g);
      g.connect(ctx.destination);
      src.start(t);
    }

    // Two ascending tones — the "ding" that signals the result
    (
      [
        [880, 0.22],
        [1318.5, 0.37],
      ] as [number, number][]
    ).forEach(([freq, delay]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = now + delay;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.25, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    });
  } catch {
    // AudioContext blocked by browser policy — silent fail is acceptable
  }
}
