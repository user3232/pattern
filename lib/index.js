// src/String.ts
function reverseString(string) {
  return [...string].reverse().join("");
}
function* reverse(string) {
  for (let i = string.length - 1; i >= 0; i--) {
    yield string[i];
  }
}

// src/Trie.ts
function createTrie(strings) {
  const trie = { characters: {} };
  for (const string of strings) {
    addStringToTrie(trie, string);
  }
  return trie;
}
function addStringToTrie(trie, string) {
  let node = trie;
  for (const character of [...string]) {
    if (!node.characters[character]) {
      node.characters[character] = { characters: {} };
    }
    node = node.characters[character];
  }
  node.isEnd = true;
  return trie;
}
function longestPrefixesInTrie(prefixes, string) {
  let matchingPrefix = "";
  const matchingPrefixes = [];
  if (prefixes.isEnd) {
    matchingPrefixes.push(matchingPrefix);
  }
  for (const character of [...string]) {
    if (!prefixes.characters[character]) {
      break;
    }
    matchingPrefix += character;
    prefixes = prefixes.characters[character];
    if (prefixes.isEnd) {
      matchingPrefixes.push(matchingPrefix);
    }
  }
  return matchingPrefixes;
}

// src/MatchPostfixes.ts
var MatchPostfixes = class {
  #reversedTrie;
  #reversedPrefixes;
  /**
   * Creates effitient store for postfixes and 
   * postfixes matching operations.
   */
  constructor(prefixes) {
    this.#reversedPrefixes = prefixes.map(reverseString);
    this.#reversedTrie = createTrie(this.#reversedPrefixes);
  }
  /**
   * Returns all postfixes matching given string,
   * sorted from shortest to longest.
   */
  allPostfixesOf(string) {
    return longestPrefixesInTrie(
      this.#reversedTrie,
      reverseString(string)
    ).map(reverseString);
  }
  /**
   * Returns longest matching postfix or `undefined` if none found.
   */
  bestPostfixOf(string) {
    const matchingPrefixes = this.allPostfixesOf(string);
    return matchingPrefixes[matchingPrefixes.length - 1];
  }
  /**
   * Returns stored postfixes as provided in constructor.
   */
  allPostfixes() {
    return this.#reversedPrefixes.map(reverseString);
  }
};

// src/MatchPrefixes.ts
var MatchPrefixes = class {
  #trie;
  #prefixes;
  /**
   * Creates effitient store for prefixes and 
   * prefixes matching operations.
   */
  constructor(prefixes) {
    this.#trie = createTrie(prefixes);
    this.#prefixes = prefixes;
  }
  /**
   * Returns all prefixes matching given string,
   * sorted from shortest to longest.
   */
  allPrefixesOf(string) {
    return longestPrefixesInTrie(this.#trie, string);
  }
  /**
   * Returns longest matching prefix or `undefined` if none found.
   */
  bestPrefixOf(string) {
    const matchingPrefixes = this.allPrefixesOf(string);
    return matchingPrefixes[matchingPrefixes.length - 1];
  }
  /**
   * Returns stored prefixes as provided in constructor.
   */
  allPrefixes() {
    return this.#prefixes;
  }
};

// src/ValuesTrie.ts
function createEmptyValuesTrie() {
  const trie = { characters: {} };
  return trie;
}
function addValueToValuesTrie(trie, key, value) {
  let node = trie;
  for (const character of key) {
    if (!node.characters[character]) {
      node.characters[character] = { characters: {} };
    }
    node = node.characters[character];
  }
  node.isEnd = true;
  node.value = value;
  return trie;
}
function valuesOfAllValuesTriePrefixesMatchingString(prefixes, string) {
  const matchingPrefixesValues = [];
  if (prefixes.isEnd) {
    matchingPrefixesValues.push(prefixes.value);
  }
  for (const character of string) {
    if (!prefixes.characters[character]) {
      break;
    }
    prefixes = prefixes.characters[character];
    if (prefixes.isEnd) {
      matchingPrefixesValues.push(prefixes.value);
    }
  }
  return matchingPrefixesValues;
}
function valueOfBestValuesTriePrefixMatchingString(prefixes, string) {
  let bestPrefix = void 0;
  if (prefixes.isEnd) {
    bestPrefix = prefixes.value;
  }
  for (const character of string) {
    if (!prefixes.characters[character]) {
      break;
    }
    prefixes = prefixes.characters[character];
    if (prefixes.isEnd) {
      bestPrefix = prefixes.value;
    }
  }
  return bestPrefix;
}

// src/Postfixes.ts
var Postfixes = class {
  #reversedTrie;
  /**
   * Creates postfixes container.
   */
  constructor(postfixes) {
    this.#reversedTrie = createEmptyValuesTrie();
    for (const postfix of postfixes ?? []) {
      addValueToValuesTrie(this.#reversedTrie, reverse(postfix), postfix);
    }
  }
  /**
   * Adds postfix to container.
   */
  add(postfix) {
    addValueToValuesTrie(this.#reversedTrie, reverse(postfix), postfix);
  }
  /**
   * Returns all postfixes matching given string, from shortest to longest.
   */
  matchAllTo(string) {
    return valuesOfAllValuesTriePrefixesMatchingString(this.#reversedTrie, reverse(string));
  }
  /**
   * Returns longest postfix matching given string.
   */
  matchBestTo(string) {
    return valueOfBestValuesTriePrefixMatchingString(this.#reversedTrie, reverse(string));
  }
};

// src/Prefixes.ts
var Prefixes = class {
  #trie;
  /**
   * Creates prefixes container.
   */
  constructor(prefixes) {
    this.#trie = createEmptyValuesTrie();
    for (const prefix of prefixes ?? []) {
      addValueToValuesTrie(this.#trie, prefix, prefix);
    }
  }
  /**
   * Adds prefix to container.
   */
  add(prefix) {
    addValueToValuesTrie(this.#trie, prefix, prefix);
  }
  /**
   * Returns all prefixes matching given string, from shortest to longest.
   */
  matchAllTo(string) {
    return valuesOfAllValuesTriePrefixesMatchingString(this.#trie, string);
  }
  /**
   * Returns longest prefix matching given string.
   */
  matchBestTo(string) {
    return valueOfBestValuesTriePrefixMatchingString(this.#trie, string);
  }
};

// src/WildcardPatterns.ts
var WildcardPatterns = class {
  #db;
  #exacts;
  #prefixes;
  #prefixToPostfixes;
  /**
   * Creates exact and wildcard (containing one `*`) patterns container.
   */
  constructor(patterns) {
    this.#db = {};
    this.#exacts = /* @__PURE__ */ new Set();
    this.#prefixes = new Prefixes();
    this.#prefixToPostfixes = {};
    for (const pattern of patterns ?? []) {
      addPatternToWildcardPatternsStructure({
        pattern,
        prefixes: this.#prefixes,
        prefixToPostfixes: this.#prefixToPostfixes,
        prefixToPostfixesToPattern: this.#db,
        exacts: this.#exacts
      });
    }
  }
  /**
   * Adds pattern to container. Pattern may have at most one 
   * wildcard (`*`) character.
   */
  add(pattern) {
    addPatternToWildcardPatternsStructure({
      pattern,
      prefixes: this.#prefixes,
      prefixToPostfixes: this.#prefixToPostfixes,
      prefixToPostfixesToPattern: this.#db,
      exacts: this.#exacts
    });
  }
  /**
   * Returns exact or (if no exact) longest (containing `*`) 
   * pattern matching given string.
   * 
   * Returns `undefined` when no pattern matches.
   */
  matchBestTo(string) {
    if (this.#exacts.has(string)) {
      return string;
    }
    let bestPattern = void 0;
    for (const matchingPrefix of this.#prefixes.matchAllTo(string)) {
      const matchingPostfix = this.#prefixToPostfixes[matchingPrefix].matchBestTo(string);
      if (matchingPostfix !== void 0) {
        bestPattern = this.#db[matchingPrefix][matchingPostfix];
      }
    }
    return bestPattern;
  }
};
function addPatternToWildcardPatternsStructure({
  pattern,
  prefixToPostfixesToPattern,
  exacts,
  prefixes,
  prefixToPostfixes
}) {
  const { type, exact, prefix, postfix } = patternToWildOrExact(pattern);
  if (type === "wild") {
    if (!prefixToPostfixesToPattern[prefix]) {
      prefixToPostfixesToPattern[prefix] = { [postfix]: pattern };
    } else {
      prefixToPostfixesToPattern[prefix][postfix] = pattern;
    }
    prefixes.add(prefix);
    if (!prefixToPostfixes[prefix]) {
      prefixToPostfixes[prefix] = new Postfixes([postfix]);
    } else {
      prefixToPostfixes[prefix].add(postfix);
    }
  }
  if (type === "exact") {
    exacts.add(exact);
  }
}
function patternToWildOrExact(pattern, wildcardChar) {
  wildcardChar ??= "*";
  const wildcardIndex = pattern.indexOf(wildcardChar);
  if (wildcardIndex === -1) {
    return {
      type: "exact",
      exact: pattern
    };
  }
  if (pattern.indexOf(wildcardChar, wildcardIndex + wildcardChar.length) !== -1) {
    throw new Error("Not a wildcard string, too many *", {
      cause: { pattern }
    });
  }
  const prefix = pattern.substring(0, wildcardIndex);
  const postfix = pattern.substring(wildcardIndex + wildcardChar.length);
  return {
    type: "wild",
    prefix,
    postfix
  };
}

// src/PrefixesPostfixes.ts
var PrefixesPostfixes = class {
  #prefixes;
  #prefixToPostfixes;
  /**
   * Creates prefix/postfix patterns container.
   */
  constructor(patterns) {
    this.#prefixes = new Prefixes();
    this.#prefixToPostfixes = {};
    for (const { prefix, postfix } of patterns ?? []) {
      addPatternToPrefixesPostfixesStructure({
        prefix,
        postfix,
        prefixes: this.#prefixes,
        prefixToPostfixes: this.#prefixToPostfixes
      });
    }
  }
  /**
   * Adds pattern (prefix/postfix) to container. 
   */
  add(pattern) {
    addPatternToPrefixesPostfixesStructure({
      prefix: pattern.postfix,
      postfix: pattern.prefix,
      prefixes: this.#prefixes,
      prefixToPostfixes: this.#prefixToPostfixes
    });
  }
  /**
   * Returns longest (longest prefix then longest postfix)
   * pattern matching given string.
   * 
   * Returns `undefined` when no pattern matches.
   */
  matchBestTo(string) {
    let bestPattern = void 0;
    for (const matchingPrefix of this.#prefixes.matchAllTo(string)) {
      const matchingPostfix = this.#prefixToPostfixes[matchingPrefix].matchBestTo(string);
      if (matchingPostfix !== void 0) {
        bestPattern = {
          prefix: matchingPrefix,
          postfix: matchingPostfix
        };
      }
    }
    return bestPattern;
  }
};
function addPatternToPrefixesPostfixesStructure({
  prefix,
  postfix,
  prefixes,
  prefixToPostfixes
}) {
  prefixes.add(prefix);
  if (!prefixToPostfixes[prefix]) {
    prefixToPostfixes[prefix] = new Postfixes([postfix]);
  } else {
    prefixToPostfixes[prefix].add(postfix);
  }
}

// src/DirPatterns.ts
var DirPatterns = class {
  #prefixes;
  #exacts;
  /**
   * Creates exact and directory (ending with `/`) patterns container.
   */
  constructor(patterns) {
    this.#prefixes = new Prefixes();
    this.#exacts = /* @__PURE__ */ new Set();
    for (const pattern of patterns ?? []) {
      addPatternToPrefixPatterns({
        pattern,
        prefixes: this.#prefixes,
        exacts: this.#exacts
      });
    }
  }
  /**
   * Adds pattern to container. Pattern may end with 
   * `/` character and is then matched as prefix. Others
   * are matched as exact.
   */
  add(pattern) {
    addPatternToPrefixPatterns({
      pattern,
      prefixes: this.#prefixes,
      exacts: this.#exacts
    });
  }
  /**
   * Returns exact or (if no exact) longest (ending with `/`) 
   * pattern matching given string.
   * 
   * Returns `undefined` when no pattern matches.
   */
  matchBestTo(string) {
    if (this.#exacts.has(string)) {
      return string;
    }
    return this.#prefixes.matchBestTo(string);
  }
};
function addPatternToPrefixPatterns({
  pattern,
  prefixes,
  exacts
}) {
  switch (patternToDirOrExact(pattern)) {
    case "exact":
      exacts.add(pattern);
      return;
    case "dir":
      prefixes.add(pattern);
      return;
  }
}
function patternToDirOrExact(pattern) {
  if (pattern.endsWith("/")) {
    return "dir";
  } else {
    return "exact";
  }
}

// src/Path.ts
function pathFullExtension(path) {
  const lastSlashIndex = path.lastIndexOf("/");
  const firstDotIndex = path.indexOf(".", lastSlashIndex);
  return firstDotIndex === -1 ? "" : path.substring(firstDotIndex);
}
export {
  DirPatterns,
  MatchPostfixes,
  MatchPrefixes,
  Postfixes,
  Prefixes,
  PrefixesPostfixes,
  WildcardPatterns,
  pathFullExtension
};
