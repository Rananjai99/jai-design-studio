let _ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!_ctx || _ctx.state === "closed") {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      _ctx = new Ctor();
    }
    return _ctx;
  } catch {
    return null;
  }
}

export function playTick(): void {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});

  const now = ctx.currentTime;
  const sr  = ctx.sampleRate;

  // Short noise burst — softer and lower-pitched than before
  const len  = Math.ceil(sr * 0.012);           // 12 ms
  const buf  = ctx.createBuffer(1, len, sr);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    // Gentler taper: slower fall-off so it doesn't feel abrupt
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.10));
  }

  const source = ctx.createBufferSource();
  source.buffer = buf;

  // Low-pass instead of bandpass removes the harshness from high frequencies
  const lpf = ctx.createBiquadFilter();
  lpf.type            = "lowpass";
  lpf.frequency.value = 6500;
  lpf.Q.value         = 0.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.025, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

  source.connect(lpf);
  lpf.connect(gain);
  gain.connect(ctx.destination);

  source.start(now);
}
