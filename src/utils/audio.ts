// Synthesized audio & real cry audio player with Web Audio API fallback

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export async function playPokemonCry(dexId: number, baseSpeed: number = 80): Promise<void> {
  // First attempt to play official cry from PokeAPI audio repository
  const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${dexId}.ogg`;
  
  try {
    const audio = new Audio(cryUrl);
    audio.volume = 0.6;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      await playPromise;
      return;
    }
  } catch {
    // If blocked by CORS or network, synthesize an authentic 8-bit chip chiptune cry
    synthesizePokemonCry(dexId, baseSpeed);
  }
}

export function synthesizePokemonCry(dexId: number, baseSpeed: number): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  // Seeded frequencies derived from dex ID & speed
  const baseFreq = 220 + (dexId % 40) * 18 + (baseSpeed * 2);
  const modFreq = baseFreq * (1.2 + ((dexId % 7) * 0.1));

  osc1.type = 'sawtooth';
  osc2.type = 'square';

  osc1.frequency.setValueAtTime(baseFreq, now);
  osc1.frequency.exponentialRampToValueAtTime(modFreq * 1.5, now + 0.08);
  osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.25);

  osc2.frequency.setValueAtTime(baseFreq * 0.5, now);
  osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.12);
  osc2.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.3);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.36);
  osc2.stop(now + 0.36);
}

export function playUiClick(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}
