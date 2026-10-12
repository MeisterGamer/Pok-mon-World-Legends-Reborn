import { Language, PokemonType } from '../types/pokemon';

export interface TranslationDictionary {
  appTitle: string;
  appSubtitle: string;
  searchPlaceholder: string;
  allGenerations: string;
  allTypes: string;
  allRarities: string;
  sortBy: string;
  filters: string;
  clearFilters: string;
  totalFound: string;
  pokemonSingular: string;
  pokemonPlural: string;
  noPokemonFound: string;
  tryDifferentFilter: string;
  
  // Stats
  hp: string;
  attack: string;
  defense: string;
  specialAttack: string;
  specialDefense: string;
  speed: string;
  totalBST: string;
  
  // Tabs & Views
  overviewTab: string;
  weaknessTab: string;
  evolutionTab: string;
  calculatorTab: string;
  comparisonTab: string;
  teamTab: string;
  
  // Actions
  compare: string;
  addToTeam: string;
  removeFromTeam: string;
  favorite: string;
  unfavorite: string;
  playCry: string;
  close: string;
  details: string;
  quickView: string;
  exportTeam: string;
  copiedToClipboard: string;
  clearTeam: string;
  
  // Rarity tags
  rarityStandard: string;
  rarityStarter: string;
  rarityLegendary: string;
  rarityMythical: string;
  rarityParadox: string;
  rarityMega: string;
  
  // Generation names
  gen1: string;
  gen2: string;
  gen3: string;
  gen4: string;
  gen5: string;
  gen6: string;
  gen7: string;
  gen8: string;
  gen9: string;
  genHisui: string;
  
  // Calculator
  level: string;
  nature: string;
  individualValues: string;
  effortValues: string;
  calculatedStats: string;
  neutralNature: string;
  
  // Weaknesses
  weaknessQuad: string;
  weaknessDouble: string;
  normalDamage: string;
  resistanceHalf: string;
  resistanceQuarter: string;
  immunityZero: string;
  defenseEffectiveness: string;
  offensiveCoverage: string;

  // View modes
  gridView: string;
  tableView: string;
  statsPreset: string;
  presetFastSweepers: string;
  presetTanks: string;
  presetHighBST: string;
  presetReset: string;
  
  // Team analysis
  teamBuilder: string;
  teamWeaknesses: string;
  teamResistances: string;
  emptyTeamSlot: string;
  addPokemonPrompt: string;
  teamCoverageAlert: string;
  wellBalanced: string;
  
  // Sort options
  sortIdAsc: string;
  sortIdDesc: string;
  sortNameAsc: string;
  sortNameDesc: string;
  sortBstDesc: string;
  sortBstAsc: string;
  sortHpDesc: string;
  sortAtkDesc: string;
  sortDefDesc: string;
  sortSpeDesc: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appTitle: 'Pokémon World Legends',
    appSubtitle: 'Dex & Competitive Stat Explorer',
    searchPlaceholder: 'Search by Name (any language), #ID, or Ability...',
    allGenerations: 'All Generations',
    allTypes: 'All Types',
    allRarities: 'All Categories',
    sortBy: 'Sort By',
    filters: 'Filters',
    clearFilters: 'Reset Filters',
    totalFound: 'Showing',
    pokemonSingular: 'Pokémon',
    pokemonPlural: 'Pokémon',
    noPokemonFound: 'No Pokémon match your filter criteria',
    tryDifferentFilter: 'Try adjusting your type selection, stat ranges, or search term.',
    
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    specialAttack: 'Sp. Atk',
    specialDefense: 'Sp. Def',
    speed: 'Speed',
    totalBST: 'Total BST',
    
    overviewTab: 'Overview & Stats',
    weaknessTab: 'Type Matchups',
    evolutionTab: 'Evolution Chain',
    calculatorTab: 'Stat Calculator',
    comparisonTab: 'Side-by-Side Compare',
    teamTab: 'Team Builder',
    
    compare: 'Compare',
    addToTeam: 'Add to Team',
    removeFromTeam: 'Remove',
    favorite: 'Favorite',
    unfavorite: 'Unfavorite',
    playCry: 'Play Cry',
    close: 'Close',
    details: 'View Details',
    quickView: 'Quick Stats',
    exportTeam: 'Export Team',
    copiedToClipboard: 'Team exported to clipboard!',
    clearTeam: 'Clear Team',
    
    rarityStandard: 'Standard',
    rarityStarter: 'Starter',
    rarityLegendary: 'Legendary',
    rarityMythical: 'Mythical',
    rarityParadox: 'Paradox',
    rarityMega: 'Mega Evolution',
    
    gen1: 'Gen 1 (Kanto)',
    gen2: 'Gen 2 (Johto)',
    gen3: 'Gen 3 (Hoenn)',
    gen4: 'Gen 4 (Sinnoh)',
    gen5: 'Gen 5 (Unova)',
    gen6: 'Gen 6 (Kalos)',
    gen7: 'Gen 7 (Alola)',
    gen8: 'Gen 8 (Galar)',
    gen9: 'Gen 9 (Paldea)',
    genHisui: 'Legends (Hisui)',
    
    level: 'Level',
    nature: 'Nature',
    individualValues: 'IVs (0-31)',
    effortValues: 'EVs (0-252)',
    calculatedStats: 'Battle Stat Values',
    neutralNature: 'Neutral (Hardy, Docile, etc.)',
    
    weaknessQuad: '4× (Severe Weakness)',
    weaknessDouble: '2× (Weakness)',
    normalDamage: '1× (Normal)',
    resistanceHalf: '½× (Resistant)',
    resistanceQuarter: '¼× (Super Resistant)',
    immunityZero: '0× (Immune)',
    defenseEffectiveness: 'Defensive Type Multipliers',
    offensiveCoverage: 'Offensive Type Super-Effective Coverage',
    
    gridView: 'Grid View',
    tableView: 'Table View',
    statsPreset: 'Quick Presets',
    presetFastSweepers: 'Fast Sweepers (Spe ≥ 100, Atk/SpA ≥ 100)',
    presetTanks: 'Tanks & Walls (HP ≥ 90, Def/SpD ≥ 100)',
    presetHighBST: 'Heavy Hitters (BST ≥ 580)',
    presetReset: 'All Pokémon',
    
    teamBuilder: 'Team Builder (Up to 6)',
    teamWeaknesses: 'Combined Team Vulnerabilities',
    teamResistances: 'Combined Team Resistances',
    emptyTeamSlot: 'Empty Slot',
    addPokemonPrompt: 'Select a Pokémon to add to this slot',
    teamCoverageAlert: 'Team Coverage Matrix',
    wellBalanced: 'Well balanced defense profiles across team members.',
    
    sortIdAsc: 'Pokédex # (Low to High)',
    sortIdDesc: 'Pokédex # (High to Low)',
    sortNameAsc: 'Name (A to Z)',
    sortNameDesc: 'Name (Z to A)',
    sortBstDesc: 'Highest BST',
    sortBstAsc: 'Lowest BST',
    sortHpDesc: 'Highest HP',
    sortAtkDesc: 'Highest Attack',
    sortDefDesc: 'Highest Defense',
    sortSpeDesc: 'Highest Speed',
  },
  ja: {
    appTitle: 'ポケモン・ワールド・レジェンズ',
    appSubtitle: '図鑑 ＆ 対戦ステータス・エクスプローラー',
    searchPlaceholder: '名前（各言語対応）、図鑑番号、特性で検索...',
    allGenerations: 'すべての地方',
    allTypes: 'すべてのタイプ',
    allRarities: 'すべての分類',
    sortBy: '並び替え',
    filters: 'フィルター',
    clearFilters: '条件をリセット',
    totalFound: '該当数',
    pokemonSingular: '匹',
    pokemonPlural: '匹',
    noPokemonFound: '条件に一致するポケモンが見つかりません',
    tryDifferentFilter: 'タイプや種族値の条件、検索キーワードを変更してください。',
    
    hp: 'HP',
    attack: 'こうげき',
    defense: 'ぼうぎょ',
    specialAttack: 'とくこう',
    specialDefense: 'とくぼう',
    speed: 'すばやさ',
    totalBST: '合計種族値',
    
    overviewTab: '概要・ステータス',
    weaknessTab: 'タイプ相性・弱点',
    evolutionTab: '進化ライン',
    calculatorTab: '実数値計算機',
    comparisonTab: 'ポケモン比較',
    teamTab: 'チーム構築',
    
    compare: '比較',
    addToTeam: 'パーティに追加',
    removeFromTeam: '除外',
    favorite: 'お気に入り',
    unfavorite: '解除',
    playCry: 'なきごえ再生',
    close: '閉じる',
    details: '詳細を見る',
    quickView: 'クイック数値',
    exportTeam: 'パーティ書き出し',
    copiedToClipboard: 'パーティ構成をクリップボードにコピーしました！',
    clearTeam: 'パーティ初期化',
    
    rarityStandard: '通常',
    rarityStarter: '最初の3匹',
    rarityLegendary: '伝説のポケモン',
    rarityMythical: '幻のポケモン',
    rarityParadox: 'パラドックス',
    rarityMega: 'メガシンカ',
    
    gen1: '第1世代（カントー）',
    gen2: '第2世代（ジョウト）',
    gen3: '第3世代（ホウエン）',
    gen4: '第4世代（シンオウ）',
    gen5: '第5世代（イッシュ）',
    gen6: '第6世代（カロス）',
    gen7: '第7世代（アローラ）',
    gen8: '第8世代（ガラル）',
    gen9: '第9世代（パルデア）',
    genHisui: 'レジェンズ（ヒスイ）',
    
    level: 'レベル',
    nature: '性格',
    individualValues: '個体値 (0-31)',
    effortValues: '努力値 (0-252)',
    calculatedStats: '対戦実数値',
    neutralNature: '補正なし（がんばりや、すなお 等）',
    
    weaknessQuad: '4倍弱点（致命的）',
    weaknessDouble: '2倍弱点',
    normalDamage: '等倍（1倍）',
    resistanceHalf: '0.5倍（耐性）',
    resistanceQuarter: '0.25倍（超耐性）',
    immunityZero: '効果なし（0倍）',
    defenseEffectiveness: '防御タイプ相性',
    offensiveCoverage: '弱点打点タイプカバー率',
    
    gridView: 'グリッド表示',
    tableView: 'テーブル表示',
    statsPreset: 'クイック絞り込み',
    presetFastSweepers: '高速アタッカー (すばやさ≥100, 攻撃/特攻≥100)',
    presetTanks: '耐久型・要塞 (HP≥90, 防御/特防≥100)',
    presetHighBST: '高種族値 (合計≥580)',
    presetReset: '全ポケモン表示',
    
    teamBuilder: 'パーティ構築 (最大6匹)',
    teamWeaknesses: 'パーティ共通の弱点',
    teamResistances: 'パーティ耐性',
    emptyTeamSlot: '空き枠',
    addPokemonPrompt: 'ポケモンを選択して追加',
    teamCoverageAlert: 'チーム相性分析',
    wellBalanced: 'チーム全体のタイプ防御バランスが良好です。',
    
    sortIdAsc: '図鑑番号 昇順',
    sortIdDesc: '図鑑番号 降順',
    sortNameAsc: '名前 昇順',
    sortNameDesc: '名前 降順',
    sortBstDesc: '合計種族値 高い順',
    sortBstAsc: '合計種族値 低い順',
    sortHpDesc: 'HP 高い順',
    sortAtkDesc: 'こうげき 高い順',
    sortDefDesc: 'ぼうぎょ 高い順',
    sortSpeDesc: 'すばやさ 高い順',
  },
  fr: {
    appTitle: 'Pokémon World Legends',
    appSubtitle: 'Explorateur de Pokédex & Statistiques',
    searchPlaceholder: 'Rechercher par nom (multi-langues), n° ou talent...',
    allGenerations: 'Toutes les générations',
    allTypes: 'Tous les types',
    allRarities: 'Toutes catégories',
    sortBy: 'Trier par',
    filters: 'Filtres',
    clearFilters: 'Réinitialiser',
    totalFound: 'Affichage de',
    pokemonSingular: 'Pokémon',
    pokemonPlural: 'Pokémon',
    noPokemonFound: 'Aucun Pokémon trouvé pour ces critères',
    tryDifferentFilter: 'Modifiez vos filtres de type, statistiques ou recherche.',
    
    hp: 'PV',
    attack: 'Attaque',
    defense: 'Défense',
    specialAttack: 'Att. Spé',
    specialDefense: 'Déf. Spé',
    speed: 'Vitesse',
    totalBST: 'Total Base',
    
    overviewTab: 'Aperçu & Stats',
    weaknessTab: 'Sensibilités & Types',
    evolutionTab: 'Chaîne d\'évolution',
    calculatorTab: 'Calculateur de Stats',
    comparisonTab: 'Comparateur',
    teamTab: 'Créateur d\'équipe',
    
    compare: 'Comparer',
    addToTeam: 'Ajouter à l\'équipe',
    removeFromTeam: 'Retirer',
    favorite: 'Favori',
    unfavorite: 'Retirer favori',
    playCry: 'Cri Pokémon',
    close: 'Fermer',
    details: 'Détails complets',
    quickView: 'Aperçu rapide',
    exportTeam: 'Exporter l\'équipe',
    copiedToClipboard: 'Équipe copiée dans le presse-papier !',
    clearTeam: 'Vider l\'équipe',
    
    rarityStandard: 'Standard',
    rarityStarter: 'Starter',
    rarityLegendary: 'Légendaire',
    rarityMythical: 'Fabuleux',
    rarityParadox: 'Paradoxe',
    rarityMega: 'Méga-Évolution',
    
    gen1: 'Gén 1 (Kanto)',
    gen2: 'Gén 2 (Johto)',
    gen3: 'Gén 3 (Hoenn)',
    gen4: 'Gén 4 (Sinnoh)',
    gen5: 'Gén 5 (Unys)',
    gen6: 'Gén 6 (Kalos)',
    gen7: 'Gén 7 (Alola)',
    gen8: 'Gén 8 (Galar)',
    gen9: 'Gén 9 (Paldea)',
    genHisui: 'Légendes (Hisui)',
    
    level: 'Niveau',
    nature: 'Nature',
    individualValues: 'IVs (0-31)',
    effortValues: 'EVs (0-252)',
    calculatedStats: 'Statistiques en combat',
    neutralNature: 'Neutre (Hardi, Pudique, etc.)',
    
    weaknessQuad: '4× (Faiblesse extrême)',
    weaknessDouble: '2× (Faiblesse)',
    normalDamage: '1× (Normal)',
    resistanceHalf: '½× (Résistance)',
    resistanceQuarter: '¼× (Double résistance)',
    immunityZero: '0× (Immunité)',
    defenseEffectiveness: 'Multiplicateurs défensifs',
    offensiveCoverage: 'Couverture offensive super efficace',
    
    gridView: 'Vue Grille',
    tableView: 'Vue Tableau',
    statsPreset: 'Filtres rapides',
    presetFastSweepers: 'Sweepers rapides (Vit ≥ 100, Att/Att.Spé ≥ 100)',
    presetTanks: 'Tanks & Murs (PV ≥ 90, Déf/Déf.Spé ≥ 100)',
    presetHighBST: 'Haute puissance (BST ≥ 580)',
    presetReset: 'Tous les Pokémon',
    
    teamBuilder: 'Créateur d\'équipe (6 max)',
    teamWeaknesses: 'Faiblesses communes de l\'équipe',
    teamResistances: 'Résistances communes',
    emptyTeamSlot: 'Emplacement vide',
    addPokemonPrompt: 'Choisissez un Pokémon à ajouter',
    teamCoverageAlert: 'Matrice de couverture d\'équipe',
    wellBalanced: 'Profil défensif équilibré au sein de l\'équipe.',
    
    sortIdAsc: 'Numéro Pokédex (Croissant)',
    sortIdDesc: 'Numéro Pokédex (Décroissant)',
    sortNameAsc: 'Nom (A à Z)',
    sortNameDesc: 'Nom (Z à A)',
    sortBstDesc: 'Plus haut total',
    sortBstAsc: 'Plus bas total',
    sortHpDesc: 'Plus de PV',
    sortAtkDesc: 'Plus d\'Attaque',
    sortDefDesc: 'Plus de Défense',
    sortSpeDesc: 'Plus de Vitesse',
  },
  de: {
    appTitle: 'Pokémon World Legends',
    appSubtitle: 'Pokédex & Werte-Explorer',
    searchPlaceholder: 'Suche nach Name (mehrsprachig), Nr. oder Fähigkeit...',
    allGenerations: 'Alle Generationen',
    allTypes: 'Alle Typen',
    allRarities: 'Alle Kategorien',
    sortBy: 'Sortieren nach',
    filters: 'Filter',
    clearFilters: 'Zurücksetzen',
    totalFound: 'Angezeigt',
    pokemonSingular: 'Pokémon',
    pokemonPlural: 'Pokémon',
    noPokemonFound: 'Keine Pokémon entsprechen den Kriterien',
    tryDifferentFilter: 'Passen Sie Ihre Typen, Statuswerte oder Suchbegriffe an.',
    
    hp: 'KP',
    attack: 'Angriff',
    defense: 'Verteidigung',
    specialAttack: 'Sp.-Ang.',
    specialDefense: 'Sp.-Vert.',
    speed: 'Initiative',
    totalBST: 'Basiswertsumme',
    
    overviewTab: 'Übersicht & Werte',
    weaknessTab: 'Typenschwächen',
    evolutionTab: 'Entwicklungsreihe',
    calculatorTab: 'Werte-Rechner',
    comparisonTab: 'Vergleich',
    teamTab: 'Teambau',
    
    compare: 'Vergleichen',
    addToTeam: 'Ins Team aufnehmen',
    removeFromTeam: 'Entfernen',
    favorite: 'Favorit',
    unfavorite: 'Entfernen',
    playCry: 'Ruf abspielen',
    close: 'Schließen',
    details: 'Details ansehen',
    quickView: 'Kurzübersicht',
    exportTeam: 'Team exportieren',
    copiedToClipboard: 'Team in die Zwischenablage kopiert!',
    clearTeam: 'Team leeren',
    
    rarityStandard: 'Standard',
    rarityStarter: 'Starter',
    rarityLegendary: 'Legendär',
    rarityMythical: 'Mysteriös',
    rarityParadox: 'Paradox',
    rarityMega: 'Mega-Entwicklung',
    
    gen1: 'Gen 1 (Kanto)',
    gen2: 'Gen 2 (Johto)',
    gen3: 'Gen 3 (Hoenn)',
    gen4: 'Gen 4 (Sinnoh)',
    gen5: 'Gen 5 (Einall)',
    gen6: 'Gen 6 (Kalos)',
    gen7: 'Gen 7 (Alola)',
    gen8: 'Gen 8 (Galar)',
    gen9: 'Gen 9 (Paldea)',
    genHisui: 'Legenden (Hisui)',
    
    level: 'Level',
    nature: 'Wesen',
    individualValues: 'DVs (0-31)',
    effortValues: 'FP (0-252)',
    calculatedStats: 'Tatsächliche Kampfwerte',
    neutralNature: 'Neutral (Robust, Sanft usw.)',
    
    weaknessQuad: '4× (Extrem anfällig)',
    weaknessDouble: '2× (Schwäche)',
    normalDamage: '1× (Normal)',
    resistanceHalf: '½× (Resistenz)',
    resistanceQuarter: '¼× (Hohe Resistenz)',
    immunityZero: '0× (Immunität)',
    defenseEffectiveness: 'Defensive Typen-Multiplikatoren',
    offensiveCoverage: 'Offensive Typen-Abdeckung',
    
    gridView: 'Rasteransicht',
    tableView: 'Tabellenansicht',
    statsPreset: 'Schnellfilter',
    presetFastSweepers: 'Schnelle Angreifer (Init ≥ 100, Ang/SpA ≥ 100)',
    presetTanks: 'Tanks & Mauern (KP ≥ 90, Vert/SpV ≥ 100)',
    presetHighBST: 'Starke Kämpfer (BST ≥ 580)',
    presetReset: 'Alle Pokémon',
    
    teamBuilder: 'Team-Builder (Bis zu 6)',
    teamWeaknesses: 'Gemeinsame Teamschwächen',
    teamResistances: 'Gemeinsame Resistenzen',
    emptyTeamSlot: 'Freier Platz',
    addPokemonPrompt: 'Wähle ein Pokémon für diesen Platz',
    teamCoverageAlert: 'Team-Abdeckungsmatrix',
    wellBalanced: 'Ausgewogenes defensives Profil im Team.',
    
    sortIdAsc: 'Pokédex-Nr. (Aufsteigend)',
    sortIdDesc: 'Pokédex-Nr. (Absteigend)',
    sortNameAsc: 'Name (A bis Z)',
    sortNameDesc: 'Name (Z bis A)',
    sortBstDesc: 'Höchste Summe',
    sortBstAsc: 'Niedrigste Summe',
    sortHpDesc: 'Höchste KP',
    sortAtkDesc: 'Höchster Angriff',
    sortDefDesc: 'Höchste Verteidigung',
    sortSpeDesc: 'Höchste Initiative',
  },
  es: {
    appTitle: 'Pokémon World Legends',
    appSubtitle: 'Explorador de Pokédex y Estadísticas',
    searchPlaceholder: 'Buscar por nombre (multilingüe), N.º o habilidad...',
    allGenerations: 'Todas las generaciones',
    allTypes: 'Todos los tipos',
    allRarities: 'Todas las categorías',
    sortBy: 'Ordenar por',
    filters: 'Filtros',
    clearFilters: 'Restablecer',
    totalFound: 'Mostrando',
    pokemonSingular: 'Pokémon',
    pokemonPlural: 'Pokémon',
    noPokemonFound: 'Ningún Pokémon coincide con los filtros',
    tryDifferentFilter: 'Modifica tu búsqueda, tipos o rangos de estadísticas.',
    
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    specialAttack: 'At. Esp.',
    specialDefense: 'Def. Esp.',
    speed: 'Velocidad',
    totalBST: 'Total Base',
    
    overviewTab: 'Resumen y Estadísticas',
    weaknessTab: 'Debilidades y Tipos',
    evolutionTab: 'Cadena Evolutiva',
    calculatorTab: 'Calculadora de Estadísticas',
    comparisonTab: 'Comparador',
    teamTab: 'Creador de Equipos',
    
    compare: 'Comparar',
    addToTeam: 'Añadir al equipo',
    removeFromTeam: 'Eliminar',
    favorite: 'Favorito',
    unfavorite: 'Quitar favorito',
    playCry: 'Reproducir grito',
    close: 'Cerrar',
    details: 'Ver detalles',
    quickView: 'Vista rápida',
    exportTeam: 'Exportar equipo',
    copiedToClipboard: '¡Equipo copiado al portapapeles!',
    clearTeam: 'Vaciar equipo',
    
    rarityStandard: 'Estándar',
    rarityStarter: 'Inicial',
    rarityLegendary: 'Legendario',
    rarityMythical: 'Singular',
    rarityParadox: 'Paradoja',
    rarityMega: 'Megaevolución',
    
    gen1: 'Gen 1 (Kanto)',
    gen2: 'Gen 2 (Johto)',
    gen3: 'Gen 3 (Hoenn)',
    gen4: 'Gen 4 (Sinnoh)',
    gen5: 'Gen 5 (Teselia)',
    gen6: 'Gen 6 (Kalos)',
    gen7: 'Gen 7 (Alola)',
    gen8: 'Gen 8 (Galar)',
    gen9: 'Gen 9 (Paldea)',
    genHisui: 'Leyendas (Hisui)',
    
    level: 'Nivel',
    nature: 'Naturaleza',
    individualValues: 'IVs (0-31)',
    effortValues: 'EVs (0-252)',
    calculatedStats: 'Estadísticas reales en combate',
    neutralNature: 'Neutra (Fuerte, Dócil, etc.)',
    
    weaknessQuad: '4× (Debilidad extrema)',
    weaknessDouble: '2× (Debilidad)',
    normalDamage: '1× (Normal)',
    resistanceHalf: '½× (Resistencia)',
    resistanceQuarter: '¼× (Doble resistencia)',
    immunityZero: '0× (Inmunidad)',
    defenseEffectiveness: 'Multiplicadores defensivos',
    offensiveCoverage: 'Cobertura ofensiva súper eficaz',
    
    gridView: 'Vista en Cuadrícula',
    tableView: 'Vista en Tabla',
    statsPreset: 'Filtros rápidos',
    presetFastSweepers: 'Atacantes veloces (Vel ≥ 100, At/AtE ≥ 100)',
    presetTanks: 'Murallas y Tanques (PS ≥ 90, Def/DefE ≥ 100)',
    presetHighBST: 'Alta potencia (BST ≥ 580)',
    presetReset: 'Todos los Pokémon',
    
    teamBuilder: 'Creador de Equipos (Hasta 6)',
    teamWeaknesses: 'Debilidades compartidas del equipo',
    teamResistances: 'Resistencias compartidas',
    emptyTeamSlot: 'Espacio vacío',
    addPokemonPrompt: 'Selecciona un Pokémon para añadir',
    teamCoverageAlert: 'Matriz de cobertura del equipo',
    wellBalanced: 'Perfil defensivo equilibrado entre los miembros.',
    
    sortIdAsc: 'N.º Pokédex (Menor a mayor)',
    sortIdDesc: 'N.º Pokédex (Mayor a menor)',
    sortNameAsc: 'Nombre (A a Z)',
    sortNameDesc: 'Nombre (Z a A)',
    sortBstDesc: 'Mayor total de estadísticas',
    sortBstAsc: 'Menor total de estadísticas',
    sortHpDesc: 'Mayor PS',
    sortAtkDesc: 'Mayor Ataque',
    sortDefDesc: 'Mayor Defensa',
    sortSpeDesc: 'Mayor Velocidad',
  },
  ko: {
    appTitle: '포켓몬 월드 레전즈',
    appSubtitle: '도감 및 배틀 스탯 탐색기',
    searchPlaceholder: '이름(다국어 지원), 도감 번호 또는 특성 검색...',
    allGenerations: '모든 세대',
    allTypes: '모든 타입',
    allRarities: '모든 분류',
    sortBy: '정렬 기준',
    filters: '필터',
    clearFilters: '초기화',
    totalFound: '검색 결과',
    pokemonSingular: '마리',
    pokemonPlural: '마리',
    noPokemonFound: '조건에 맞는 포켓몬이 없습니다',
    tryDifferentFilter: '타입이나 종족값, 검색어를 변경해 보세요.',
    
    hp: 'HP',
    attack: '공격',
    defense: '방어',
    specialAttack: '특수공격',
    specialDefense: '특수방어',
    speed: '스피드',
    totalBST: '종족값 총합',
    
    overviewTab: '기본 정보 및 스탯',
    weaknessTab: '타입 상성 및 약점',
    evolutionTab: '진화 트리',
    calculatorTab: '실수치 계산기',
    comparisonTab: '포켓몬 비교',
    teamTab: '팀 빌더',
    
    compare: '비교하기',
    addToTeam: '파티에 추가',
    removeFromTeam: '제거',
    favorite: '즐겨찾기',
    unfavorite: '해제',
    playCry: '울음소리 듣기',
    close: '닫기',
    details: '상세보기',
    quickView: '요약',
    exportTeam: '파티 내보내기',
    copiedToClipboard: '파티 구성이 클립보드에 복사되었습니다!',
    clearTeam: '파티 비우기',
    
    rarityStandard: '일반',
    rarityStarter: '스타팅',
    rarityLegendary: '전설의 포켓몬',
    rarityMythical: '환상의 포켓몬',
    rarityParadox: '패러독스',
    rarityMega: '메가진화',
    
    gen1: '1세대 (관동)',
    gen2: '2세대 (성도)',
    gen3: '3세대 (호연)',
    gen4: '4세대 (신오)',
    gen5: '5세대 (하나)',
    gen6: '6세대 (칼로스)',
    gen7: '7세대 (알로라)',
    gen8: '8세대 (가라르)',
    gen9: '9세대 (팔데아)',
    genHisui: '레전즈 (히スイ)',
    
    level: '레벨',
    nature: '성격',
    individualValues: '개체값 (0-31)',
    effortValues: '노력치 (0-252)',
    calculatedStats: '배틀 실수치',
    neutralNature: '무보정 (노력, 온순 등)',
    
    weaknessQuad: '4배 약점 (치명적)',
    weaknessDouble: '2배 약점',
    normalDamage: '1배 (보통)',
    resistanceHalf: '0.5배 (반감)',
    resistanceQuarter: '0.25배 (강한 반감)',
    immunityZero: '0배 (무효)',
    defenseEffectiveness: '방어 상성 배율',
    offensiveCoverage: '공격 타점 타입 커버리지',
    
    gridView: '그리드 뷰',
    tableView: '테이블 뷰',
    statsPreset: '빠른 필터',
    presetFastSweepers: '고속 딜러 (스피드≥100, 공격/특공≥100)',
    presetTanks: '내구형 탱커 (HP≥90, 방어/특방≥100)',
    presetHighBST: '고종족값 (총합≥580)',
    presetReset: '전체 포켓몬',
    
    teamBuilder: '팀 빌더 (최대 6마리)',
    teamWeaknesses: '팀 공통 약점',
    teamResistances: '팀 공통 반감',
    emptyTeamSlot: '빈 슬롯',
    addPokemonPrompt: '포켓몬을 선택하여 추가하세요',
    teamCoverageAlert: '팀 상성 매트릭스',
    wellBalanced: '팀 멤버들의 방어 상성이 고르게 분포되어 있습니다.',
    
    sortIdAsc: '도감 번호 오름차순',
    sortIdDesc: '도감 번호 내림차순',
    sortNameAsc: '이름 가나다순',
    sortNameDesc: '이름 역순',
    sortBstDesc: '종족값 총합 높은순',
    sortBstAsc: '종족값 총합 낮은순',
    sortHpDesc: 'HP 높은순',
    sortAtkDesc: '공격 높은순',
    sortDefDesc: '방어 높은순',
    sortSpeDesc: '스피드 높은순',
  },
  zh: {
    appTitle: '宝可梦世界传说',
    appSubtitle: '宝可梦图鉴与对战能力值浏览器',
    searchPlaceholder: '搜索名称（支持多语言）、图鉴编号或特性...',
    allGenerations: '所有世代',
    allTypes: '所有属性',
    allRarities: '所有分类',
    sortBy: '排序方式',
    filters: '筛选条件',
    clearFilters: '重置筛选',
    totalFound: '共找到',
    pokemonSingular: '只',
    pokemonPlural: '只',
    noPokemonFound: '没有符合条件的宝可梦',
    tryDifferentFilter: '请尝试调整属性分类、种族值范围或搜索关键词。',
    
    hp: 'HP',
    attack: '攻击',
    defense: '防御',
    specialAttack: '特攻',
    specialDefense: '特防',
    speed: '速度',
    totalBST: '种族值总和',
    
    overviewTab: '概述与种族值',
    weaknessTab: '属性相克与弱点',
    evolutionTab: '进化链',
    calculatorTab: '实际能力值计算器',
    comparisonTab: '宝可梦对比',
    teamTab: '队伍构建',
    
    compare: '对比',
    addToTeam: '加入队伍',
    removeFromTeam: '移除',
    favorite: '收藏',
    unfavorite: '取消收藏',
    playCry: '播放叫声',
    close: '关闭',
    details: '查看详情',
    quickView: '快速概览',
    exportTeam: '导出队伍',
    copiedToClipboard: '队伍已复制到剪贴板！',
    clearTeam: '清空队伍',
    
    rarityStandard: '普通',
    rarityStarter: '最初的同伴',
    rarityLegendary: '传说的宝可梦',
    rarityMythical: '幻之宝可梦',
    rarityParadox: '悖谬宝可梦',
    rarityMega: '超级进化',
    
    gen1: '第1世代（关都）',
    gen2: '第2世代（城都）',
    gen3: '第3世代（丰缘）',
    gen4: '第4世代（神奥）',
    gen5: '第5世代（合众）',
    gen6: '第6世代（卡洛斯）',
    gen7: '第7世代（阿罗拉）',
    gen8: '第8世代（伽勒尔）',
    gen9: '第9世代（帕底亚）',
    genHisui: '传说（洗翠）',
    
    level: '等级',
    nature: '性格',
    individualValues: '个体值 (0-31)',
    effortValues: '基础点数 (0-252)',
    calculatedStats: '对战实际能力值',
    neutralNature: '无加减（勤奋、坦率等）',
    
    weaknessQuad: '4× (重度弱点)',
    weaknessDouble: '2× (弱点)',
    normalDamage: '1× (正常)',
    resistanceHalf: '½× (抗性)',
    resistanceQuarter: '¼× (强抗性)',
    immunityZero: '0× (无效)',
    defenseEffectiveness: '防御属性倍率',
    offensiveCoverage: '进攻克制属性覆盖',
    
    gridView: '网格视图',
    tableView: '表格视图',
    statsPreset: '快速预设',
    presetFastSweepers: '高速攻击手 (速度≥100, 攻击/特攻≥100)',
    presetTanks: '耐久盾牌 (HP≥90, 防御/特防≥100)',
    presetHighBST: '高种族值 (总和≥580)',
    presetReset: '全部宝可梦',
    
    teamBuilder: '队伍构建 (最多6只)',
    teamWeaknesses: '队伍共同弱点',
    teamResistances: '队伍抗性',
    emptyTeamSlot: '空位置',
    addPokemonPrompt: '选择宝可梦加入该位置',
    teamCoverageAlert: '队伍属性相克矩阵',
    wellBalanced: '队伍成员之间的防御属性分布良好。',
    
    sortIdAsc: '图鉴编号 升序',
    sortIdDesc: '图鉴编号 降序',
    sortNameAsc: '名称 升序',
    sortNameDesc: '名称 降序',
    sortBstDesc: '总和 高到低',
    sortBstAsc: '总和 低到高',
    sortHpDesc: 'HP 高到低',
    sortAtkDesc: '攻击 高到低',
    sortDefDesc: '防御 高到低',
    sortSpeDesc: '速度 高到低',
  },
};

export const typeTranslations: Record<PokemonType, Record<Language, string>> = {
  normal: {
    en: 'Normal',
    ja: 'ノーマル',
    fr: 'Normal',
    de: 'Normal',
    es: 'Normal',
    ko: '노말',
    zh: '一般',
  },
  fire: {
    en: 'Fire',
    ja: 'ほのお',
    fr: 'Feu',
    de: 'Feuer',
    es: 'Fuego',
    ko: '불꽃',
    zh: '火',
  },
  water: {
    en: 'Water',
    ja: 'みず',
    fr: 'Eau',
    de: 'Wasser',
    es: 'Agua',
    ko: '물',
    zh: '水',
  },
  grass: {
    en: 'Grass',
    ja: 'くさ',
    fr: 'Plante',
    de: 'Pflanze',
    es: 'Planta',
    ko: '풀',
    zh: '草',
  },
  electric: {
    en: 'Electric',
    ja: 'でんき',
    fr: 'Électrik',
    de: 'Elektro',
    es: 'Eléctrico',
    ko: '전기',
    zh: '电',
  },
  ice: {
    en: 'Ice',
    ja: 'こおり',
    fr: 'Glace',
    de: 'Eis',
    es: 'Hielo',
    ko: '얼음',
    zh: '冰',
  },
  fighting: {
    en: 'Fighting',
    ja: 'かくとう',
    fr: 'Combat',
    de: 'Kampf',
    es: 'Lucha',
    ko: '격투',
    zh: '格斗',
  },
  poison: {
    en: 'Poison',
    ja: 'どく',
    fr: 'Poison',
    de: 'Gift',
    es: 'Veneno',
    ko: '독',
    zh: '毒',
  },
  ground: {
    en: 'Ground',
    ja: 'じめん',
    fr: 'Sol',
    de: 'Boden',
    es: 'Tierra',
    ko: '땅',
    zh: '地面',
  },
  flying: {
    en: 'Flying',
    ja: 'ひこう',
    fr: 'Vol',
    de: 'Flug',
    es: 'Volador',
    ko: '비행',
    zh: '飞行',
  },
  psychic: {
    en: 'Psychic',
    ja: 'エスパー',
    fr: 'Psy',
    de: 'Psycho',
    es: 'Psíquico',
    ko: '에스퍼',
    zh: '超能力',
  },
  bug: {
    en: 'Bug',
    ja: 'むし',
    fr: 'Insecte',
    de: 'Käfer',
    es: 'Bicho',
    ko: '벌레',
    zh: '虫',
  },
  rock: {
    en: 'Rock',
    ja: 'いわ',
    fr: 'Roche',
    de: 'Gestein',
    es: 'Roca',
    ko: '바위',
    zh: '岩石',
  },
  ghost: {
    en: 'Ghost',
    ja: 'ゴースト',
    fr: 'Spectre',
    de: 'Geist',
    es: 'Fantasma',
    ko: '고스트',
    zh: '幽灵',
  },
  dragon: {
    en: 'Dragon',
    ja: 'ドラゴン',
    fr: 'Dragon',
    de: 'Drache',
    es: 'Dragón',
    ko: '드래곤',
    zh: '龙',
  },
  steel: {
    en: 'Steel',
    ja: 'はがね',
    fr: 'Acier',
    de: 'Stahl',
    es: 'Acero',
    ko: '강철',
    zh: '钢',
  },
  dark: {
    en: 'Dark',
    ja: 'あく',
    fr: 'Ténèbres',
    de: 'Unlicht',
    es: 'Siniestro',
    ko: '악',
    zh: '恶',
  },
  fairy: {
    en: 'Fairy',
    ja: 'フェアリー',
    fr: 'Fée',
    de: 'Fee',
    es: 'Hada',
    ko: '페어리',
    zh: '妖精',
  },
};
