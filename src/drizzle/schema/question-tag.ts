import { pgEnum } from "drizzle-orm/pg-core";

/**
 * 問題タグ
 */
export const questionTag = pgEnum("question_tag", [
  // === 時制 ===
  "grammar_present_tense", // 現在形
  "grammar_past_tense", // 過去形
  "grammar_future_tense", // 未来形
  "grammar_present_perfect", // 現在完了形
  "grammar_past_perfect", // 過去完了形
  "grammar_future_perfect", // 未来完了形
  "grammar_present_continuous", // 現在進行形
  "grammar_past_continuous", // 過去進行形
  "grammar_present_perfect_continuous", // 現在完了進行形
  "grammar_tense_sequence", // 複雑な時制の一致・話法転換

  // === 文構造 ===
  "grammar_question_form", // 疑問文
  "grammar_negative_form", // 否定文
  "grammar_passive_voice", // 基本受動態
  "grammar_passive_causative", // 使役受動態・get受動態
  "grammar_emphasis_cleft", // 強調構文・分裂文（It is... that構文）
  "grammar_inversion", // 倒置構文（否定語句・仮定法・強調）
  "grammar_ellipsis", // 省略構文・代用表現
  "grammar_parallel_structure", // 複雑な並列構造・相関接続詞

  // === 助動詞 ===
  "grammar_modal_basic", // 基本助動詞（can, will, must等）
  "grammar_modal_inference", // 推量・過去の推量助動詞
  "grammar_modal_subjunctive", // 助動詞を使った仮定法

  // === 仮定法・条件文 ===
  "grammar_conditionals_simple", // 基本条件文
  "grammar_conditionals_mixed", // 混合仮定法（mixed conditionals）
  "grammar_conditionals_wish", // wish構文・仮定法過去/過去完了
  "grammar_subjunctive_present", // 仮定法現在

  // === 準動詞 ===
  "grammar_infinitive_basic", // 基本不定詞
  "grammar_infinitive_split", // 分離不定詞・原形不定詞
  "grammar_gerund_basic", // 基本動名詞
  "grammar_gerund_complex", // 意味上の主語・完了形動名詞
  "grammar_participle_basic", // 基本分詞（現在分詞・過去分詞）
  "grammar_participle_construction", // 分詞構文・独立分詞構文

  // === 関係詞 ===
  "grammar_relative_basic", // 基本関係代名詞・関係副詞
  "grammar_relative_complex", // 非制限用法・前置詞+関係代名詞

  // === 名詞・冠詞 ===
  "grammar_article", // 冠詞（a, an, the）
  "grammar_countable_uncountable", // 可算不可算名詞
  "grammar_apposition", // 同格構文・同格のthat

  // === 形容詞・副詞 ===
  "grammar_adjective", // 形容詞の語順・用法
  "grammar_adverb", // 副詞の位置・用法
  "grammar_comparison_basic", // 基本比較級・最上級
  "grammar_comparison_complex", // 複雑な比較構文（the more..., the more等）

  // === 前置詞・接続詞 ===
  "grammar_preposition", // 前置詞・群前置詞
  "grammar_conjunction", // 接続詞・副詞節の省略
  "grammar_phrasal_verb", // 句動詞

  // === その他 ===
  "grammar_idiomatic_usage", // 慣用的語法・表現

  // === 語彙 ===
  "vocabulary_basic", // 基本語彙
  "vocabulary_collocation", // コロケーション
  "vocabulary_idiom", // 慣用句・熟語
]);
