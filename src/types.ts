import type { Data } from "mdx-svelte"
import type { Component } from "svelte"
import type { z } from "zod"

export type ZodLooseObject =
    | z.ZodObject<z.ZodRawShape>
    | z.ZodDefault<z.ZodObject<z.ZodRawShape>>

export type ImportGlobMarkdown = {
    default: Component
    mdx: Data
    frontmatter?: Data["frontmatter"]
}

export type ImportGlobMarkdownMap = Record<string, ImportGlobMarkdown>

export type CollectionEntry = ImportGlobMarkdown & {
    path: string
    file: string
    collection: string
    slug: string
    href: string
}
