import { BaseStats, Nature } from '../types/pokemon';

export const NATURES: Nature[] = [
  { name: 'Hardy', increasedStat: null, decreasedStat: null },
  { name: 'Lonely', increasedStat: 'attack', decreasedStat: 'defense' },
  { name: 'Brave', increasedStat: 'attack', decreasedStat: 'speed' },
  { name: 'Adamant', increasedStat: 'attack', decreasedStat: 'specialAttack' },
  { name: 'Naughty', increasedStat: 'attack', decreasedStat: 'specialDefense' },
  { name: 'Bold', increasedStat: 'defense', decreasedStat: 'attack' },
  { name: 'Docile', increasedStat: null, decreasedStat: null },
  { name: 'Relaxed', increasedStat: 'defense', decreasedStat: 'speed' },
  { name: 'Impish', increasedStat: 'defense', decreasedStat: 'specialAttack' },
  { name: 'Lax', increasedStat: 'defense', decreasedStat: 'specialDefense' },
  { name: 'Timid', increasedStat: 'speed', decreasedStat: 'attack' },
  { name: 'Hasty', increasedStat: 'speed', decreasedStat: 'defense' },
  { name: 'Serious', increasedStat: null, decreasedStat: null },
  { name: 'Jolly', increasedStat: 'speed', decreasedStat: 'specialAttack' },
  { name: 'Naive', increasedStat: 'speed', decreasedStat: 'specialDefense' },
  { name: 'Modest', increasedStat: 'specialAttack', decreasedStat: 'attack' },
  { name: 'Mild', increasedStat: 'specialAttack', decreasedStat: 'defense' },
  { name: 'Quiet', increasedStat: 'specialAttack', decreasedStat: 'speed' },
  { name: 'Bashful', increasedStat: null, decreasedStat: null },
  { name: 'Rash', increasedStat: 'specialAttack', decreasedStat: 'specialDefense' },
  { name: 'Calm', increasedStat: 'specialDefense', decreasedStat: 'attack' },
  { name: 'Gentle', increasedStat: 'specialDefense', decreasedStat: 'defense' },
  { name: 'Sassy', increasedStat: 'specialDefense', decreasedStat: 'speed' },
  { name: 'Careful', increasedStat: 'specialDefense', decreasedStat: 'specialAttack' },
  { name: 'Quirky', increasedStat: null, decreasedStat: null },
];

export function calculateSingleStat(
  statName: keyof BaseStats,
  base: number,
  iv: number = 31,
  ev: number = 0,
  level: number = 50,
  natureName: string = 'Hardy'
): number {
  if (base === 1 && statName === 'hp') return 1; // Shedinja

  if (statName === 'hp') {
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
  }

  const nature = NATURES.find((n) => n.name === natureName);
  let natureMultiplier = 1.0;
  if (nature) {
    if (nature.increasedStat === statName) natureMultiplier = 1.1;
    else if (nature.decreasedStat === statName) natureMultiplier = 0.9;
  }

  const rawStat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
  return Math.floor(rawStat * natureMultiplier);
}

export function calculateAllStats(
  baseStats: BaseStats,
  ivs: Record<keyof BaseStats, number>,
  evs: Record<keyof BaseStats, number>,
  level: number = 50,
  natureName: string = 'Hardy'
): Record<keyof BaseStats, number> {
  return {
    hp: calculateSingleStat('hp', baseStats.hp, ivs.hp, evs.hp, level, natureName),
    attack: calculateSingleStat('attack', baseStats.attack, ivs.attack, evs.attack, level, natureName),
    defense: calculateSingleStat('defense', baseStats.defense, ivs.defense, evs.defense, level, natureName),
    specialAttack: calculateSingleStat('specialAttack', baseStats.specialAttack, ivs.specialAttack, evs.specialAttack, level, natureName),
    specialDefense: calculateSingleStat('specialDefense', baseStats.specialDefense, ivs.specialDefense, evs.specialDefense, level, natureName),
    speed: calculateSingleStat('speed', baseStats.speed, ivs.speed, evs.speed, level, natureName),
  };
}
