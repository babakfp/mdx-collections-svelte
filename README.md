[![NPM version](https://img.shields.io/npm/v/mdx-collections-svelte?style=for-the-badge&label=NPM&color=%23cb0000)](https://npmjs.com/package/mdx-collections-svelte "View on NPM")

# MDX Collections Svelte

An easy way to create collections of markdown pages in SvelteKit.

-   📕 [Documentation](https://babakfp.ir/docs/mdx-collections-svelte)
-   🪵 [CHANGELOG](https://github.com/babakfp/mdx-collections-svelte/blob/main/CHANGELOG.md)
-   📦 [NPM](https://npmjs.com/package/mdx-collections-svelte)

## Example

`collections.ts`:

```ts
import {
    useCollections,
    type ImportGlobMarkdownMap,
} from "mdx-collections-svelte"

/**
 * All markdown content pages.
 *
 * Paths that contain (`_`) in their name are ignored to avoid conflict between pages and components.
 *
 * [Glob Import](https://vitejs.dev/guide/features.html#glob-import).
 */
export const pages = import.meta.glob(
    [
        "/src/content/*/**/*.md",
        "!/src/content/*/**/_*/*.md",
        "!/src/content/*/**/_*.md",
    ],
    { eager: true },
) satisfies ImportGlobMarkdownMap

export const collections = useCollections(pages)
```

`getPosts.ts`:

```ts
import { collections } from "mdx-collections-svelte"

export const getPosts = async () => {
    const entries = collections.getEntries("posts")

    const posts = entries
        // Only get root pages.
        .filter((entry) => entry.slug.split("/").length === 1)
        // Sort by update date.
        .sort(
            (first, second) =>
                new Date(second.frontmatter.update).getTime() -
                new Date(first.frontmatter.update).getTime(),
        )

    return posts
}
```

`posts/+page.ts`:

```ts
import { getPosts } from "getPosts.js"

export const load = async () => {
    const posts = await getPosts()
    return { posts }
}
```
