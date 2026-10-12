import { useState, useMemo, useEffect, useCallback } from 'react';
import { Pokemon, Language, FilterState, ViewMode } from './types/pokemon';
import { POKEMON_DATABASE } from './data/pokemonList';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { PokemonCard } from './components/PokemonCard';
import { PokemonTable } from './components/PokemonTable';
import { PokemonDetailModal } from './components/PokemonDetailModal';
import { CompareModal } from './components/CompareModal';
import { TeamBuilderModal } from './components/TeamBuilderModal';
import { fetchPokemonFromPokeApi } from './services/pokeApi';
import { playUiClick } from './utils/audio';
import { Frown, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pokeworld_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Sync dark class on root html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pokeworld_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pokeworld_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Language state
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pokeworld_lang');
      if (saved && ['en', 'ja', 'fr', 'de', 'es', 'ko', 'zh'].includes(saved)) {
        return saved as Language;
      }
    }
    return 'en';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('pokeworld_lang', newLang);
  };

  const t = translations[lang] || translations.en;

  // View Mode
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Pokemon Database
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(() => {
    // Check if there are cached PokeAPI additions in local storage
    if (typeof window !== 'undefined') {
      try {
        const extra = localStorage.getItem('pokeworld_extra_pokemon');
        if (extra) {
          const parsed = JSON.parse(extra) as Pokemon[];
          const existingIds = new Set(POKEMON_DATABASE.map((p) => p.id));
          const merged = [...POKEMON_DATABASE];
          for (const item of parsed) {
            if (!existingIds.has(item.id)) {
              merged.push(item);
              existingIds.add(item.id);
            }
          }
          return merged;
        }
      } catch {
        // ignore parse error
      }
    }
    return POKEMON_DATABASE;
  });

  // Favorites
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pokeworld_favorites');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [6, 25, 448, 901]; // defaults: Charizard, Pikachu, Lucario, Hisuian Zoroark
  });

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id];
      localStorage.setItem('pokeworld_favorites', JSON.stringify(next));
      return next;
    });
  }, []);

  // Team
  const [team, setTeam] = useState<Pokemon[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pokeworld_team_ids');
      if (saved) {
        try {
          const ids: number[] = JSON.parse(saved);
          return ids
            .map((id) => POKEMON_DATABASE.find((p) => p.id === id))
            .filter((p): p is Pokemon => p !== undefined);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const toggleTeam = useCallback((pokemon: Pokemon) => {
    setTeam((prev) => {
      const exists = prev.some((p) => p.id === pokemon.id);
      let next: Pokemon[];
      if (exists) {
        next = prev.filter((p) => p.id !== pokemon.id);
      } else {
        if (prev.length >= 6) {
          // Replace or notify
          next = [...prev.slice(0, 5), pokemon];
        } else {
          next = [...prev, pokemon];
        }
      }
      localStorage.setItem('pokeworld_team_ids', JSON.stringify(next.map((p) => p.id)));
      return next;
    });
  }, []);

  const clearTeam = useCallback(() => {
    setTeam([]);
    localStorage.removeItem('pokeworld_team_ids');
  }, []);

  // Compare List
  const [compareList, setCompareList] = useState<Pokemon[]>([]);

  const toggleCompare = useCallback((pokemon: Pokemon) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === pokemon.id);
      if (exists) {
        return prev.filter((p) => p.id !== pokemon.id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), pokemon];
      }
      return [...prev, pokemon];
    });
  }, []);

  const removeCompare = useCallback((id: number) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Modals
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
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

  // Searching PokeAPI state & notification
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [apiNotice, setApiNotice] = useState<string | null>(null);

  // Batch rendering / pagination for silky-smooth 60fps performance
  const [displayLimit, setDisplayLimit] = useState(24);

  // Reset display limit when filters change
  useEffect(() => {
    setDisplayLimit(24);
  }, [filter]);

  // Handle Dynamic PokeAPI Search
  const handleSearchPokeApi = async () => {
    const query = filter.searchQuery.trim();
    if (!query) return;

    setIsSearchingApi(true);
    setApiNotice(null);

    const fetched = await fetchPokemonFromPokeApi(query);
    setIsSearchingApi(false);

    if (fetched) {
      setPokemonList((prev) => {
        if (prev.some((p) => p.id === fetched.id)) return prev;
        const next = [fetched, ...prev];
        try {
          const extra = next.filter(
            (p) => !POKEMON_DATABASE.some((base) => base.id === p.id)
          );
          localStorage.setItem('pokeworld_extra_pokemon', JSON.stringify(extra));
        } catch {
          // quota full safe
        }
        return next;
      });
      setSelectedPokemon(fetched);
      setApiNotice(`Loaded #${fetched.dexNumber} ${fetched.names.en} directly from PokeAPI!`);
      setTimeout(() => setApiNotice(null), 4000);
    } else {
      setApiNotice(`Could not find "${query}" on PokeAPI.`);
      setTimeout(() => setApiNotice(null), 4000);
    }
  };

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPokemon) setSelectedPokemon(null);
        if (isCompareOpen) setIsCompareOpen(false);
        if (isTeamOpen) setIsTeamOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPokemon, isCompareOpen, isTeamOpen]);

  // Integrated High-Performance Filtering Pipeline (memoized)
  const filteredPokemon = useMemo(() => {
    const query = filter.searchQuery.toLowerCase().trim();

    return pokemonList.filter((pokemon) => {
      // 1. Favorites only filter
      if (filter.onlyFavorites && !favorites.includes(pokemon.id)) {
        return false;
      }

      // 2. Multilingual Search (supports EN, JA, FR, DE, ES, KO, ZH, Dex #, abilities)
      if (query) {
        const matchesDex = String(pokemon.dexNumber) === query || `#${pokemon.dexNumber}` === query;
        const matchesAnyName = Object.values(pokemon.names).some((name) =>
          name.toLowerCase().includes(query)
        );
        const matchesAbility = pokemon.abilities.some((a) =>
          Object.values(a.name).some((n) => n.toLowerCase().includes(query))
        );

        if (!matchesDex && !matchesAnyName && !matchesAbility) {
          return false;
        }
      }

      // 3. Types Filter
      if (filter.selectedTypes.length > 0) {
        // If 1 type selected, pokemon must have that type
        // If 2 types selected, pokemon must match both types
        const hasAllSelectedTypes = filter.selectedTypes.every((t) =>
          pokemon.types.includes(t)
        );
        if (!hasAllSelectedTypes) return false;
      }

      // 4. Generation Filter
      if (filter.selectedGeneration !== 'all') {
        if (filter.selectedGeneration === 'hisui') {
          if (!pokemon.isHisuian) return false;
        } else if (pokemon.generation !== filter.selectedGeneration) {
          return false;
        }
      }

      // 5. Rarity / Category Filter
      if (filter.rarity !== 'all') {
        if (filter.rarity === 'starter' && !pokemon.isStarter) return false;
        if (filter.rarity === 'legendary' && !pokemon.isLegendary) return false;
        if (filter.rarity === 'mythical' && !pokemon.isMythical) return false;
        if (filter.rarity === 'paradox' && !pokemon.isParadox) return false;
        if (filter.rarity === 'mega' && !pokemon.isMega) return false;
      }

      // 6. Stat thresholds
      if (filter.minBST > 0 && pokemon.totalBST < filter.minBST) return false;
      if (filter.minSpeed > 0 && pokemon.stats.speed < filter.minSpeed) return false;
      if (filter.minAttack > 0 && pokemon.stats.attack < filter.minAttack) return false;
      if (filter.minDefense > 0 && pokemon.stats.defense < filter.minDefense) return false;
      if (filter.minHP > 0 && pokemon.stats.hp < filter.minHP) return false;

      return true;
    });
  }, [pokemonList, filter, favorites]);

  // Sorting Pipeline (memoized)
  const sortedPokemon = useMemo(() => {
    const list = [...filteredPokemon];

    list.sort((a, b) => {
      switch (filter.sortBy) {
        case 'id_desc':
          return b.dexNumber - a.dexNumber;
        case 'name_asc':
          return (a.names[lang] || a.names.en).localeCompare(b.names[lang] || b.names.en);
        case 'name_desc':
          return (b.names[lang] || b.names.en).localeCompare(a.names[lang] || a.names.en);
        case 'bst_desc':
          return b.totalBST - a.totalBST;
        case 'bst_asc':
          return a.totalBST - b.totalBST;
        case 'hp_desc':
          return b.stats.hp - a.stats.hp;
        case 'attack_desc':
          return b.stats.attack - a.stats.attack;
        case 'defense_desc':
          return b.stats.defense - a.stats.defense;
        case 'speed_desc':
          return b.stats.speed - a.stats.speed;
        case 'id_asc':
        default:
          return a.dexNumber - b.dexNumber;
      }
    });

    return list;
  }, [filteredPokemon, filter.sortBy, lang]);

  // Paginated visible slice for instant UI response
  const visiblePokemon = useMemo(() => {
    return sortedPokemon.slice(0, displayLimit);
  }, [sortedPokemon, displayLimit]);

  const hasMore = displayLimit < sortedPokemon.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Main Top Navigation */}
      <Navbar
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        t={t}
        favoritesCount={favorites.length}
        onlyFavorites={filter.onlyFavorites}
        onToggleOnlyFavorites={() =>
          setFilter((prev) => ({ ...prev, onlyFavorites: !prev.onlyFavorites }))
        }
        compareCount={compareList.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        teamCount={team.length}
        onOpenTeam={() => setIsTeamOpen(true)}
      />

      {/* Filter and Search Controls */}
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        lang={lang}
        t={t}
        totalFiltered={sortedPokemon.length}
        totalAvailable={pokemonList.length}
        isSearchingApi={isSearchingApi}
        onSearchPokeApi={handleSearchPokeApi}
      />

      {/* Optional Notification Pill */}
      {apiNotice && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 w-full">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>{apiNotice}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {sortedPokemon.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 mx-auto flex items-center justify-center">
              <Frown className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                {t.noPokemonFound}
              </h3>
              <p className="text-xs text-slate-500">
                {t.tryDifferentFilter}
              </p>
            </div>
            {filter.searchQuery.trim() && (
              <button
                type="button"
                onClick={handleSearchPokeApi}
                disabled={isSearchingApi}
                className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition-colors shadow-sm"
              >
                {isSearchingApi ? 'Searching...' : `Search "${filter.searchQuery}" on PokeAPI`}
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visiblePokemon.map((p) => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  lang={lang}
                  t={t}
                  isFavorite={favorites.includes(p.id)}
                  onToggleFavorite={toggleFavorite}
                  isInCompare={compareList.some((c) => c.id === p.id)}
                  onToggleCompare={toggleCompare}
                  isInTeam={team.some((tm) => tm.id === p.id)}
                  onToggleTeam={toggleTeam}
                  onSelect={setSelectedPokemon}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    setDisplayLimit((prev) => prev + 24);
                  }}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
                >
                  Load More Pokémon ({sortedPokemon.length - displayLimit} remaining)
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <PokemonTable
              pokemonList={visiblePokemon}
              lang={lang}
              t={t}
              sortBy={filter.sortBy}
              onSortChange={(col) => setFilter((prev) => ({ ...prev, sortBy: col }))}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              compareList={compareList}
              onToggleCompare={toggleCompare}
              teamList={team}
              onToggleTeam={toggleTeam}
              onSelect={setSelectedPokemon}
            />

            {hasMore && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    setDisplayLimit((prev) => prev + 36);
                  }}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-xs"
                >
                  Load More Entries
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Pokémon World Legends
            </span>
            <span>·</span>
            <span>Comprehensive Pokédex & Battle Stats</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Multi-Language (7 Languages)</span>
            <span>·</span>
            <span>High-Speed Client Memoization</span>
            <span>·</span>
            <span>Gen 9 VGC Formulas</span>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          lang={lang}
          t={t}
          isOpen={true}
          onClose={() => setSelectedPokemon(null)}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={toggleFavorite}
          isInCompare={compareList.some((c) => c.id === selectedPokemon.id)}
          onToggleCompare={toggleCompare}
          isInTeam={team.some((tm) => tm.id === selectedPokemon.id)}
          onToggleTeam={toggleTeam}
          onSelectPokemon={setSelectedPokemon}
          allPokemon={pokemonList}
        />
      )}

      {/* Compare Modal */}
      <CompareModal
        compareList={compareList}
        lang={lang}
        t={t}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemove={removeCompare}
        onSelectPokemon={(p) => {
          setIsCompareOpen(false);
          setSelectedPokemon(p);
        }}
      />

      {/* Team Builder Modal */}
      <TeamBuilderModal
        team={team}
        lang={lang}
        t={t}
        isOpen={isTeamOpen}
        onClose={() => setIsTeamOpen(false)}
        onRemoveFromTeam={(id) => {
          const target = team.find((p) => p.id === id);
          if (target) toggleTeam(target);
        }}
        onClearTeam={clearTeam}
        onSelectPokemon={(p) => {
          setIsTeamOpen(false);
          setSelectedPokemon(p);
        }}
      />
    </div>
  );
}
