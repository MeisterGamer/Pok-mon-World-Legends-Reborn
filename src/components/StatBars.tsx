import React from 'react';
import { BaseStats } from '../types/pokemon';
import { TranslationDictionary } from '../data/translations';

interface StatBarsProps {
  stats: BaseStats;
  totalBST: number;
  t: TranslationDictionary;
  compact?: boolean;
}

interface StatConfig {
  key: keyof BaseStats;
  label: string;
  max: number;
}

export const StatBars: React.FC<StatBarsProps> = ({ stats, totalBST, t, compact = false }) => {
  const statConfigs: StatConfig[] = [
    { key: 'hp', label: t.hp, max: 255 },
    { key: 'attack', label: t.attack, max: 190 },
    { key: 'defense', label: t.defense, max: 250 },
    { key: 'specialAttack', label: t.specialAttack, max: 194 },
    { key: 'specialDefense', label: t.specialDefense, max: 250 },
    { key: 'speed', label: t.speed, max: 200 },
  ];

  const getStatColor = (value: number) => {
    if (value >= 130) return 'bg-purple-500 dark:bg-purple-400';
    if (value >= 100) return 'bg-cyan-500 dark:bg-cyan-400';
    if (value >= 80) return 'bg-emerald-500 dark:bg-emerald-400';
    if (value >= 60) return 'bg-amber-500 dark:bg-amber-400';
    return 'bg-rose-500 dark:bg-rose-400';
  };

  if (compact) {
    return (
      <div className="space-y-1.5 text-xs">
        <div className="grid grid-cols-6 gap-1">
          {statConfigs.map((cfg) => {
            const val = stats[cfg.key];
            const pct = Math.min(100, Math.round((val / 160) * 100));
            return (
              <div key={cfg.key} className="flex flex-col">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
                  {cfg.label.slice(0, 3)}
                </span>
                <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  {val}
                </span>
                <div className="h-1 w-full bg-slate-200 dark:bg-slate-750 rounded-full overflow-hidden mt-0.5">
                  <div
                    className={`h-full rounded-full ${getStatColor(val)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
          <span className="text-slate-500 dark:text-slate-400">{t.totalBST}</span>
          <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
            {totalBST}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {statConfigs.map((cfg) => {
        const val = stats[cfg.key];
        const pct = Math.min(100, Math.round((val / cfg.max) * 100));
        return (
          <div key={cfg.key} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-600 dark:text-slate-300 w-24">
                {cfg.label}
              </span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100 text-sm">
                {val}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getStatColor(val)}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}

      <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-800">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {t.totalBST}
        </span>
        <span className="font-mono font-bold text-base text-rose-600 dark:text-rose-400">
          {totalBST}
        </span>
      </div>
    </div>
  );
};
