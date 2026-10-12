import React from 'react';
import { PokemonType, Language } from '../types/pokemon';
import { typeVisuals } from '../data/typeChart';
import { typeTranslations } from '../data/translations';

interface TypeBadgeProps {
  type: PokemonType;
  lang: Language;
  size?: 'sm' | 'md' | 'lg';
  multiplier?: number;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  lang,
  size = 'md',
  multiplier,
  interactive = false,
  selected = false,
  onClick,
}) => {
  const visuals = typeVisuals[type] || typeVisuals.normal;
  const label = typeTranslations[type]?.[lang] || type;

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px] tracking-wide',
    md: 'px-2.5 py-1 text-xs tracking-wide font-medium',
    lg: 'px-3.5 py-1.5 text-sm tracking-wide font-semibold',
  };

  const getMultiplierBadge = (mult: number) => {
    let text = `${mult}×`;
    let colorClass = 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200';

    if (mult === 4) {
      text = '4×';
      colorClass = 'bg-rose-600 text-white font-bold';
    } else if (mult === 2) {
      text = '2×';
      colorClass = 'bg-orange-500 text-white font-semibold';
    } else if (mult === 0.5) {
      text = '½×';
      colorClass = 'bg-emerald-600 text-white';
    } else if (mult === 0.25) {
      text = '¼×';
      colorClass = 'bg-teal-600 text-white font-bold';
    } else if (mult === 0) {
      text = '0×';
      colorClass = 'bg-slate-900 text-slate-300 dark:bg-slate-800 dark:text-slate-400 font-bold';
    }

    return (
      <span className={`ml-1.5 px-1 py-0.2 rounded text-[10px] ${colorClass}`}>
        {text}
      </span>
    );
  };

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-lg transition-all select-none ${sizeClasses[size]} ${
          selected
            ? `${visuals.badgeBg} shadow-sm ring-2 ring-offset-1 ring-slate-900 dark:ring-white dark:ring-offset-slate-950 scale-102`
            : `${visuals.bg} ${visuals.text} border ${visuals.border} hover:opacity-85`
        }`}
      >
        <span>{label}</span>
      </button>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md font-medium select-none shadow-xs ${visuals.badgeBg} ${sizeClasses[size]}`}
    >
      <span>{label}</span>
      {multiplier !== undefined && getMultiplierBadge(multiplier)}
    </span>
  );
};
