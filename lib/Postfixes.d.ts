/**
 * Stores string postfixes and allows effitient
 * postfixes matching to arbitrary string.
 */
export declare class MathPostfixes {
    #private;
    /**
     * Creates effitient store for postfixes and
     * postfixes matching operations.
     */
    constructor(
    /**
     * Prefixes to store.
     */
    prefixes: string[]);
    /**
     * Returns all postfixes matching given string,
     * sorted from shortest to longest.
     */
    allPostfixesOf(string: string): string[];
    /**
     * Returns longest matching postfix or `undefined` if none found.
     */
    bestPostfixOf(string: string): string | undefined;
    /**
     * Returns stored postfixes as provided in constructor.
     */
    allPostfixes(): string[];
}
