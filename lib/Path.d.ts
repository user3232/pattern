/**
 * Gets file (directory) full (from first dot `.` in last segment of path) extension
 * (containing all dots `.`).
 *
 * ```ts
 *
 * console.log(getPathFullExtension('/src/.hide/index.doc.html')
 * // ".doc.html"
 * console.log(getPathFullExtension('/src/.hide/index')
 * // ""
 * console.log(getPathFullExtension('/src/.hide/index.')
 * // "."
 * ```
 */
export declare function getPathFullExtension(
/**
 * Path to analize - string containing `/` and `.` characters,
 * e.g. `/src/.hide/index.doc.html`, `index.html`.
 */
path: string): string;
