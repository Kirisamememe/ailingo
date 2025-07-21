/**
 * 穴埋め問題の例題
 */
const FILL_IN_BLANK_EXAMPLE = `
    ### FILL_IN_BLANK
    Fill in the blank with the most appropriate choice.

    Example:
    Question: "The government's decision to _____ the controversial legislation sparked widespread protests across the nation."
    Choices: ["repeal", "enforce", "ignore", "draft"]
    Correct Answer: 0 (repeal)
    Explanation: "Repeal" means to revoke or cancel a law, which fits the context of controversy and protests.
  `;

/**
 * 下線付き選択問題の例題
 */
const SELECT_FOR_UNDERLINED_EXAMPLE = `
    ### SELECT_FOR_UNDERLINED
    Select the best option for the <u>underlined</u> part based on the instruction.

    #### Synonym/Antonym Selection
    Example 1 - Synonym:
    Question: "Choose the word that has the SAME meaning as the <u>meticulous</u> approach taken by the researcher."
    Choices: ["careless", "thorough", "hasty", "superficial"]
    Correct Answer: 1 (thorough)
    Explanation: "Meticulous" means showing great attention to detail, which is synonymous with "thorough".

    Example 2 - Antonym:
    Question: "Choose the word that has the OPPOSITE meaning of the <u>eloquent</u> speaker's presentation."
    Choices: ["articulate", "inarticulate", "persuasive", "fluent"]
    Correct Answer: 1 (inarticulate)
    Explanation: "Eloquent" means fluent and persuasive in speaking, while "inarticulate" means unable to express oneself clearly.

    #### Definition Selection
    Example:
    Question: "What does the word <u>paradigm</u> mean in this context: 'The new discovery represents a paradigm shift in scientific thinking'?"
    Choices: ["a small change", "a fundamental model or framework", "a temporary trend", "a research method"]
    Correct Answer: 1 (a fundamental model or framework)
    Explanation: A "paradigm" refers to a conceptual framework or model that shapes how we understand something.

    #### Usage Similarity Selection
    Example:
    Question: "In which sentence is the word 'bank' used in the SAME way as in: 'The river <u>bank</u> was eroded by heavy rainfall'?"
    Choices: [
      "I need to go to the bank to withdraw money.",
      "The snow bank blocked our driveway.",
      "You can bank on his reliability.",
      "The plane had to bank sharply to avoid the storm."
    ]
    Correct Answer: 1 (The snow bank blocked our driveway.)
    Explanation: Both sentences use "bank" to mean a raised area or slope, referring to physical geographical features.

    #### Usage Difference Selection
    Example:
    Question: "In which sentence is the word 'run' used DIFFERENTLY from the way it is used in: 'She decided to <u>run</u> for president'?"
    Choices: [
      "He will run for the school board next year.",
      "They plan to run a campaign focused on education.",
      "I need to run to catch the bus.",
      "She wants to run against the incumbent."
    ]
    Correct Answer: 2 (I need to run to catch the bus.)
    Explanation: In the original sentence and choices A, B, D, "run" means to be a candidate for office or to conduct a campaign. In choice C, "run" means to move quickly on foot.
  `;

/**
 * 理解問題の例題
 */
const COMPREHENSION = `
    ### COMPREHENSION
    Read the passage and answer the question.

    Example:
    Question: "Read the following passage and answer: According to the passage, what is the main criticism of sustainable development?
    The concept of sustainable development has evolved significantly since the 1987 Brundtland Report. Originally defined as development that meets present needs without compromising future generations' ability to meet their own needs, the definition has expanded to encompass economic viability, environmental protection, and social equity. Critics argue that the term has become so broad that it has lost its practical meaning, while proponents maintain that this inclusivity is necessary for addressing complex global challenges."
    Choices: [
      "It focuses too much on environmental issues",
      "It has become too broad to be practically meaningful", 
      "It ignores economic considerations",
      "It was poorly defined in the original 1987 report"
    ]
    Correct Answer: 1 (It has become too broad to be practically meaningful)
    Explanation: The passage explicitly states that critics argue the term has become "so broad that it has lost its practical meaning."
  `;

/**
 * 並び替え問題の例題
 */
const ARRANGEMENT = `
    ### ARRANGEMENT
    Choose the correct word order from the given options.

    Example:
    Words to arrange: ["had", "been", "investigating", "thoroughly", "the", "committee", "the", "allegations"]
    Question: "Which is the correct arrangement for a past perfect continuous sentence?"
    Choices: [
      "The committee had been investigating the allegations thoroughly.",
      "The committee had been thoroughly investigating the allegations.",
      "Thoroughly the committee had been investigating the allegations.",
      "The committee thoroughly had been investigating the allegations."
    ]
    Correct Answer: 0 or 1 (Both are grammatically correct)
    Explanation: In past perfect continuous, the adverb can be placed either after the object or before the main verb.
  `;

/**
 * 問題形式ごとの例題
 */
export const QUESTION_EXAMPLES = {
  FILL_IN_BLANK: FILL_IN_BLANK_EXAMPLE,
  SELECT_FOR_UNDERLINED: SELECT_FOR_UNDERLINED_EXAMPLE,
  COMPREHENSION: COMPREHENSION,
  ARRANGEMENT: ARRANGEMENT,
};
