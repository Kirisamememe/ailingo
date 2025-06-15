/**
 * 品詞
 */
export const POS = [
  "NOUN",
  "VERB",
  "TRANSITIVE_VERB",
  "INTRANSITIVE_VERB",
  "ADJECTIVE",
  "ADVERB",
  "PREPOSITION",
  "CONJUNCTION",
  "PRONOUN",
  "INTERJECTION",
  "PHRASE",
  "DETERMINER",
  "IDIOM",
  "ORDINAL",
  "OTHER",
] as const;

/**
 * 品詞
 */
export type POS = (typeof POS)[number];
