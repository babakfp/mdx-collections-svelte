import type { Data } from "mdx-svelte"
import type { z } from "zod"
import { collectionSchema, slugSegmentSchema } from "./schemas.js"
import type {
    CollectionEntry,
    ImportGlobMarkdownMap,
    ZodLooseObject,
} from "./types.js"

export const markdownFilesToEntries = (pages: ImportGlobMarkdownMap) => {
    const entries: CollectionEntry[] = []

    for (const [path, value] of Object.entries(pages)) {
        const segments = path.replace("/src/content/", "").split("/")

        const collection = segments[0]
        collectionSchema.parse(collection)

        const file = segments[segments.length - 1]
        slugSegmentSchema.parse(file.replace(".md", ""))

        const slugSegments = segments.slice(1, -1)
        slugSegments.forEach((slugSegment) =>
            slugSegmentSchema.parse(slugSegment),
        )

        const slug = segments
            .slice(1)
            .join("/")
            .replace(".md", "")
            .replace("/index", "")

        const href = `/${collection}/${slug}`

        entries.push({ path, ...value, collection, file, slug, href })
    }

    entries.forEach((entry) => {
        const sameHrefEntries = entries.filter((e) => e.href === entry.href)
        if (sameHrefEntries.length > 1) {
            throw new Error(
                [
                    "Conflicting routes found:",
                    ...sameHrefEntries.map((e) => `    .${e.path}`),
                    "One must be removed.",
                ].join("\n"),
            )
        }
    })

    return entries
}

export const parseFrontmatter = <TSchema extends ZodLooseObject>(
    entry: CollectionEntry,
    schema: TSchema,
) => {
    const frontmatterOutput: z.output<TSchema> = schema.parse(entry.frontmatter)

    const mdxOutput: Data & {
        frontmatter: z.output<TSchema>
    } = {
        ...entry.mdx,
        frontmatter: frontmatterOutput,
    }

    return {
        collection: entry.collection,
        path: entry.path,
        file: entry.file,
        slug: entry.slug,
        default: entry.default,
        mdx: mdxOutput,
        frontmatter: frontmatterOutput,
        href: entry.href,
    } satisfies CollectionEntry
}

/**
 * Gets all markdown entries of the specific collection.
 * @param name - The name of the collection.
 */
export const getCollectionEntries = <TSchema extends ZodLooseObject>(
    pages: ImportGlobMarkdownMap,
    name: string,
    schema: TSchema,
) => {
    const entries = markdownFilesToEntries(pages)

    const collectionEntries = entries.filter((page) => page.collection === name)

    const result = collectionEntries.map((entry) =>
        parseFrontmatter<TSchema>(entry, schema),
    )

    return result
}

/**
 * Gets a specific markdown page based on collection name and slug.
 * @param name - The name of the collection.
 * @param slug - The name of the markdown file without the suffix (`.md`).
 */
export const getCollectionEntry = <TSchema extends ZodLooseObject>(
    pages: ImportGlobMarkdownMap,
    name: string,
    slug: string,
    schema: TSchema,
) => {
    const entries = markdownFilesToEntries(pages)
    const collectionEntries = entries.filter(
        (entry) => entry.collection === name,
    )
    const entry = collectionEntries.filter(
        (entry) => entry.collection === name && entry.slug === slug,
    )[0]

    if (entry) {
        return parseFrontmatter<TSchema>(entry, schema)
    }
}

export const useCollections = (pages: ImportGlobMarkdownMap) => {
    const getEntries = <ZSchema extends ZodLooseObject>(
        name: string,
        schema: ZSchema,
    ) => getCollectionEntries(pages, name, schema)

    const getEntry = <ZSchema extends ZodLooseObject>(
        name: string,
        slug: string,
        schema: ZSchema,
    ) => getCollectionEntry(pages, name, slug, schema)

    return {
        getEntries,
        getEntry,
    }
}

export const useTypedCollections = <
    K extends { [name: string]: ZodLooseObject },
>(
    pages: ImportGlobMarkdownMap,
    collections: K,
) => {
    const getEntries = <C extends keyof K>(name: C) =>
        getCollectionEntries<K[C]>(pages, name as string, collections[name])

    const getEntry = <C extends keyof K>(name: C, slug: string) =>
        getCollectionEntry<K[C]>(pages, name as string, slug, collections[name])

    return {
        getEntries,
        getEntry,
    }
}
