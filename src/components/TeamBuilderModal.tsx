import React, { useState } from 'react';
import { Pokemon, Language, PokemonType } from '../types/pokemon';
import { TranslationDictionary } from '../data/translations';
import { TypeBadge } from './TypeBadge';
import { calculateDefensiveMatchups, allPokemonTypes } from '../data/typeChart';
import { playUiClick } from '../utils/audio';
import { X, Trash2, Copy, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

interface TeamBuilderModalProps {
  team: Pokemon[];
  lang: Language;
  t: TranslationDictionary;
  isOpen: boolean;
  onClose: () => void;
  onRemoveFromTeam: (id: number) => void;
  onClearTeam: () => void;
  onSelectPokemon: (p: Pokemon) => void;
}

export const TeamBuilderModal: React.FC<TeamBuilderModalProps> = ({
  team,
  lang,
  t,
  isOpen,
  onClose,
  onRemoveFromTeam,
  onClearTeam,
  onSelectPokemon,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Calculate team weaknesses: attackingType -> count of members weak to it
  const teamWeaknessCount: Partial<Record<PokemonType, number>> = {};
  const teamResistCount: Partial<Record<PokemonType, number>> = {};

  for (const p of team) {
    const matchups = calculateDefensiveMatchups(p.types);
    for (const m of matchups) {
      if (m.multiplier >= 2) {
        teamWeaknessCount[m.type] = (teamWeaknessCount[m.type] || 0) + 1;
      } else if (m.multiplier <= 0.5) {
        teamResistCount[m.type] = (teamResistCount[m.type] || 0) + 1;
      }
    }
  }

  // Find critical weaknesses (3 or more members weak to the same type)
  const criticalWeaknesses = allPokemonTypes.filter(
    (type) => (teamWeaknessCount[type] || 0) >= 3
  );

  const handleExport = () => {
    playUiClick();
    const summary = team
      .map(
        (p, i) =>
          `Slot ${i + 1}: ${p.names.en} (#${p.dexNumber})\nTypes: ${p.types.join(
            '/'
          )}\nStats: HP ${p.stats.hp} | Atk ${p.stats.attack} | Def ${
            p.stats.defense
          } | SpA ${p.stats.specialAttack} | SpD ${p.stats.specialDefense} | Spe ${
            p.stats.speed
          } (BST: ${p.totalBST})`
      )
      .join('\n\n');

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {t.teamBuilder}
            </h2>
            <p className="text-xs text-slate-500">
              Manage your competitive roster of 6 and analyze type synergy and shared vulnerabilities.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 6 Slot Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, idx) => {
              const pokemon = team[idx];

              if (!pokemon) {
                return (
                  <div
                    key={idx}
                    className="h-48 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-3 text-slate-400 dark:text-slate-600 space-y-1 select-none"
                  >
                    <span className="font-mono text-xs font-bold text-slate-300 dark:text-slate-700">
                      Slot {idx + 1}
                    </span>
                    <span className="text-[11px]">{t.emptyTeamSlot}</span>
                  </div>
                );
              }

              const displayName = pokemon.names[lang] || pokemon.names.en;

              return (
                <div
                  key={pokemon.id}
                  className="relative h-48 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 p-3 flex flex-col items-center justify-between text-center group"
                >
                  <button
                    type="button"
                    onClick={() => {
                      playUiClick();
                      onRemoveFromTeam(pokemon.id);
                    }}
                    title="Remove from team"
                    className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={pokemon.artworkUrl || pokemon.spriteUrl}
                    alt={displayName}
                    onClick={() => onSelectPokemon(pokemon)}
                    className="w-20 h-20 object-contain cursor-pointer group-hover:scale-105 transition-transform"
                  />

                  <div className="space-y-0.5 w-full">
                    <span className="font-mono text-[10px] text-slate-400">
                      #{String(pokemon.dexNumber).padStart(4, '0')}
                    </span>
                    <h4
                      onClick={() => onSelectPokemon(pokemon)}
                      className="font-display font-bold text-xs text-slate-900 dark:text-white truncate cursor-pointer hover:text-rose-500"
                    >
                      {displayName}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {pokemon.types.map((type) => (
                      <TypeBadge key={type} type={type} lang={lang} size="sm" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Synergy & Vulnerability Alerts */}
          {team.length > 0 && (
            <div className="space-y-4">
              {/* Critical Weakness Notice */}
              {criticalWeaknesses.length > 0 ? (
                <div className="p-4 rounded-2xl border border-amber-300 dark:border-amber-800/70 bg-amber-50/60 dark:bg-amber-950/30 flex items-start gap-3 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold text-amber-900 dark:text-amber-200">
                      Shared Weakness Warning
                    </span>
                    <p className="text-amber-800 dark:text-amber-300">
                      3 or more team members share weakness to the following types:
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {criticalWeaknesses.map((type) => (
                        <div key={type} className="flex items-center gap-1">
                          <TypeBadge type={type} lang={lang} size="sm" />
                          <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                            ({teamWeaknessCount[type]} members weak)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.wellBalanced}</span>
                </div>
              )}

              {/* Matrix of All Types: Team Weakness vs Resistance counts */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  Team Defensive Matchup Profile
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                  {allPokemonTypes.map((type) => {
                    const weakCount = teamWeaknessCount[type] || 0;
                    const resistCount = teamResistCount[type] || 0;

                    return (
                      <div
                        key={type}
                        className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/40 flex items-center justify-between"
                      >
                        <TypeBadge type={type} lang={lang} size="sm" />
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <span
                            title="Members weak"
                            className={`font-semibold ${
                              weakCount >= 3
                                ? 'text-rose-600 dark:text-rose-400'
                                : weakCount > 0
                                ? 'text-orange-500'
                                : 'text-slate-400'
                            }`}
                          >
                            -{weakCount}
                          </span>
                          <span className="text-slate-300">/</span>
                          <span
                            title="Members resistant"
                            className={`font-semibold ${
                              resistCount > 0
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-400'
                            }`}
                          >
                            +{resistCount}
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
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {team.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.copiedToClipboard : t.exportTeam}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    onClearTeam();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearTeam}</span>
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
