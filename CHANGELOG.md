## 2.0.0

-   Feature: Added `useTypedCollections`. Better schema handling, less boilerplate and better type safety.
-   Breaking: Renamed `getGlobEntryValue` to `parseFrontmatter`.
-   Breaking: Exported Zod from `/zod`.
-   Fix: Fixed `frontmatter` type in `CollectionEntry["mdx"]`.
-   Fix: Detect conflicting routes based on `href`.
-   Fix: Allow empty object with default as a schema.
