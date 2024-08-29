/**
 * Gets file (directory) full (from first dot `.` in last segment of path) extension
 * (containing all dots `.`).
 *
 * ```ts
 *
 * console.log(pathFullExtension('/src/.hide/index.doc.html')
 * // ".doc.html"
 * console.log(pathFullExtension('/src/.hide/index')
 * // ""
 * console.log(pathFullExtension('/src/.hide/index.')
 * // "."
 * ```
 */
export declare function pathFullExtension(
/**
 * Path to analize - string containing `/` and `.` characters,
 * e.g. `/src/.hide/index.doc.html`, `index.html`.
 */
path: string): string;
