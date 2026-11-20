## 2.1.0

- feat: add SvelteKit 3 support.

## 2.0.2

- feat: made compatible with mdx-svelte v6.

## 2.0.0

- Feature: Added `useTypedCollections`. Better schema handling, less boilerplate and better type safety.
- Breaking: Renamed `getGlobEntryValue` to `parseFrontmatter`.
- Breaking: Exported Zod from `/zod`.
- Fix: Fixed `frontmatter` type in `CollectionEntry["mdx"]`.
- Fix: Detect conflicting routes based on `href`.
- Fix: Allow empty object with default as a schema.
