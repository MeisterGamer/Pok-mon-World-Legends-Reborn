import React from 'react';
import { Pokemon, Language, FilterState } from '../types/pokemon';
import { TranslationDictionary } from '../data/translations';
import { TypeBadge } from './TypeBadge';
import { playPokemonCry, playUiClick } from '../utils/audio';
import { Heart, Volume2, Scale, Plus, Check } from 'lucide-react';

interface PokemonTableProps {
  pokemonList: Pokemon[];
  lang: Language;
  t: TranslationDictionary;
  sortBy: FilterState['sortBy'];
  onSortChange: (sort: FilterState['sortBy']) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  compareList: Pokemon[];
  onToggleCompare: (p: Pokemon) => void;
  teamList: Pokemon[];
  onToggleTeam: (p: Pokemon) => void;
  onSelect: (p: Pokemon) => void;
}

export const PokemonTable: React.FC<PokemonTableProps> = ({
  pokemonList,
  lang,
  t,
  sortBy,
  onSortChange,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
  teamList,
  onToggleTeam,
  onSelect,
}) => {
  const getStatCellClass = (value: number) => {
    if (value >= 130) return 'text-purple-600 dark:text-purple-400 font-bold';
    if (value >= 100) return 'text-emerald-600 dark:text-emerald-400 font-bold';
    if (value >= 80) return 'text-slate-800 dark:text-slate-200 font-medium';
    return 'text-slate-500 dark:text-slate-400';
  };

  const handleHeaderSort = (col: FilterState['sortBy']) => {
    playUiClick();
    onSortChange(col);
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 select-none">
            <th
              onClick={() => handleHeaderSort(sortBy === 'id_asc' ? 'id_desc' : 'id_asc')}
              className="py-3 px-3 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white"
            >
              #ID
            </th>
            <th className="py-3 px-2 font-semibold">Sprite</th>
            <th
              onClick={() => handleHeaderSort(sortBy === 'name_asc' ? 'name_desc' : 'name_asc')}
              className="py-3 px-3 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white"
            >
              Name
            </th>
            <th className="py-3 px-3 font-semibold">Types</th>
            <th
              onClick={() => handleHeaderSort('hp_desc')}
              className="py-3 px-3 font-semibold text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
            >
              {t.hp}
            </th>
            <th
              onClick={() => handleHeaderSort('attack_desc')}
              className="py-3 px-3 font-semibold text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
            >
              {t.attack}
            </th>
            <th
              onClick={() => handleHeaderSort('defense_desc')}
              className="py-3 px-3 font-semibold text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
            >
              {t.defense}
            </th>
            <th className="py-3 px-3 font-semibold text-right">{t.specialAttack}</th>
            <th className="py-3 px-3 font-semibold text-right">{t.specialDefense}</th>
            <th
              onClick={() => handleHeaderSort('speed_desc')}
              className="py-3 px-3 font-semibold text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
            >
              {t.speed}
            </th>
            <th
              onClick={() => handleHeaderSort(sortBy === 'bst_desc' ? 'bst_asc' : 'bst_desc')}
              className="py-3 px-3 font-semibold text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
            >
              {t.totalBST}
            </th>
            <th className="py-3 px-3 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {pokemonList.map((p) => {
            const displayName = p.names[lang] || p.names.en;
            const isFav = favorites.includes(p.id);
            const inComp = compareList.some((c) => c.id === p.id);
            const inTm = teamList.some((t) => t.id === p.id);

            return (
              <tr
                key={p.id}
                onClick={() => onSelect(p)}
                className="hover:bg-slate-50 dark:hover:bg-slate-850/60 transition-colors cursor-pointer group"
              >
                <td className="py-2.5 px-3 font-mono font-medium text-slate-400">
                  #{String(p.dexNumber).padStart(4, '0')}
                </td>
                <td className="py-2.5 px-2">
                  <img
                    src={p.spriteUrl}
                    alt={displayName}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                </td>
                <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                  <div className="flex flex-col">
                    <span>{displayName}</span>
                    {lang !== 'en' && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        {p.names.en}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-1">
                    {p.types.map((type) => (
                      <TypeBadge key={type} type={type} lang={lang} size="sm" />
                    ))}
                  </div>
                </td>
                <td className={`py-2.5 px-3 text-right font-mono ${getStatCellClass(p.stats.hp)}`}>
                  {p.stats.hp}
                </td>
                <td className={`py-2.5 px-3 text-right font-mono ${getStatCellClass(p.stats.attack)}`}>
                  {p.stats.attack}
                </td>
                <td className={`py-2.5 px-3 text-right font-mono ${getStatCellClass(p.stats.defense)}`}>
                  {p.stats.defense}
                </td>
                <td className={`py-2.5 px-3 text-right font-mono ${getStatCellClass(p.stats.specialAttack)}`}>
                  {p.stats.specialAttack}
                </td>
                <td className={`py-2.5 px-3 text-right font-mono ${getStatCellClass(p.stats.specialDefense)}`}>
                  {p.stats.specialDefense}
                </td>
                <td className={`py-2.5 px-3 text-right font-mono ${getStatCellClass(p.stats.speed)}`}>
                  {p.stats.speed}
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-600 dark:text-rose-400">
                  {p.totalBST}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playPokemonCry(p.dexNumber, p.stats.speed);
                      }}
                      title={t.playCry}
                      className="p-1.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playUiClick();
                        onToggleFavorite(p.id);
                      }}
                      title={t.favorite}
                      className={`p-1.5 rounded transition-colors ${
                        isFav ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playUiClick();
                        onToggleCompare(p);
                      }}
                      title={t.compare}
                      className={`p-1.5 rounded transition-colors ${
                        inComp ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playUiClick();
                        onToggleTeam(p);
                      }}
                      title={t.addToTeam}
                      className={`p-1.5 rounded transition-colors ${
                        inTm ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'
                      }`}
                    >
                      {inTm ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
