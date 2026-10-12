import React, { useState } from 'react';
import { FilterState, Language, PokemonType } from '../types/pokemon';
import { TranslationDictionary } from '../data/translations';
import { allPokemonTypes } from '../data/typeChart';
import { TypeBadge } from './TypeBadge';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Zap,
  Shield,
  Trophy,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { playUiClick } from '../utils/audio';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  lang: Language;
  t: TranslationDictionary;
  totalFiltered: number;
  totalAvailable: number;
  isSearchingApi: boolean;
  onSearchPokeApi: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  lang,
  t,
  totalFiltered,
  totalAvailable,
  isSearchingApi,
  onSearchPokeApi,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generations: { id: number | 'all' | 'hisui'; label: string }[] = [
    { id: 'all', label: t.allGenerations },
    { id: 1, label: 'Gen 1' },
    { id: 2, label: 'Gen 2' },
    { id: 3, label: 'Gen 3' },
    { id: 4, label: 'Gen 4' },
    { id: 5, label: 'Gen 5' },
    { id: 6, label: 'Gen 6' },
    { id: 7, label: 'Gen 7' },
    { id: 8, label: 'Gen 8' },
    { id: 9, label: 'Gen 9' },
    { id: 'hisui', label: 'Hisui' },
  ];

  const rarityOptions: { id: FilterState['rarity']; label: string }[] = [
    { id: 'all', label: t.allRarities },
    { id: 'starter', label: t.rarityStarter },
    { id: 'legendary', label: t.rarityLegendary },
    { id: 'paradox', label: t.rarityParadox },
    { id: 'mythical', label: t.rarityMythical },
  ];

  const sortOptions: { id: FilterState['sortBy']; label: string }[] = [
    { id: 'id_asc', label: t.sortIdAsc },
    { id: 'id_desc', label: t.sortIdDesc },
    { id: 'bst_desc', label: t.sortBstDesc },
    { id: 'bst_asc', label: t.sortBstAsc },
    { id: 'speed_desc', label: t.sortSpeDesc },
    { id: 'attack_desc', label: t.sortAtkDesc },
    { id: 'hp_desc', label: t.sortHpDesc },
    { id: 'defense_desc', label: t.sortDefDesc },
    { id: 'name_asc', label: t.sortNameAsc },
    { id: 'name_desc', label: t.sortNameDesc },
  ];

  const handleTypeToggle = (type: PokemonType) => {
    playUiClick();
    const exists = filter.selectedTypes.includes(type);
    let next: PokemonType[];
    if (exists) {
      next = filter.selectedTypes.filter((t) => t !== type);
    } else {
      // allow selecting up to 2 types for dual typing query
      if (filter.selectedTypes.length >= 2) {
        next = [filter.selectedTypes[1], type];
      } else {
        next = [...filter.selectedTypes, type];
      }
    }
    onFilterChange({ ...filter, selectedTypes: next });
  };

  const handleResetFilters = () => {
    playUiClick();
    onFilterChange({
      searchQuery: '',
      selectedTypes: [],
      selectedGeneration: 'all',
      rarity: 'all',
      minBST: 0,
      maxBST: 800,
      minSpeed: 0,
      minAttack: 0,
      minDefense: 0,
      minHP: 0,
      sortBy: 'id_asc',
      onlyFavorites: false,
    });
  };

  const applyPreset = (type: 'sweeper' | 'tank' | 'heavy' | 'reset') => {
    playUiClick();
    if (type === 'sweeper') {
      onFilterChange({
        ...filter,
        minSpeed: 100,
        minAttack: 100,
        minBST: 500,
        sortBy: 'speed_desc',
      });
    } else if (type === 'tank') {
      onFilterChange({
        ...filter,
        minHP: 85,
        minDefense: 95,
        minBST: 500,
        sortBy: 'defense_desc',
      });
    } else if (type === 'heavy') {
      onFilterChange({
        ...filter,
        minBST: 580,
        sortBy: 'bst_desc',
      });
    } else {
      handleResetFilters();
    }
  };

  const hasActiveFilters =
    filter.searchQuery.trim() !== '' ||
    filter.selectedTypes.length > 0 ||
    filter.selectedGeneration !== 'all' ||
    filter.rarity !== 'all' ||
    filter.minBST > 0 ||
    filter.minSpeed > 0 ||
    filter.minAttack > 0 ||
    filter.minDefense > 0 ||
    filter.minHP > 0 ||
    filter.onlyFavorites;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Row 1: Search bar, Sort selector, Quick presets */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={filter.searchQuery}
              onChange={(e) =>
                onFilterChange({ ...filter, searchQuery: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filter.searchQuery.trim()) {
                  onSearchPokeApi();
                }
              }}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
            />
            {filter.searchQuery.trim() && (
              <button
                type="button"
                onClick={onSearchPokeApi}
                disabled={isSearchingApi}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50 transition-colors shadow-xs"
              >
                {isSearchingApi ? '...' : 'PokeAPI'}
              </button>
            )}
          </div>

          {/* Sort Selector & Advanced Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={filter.sortBy}
                onChange={(e) =>
                  onFilterChange({
                    ...filter,
                    sortBy: e.target.value as FilterState['sortBy'],
                  })
                }
                className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 transition-all cursor-pointer"
                aria-label="Sort Pokemon"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                playUiClick();
                setShowAdvanced(!showAdvanced);
              }}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                showAdvanced || filter.minBST > 0 || filter.minSpeed > 0
                  ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-300'
                  : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t.filters}</span>
              {showAdvanced ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                title={t.clearFilters}
                className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Generation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {generations.map((gen) => {
            const active = filter.selectedGeneration === gen.id;
            return (
              <button
                key={String(gen.id)}
                type="button"
                onClick={() => {
                  playUiClick();
                  onFilterChange({ ...filter, selectedGeneration: gen.id });
                }}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {gen.label}
              </button>
            );
          })}
        </div>

        {/* Row 3: Type Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              {t.allTypes}
              {filter.selectedTypes.length > 0 && ` (${filter.selectedTypes.length})`}
            </span>
            {filter.selectedTypes.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  playUiClick();
                  onFilterChange({ ...filter, selectedTypes: [] });
                }}
                className="text-rose-500 hover:underline"
              >
                Clear Types
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allPokemonTypes.map((type) => {
              const isSelected = filter.selectedTypes.includes(type);
              return (
                <TypeBadge
                  key={type}
                  type={type}
                  lang={lang}
                  size="sm"
                  interactive
                  selected={isSelected}
                  onClick={() => handleTypeToggle(type)}
                />
              );
            })}
          </div>
        </div>

        {/* Collapsible Advanced Competitive Filters */}
        {showAdvanced && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs animate-in fade-in duration-200">
            {/* Quick Presets */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                {t.statsPreset}:
              </span>
              <button
                type="button"
                onClick={() => applyPreset('sweeper')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 hover:bg-amber-500/20"
              >
                <Zap className="w-3 h-3 text-amber-500" />
                <span>Fast Sweepers</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('tank')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 hover:bg-blue-500/20"
              >
                <Shield className="w-3 h-3 text-blue-500" />
                <span>Tanks & Walls</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('heavy')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 hover:bg-purple-500/20"
              >
                <Trophy className="w-3 h-3 text-purple-500" />
                <span>BST ≥ 580</span>
              </button>
            </div>

            {/* Rarity Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                {t.allRarities}:
              </span>
              {rarityOptions.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    playUiClick();
                    onFilterChange({ ...filter, rarity: r.id });
                  }}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filter.rarity === r.id
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Stat Range Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Min {t.totalBST}</span>
                  <span className="font-mono font-bold">{filter.minBST}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="720"
                  step="10"
                  value={filter.minBST}
                  onChange={(e) =>
                    onFilterChange({ ...filter, minBST: Number(e.target.value) })
                  }
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Min {t.speed}</span>
                  <span className="font-mono font-bold">{filter.minSpeed}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="160"
                  step="5"
                  value={filter.minSpeed}
                  onChange={(e) =>
                    onFilterChange({ ...filter, minSpeed: Number(e.target.value) })
                  }
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Min {t.attack}</span>
                  <span className="font-mono font-bold">{filter.minAttack}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="160"
                  step="5"
                  value={filter.minAttack}
                  onChange={(e) =>
                    onFilterChange({ ...filter, minAttack: Number(e.target.value) })
                  }
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Min {t.hp}</span>
                  <span className="font-mono font-bold">{filter.minHP}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="160"
                  step="5"
                  value={filter.minHP}
                  onChange={(e) =>
                    onFilterChange({ ...filter, minHP: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Counter & Status Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
          <div>
            <span>{t.totalFound}: </span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
              {totalFiltered}
            </span>
            <span className="text-slate-400"> / {totalAvailable} {t.pokemonPlural}</span>
          </div>

          {filter.selectedTypes.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span>Matching:</span>
              {filter.selectedTypes.map((t) => (
                <span key={t} className="font-semibold text-rose-500 capitalize">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
