import React, { useState } from 'react';
import { Pokemon, Language } from '../types/pokemon';
import { TranslationDictionary } from '../data/translations';
import { TypeBadge } from './TypeBadge';
import { StatBars } from './StatBars';
import { playPokemonCry, playUiClick } from '../utils/audio';
import { Heart, Volume2, Scale, Plus, Check } from 'lucide-react';

interface PokemonCardProps {
  pokemon: Pokemon;
  lang: Language;
  t: TranslationDictionary;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  isInCompare: boolean;
  onToggleCompare: (p: Pokemon) => void;
  isInTeam: boolean;
  onToggleTeam: (p: Pokemon) => void;
  onSelect: (p: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  lang,
  t,
  isFavorite,
  onToggleFavorite,
  isInCompare,
  onToggleCompare,
  isInTeam,
  onToggleTeam,
  onSelect,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const displayName = pokemon.names[lang] || pokemon.names.en;
  const secondaryName = lang !== 'en' ? pokemon.names.en : pokemon.names.ja;
  const formattedDex = `#${String(pokemon.dexNumber).padStart(4, '0')}`;

  const handleCryClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    await playPokemonCry(pokemon.dexNumber, pokemon.stats.speed);
    setTimeout(() => setIsPlayingAudio(false), 600);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playUiClick();
    onToggleFavorite(pokemon.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playUiClick();
    onToggleCompare(pokemon);
  };

  const handleTeamClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playUiClick();
    onToggleTeam(pokemon);
  };

  return (
    <div
      onClick={() => onSelect(pokemon)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 transition-all duration-300 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header: Dex Number, Generation / Tag, Favorite & Cry actions */}
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-mono font-bold text-slate-400 dark:text-slate-500">
          {formattedDex}
        </span>

        <div className="flex items-center gap-1">
          {/* Audio Cry Button */}
          <button
            type="button"
            onClick={handleCryClick}
            title={t.playCry}
            className={`p-1.5 rounded-lg transition-colors ${
              isPlayingAudio
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 scale-110'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            title={isFavorite ? t.unfavorite : t.favorite}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorite
                ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Pokemon Artwork Area */}
      <div className="relative w-full h-40 flex items-center justify-center my-1 overflow-hidden">
        {/* Soft radial glow behind artwork */}
        <div className="absolute inset-0 bg-radial from-slate-100 to-transparent dark:from-slate-800/40 dark:to-transparent rounded-full opacity-70 group-hover:scale-110 transition-transform duration-500" />

        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-rose-500 animate-spin" />
          </div>
        )}

        <img
          src={pokemon.artworkUrl || pokemon.spriteUrl}
          alt={displayName}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            // fallback to standard sprite
            if ((e.target as HTMLImageElement).src !== pokemon.spriteUrl) {
              (e.target as HTMLImageElement).src = pokemon.spriteUrl;
            }
          }}
          className={`relative z-10 max-h-36 max-w-36 object-contain drop-shadow-md group-hover:scale-108 transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Name & Typography */}
      <div className="mt-2 space-y-1">
        <div className="flex items-baseline justify-between gap-1">
          <h2 className="font-display font-bold text-base text-slate-900 dark:text-white truncate">
            {displayName}
          </h2>
          {secondaryName && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate shrink-0">
              {secondaryName}
            </span>
          )}
        </div>

        {/* Type Badges */}
        <div className="flex items-center gap-1.5 pt-0.5">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} lang={lang} size="sm" />
          ))}
          {pokemon.isHisuian && (
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold ml-1">
              Hisui
            </span>
          )}
          {pokemon.isParadox && (
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold ml-1">
              Paradox
            </span>
          )}
        </div>
      </div>

      {/* Compact Stat Bars Preview */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <StatBars stats={pokemon.stats} totalBST={pokemon.totalBST} t={t} compact />
      </div>

      {/* Bottom Card Action Bar */}
      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={handleCompareClick}
          className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
            isInCompare
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Scale className="w-3 h-3" />
          <span>{isInCompare ? 'Comparing' : t.compare}</span>
        </button>

        <button
          type="button"
          onClick={handleTeamClick}
          className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
            isInTeam
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {isInTeam ? (
            <>
              <Check className="w-3 h-3 text-amber-600" />
              <span>In Team</span>
            </>
          ) : (
            <>
              <Plus className="w-3 h-3" />
              <span>Team</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
