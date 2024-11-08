import { z } from "zod"
import {
    getCollectionEntries,
    useCollections,
    useTypedCollections,
    type ImportGlobMarkdownMap,
} from "../src/index.js"

const pages = {
    "/src/content/posts/hello-world.md": {
        default: undefined as any,
        mdx: {
            frontmatter: {
                title: "Hello, World!",
            },
        },
        frontmatter: {
            title: "Hello, World!",
        },
    },
    "/src/content/products/hello-world.md": {
        default: undefined as any,
        mdx: {
            frontmatter: {
                title: "Hello, World!",
                price: 100,
            },
        },
        frontmatter: {
            title: "Hello, World!",
            price: 100,
        },
    },
    "/src/content/portfolios/hello-world.md": {
        default: undefined as any,
        mdx: {
            frontmatter: {},
        },
        frontmatter: {},
    },
} satisfies ImportGlobMarkdownMap

const postEntries = getCollectionEntries(
    pages,
    "posts",
    z.object({
        title: z.string(),
    }),
)

const productsEntries = getCollectionEntries(
    pages,
    "products",
    z.object({
        title: z.string(),
        price: z.number(),
    }),
)

console.log(postEntries[0].frontmatter)
console.log(productsEntries[0].frontmatter)

// ---

const collections = useCollections(pages)

const postEntries2 = collections.getEntries(
    "posts",
    z.object({
        title: z.string(),
    }),
)

const productsEntries2 = collections.getEntries(
    "products",
    z.object({
        title: z.string(),
        price: z.number(),
    }),
)

console.log(postEntries2[0].frontmatter)
console.log(productsEntries2[0].frontmatter)

// ---

const collections2 = useTypedCollections(pages, {
    posts: z.object({
        title: z.string(),
    }),
    products: z.object({
        title: z.string(),
        price: z.number(),
    }),
    portfolios: z.object({}).default({}),
})

const postEntries3 = collections2.getEntries("posts")
const productsEntries3 = collections2.getEntries("products")
const portfoliosEntries3 = collections2.getEntries("portfolios")

console.log(postEntries3[0].frontmatter)
console.log(productsEntries3[0].frontmatter)
console.log(productsEntries3[0].mdx.frontmatter)
console.log(portfoliosEntries3[0].frontmatter)
