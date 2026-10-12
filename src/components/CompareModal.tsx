import React from 'react';
import { Pokemon, Language, BaseStats } from '../types/pokemon';
import { TranslationDictionary } from '../data/translations';
import { TypeBadge } from './TypeBadge';
import { calculateDefensiveMatchups } from '../data/typeChart';
import { playPokemonCry, playUiClick } from '../utils/audio';
import { X, Volume2, Trophy } from 'lucide-react';

interface CompareModalProps {
  compareList: Pokemon[];
  lang: Language;
  t: TranslationDictionary;
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: number) => void;
  onSelectPokemon: (p: Pokemon) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  compareList,
  lang,
  t,
  isOpen,
  onClose,
  onRemove,
  onSelectPokemon,
}) => {
  if (!isOpen) return null;

  const statKeys: { key: keyof BaseStats; label: string }[] = [
    { key: 'hp', label: t.hp },
    { key: 'attack', label: t.attack },
    { key: 'defense', label: t.defense },
    { key: 'specialAttack', label: t.specialAttack },
    { key: 'specialDefense', label: t.specialDefense },
    { key: 'speed', label: t.speed },
  ];

  // Helper to find highest value for each stat among compared
  const highestStats: Record<string, number> = {};
  for (const s of statKeys) {
    highestStats[s.key] = Math.max(...compareList.map((p) => p.stats[s.key]));
  }
  highestStats.bst = Math.max(...compareList.map((p) => p.totalBST));

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
              {t.comparisonTab}
            </h2>
            <p className="text-xs text-slate-500">
              Comparing {compareList.length} Pokémon side-by-side. Highlighted stats indicate highest value.
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {compareList.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No Pokémon selected for comparison. Click &quot;Compare&quot; on any Pokémon card to add them here.
            </div>
          ) : (
            <>
              {/* Pokemon Cards Header Grid */}
              <div
                className={`grid gap-4 ${
                  compareList.length === 2
                    ? 'grid-cols-2'
                    : compareList.length === 3
                    ? 'grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-4'
                }`}
              >
                {compareList.map((p) => {
                  const displayName = p.names[lang] || p.names.en;

                  return (
                    <div
                      key={p.id}
                      className="relative p-4 rounded-2xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-850/50 flex flex-col items-center text-center space-y-2 group"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          playUiClick();
                          onRemove(p.id);
                        }}
                        className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <img
                        src={p.artworkUrl || p.spriteUrl}
                        alt={displayName}
                        onClick={() => onSelectPokemon(p)}
                        className="w-24 h-24 object-contain cursor-pointer group-hover:scale-105 transition-transform"
                      />

                      <div className="space-y-0.5">
                        <span className="font-mono text-[10px] text-slate-400">
                          #{String(p.dexNumber).padStart(4, '0')}
                        </span>
                        <h3
                          onClick={() => onSelectPokemon(p)}
                          className="font-display font-bold text-sm text-slate-900 dark:text-white truncate cursor-pointer hover:text-rose-500"
                        >
                          {displayName}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-1">
                        {p.types.map((type) => (
                          <TypeBadge key={type} type={type} lang={lang} size="sm" />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => playPokemonCry(p.dexNumber, p.stats.speed)}
                        className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-500 pt-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Cry</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Stat-by-Stat Comparative Table */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  Base Stats Comparison
                </h3>

                <div className="space-y-2 text-xs">
                  {statKeys.map(({ key, label }) => {
                    const maxVal = highestStats[key];

                    return (
                      <div
                        key={key}
                        className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-850/30 space-y-1.5"
                      >
                        <div className="font-semibold text-slate-600 dark:text-slate-300">
                          {label}
                        </div>
                        <div
                          className={`grid gap-4 ${
                            compareList.length === 2
                              ? 'grid-cols-2'
                              : compareList.length === 3
                              ? 'grid-cols-3'
                              : 'grid-cols-2 sm:grid-cols-4'
                          }`}
                        >
                          {compareList.map((p) => {
                            const val = p.stats[key];
                            const isHighest = val === maxVal && compareList.length > 1;
                            const pct = Math.min(100, Math.round((val / 200) * 100));

                            return (
                              <div key={p.id} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span
                                    className={`font-mono font-bold ${
                                      isHighest
                                        ? 'text-emerald-600 dark:text-emerald-400 flex items-center gap-1'
                                        : 'text-slate-700 dark:text-slate-300'
                                    }`}
                                  >
                                    {val}
                                    {isHighest && <Trophy className="w-3 h-3 text-amber-500" />}
                                  </span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      isHighest ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-600'
                                    }`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Total BST Comparison */}
                  <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 space-y-2">
                    <div className="font-bold text-rose-700 dark:text-rose-400 text-xs uppercase tracking-wider">
                      {t.totalBST}
                    </div>
                    <div
                      className={`grid gap-4 ${
                        compareList.length === 2
                          ? 'grid-cols-2'
                          : compareList.length === 3
                          ? 'grid-cols-3'
                          : 'grid-cols-2 sm:grid-cols-4'
                      }`}
                    >
                      {compareList.map((p) => {
                        const val = p.totalBST;
                        const isHighest = val === highestStats.bst && compareList.length > 1;

                        return (
                          <div key={p.id} className="flex items-center gap-1.5">
                            <span
                              className={`font-mono text-base font-extrabold ${
                                isHighest
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              {val}
                            </span>
                            {isHighest && <Trophy className="w-4 h-4 text-amber-500" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Type Weaknesses Comparison */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  Defensive Weaknesses (Takes 2× or 4× Damage)
                </h3>
                <div
                  className={`grid gap-4 ${
                    compareList.length === 2
                      ? 'grid-cols-2'
                      : compareList.length === 3
                      ? 'grid-cols-3'
                      : 'grid-cols-2 sm:grid-cols-4'
                  }`}
                >
                  {compareList.map((p) => {
                    const matchups = calculateDefensiveMatchups(p.types);
                    const weakTypes = matchups.filter((m) => m.multiplier >= 2);

                    return (
                      <div
                        key={p.id}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-2 text-xs"
                      >
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {p.names[lang] || p.names.en}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {weakTypes.length > 0 ? (
                            weakTypes.map((m) => (
                              <TypeBadge
                                key={m.type}
                                type={m.type}
                                lang={lang}
                                multiplier={m.multiplier}
                                size="sm"
                              />
                            ))
                          ) : (
                            <span className="text-slate-400 text-[11px]">No weaknesses</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-end shrink-0">
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
