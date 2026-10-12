import React from 'react';
import { Language, ViewMode } from '../types/pokemon';
import { TranslationDictionary } from '../data/translations';
import {
  Sun,
  Moon,
  LayoutGrid,
  Table as TableIcon,
  Heart,
  Scale,
  ShieldAlert,
  Globe,
} from 'lucide-react';
import { playUiClick } from '../utils/audio';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  t: TranslationDictionary;
  favoritesCount: number;
  onlyFavorites: boolean;
  onToggleOnlyFavorites: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  teamCount: number;
  onOpenTeam: () => void;
}

const LANGUAGE_OPTIONS: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  isDark,
  onToggleTheme,
  viewMode,
  onToggleViewMode,
  t,
  favoritesCount,
  onlyFavorites,
  onToggleOnlyFavorites,
  compareCount,
  onOpenCompare,
  teamCount,
  onOpenTeam,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md shadow-rose-500/20 shrink-0 text-white">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white truncate">
              {t.appTitle}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Favorites quick toggle */}
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onToggleOnlyFavorites();
            }}
            title={onlyFavorites ? 'Show all' : 'Show only favorites'}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              onlyFavorites
                ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800'
                : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                onlyFavorites || favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
            <span className="hidden md:inline">{t.favorite}</span>
            {favoritesCount > 0 && (
              <span className="font-mono text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Side-by-side Compare */}
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onOpenCompare();
            }}
            title="Compare Pokémon"
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              compareCount > 0
                ? 'bg-indigo-50 text-indigo-600 border-indigo-300 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.compare}</span>
            {compareCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-indigo-600 text-white">
                {compareCount}
              </span>
            )}
          </button>

          {/* Team Builder */}
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onOpenTeam();
            }}
            title="Team Builder"
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              teamCount > 0
                ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
                : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.teamTab}</span>
            <span className="font-mono text-[11px] font-semibold">
              {teamCount}/6
            </span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => {
                playUiClick();
                onToggleViewMode('grid');
              }}
              aria-label="Grid View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                playUiClick();
                onToggleViewMode('table');
              }}
              aria-label="Table View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Multi-language Selector */}
          <div className="relative">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-xs font-medium text-slate-700 dark:text-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={currentLang}
                onChange={(e) => {
                  playUiClick();
                  onLanguageChange(e.target.value as Language);
                }}
                className="bg-transparent border-none outline-hidden cursor-pointer text-xs font-medium pr-1"
                aria-label="Language"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option
                    key={opt.code}
                    value={opt.code}
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  >
                    {opt.flag} {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              playUiClick();
              onToggleTheme();
            }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
