import { Pokemon, PokemonType } from '../types/pokemon';

// In-memory cache for dynamically fetched Pokemon
const fetchedCache = new Map<number | string, Pokemon>();

export async function fetchPokemonFromPokeApi(idOrName: string | number): Promise<Pokemon | null> {
  const query = String(idOrName).toLowerCase().trim();
  if (fetchedCache.has(query)) {
    return fetchedCache.get(query)!;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`);
    if (!res.ok) return null;
    const data = await res.json();

    // Fetch species data for multilingual names, flavor text, and category
    let speciesData: any = null;
    try {
      const speciesRes = await fetch(data.species.url);
      if (speciesRes.ok) {
        speciesData = await speciesRes.json();
      }
    } catch {
      // species fetch is optional enhancement
    }

    const enName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    
    // Extract names across languages
    const names: Record<string, string> = {
      en: enName,
      ja: enName,
      fr: enName,
      de: enName,
      es: enName,
      ko: enName,
      zh: enName,
    };

    const categories: Record<string, string> = {
      en: 'Pokémon',
      ja: 'ポケモン',
      fr: 'Pokémon',
      de: 'Pokémon',
      es: 'Pokémon',
      ko: '포켓몬',
      zh: '宝可梦',
    };

    const flavorTexts: Record<string, string> = {
      en: 'A Pokémon recorded in the National Pokédex.',
      ja: '全国図鑑に記録されたポケモン。',
      fr: 'Un Pokémon répertorié dans le Pokédex national.',
      de: 'Ein im Nationalen Pokédex verzeichnetes Pokémon.',
      es: 'Un Pokémon registrado en la Pokédex Nacional.',
      ko: '전국도감에 기록된 포켓몬.',
      zh: '收录在全国图鉴中的宝可梦。',
    };

    if (speciesData) {
      if (speciesData.names) {
        for (const item of speciesData.names) {
          const code = item.language.name;
          if (code === 'ja-Hrkt' || code === 'ja') names.ja = item.name;
          else if (code === 'roomaji' && !names.ja) names.ja = item.name;
          else if (code === 'fr') names.fr = item.name;
          else if (code === 'de') names.de = item.name;
          else if (code === 'es') names.es = item.name;
          else if (code === 'ko') names.ko = item.name;
          else if (code === 'zh-Hans') names.zh = item.name;
          else if (code === 'en') names.en = item.name;
        }
      }

      if (speciesData.genera) {
        for (const item of speciesData.genera) {
          const code = item.language.name;
          if (code === 'ja-Hrkt' || code === 'ja') categories.ja = item.genus;
          else if (code === 'fr') categories.fr = item.genus;
          else if (code === 'de') categories.de = item.genus;
          else if (code === 'es') categories.es = item.genus;
          else if (code === 'ko') categories.ko = item.genus;
          else if (code === 'zh-Hans') categories.zh = item.genus;
          else if (code === 'en') categories.en = item.genus;
        }
      }

      if (speciesData.flavor_text_entries) {
        for (const item of speciesData.flavor_text_entries) {
          const code = item.language.name;
          const cleanText = item.flavor_text.replace(/[\n\f]/g, ' ');
          if (code === 'en' && flavorTexts.en === 'A Pokémon recorded in the National Pokédex.') flavorTexts.en = cleanText;
          else if (code === 'ja-Hrkt' || code === 'ja') flavorTexts.ja = cleanText;
          else if (code === 'fr') flavorTexts.fr = cleanText;
          else if (code === 'de') flavorTexts.de = cleanText;
          else if (code === 'es') flavorTexts.es = cleanText;
          else if (code === 'ko') flavorTexts.ko = cleanText;
          else if (code === 'zh-Hans') flavorTexts.zh = cleanText;
        }
      }
    }

    // Parse stats
    const statsMap: Record<string, number> = {};
    for (const s of data.stats) {
      statsMap[s.stat.name] = s.base_stat;
    }

    const hp = statsMap['hp'] || 50;
    const attack = statsMap['attack'] || 50;
    const defense = statsMap['defense'] || 50;
    const specialAttack = statsMap['special-attack'] || 50;
    const specialDefense = statsMap['special-defense'] || 50;
    const speed = statsMap['speed'] || 50;
    const totalBST = hp + attack + defense + specialAttack + specialDefense + speed;

    const types = data.types.map((t: any) => t.type.name as PokemonType);

    // Generation deduction from species or ID
    let gen = 1;
    const id = data.id;
    if (id <= 151) gen = 1;
    else if (id <= 251) gen = 2;
    else if (id <= 386) gen = 3;
    else if (id <= 493) gen = 4;
    else if (id <= 649) gen = 5;
    else if (id <= 721) gen = 6;
    else if (id <= 809) gen = 7;
    else if (id <= 905) gen = 8;
    else gen = 9;

    const abilities = data.abilities.map((a: any) => ({
      name: {
        en: a.ability.name.replace('-', ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
        ja: a.ability.name,
        fr: a.ability.name,
        de: a.ability.name,
        es: a.ability.name,
        ko: a.ability.name,
        zh: a.ability.name,
      },
      description: {
        en: 'Ability details from Pokédex',
        ja: '特性の詳細',
        fr: 'Détails du talent',
        de: 'Fähigkeitendetails',
        es: 'Detalles de habilidad',
        ko: '특성 정보',
        zh: '特性详情',
      },
      isHidden: a.is_hidden,
    }));

    const artworkUrl = data.sprites?.other?.['official-artwork']?.front_default ||
      data.sprites?.front_default ||
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

    const pokemon: Pokemon = {
      id: data.id,
      dexNumber: data.id,
      names: names as any,
      category: categories as any,
      flavorText: flavorTexts as any,
      types,
      stats: { hp, attack, defense, specialAttack, specialDefense, speed },
      totalBST,
      height: data.height / 10,
      weight: data.weight / 10,
      generation: gen,
      isLegendary: speciesData?.is_legendary || false,
      isMythical: speciesData?.is_mythical || false,
      abilities,
      spriteUrl: data.sprites?.front_default || artworkUrl,
      artworkUrl,
    };

    fetchedCache.set(query, pokemon);
    fetchedCache.set(pokemon.id, pokemon);
    return pokemon;
  } catch (err) {
    console.error('Failed to fetch from PokeAPI:', err);
    return null;
  }
}
