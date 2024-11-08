[![NPM version](https://img.shields.io/npm/v/mdx-collections-svelte?style=for-the-badge&label=NPM&color=%23cb0000)](https://npmjs.com/package/mdx-collections-svelte "View on NPM")

# MDX Collections Svelte

An easy way to create collections of markdown pages in SvelteKit.

-   🪵 [CHANGELOG](https://github.com/babakfp/mdx-collections-svelte/blob/main/CHANGELOG.md)
-   📦 [NPM](https://npmjs.com/package/mdx-collections-svelte)

## Example

`$lib/collections.ts`:

```ts
import {
    useTypedCollections,
    type ImportGlobMarkdownMap,
} from "mdx-collections-svelte"
import { z } from "mdx-collections-svelte/zod"

/**
 * All markdown pages.
 *
 * Paths that contain (`_`) in their name are ignored to avoid conflict between pages and components.
 *
 * [Glob Import](https://vite.dev/guide/features.html#glob-import).
 */
export const pages = import.meta.glob(
    [
        "/src/content/*/**/*.md",
        "!/src/content/*/**/_*/*.md", // ignored
        "!/src/content/*/**/_*.md", // ignored
    ],
    { eager: true },
) satisfies ImportGlobMarkdownMap

const postsSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
})

const productsSchema = z.object({
    title: z.string().min(1),
    price: z.number().min(1),
})

export const collections = useTypedCollections(pages, {
    posts: postsSchema,
    products: productsSchema,
})
```

`posts/+page.ts`:

```ts
import { collections } from "$lib/collections.js"

export const load = async () => {
    const allPosts = collections.getEntries("posts") // You'll get type suggestions.
    const helloWorldPost = collections.getEntry("hello-world") // You'll get type suggestions.
    return { allPosts, helloWorldPost }
}
```

### Empty frontmatter

Use this schema if you don't use frontmatter for a collection.

```ts
z.object({}).default({})
```
