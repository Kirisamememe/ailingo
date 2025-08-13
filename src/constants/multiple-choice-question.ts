/**
 * 穴埋め問題の例題
 */
const FILL_IN_BLANK_EXAMPLE = `
    ### FILL_IN_BLANK
    Fill in the blank with the most appropriate choice.

    Example:
    Question: "If I _____ more time yesterday, I would have completed the project."
    Choices: ["have had", "had had", "would have", "will have"]
    Correct Answer: 1 (had had)
    Explanation: This is a third conditional sentence requiring past perfect in the if-clause.
  `;

/**
 * 下線付き選択問題の例題
 */
const SELECT_FOR_UNDERLINED_EXAMPLE = `
    ### SELECT_FOR_UNDERLINED
    Select the best option for the <u>underlined</u> part based on the instruction.

    #### Definition Selection
    Example:
    Question: "What does the word <u>paradigm</u> mean in this context: 'The new discovery represents a paradigm shift in scientific thinking'?"
    Choices: ["a small change", "a fundamental model or framework", "a temporary trend", "a research method"]
    Correct Answer: 1 (a fundamental model or framework)
    Explanation: A "paradigm" refers to a conceptual framework or model that shapes how we understand something.
  `;

/**
 * 並び替え問題の例題
 */
const ARRANGEMENT = `
    ### ARRANGEMENT
    Choose the correct word order from the given options.

    Example:
    Words to arrange: ["never", "have", "I", "such", "seen", "a", "beautiful", "sunset"]
    Question: "Which is the correct arrangement for this present perfect sentence with 'such'?"
    Choices: [
      "I have never seen such a beautiful sunset.",
      "I never have seen such a beautiful sunset.",
      "Never I have seen such a beautiful sunset.",
      "I have seen never such a beautiful sunset."
    ]
    Correct Answer: 0 (I have never seen such a beautiful sunset.)
    Explanation: In present perfect, "never" comes between auxiliary "have" and past participle "seen".
  `;

/**
 * 問題形式ごとの例題
 */
export const QUESTION_EXAMPLES = {
  FILL_IN_BLANK: FILL_IN_BLANK_EXAMPLE,
  SELECT_FOR_UNDERLINED: SELECT_FOR_UNDERLINED_EXAMPLE,
  ARRANGEMENT: ARRANGEMENT,
};
