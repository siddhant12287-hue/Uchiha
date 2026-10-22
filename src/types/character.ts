export type AbilityExclusivity =
  | 'exclusive'
  | 'clan_shared'
  | 'forbidden_kinjutsu'
  | 'non_exclusive';

export interface Ability {
  id: string;
  name: string;
  kanji: string;
  romaji: string;
  classification: string;
  range?: string;
  natureAffinity?: string;
  exclusivity: AbilityExclusivity;
  exclusivityBadge?: string;
  wieldersDescription?: string;
  shortSummary: string;
  detailedLore: string;
  tacticalUsage: string;
  canonAppearance?: string;
  iconName: 'moon' | 'flame' | 'shield' | 'repeat' | 'eye' | 'wind' | 'sparkles';
}

export interface LoreSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  isItachiExclusive: boolean;
  content: string;
  notableFacts: string[];
}

export interface SacredArtifact {
  id: string;
  name: string;
  kanji: string;
  type: string;
  wielder: string;
  description: string;
  mythologicalOrigin: string;
}

export interface CharacterProfile {
  id: 'itachi' | 'shisui' | 'madara' | 'nagato';
  name: string;
  kanji: string;
  epithet: string;
  clan: string;
  natureAffinities: string[];
  themeColor: string;
  accentColor: string;
  backgroundQuote: string;
  quoteAuthor: string;
  quoteContext: string;
  biographySummary: string;
  abilities: Ability[];
  loreSections: LoreSection[];
  artifacts?: SacredArtifact[];
}
