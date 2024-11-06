import type { z } from "zod"
import { collectionSchema, slugSegmentSchema } from "./schemas.js"
import type { CollectionEntry, ImportGlobMarkdownMap } from "./types.js"

const markdownFilesToEntries = (pages: ImportGlobMarkdownMap = {}) => {
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
        const sameSlugEntries = entries.filter((e) => e.slug === entry.slug)
        if (sameSlugEntries.length > 1) {
            throw new Error(
                `Conflicting routes found:\n${sameSlugEntries.map((e) => `    .${e.path}`).join("\n")}\nOne must be removed.`,
            )
        }
    })

    return entries
}

/**
 * @returns The resolved value of an entry with frontmatter.
 */
const getGlobEntryValue = <T extends z.ZodRawShape>(
    entry: CollectionEntry,
    schema?: z.ZodObject<T>,
) => {
    const validateFrontmatter = () => {
        if (schema) {
            return schema.parse(entry.frontmatter)
        }

        return {}
    }

    const frontmatter = {
        ...(validateFrontmatter() as z.infer<z.ZodObject<T>>),
        ...entry.frontmatter,
    }

    return {
        collection: entry.collection,
        path: entry.path,
        file: entry.file,
        slug: entry.slug,
        default: entry.default,
        mdx: entry.mdx,
        frontmatter,
        href: entry.href,
    } satisfies CollectionEntry
}

/**
 * Gets all markdown entries of the specific collection.
 * @param name - The name of the collection.
 */
export const getCollectionEntries = <T extends z.ZodRawShape>(
    name: string,
    schema?: z.ZodObject<T>,
) => {
    const entries = markdownFilesToEntries()

    const collectionEntries = entries.filter((page) => page.collection === name)

    const result = collectionEntries.map((entry) =>
        getGlobEntryValue<T>(entry, schema),
    )

    return result
}

/**
 * Gets a specific markdown page based on collection name and slug.
 * @param name - The name of the collection.
 * @param slug - The name of the markdown file without the suffix (`.md`).
 */
export const getCollectionEntry = <T extends z.ZodRawShape>(
    name: string,
    slug: string,
    schema?: z.ZodObject<T>,
) => {
    const entries = markdownFilesToEntries()
    const collectionEntries = entries.filter(
        (entry) => entry.collection === name,
    )
    const entry = collectionEntries.filter(
        (entry) => entry.collection === name && entry.slug === slug,
    )[0]

    if (entry) {
        return getGlobEntryValue<T>(entry, schema)
    }
}
