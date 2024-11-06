[![NPM version](https://img.shields.io/npm/v/mdx-collections-svelte?style=for-the-badge&label=NPM&color=%23cb0000)](https://npmjs.com/package/mdx-collections-svelte "View on NPM")

# MDX Collections Svelte

TODO

-   📕 [Documentation](https://babakfp.ir/docs/mdx-collections-svelte)
-   🪵 [CHANGELOG](https://github.com/babakfp/mdx-collections-svelte/blob/main/CHANGELOG.md)
-   📦 [NPM](https://npmjs.com/package/mdx-collections-svelte)

## Example

TODO

```ts
import type { ImportGlobMarkdownMap } from "mdx-collections-svelte"

/**
 * All markdown content pages.
 *
 * Paths that contain (`_`) in their name are ignored to avoid conflict between pages and components.
 *
 * [Glob Import](https://vitejs.dev/guide/features.html#glob-import).
 */
const pages = import.meta.glob(
    [
        "/src/content/*/**/*.md",
        "!/src/content/*/**/_*/*.md",
        "!/src/content/*/**/_*.md",
    ],
    { eager: true },
) satisfies ImportGlobMarkdownMap
```
