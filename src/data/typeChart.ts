import { PokemonType } from '../types/pokemon';

export interface TypeVisuals {
  bg: string;
  text: string;
  border: string;
  badgeBg: string;
  glow: string;
  hex: string;
}

export const typeVisuals: Record<PokemonType, TypeVisuals> = {
  normal: {
    bg: 'bg-neutral-500/15 dark:bg-neutral-500/25',
    text: 'text-neutral-700 dark:text-neutral-200',
    border: 'border-neutral-300 dark:border-neutral-700',
    badgeBg: 'bg-stone-500 text-white',
    glow: 'rgba(168, 168, 120, 0.4)',
    hex: '#9CA3AF',
  },
  fire: {
    bg: 'bg-orange-500/15 dark:bg-orange-500/25',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-300 dark:border-orange-700',
    badgeBg: 'bg-orange-600 text-white',
    glow: 'rgba(240, 128, 48, 0.4)',
    hex: '#F97316',
  },
  water: {
    bg: 'bg-sky-500/15 dark:bg-sky-500/25',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-300 dark:border-sky-700',
    badgeBg: 'bg-sky-600 text-white',
    glow: 'rgba(104, 144, 240, 0.4)',
    hex: '#0EA5E9',
  },
  grass: {
    bg: 'bg-emerald-500/15 dark:bg-emerald-500/25',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-300 dark:border-emerald-700',
    badgeBg: 'bg-emerald-600 text-white',
    glow: 'rgba(120, 200, 80, 0.4)',
    hex: '#10B981',
  },
  electric: {
    bg: 'bg-amber-500/15 dark:bg-amber-500/25',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-700',
    badgeBg: 'bg-amber-500 text-slate-900',
    glow: 'rgba(248, 208, 48, 0.4)',
    hex: '#F59E0B',
  },
  ice: {
    bg: 'bg-cyan-500/15 dark:bg-cyan-500/25',
    text: 'text-cyan-700 dark:text-cyan-300',
    border: 'border-cyan-300 dark:border-cyan-700',
    badgeBg: 'bg-cyan-600 text-white',
    glow: 'rgba(152, 216, 216, 0.4)',
    hex: '#06B6D4',
  },
  fighting: {
    bg: 'bg-red-500/15 dark:bg-red-500/25',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-300 dark:border-red-700',
    badgeBg: 'bg-red-700 text-white',
    glow: 'rgba(192, 48, 40, 0.4)',
    hex: '#DC2626',
  },
  poison: {
    bg: 'bg-purple-500/15 dark:bg-purple-500/25',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-300 dark:border-purple-700',
    badgeBg: 'bg-purple-700 text-white',
    glow: 'rgba(160, 64, 160, 0.4)',
    hex: '#A855F7',
  },
  ground: {
    bg: 'bg-yellow-700/15 dark:bg-yellow-700/25',
    text: 'text-yellow-800 dark:text-yellow-300',
    border: 'border-yellow-600/30 dark:border-yellow-600/40',
    badgeBg: 'bg-yellow-700 text-white',
    glow: 'rgba(224, 192, 104, 0.4)',
    hex: '#B45309',
  },
  flying: {
    bg: 'bg-indigo-500/15 dark:bg-indigo-500/25',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-300 dark:border-indigo-700',
    badgeBg: 'bg-indigo-600 text-white',
    glow: 'rgba(168, 144, 240, 0.4)',
    hex: '#6366F1',
  },
  psychic: {
    bg: 'bg-pink-500/15 dark:bg-pink-500/25',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-300 dark:border-pink-700',
    badgeBg: 'bg-pink-600 text-white',
    glow: 'rgba(248, 88, 136, 0.4)',
    hex: '#EC4899',
  },
  bug: {
    bg: 'bg-lime-500/15 dark:bg-lime-500/25',
    text: 'text-lime-800 dark:text-lime-300',
    border: 'border-lime-400 dark:border-lime-700',
    badgeBg: 'bg-lime-600 text-white',
    glow: 'rgba(168, 184, 32, 0.4)',
    hex: '#84CC16',
  },
  rock: {
    bg: 'bg-stone-500/15 dark:bg-stone-500/25',
    text: 'text-stone-800 dark:text-stone-300',
    border: 'border-stone-400 dark:border-stone-700',
    badgeBg: 'bg-stone-600 text-white',
    glow: 'rgba(184, 160, 56, 0.4)',
    hex: '#78716C',
  },
  ghost: {
    bg: 'bg-violet-900/15 dark:bg-violet-900/35',
    text: 'text-violet-800 dark:text-violet-300',
    border: 'border-violet-400 dark:border-violet-750',
    badgeBg: 'bg-violet-800 text-white',
    glow: 'rgba(112, 88, 152, 0.4)',
    hex: '#7C3AED',
  },
  dragon: {
    bg: 'bg-blue-800/15 dark:bg-blue-800/35',
    text: 'text-blue-900 dark:text-blue-300',
    border: 'border-blue-400 dark:border-blue-700',
    badgeBg: 'bg-blue-800 text-white',
    glow: 'rgba(112, 56, 248, 0.4)',
    hex: '#3B82F6',
  },
  steel: {
    bg: 'bg-slate-500/15 dark:bg-slate-500/25',
    text: 'text-slate-800 dark:text-slate-300',
    border: 'border-slate-300 dark:border-slate-700',
    badgeBg: 'bg-slate-600 text-white',
    glow: 'rgba(184, 184, 208, 0.4)',
    hex: '#64748B',
  },
  dark: {
    bg: 'bg-zinc-800/15 dark:bg-zinc-800/40',
    text: 'text-zinc-900 dark:text-zinc-300',
    border: 'border-zinc-400 dark:border-zinc-700',
    badgeBg: 'bg-zinc-800 text-white',
    glow: 'rgba(112, 88, 72, 0.4)',
    hex: '#3F3F46',
  },
  fairy: {
    bg: 'bg-rose-400/15 dark:bg-rose-400/25',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-300 dark:border-rose-700',
    badgeBg: 'bg-rose-500 text-white',
    glow: 'rgba(238, 153, 172, 0.4)',
    hex: '#F43F5E',
  },
};

export const allPokemonTypes: PokemonType[] = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'steel',
  'dark',
  'fairy',
];

// Single type attacking effectiveness: attackingType -> defendingType -> multiplier
const typeChartMatrix: Record<PokemonType, Partial<Record<PokemonType, number>>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};

export interface DefensiveMatchup {
  type: PokemonType;
  multiplier: number;
}

export function calculateDefensiveMatchups(types: PokemonType[]): DefensiveMatchup[] {
  const result: DefensiveMatchup[] = [];

  for (const attackingType of allPokemonTypes) {
    let multiplier = 1;
    for (const defType of types) {
      const typeMod = typeChartMatrix[attackingType]?.[defType];
      if (typeMod !== undefined) {
        multiplier *= typeMod;
      }
    }
    result.push({ type: attackingType, multiplier });
  }

  return result;
}

export function groupDefensiveMatchups(matchups: DefensiveMatchup[]) {
  const quadWeak: PokemonType[] = [];
  const doubleWeak: PokemonType[] = [];
  const normal: PokemonType[] = [];
  const halfResist: PokemonType[] = [];
  const quarterResist: PokemonType[] = [];
  const immune: PokemonType[] = [];

  for (const m of matchups) {
    if (m.multiplier === 0) immune.push(m.type);
    else if (m.multiplier === 0.25) quarterResist.push(m.type);
    else if (m.multiplier === 0.5) halfResist.push(m.type);
    else if (m.multiplier === 1) normal.push(m.type);
    else if (m.multiplier === 2) doubleWeak.push(m.type);
    else if (m.multiplier === 4) quadWeak.push(m.type);
  }

  return { quadWeak, doubleWeak, normal, halfResist, quarterResist, immune };
}
