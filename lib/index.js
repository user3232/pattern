// src/String.ts
function reverseString(string) {
  return [...string].reverse().join("");
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

// src/Postfixes.ts
var MathPostfixes = class {
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

// src/Prefixes.ts
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
export {
  MatchPrefixes,
  MathPostfixes
};
