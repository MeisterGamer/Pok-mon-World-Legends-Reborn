import React, { useState } from 'react';
import { Pokemon, Language, BaseStats } from '../types/pokemon';
import { TranslationDictionary } from '../data/translations';
import { TypeBadge } from './TypeBadge';
import { StatBars } from './StatBars';
import { calculateDefensiveMatchups, groupDefensiveMatchups } from '../data/typeChart';
import { NATURES, calculateAllStats } from '../utils/statsCalculator';
import { playPokemonCry, playUiClick } from '../utils/audio';
import {
  X,
  Volume2,
  Heart,
  Scale,
  Plus,
  Check,
  Shield,
  BarChart3,
  GitBranch,
  Calculator,
} from 'lucide-react';

interface PokemonDetailModalProps {
  pokemon: Pokemon;
  lang: Language;
  t: TranslationDictionary;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  isInCompare: boolean;
  onToggleCompare: (p: Pokemon) => void;
  isInTeam: boolean;
  onToggleTeam: (p: Pokemon) => void;
  onSelectPokemon: (p: Pokemon) => void;
  allPokemon: Pokemon[];
}

export const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  lang,
  t,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  isInCompare,
  onToggleCompare,
  isInTeam,
  onToggleTeam,
  onSelectPokemon,
  allPokemon,
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'weakness' | 'evolution' | 'calculator'>('stats');
  const [isPlayingCry, setIsPlayingCry] = useState(false);

  // Calculator states
  const [calcLevel, setCalcLevel] = useState<number>(50);
  const [calcNature, setCalcNature] = useState<string>('Hardy');
  const [calcIvs, setCalcIvs] = useState<Record<keyof BaseStats, number>>({
    hp: 31,
    attack: 31,
    defense: 31,
    specialAttack: 31,
    specialDefense: 31,
    speed: 31,
  });
  const [calcEvs, setCalcEvs] = useState<Record<keyof BaseStats, number>>({
    hp: 0,
    attack: 252,
    defense: 0,
    specialAttack: 0,
    specialDefense: 4,
    speed: 252,
  });

  if (!isOpen) return null;

  const displayName = pokemon.names[lang] || pokemon.names.en;
  const categoryName = pokemon.category[lang] || pokemon.category.en;
  const flavorText = pokemon.flavorText[lang] || pokemon.flavorText.en;
  const formattedDex = `#${String(pokemon.dexNumber).padStart(4, '0')}`;

  const defensiveMatchups = calculateDefensiveMatchups(pokemon.types);
  const groupedWeaknesses = groupDefensiveMatchups(defensiveMatchups);

  const calculatedBattleStats = calculateAllStats(
    pokemon.stats,
    calcIvs,
    calcEvs,
    calcLevel,
    calcNature
  );

  const totalEvsUsed = Object.values(calcEvs).reduce((a, b) => a + b, 0);

  const handleCry = async () => {
    setIsPlayingCry(true);
    await playPokemonCry(pokemon.dexNumber, pokemon.stats.speed);
    setTimeout(() => setIsPlayingCry(false), 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col my-auto"
      >
        {/* Top Floating Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onToggleFavorite(pokemon.id);
            }}
            className={`p-2 rounded-full border shadow-sm transition-colors ${
              isFavorite
                ? 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/60 dark:border-rose-900'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-slate-100/80 via-slate-50 to-white dark:from-slate-850 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Artwork */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-radial from-slate-200/60 to-transparent dark:from-slate-750/40 rounded-full" />
              <img
                src={pokemon.artworkUrl || pokemon.spriteUrl}
                alt={displayName}
                className="relative z-10 max-h-44 max-w-44 object-contain drop-shadow-xl"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 text-center sm:text-left space-y-2.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-mono font-bold text-sm text-slate-500 dark:text-slate-400">
                  {formattedDex}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {categoryName}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500">
                  Gen {pokemon.generation}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-3">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  {displayName}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{pokemon.names.ja}</span>
                  <span>/</span>
                  <span>{pokemon.names.en}</span>
                </div>
              </div>

              {/* Type Badges & Cry Player */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type} type={type} lang={lang} size="md" />
                ))}

                <button
                  type="button"
                  onClick={handleCry}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all ${
                    isPlayingCry
                      ? 'bg-rose-500 text-white border-rose-500 scale-105'
                      : 'border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{t.playCry}</span>
                </button>
              </div>

              {/* Flavor Text Lore */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 max-w-xl">
                {flavorText}
              </p>

              {/* Physical Metrics */}
              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 font-mono">
                <div>
                  Height: <span className="text-slate-900 dark:text-slate-100 font-bold">{pokemon.height} m</span>
                </div>
                <div>
                  Weight: <span className="text-slate-900 dark:text-slate-100 font-bold">{pokemon.weight} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/50 dark:bg-slate-850/50 overflow-x-auto text-xs shrink-0">
          <button
            type="button"
            onClick={() => {
              playUiClick();
              setActiveTab('stats');
            }}
            className={`flex items-center gap-2 py-3 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'stats'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{t.overviewTab}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playUiClick();
              setActiveTab('weakness');
            }}
            className={`flex items-center gap-2 py-3 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'weakness'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{t.weaknessTab}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playUiClick();
              setActiveTab('evolution');
            }}
            className={`flex items-center gap-2 py-3 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'evolution'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>{t.evolutionTab}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playUiClick();
              setActiveTab('calculator');
            }}
            className={`flex items-center gap-2 py-3 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{t.calculatorTab}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* TAB 1: OVERVIEW & BASE STATS */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
              {/* Base Stat Bars */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  Base Stat Distribution
                </h3>
                <StatBars stats={pokemon.stats} totalBST={pokemon.totalBST} t={t} />
              </div>

              {/* Abilities & Properties */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  Abilities & Traits
                </h3>
                <div className="space-y-3">
                  {pokemon.abilities.map((ability, idx) => {
                    const abName = ability.name[lang] || ability.name.en;
                    const abDesc = ability.description[lang] || ability.description.en;

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-900 dark:text-white">
                            {abName}
                          </span>
                          {ability.isHidden ? (
                            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                              Hidden Ability
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">Standard</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {abDesc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEFENSIVE WEAKNESSES & RESISTANCES */}
          {activeTab === 'weakness' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {t.defenseEffectiveness}
                </h3>
                <p className="text-xs text-slate-500">
                  Damage multipliers when this Pokémon takes attacks from each of the 18 elemental types.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* 4x Weak */}
                {groupedWeaknesses.quadWeak.length > 0 && (
                  <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-2">
                    <span className="font-bold text-rose-700 dark:text-rose-400">
                      {t.weaknessQuad}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {groupedWeaknesses.quadWeak.map((type) => (
                        <TypeBadge key={type} type={type} lang={lang} multiplier={4} size="sm" />
                      ))}
                    </div>
                  </div>
                )}

                {/* 2x Weak */}
                {groupedWeaknesses.doubleWeak.length > 0 && (
                  <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-900/60 bg-orange-50/50 dark:bg-orange-950/20 space-y-2">
                    <span className="font-bold text-orange-700 dark:text-orange-400">
                      {t.weaknessDouble}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {groupedWeaknesses.doubleWeak.map((type) => (
                        <TypeBadge key={type} type={type} lang={lang} multiplier={2} size="sm" />
                      ))}
                    </div>
                  </div>
                )}

                {/* 0.5x Resist */}
                {groupedWeaknesses.halfResist.length > 0 && (
                  <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {t.resistanceHalf}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {groupedWeaknesses.halfResist.map((type) => (
                        <TypeBadge key={type} type={type} lang={lang} multiplier={0.5} size="sm" />
                      ))}
                    </div>
                  </div>
                )}

                {/* 0.25x Super Resist */}
                {groupedWeaknesses.quarterResist.length > 0 && (
                  <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/50 dark:bg-teal-950/20 space-y-2">
                    <span className="font-bold text-teal-700 dark:text-teal-400">
                      {t.resistanceQuarter}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {groupedWeaknesses.quarterResist.map((type) => (
                        <TypeBadge key={type} type={type} lang={lang} multiplier={0.25} size="sm" />
                      ))}
                    </div>
                  </div>
                )}

                {/* 0x Immune */}
                {groupedWeaknesses.immune.length > 0 && (
                  <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/40 space-y-2 md:col-span-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {t.immunityZero}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {groupedWeaknesses.immune.map((type) => (
                        <TypeBadge key={type} type={type} lang={lang} multiplier={0} size="sm" />
                      ))}
                    </div>
                  </div>
                )}

                {/* 1x Normal */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/30 space-y-2 md:col-span-2">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">
                    {t.normalDamage}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {groupedWeaknesses.normal.map((type) => (
                      <TypeBadge key={type} type={type} lang={lang} multiplier={1} size="sm" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EVOLUTION CHAIN */}
          {activeTab === 'evolution' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                {t.evolutionTab}
              </h3>

              {pokemon.evolutionChain && pokemon.evolutionChain.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-6 py-6">
                  {pokemon.evolutionChain.map((evo, index) => {
                    const matchPokemon = allPokemon.find((p) => p.dexNumber === evo.id || p.names.en.toLowerCase() === evo.name.toLowerCase());
                    const isCurrent = evo.id === pokemon.dexNumber;

                    return (
                      <React.Fragment key={evo.id}>
                        {index > 0 && (
                          <div className="flex flex-col items-center text-xs text-slate-400 font-mono">
                            <span>➔</span>
                            {evo.condition && (
                              <span className="text-[11px] font-sans font-semibold text-rose-500">
                                {evo.condition}
                              </span>
                            )}
                          </div>
                        )}

                        <div
                          onClick={() => {
                            if (matchPokemon && !isCurrent) {
                              playUiClick();
                              onSelectPokemon(matchPokemon);
                            }
                          }}
                          className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-400 dark:border-rose-700 shadow-sm'
                              : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-400 cursor-pointer hover:scale-105'
                          }`}
                        >
                          <img
                            src={
                              matchPokemon?.artworkUrl ||
                              matchPokemon?.spriteUrl ||
                              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`
                            }
                            alt={evo.name}
                            className="w-24 h-24 object-contain"
                          />
                          <span className="font-display font-bold text-sm text-slate-900 dark:text-white mt-2">
                            {matchPokemon?.names[lang] || evo.name}
                          </span>
                          <span className="font-mono text-xs text-slate-400">
                            #{String(evo.id).padStart(4, '0')}
                          </span>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  This Pokémon does not evolve or has a unique standalone form.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BATTLE STAT CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    {t.calculatedStats} (Gen 9 Formula)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calculates exact in-game competitive stats with Nature, Level, IVs (0-31), and EVs (0-252).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcLevel(50)}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold border ${
                      calcLevel === 50
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Lv. 50 (VGC / Ranked)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcLevel(100)}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold border ${
                      calcLevel === 100
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Lv. 100 (Smogon / Single)
                  </button>
                </div>
              </div>

              {/* Calculator Settings Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    {t.level}: <span className="font-mono text-rose-500 font-bold">{calcLevel}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={calcLevel}
                    onChange={(e) => setCalcLevel(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    {t.nature}:
                  </label>
                  <select
                    value={calcNature}
                    onChange={(e) => setCalcNature(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs font-medium cursor-pointer"
                  >
                    {NATURES.map((nat) => {
                      let modifierText = 'Neutral';
                      if (nat.increasedStat && nat.decreasedStat) {
                        modifierText = `+${nat.increasedStat.slice(0, 3)}, -${nat.decreasedStat.slice(0, 3)}`;
                      }
                      return (
                        <option key={nat.name} value={nat.name}>
                          {nat.name} ({modifierText})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Stat breakdown rows */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>EVs Budget: <strong className={totalEvsUsed > 508 ? 'text-rose-500' : 'text-slate-800 dark:text-slate-200'}>{totalEvsUsed}/508</strong></span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {(
                    [
                      { key: 'hp', label: t.hp },
                      { key: 'attack', label: t.attack },
                      { key: 'defense', label: t.defense },
                      { key: 'specialAttack', label: t.specialAttack },
                      { key: 'specialDefense', label: t.specialDefense },
                      { key: 'speed', label: t.speed },
                    ] as const
                  ).map(({ key, label }) => {
                    const base = pokemon.stats[key];
                    const iv = calcIvs[key];
                    const ev = calcEvs[key];
                    const finalVal = calculatedBattleStats[key];

                    return (
                      <div key={key} className="py-2.5 grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-3 sm:col-span-2 font-semibold text-slate-700 dark:text-slate-300">
                          {label}
                        </div>
                        <div className="col-span-2 sm:col-span-1 font-mono text-slate-400 text-center">
                          Base {base}
                        </div>
                        <div className="col-span-3 sm:col-span-4 flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400">EV:</span>
                          <input
                            type="range"
                            min="0"
                            max="252"
                            step="4"
                            value={ev}
                            onChange={(e) =>
                              setCalcEvs({ ...calcEvs, [key]: Number(e.target.value) })
                            }
                            className="w-full accent-rose-500"
                          />
                          <span className="font-mono text-[11px] w-8 text-right font-medium">
                            {ev}
                          </span>
                        </div>
                        <div className="col-span-2 sm:col-span-3 flex items-center gap-1">
                          <span className="text-[10px] text-slate-400">IV:</span>
                          <input
                            type="number"
                            min="0"
                            max="31"
                            value={iv}
                            onChange={(e) =>
                              setCalcIvs({
                                ...calcIvs,
                                [key]: Math.min(31, Math.max(0, Number(e.target.value))),
                              })
                            }
                            className="w-12 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-850 font-mono text-center text-xs"
                          />
                        </div>
                        <div className="col-span-2 text-right">
                          <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                            {finalVal}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playUiClick();
                onToggleCompare(pokemon);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isInCompare
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isInCompare ? 'Comparing' : t.compare}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playUiClick();
                onToggleTeam(pokemon);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isInTeam
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {isInTeam ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>In Team</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addToTeam}</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
