export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'steel'
  | 'dark'
  | 'fairy';

export type Language = 'en' | 'ja' | 'fr' | 'de' | 'es' | 'ko' | 'zh';

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonEvolution {
  id: number;
  name: string;
  stage: 1 | 2 | 3;
  condition?: string;
  sprite?: string;
}

export interface PokemonAbility {
  name: Record<Language, string>;
  description: Record<Language, string>;
  isHidden?: boolean;
}

export interface Pokemon {
  id: number;
  dexNumber: number;
  names: Record<Language, string>;
  category: Record<Language, string>;
  flavorText: Record<Language, string>;
  types: PokemonType[];
  stats: BaseStats;
  totalBST: number;
  height: number; // in meters
  weight: number; // in kg
  generation: number; // 1-9
  isLegendary?: boolean;
  isMythical?: boolean;
  isParadox?: boolean;
  isMega?: boolean;
  isStarter?: boolean;
  isHisuian?: boolean;
  abilities: PokemonAbility[];
  spriteUrl: string;
  artworkUrl: string;
  evolutionChain?: PokemonEvolution[];
}

export interface FilterState {
  searchQuery: string;
  selectedTypes: PokemonType[];
  selectedGeneration: number | 'all' | 'hisui';
  rarity: 'all' | 'standard' | 'starter' | 'legendary' | 'mythical' | 'paradox' | 'mega';
  minBST: number;
  maxBST: number;
  minSpeed: number;
  minAttack: number;
  minDefense: number;
  minHP: number;
  sortBy: 'id_asc' | 'id_desc' | 'name_asc' | 'name_desc' | 'bst_desc' | 'bst_asc' | 'hp_desc' | 'attack_desc' | 'defense_desc' | 'speed_desc';
  onlyFavorites: boolean;
}

export type ViewMode = 'grid' | 'table';

export interface TeamMember {
  slot: number;
  pokemon: Pokemon;
  selectedNature?: string;
  item?: string;
}

export interface Nature {
  name: string;
  increasedStat: keyof BaseStats | null;
  decreasedStat: keyof BaseStats | null;
}
